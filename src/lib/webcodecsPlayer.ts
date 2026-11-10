/* ── WebCodecs scroll-scrub player ────────────────────────────────────────
   Decodes frames directly from a compressed H.264 Baseline video on demand,
   driven by scroll progress, holding at most ONE decoded VideoFrame in
   memory at any instant.

   Includes an automatic non-blocking <video>-to-<canvas> fallback when
   VideoDecoder is unavailable (e.g. testing over a plain HTTP LAN IP). */

import { createFile, DataStream, Endianness, type Sample } from "mp4box";

type MP4VideoTrack = {
  id: number;
  codec: string;
  video: { width: number; height: number };
};
type MP4Info = { videoTracks: MP4VideoTrack[] };
type MP4ArrayBuffer = ArrayBuffer & { fileStart: number };

type SampleEntry = {
  data: Uint8Array;
  cts: number; // seconds
  duration: number; // seconds
  isKeyframe: boolean;
};

export type PlayerStats = {
  status: "loading" | "ready" | "error";
  frameCount: number;
  currentFrame: number;
  mode: "continue" | "reseek" | "-";
};

const FORWARD_CONTINUE_LIMIT = 36;
const SETTLE_EPSILON = 0.0005;

export function smoothProgress(
  current: number,
  target: number,
  dt: number,
  smoothing = 14
): number {
  if (Math.abs(target - current) < SETTLE_EPSILON) return target;
  const factor = 1 - Math.exp(-smoothing * dt);
  return current + (target - current) * factor;
}

export class WebCodecsPlayer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private url: string;
  private samples: SampleEntry[] = [];
  private keyframeIndices: number[] = [];
  private decoder: VideoDecoder | null = null;
  private decoderConfig: VideoDecoderConfig | null = null;
  private lastFedIndex = -1;
  private targetTimestampUs = -1;
  private latestFrame: VideoFrame | null = null;

  // Fallback <video> state (when testing over plain HTTP LAN IP where VideoDecoder is disabled)
  private fallbackVideo: HTMLVideoElement | null = null;
  private isFallbackSeeking = false;
  private pendingFallbackTime: number | null = null;

  private resizeObserver: ResizeObserver;
  private destroyed = false;
  public onStats: ((s: PlayerStats) => void) | null = null;

  constructor(canvas: HTMLCanvasElement, url: string) {
    this.canvas = canvas;
    this.url = url;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) throw new Error("2D context unavailable");
    this.ctx = ctx;
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = "high";

    this.resizeObserver = new ResizeObserver(() => this.resizeCanvas());
    this.resizeObserver.observe(canvas);
    this.resizeCanvas();
  }

  private resizeCanvas() {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2.5);
    const rect = this.canvas.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width * dpr));
    const h = Math.max(1, Math.round(rect.height * dpr));
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
      this.ctx.imageSmoothingEnabled = true;
      this.ctx.imageSmoothingQuality = "high";
      if (this.latestFrame) {
        this.drawFrame(this.latestFrame);
      } else if (this.fallbackVideo && this.fallbackVideo.readyState >= 2) {
        this.drawFallbackVideo();
      }
    }
  }

  private drawFrame(frame: VideoFrame) {
    const cw = this.canvas.width;
    const ch = this.canvas.height;
    const scale = Math.max(cw / frame.displayWidth, ch / frame.displayHeight);
    const dw = frame.displayWidth * scale;
    const dh = frame.displayHeight * scale;
    this.ctx.drawImage(frame, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  }

  private drawFallbackVideo() {
    const v = this.fallbackVideo;
    if (!v || !v.videoWidth || !v.videoHeight) return;
    const cw = this.canvas.width;
    const ch = this.canvas.height;
    const scale = Math.max(cw / v.videoWidth, ch / v.videoHeight);
    const dw = v.videoWidth * scale;
    const dh = v.videoHeight * scale;
    this.ctx.drawImage(v, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  }

  private handleFrame = (frame: VideoFrame) => {
    if (this.destroyed) {
      frame.close();
      return;
    }
    if (frame.timestamp === this.targetTimestampUs || !this.latestFrame) {
      this.latestFrame?.close();
      this.latestFrame = frame;
      this.drawFrame(frame);
    } else {
      frame.close();
    }
  };

  private emitStats(mode: PlayerStats["mode"] = "-") {
    this.onStats?.({
      status: this.samples.length ? "ready" : "loading",
      frameCount: this.samples.length,
      currentFrame: this.lastFedIndex,
      mode,
    });
  }

  async load(): Promise<void> {
    if (typeof window === "undefined") return;

    if (typeof VideoDecoder === "undefined") {
      return this.setupFallbackVideo();
    }

    const res = await fetch(this.url);
    const arrayBuffer = (await res.arrayBuffer()) as MP4ArrayBuffer;
    if (this.destroyed) return;
    arrayBuffer.fileStart = 0;

    return new Promise<void>((resolve) => {
      const mp4file = createFile();

      mp4file.onError = (e: string) => {
        console.error(`mp4box error (${this.url}):`, e);
        resolve();
      };

      mp4file.onReady = (info: unknown) => {
        if (this.destroyed) {
          resolve();
          return;
        }
        const track = (info as MP4Info).videoTracks[0];
        if (!track) {
          console.error(`no video track in ${this.url}`);
          resolve();
          return;
        }

        const trak = mp4file.getTrackById(track.id) as unknown as {
          mdia: {
            minf: {
              stbl: {
                stsd: {
                  entries: Array<{ avcC?: { write: (s: unknown) => void } }>;
                };
              };
            };
          };
        };
        const avcC = trak.mdia.minf.stbl.stsd.entries[0].avcC;
        if (!avcC) {
          console.error(`no avcC box in ${this.url} — only H.264 is handled`);
          resolve();
          return;
        }
        const stream = new DataStream(undefined, 0, Endianness.BIG_ENDIAN);
        avcC.write(stream);
        if (!stream.buffer) {
          resolve();
          return;
        }
        const description = new Uint8Array(stream.buffer, 8);

        this.decoderConfig = {
          codec: track.codec,
          codedWidth: track.video.width,
          codedHeight: track.video.height,
          description,
        };

        this.decoder = new VideoDecoder({
          output: this.handleFrame,
          error: (e) => console.error(`decoder error (${this.url}):`, e),
        });
        this.decoder.configure(this.decoderConfig);

        mp4file.setExtractionOptions(track.id, null, { nbSamples: Infinity });
        mp4file.start();
      };

      mp4file.onSamples = (
        _id: number,
        _user: unknown,
        newSamples: Sample[]
      ) => {
        if (this.destroyed) {
          resolve();
          return;
        }
        for (const s of newSamples) {
          if (!s.data) continue;
          this.samples.push({
            data: new Uint8Array(s.data),
            cts: s.cts / s.timescale,
            duration: s.duration / s.timescale,
            isKeyframe: s.is_sync,
          });
          if (s.is_sync) this.keyframeIndices.push(this.samples.length - 1);
        }
        if (this.lastFedIndex === -1) this.seekToProgress(0);
        this.emitStats();
        resolve();
      };

      mp4file.appendBuffer(arrayBuffer);
      mp4file.flush();
    });
  }

  private setupFallbackVideo(): Promise<void> {
    if (this.fallbackVideo || this.destroyed) return Promise.resolve();

    return new Promise<void>((resolve) => {
      const video = document.createElement("video");
      video.src = this.url;
      video.muted = true;
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.preload = "auto";
      this.fallbackVideo = video;

      let resolved = false;
      const markReady = () => {
        if (!resolved) {
          resolved = true;
          resolve();
        }
      };

      const performSeek = (targetTime: number) => {
        if (this.destroyed || !this.fallbackVideo) return;
        this.isFallbackSeeking = true;
        try {
          this.fallbackVideo.currentTime = targetTime;
        } catch {
          this.isFallbackSeeking = false;
        }
      };

      const onSeeked = () => {
        if (this.destroyed || !this.fallbackVideo) return;
        this.isFallbackSeeking = false;
        this.drawFallbackVideo();

        if (this.pendingFallbackTime !== null) {
          const nextTime = this.pendingFallbackTime;
          this.pendingFallbackTime = null;
          if (Math.abs(this.fallbackVideo.currentTime - nextTime) > 0.015) {
            performSeek(nextTime);
          }
        }
      };

      video.addEventListener("loadeddata", () => {
        if (this.destroyed) {
          markReady();
          return;
        }
        this.drawFallbackVideo();
        markReady();
      });

      video.addEventListener("error", markReady);
      video.addEventListener("seeked", onSeeked);

      let primed = false;
      const prime = () => {
        if (primed || this.destroyed) return;
        primed = true;
        video
          .play()
          .then(() => {
            video.pause();
            this.drawFallbackVideo();
          })
          .catch(() => {});
      };
      window.addEventListener("touchstart", prime, {
        passive: true,
        once: true,
      });
      window.addEventListener("pointerdown", prime, { once: true });
      video.load();
    });
  }

  /** p is 0..1. Call as often as you like — each call only does the work
      needed to reach the new target (continue vs. reset+reseek), never
      more. */
  seekToProgress(p: number) {
    const clamped = Math.max(0, Math.min(1, p));

    if (this.fallbackVideo) {
      if (this.fallbackVideo.duration > 0) {
        const targetTime = clamped * this.fallbackVideo.duration;
        if (this.isFallbackSeeking) {
          this.pendingFallbackTime = targetTime;
        } else if (
          Math.abs(this.fallbackVideo.currentTime - targetTime) > 0.015
        ) {
          this.isFallbackSeeking = true;
          try {
            this.fallbackVideo.currentTime = targetTime;
          } catch {
            this.isFallbackSeeking = false;
          }
        }
      }
      return;
    }

    if (!this.decoder || !this.decoderConfig || this.samples.length === 0)
      return;
    const target = Math.round(clamped * (this.samples.length - 1));
    if (target === this.lastFedIndex) return;

    const canContinue =
      target > this.lastFedIndex &&
      target - this.lastFedIndex <= FORWARD_CONTINUE_LIMIT &&
      this.decoder.state === "configured";

    let startIndex: number;
    let mode: PlayerStats["mode"];
    if (canContinue) {
      startIndex = this.lastFedIndex + 1;
      mode = "continue";
    } else {
      let kf = 0;
      for (const k of this.keyframeIndices) {
        if (k <= target) kf = k;
        else break;
      }
      startIndex = kf;
      mode = "reseek";
      this.decoder.reset();
      this.decoder.configure(this.decoderConfig);
    }

    this.targetTimestampUs = Math.round(this.samples[target].cts * 1e6);
    for (let i = startIndex; i <= target; i++) {
      const s = this.samples[i];
      this.decoder.decode(
        new EncodedVideoChunk({
          type: s.isKeyframe ? "key" : "delta",
          timestamp: Math.round(s.cts * 1e6),
          duration: Math.round(s.duration * 1e6),
          data: s.data,
        })
      );
    }
    this.lastFedIndex = target;
    this.emitStats(mode);
  }

  destroy() {
    this.destroyed = true;
    this.resizeObserver.disconnect();
    this.latestFrame?.close();
    if (this.fallbackVideo) {
      this.fallbackVideo.src = "";
      this.fallbackVideo = null;
    }
    try {
      this.decoder?.close();
    } catch {
      // already closed
    }
  }
}
