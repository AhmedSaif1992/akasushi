"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { WebCodecsPlayer, smoothProgress } from "@/lib/webcodecsPlayer";
import Button from "./Button";
import HeartOfJapan from "./HeartOfJapan";
import { useReserveModal } from "./ReserveModal";
import {
  FINALE_CAPTIONS,
  CAPTION_BEAT_STARTS_PCT,
  CAPTION_EDGE_FADE,
  RISE_TRAVEL_FROM_VH,
  RISE_TRAVEL_TO_VH,
  RISE_SPEED_FACTOR,
  RISE_OVERLAP,
  RISE_FADE_EDGE,
  RISE_KANJI_SPEED_FACTOR,
  RISE_FIGMA_REF,
  RISE_LAYOUT,
  RISE_SIDE_OFFSET_PX,
  RISE_KANJI_SIZE_PX,
  RISE_TYPE_PX,
  RISE_KANJI_BLEND,
  RISE_KANJI_COLOR,
  RISE_KANJI_BLUR_PX,
} from "@/lib/captionRiseConfig";
import styles from "./HeroSection.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface HeroSectionProps {
  onReserveClick?: () => void;
  onViewMenuClick?: () => void;
}

const OPENING_LAPTOP_SRC = "/homepage-videos/opening-laptop.mp4";
const OPENING_PHONE_SRC = "/homepage-videos/opening-phone.mp4";

const VIDEO2_LAPTOP_SRC = "/homepage-videos/2nd-video-laptop.mp4";
const VIDEO2_PHONE_SRC = "/homepage-videos/2nd-video-phone.mp4";

const VIDEO3_LAPTOP_SRC = "/homepage-videos/3rd-video-laptop.mp4";
const VIDEO3_PHONE_SRC = "/homepage-videos/3rd-video-phone.mp4";

export default function HeroSection({
  onReserveClick,
  onViewMenuClick,
}: HeroSectionProps) {
  const router = useRouter();
  const { openReserve } = useReserveModal();
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvas2Ref = useRef<HTMLCanvasElement>(null);
  const canvas3Ref = useRef<HTMLCanvasElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroScrollFadeRef = useRef<HTMLDivElement>(null);
  const heartLayerRef = useRef<HTMLDivElement>(null);
  const video3LayerRef = useRef<HTMLDivElement>(null);

  const hasPlayedOpeningRef = useRef(false);
  const hasRevealedHeroTextRef = useRef(false);

  // Initialize WebCodecs players for 2nd-video and 3rd-video
  const player2Ref = useRef<WebCodecsPlayer | null>(null);
  const player3Ref = useRef<WebCodecsPlayer | null>(null);

  // Finale Rise Captions & Kanji refs
  const finaleItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const finaleKanjiRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const finaleTextRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    // 1. Setup Opening Video (autoplays when doors open)
    const video = videoRef.current;
    if (video) {
      video.src = isMobile ? OPENING_PHONE_SRC : OPENING_LAPTOP_SRC;
      video.load();
    }

    const startOpeningVideo = () => {
      if (hasPlayedOpeningRef.current || !videoRef.current) return;
      hasPlayedOpeningRef.current = true;
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        gsap.to(videoRef.current, {
          autoAlpha: 0,
          duration: 0.6,
          ease: "power2.inOut",
        });
      });
    };

    window.addEventListener("aka:doors-open", startOpeningVideo);

    // 2. Setup WebCodecs scroll-scrub players sequentially (2nd-video first, then 3rd-video)
    let p2: WebCodecsPlayer | null = null;
    let p3: WebCodecsPlayer | null = null;
    let isCancelled = false;

    const initPlayers = async () => {
      if (canvas2Ref.current) {
        p2 = new WebCodecsPlayer(
          canvas2Ref.current,
          isMobile ? VIDEO2_PHONE_SRC : VIDEO2_LAPTOP_SRC
        );
        player2Ref.current = p2;
        await p2
          .load()
          .catch((err) => console.error("2nd-video load error:", err));
      }

      if (isCancelled) return;

      if (canvas3Ref.current) {
        p3 = new WebCodecsPlayer(
          canvas3Ref.current,
          isMobile ? VIDEO3_PHONE_SRC : VIDEO3_LAPTOP_SRC
        );
        player3Ref.current = p3;
        await p3
          .load()
          .catch((err) => console.error("3rd-video load error:", err));
      }
    };

    initPlayers();

    return () => {
      isCancelled = true;
      window.removeEventListener("aka:doors-open", startOpeningVideo);
      p2?.destroy();
      p3?.destroy();
      player2Ref.current = null;
      player3Ref.current = null;
    };
  }, []);

  // Door-open entrance animation + Master ScrollTrigger choreography
  useGSAP(
    (_context, contextSafe) => {
      const lines = gsap.utils.toArray<HTMLElement>(`.${styles.lineInner}`);
      const buttons = gsap.utils.toArray<HTMLElement>(`.${styles.buttonInner}`);
      const masks = gsap.utils.toArray<HTMLElement>(`.${styles.buttonMask}`);

      // Reset CSS translateY offset & hide below masks initially
      gsap.set(lines, { y: 0, yPercent: 110 });
      gsap.set(buttons, { y: 0, yPercent: 110, opacity: 1 });

      const revealHeroText = contextSafe!(() => {
        if (hasRevealedHeroTextRef.current) return;
        hasRevealedHeroTextRef.current = true;

        gsap
          .timeline()
          .to(lines, {
            yPercent: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.out",
          })
          .to(
            buttons,
            {
              yPercent: 0,
              duration: 1,
              stagger: 0.12,
              ease: "power4.out",
              onComplete: () => {
                // Clear transform on buttonInner so it doesn't create a CSS Backdrop Root
                // that blocks backdrop-filter: blur() on the secondary button
                gsap.set(buttons, { clearProps: "transform" });
                gsap.set(masks, { overflow: "visible" });
              },
            },
            "-=0.8"
          );
      });

      window.addEventListener("aka:doors-opened", revealHeroText);

      // ── Master Pinned Scroll Choreography ──────────────────────────────
      const hojChars = gsap.utils.toArray<HTMLElement>("[data-hoj-char]");

      // Initial states for 2nd-video canvas, HeartOfJapan characters & layers
      gsap.set(canvas2Ref.current, { autoAlpha: 0 });
      gsap.set(heartLayerRef.current, { autoAlpha: 0 });
      gsap.set(video3LayerRef.current, { autoAlpha: 0 });
      gsap.set(hojChars, {
        yPercent: 115,
        backgroundPosition: "0% 0%",
        autoAlpha: 1,
      });

      const videoProgressTargets = { v2: 0, v3: 0 };
      const videoProgressCurrent = { v2: 0, v3: 0 };

      // Exponential smoothing on desktop wheel; direct/fast response on mobile touch
      const isTouchDevice =
        typeof window !== "undefined" &&
        (window.innerWidth < 768 || "ontouchstart" in window);
      const smoothingFactor = isTouchDevice ? 38 : 14;

      // ── Finale Rise Captions & Kanji watermark choreography ──────────
      const applyRiseLayout = () => {
        const { desktop: dRef, mobile: mRef } = RISE_FIGMA_REF;
        const phonePx = (px: number) => {
          const vw = `${(px / mRef.width) * 100}vw`;
          return px < 0 ? `max(${vw}, ${px}px)` : `min(${vw}, ${px}px)`;
        };

        finaleItemRefs.current.forEach((item, i) => {
          if (!item) return;
          const cap = FINALE_CAPTIONS[i];
          if (!cap) return;
          const edge = `${(RISE_SIDE_OFFSET_PX / dRef.width) * 100}vw`;
          if (cap.side === "left") {
            item.style.left = edge;
            item.style.right = "auto";
          } else {
            item.style.right = edge;
            item.style.left = "auto";
          }

          const L = RISE_LAYOUT[i];
          if (L) {
            item.style.setProperty(
              "--rise-top",
              `${(L.desktop.textTop / dRef.height) * 100}vh`
            );
            item.style.setProperty(
              "--text-width",
              `${(L.desktop.textWidth / dRef.width) * 100}vw`
            );
            item.style.setProperty(
              "--kanji-x",
              `${(L.desktop.kanjiX / dRef.width) * 100}vw`
            );
            item.style.setProperty(
              "--kanji-y",
              `${(L.desktop.kanjiY / dRef.width) * 100}vw`
            );
            item.style.setProperty(
              "--kanji-size",
              `${(RISE_KANJI_SIZE_PX.desktop / dRef.width) * 100}vw`
            );

            item.style.setProperty(
              "--rise-top-m",
              `${(L.mobile.textTop / mRef.height) * 100}vh`
            );
            item.style.setProperty(
              "--text-width-m",
              phonePx(L.mobile.textWidth)
            );
            item.style.setProperty("--kanji-x-m", phonePx(L.mobile.kanjiX));
            item.style.setProperty("--kanji-y-m", phonePx(L.mobile.kanjiY));
            item.style.setProperty(
              "--kanji-size-m",
              phonePx(RISE_KANJI_SIZE_PX.mobile)
            );
            item.style.setProperty(
              "--eyebrow-size-m",
              phonePx(RISE_TYPE_PX.mobile.eyebrow)
            );
            item.style.setProperty(
              "--title-size-m",
              phonePx(RISE_TYPE_PX.mobile.title)
            );
          }
          item.style.setProperty("--kanji-blend", RISE_KANJI_BLEND);
          item.style.setProperty("--kanji-color", RISE_KANJI_COLOR);
          item.style.setProperty("--kanji-blur", `${RISE_KANJI_BLUR_PX}px`);
        });
      };

      const updateCaptions = (finaleProgress: number) => {
        const n = FINALE_CAPTIONS.length;
        const isPhone = window.innerWidth <= 768;
        const lane = isPhone ? "mobile" : "desktop";
        const from = RISE_TRAVEL_FROM_VH[lane];
        const to = RISE_TRAVEL_TO_VH[lane];

        const edgeFade =
          finaleProgress < CAPTION_EDGE_FADE
            ? finaleProgress / CAPTION_EDGE_FADE
            : finaleProgress > 1 - CAPTION_EDGE_FADE
              ? Math.max(0, (1 - finaleProgress) / CAPTION_EDGE_FADE)
              : 1;

        for (let i = 0; i < n; i++) {
          const nominalStart = CAPTION_BEAT_STARTS_PCT[i] / 100;
          const nominalEnd =
            i + 1 < n ? CAPTION_BEAT_STARTS_PCT[i + 1] / 100 : 1;
          const beatDuration = nominalEnd - nominalStart;
          const overlapAmount = RISE_OVERLAP * beatDuration;
          const activeStart = Math.max(0, nominalStart - overlapAmount);
          const activeEnd = Math.min(1, nominalEnd + overlapAmount);
          const span = activeEnd - activeStart;
          const localT =
            span > 0
              ? gsap.utils.clamp(0, 1, (finaleProgress - activeStart) / span)
              : 0;

          const travel = from + (to - from) * localT;
          const fade =
            localT < RISE_FADE_EDGE
              ? localT / RISE_FADE_EDGE
              : localT > 1 - RISE_FADE_EDGE
                ? (1 - localT) / RISE_FADE_EDGE
                : 1;

          const layerOpacity = fade * edgeFade;
          const textEl = finaleTextRefs.current[i];
          const kanjiEl = finaleKanjiRefs.current[i];

          if (textEl) {
            gsap.set(textEl, {
              y: `${travel * RISE_SPEED_FACTOR}vh`,
              opacity: layerOpacity,
            });
          }
          if (kanjiEl) {
            gsap.set(kanjiEl, {
              y: `${travel * RISE_KANJI_SPEED_FACTOR}vh`,
              opacity: layerOpacity,
            });
          }
        }
      };

      applyRiseLayout();
      updateCaptions(0);

      const handleResize = () => {
        applyRiseLayout();
        updateCaptions(videoProgressCurrent.v3);
      };
      window.addEventListener("resize", handleResize);

      let lastTime = performance.now();
      let isCanvas2Visible = false;
      const onTick = () => {
        const now = performance.now();
        const dt = Math.min(0.1, (now - lastTime) / 1000);
        lastTime = now;

        const nextV2 = smoothProgress(
          videoProgressCurrent.v2,
          videoProgressTargets.v2,
          dt,
          smoothingFactor
        );
        if (Math.abs(nextV2 - videoProgressCurrent.v2) > 0.0001) {
          videoProgressCurrent.v2 = nextV2;
          player2Ref.current?.seekToProgress(nextV2);
        }
        const shouldShowCanvas2 = videoProgressCurrent.v2 > 0.001;
        if (shouldShowCanvas2 !== isCanvas2Visible) {
          isCanvas2Visible = shouldShowCanvas2;
          gsap.set(canvas2Ref.current, {
            autoAlpha: shouldShowCanvas2 ? 1 : 0,
          });
        }

        const nextV3 = smoothProgress(
          videoProgressCurrent.v3,
          videoProgressTargets.v3,
          dt,
          smoothingFactor
        );
        if (Math.abs(nextV3 - videoProgressCurrent.v3) > 0.0001) {
          videoProgressCurrent.v3 = nextV3;
          player3Ref.current?.seekToProgress(nextV3);
          updateCaptions(nextV3);
        }
      };

      gsap.ticker.add(onTick);

      // Build Master Scroll Timeline (total timeline duration = 100 units)
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: "+=750%",
          pin: true,
          scrub: true,
        },
      });

      // If user starts scrolling before opening video finishes, fade out opening video immediately
      masterTl.to(
        videoRef.current,
        {
          autoAlpha: 0,
          duration: 2,
          ease: "none",
        },
        0
      );

      // 1. Fade out Hero text & buttons as scroll begins (0 -> 8)
      // Avoid applying a 3D transform on heroScrollFadeRef so backdrop-filter on View Menu works at rest
      masterTl.to(
        heroScrollFadeRef.current,
        {
          autoAlpha: 0,
          duration: 8,
          ease: "power2.inOut",
        },
        0
      );

      // 2. Scrub 2nd-video from 0 -> 1 across timeline units (0 -> 28)
      masterTl.to(
        videoProgressTargets,
        {
          v2: 1,
          duration: 28,
          ease: "none",
        },
        0
      );

      // 3. Cross-fade from 2nd-video into HeartOfJapan section (25 -> 32)
      masterTl.to(
        heartLayerRef.current,
        {
          autoAlpha: 1,
          duration: 7,
          ease: "power2.inOut",
        },
        25
      );

      // 4. HeartOfJapan staggered masked character reveal with red -> champagne sweep (30 -> 43)
      masterTl.to(
        hojChars,
        {
          yPercent: 0,
          backgroundPosition: "0% 100%",
          duration: 8,
          stagger: 0.25,
          ease: "power3.out",
        },
        30
      );

      // 5. Hold in center of screen (43 -> 48), then disappear upward with reverse sweep (48 -> 58)
      masterTl.to(
        hojChars,
        {
          yPercent: -115,
          backgroundPosition: "0% 0%",
          autoAlpha: 0,
          duration: 7,
          stagger: 0.2,
          ease: "power3.in",
        },
        48
      );

      // 6. Cross-fade from HeartOfJapan into 3rd-video layer (55 -> 62)
      masterTl.to(
        video3LayerRef.current,
        {
          autoAlpha: 1,
          duration: 7,
          ease: "power2.inOut",
        },
        55
      );

      // 7. Scrub 3rd-video (14.3s clip) from 0 -> 1 across timeline units (58 -> 100)
      masterTl.to(
        videoProgressTargets,
        {
          v3: 1,
          duration: 42,
          ease: "none",
        },
        58
      );

      return () => {
        window.removeEventListener("aka:doors-opened", revealHeroText);
        window.removeEventListener("resize", handleResize);
        gsap.ticker.remove(onTick);
      };
    },
    { scope: stageRef }
  );

  const handleVideoEnded = () => {
    if (!videoRef.current) return;
    gsap.to(videoRef.current, {
      autoAlpha: 0,
      duration: 0.85,
      ease: "power2.inOut",
    });
  };

  return (
    <div ref={stageRef} className={styles.scrollStage}>
      {/* ── LAYER 1: Hero Section + 2nd-Video Scroll Scrub ── */}
      <section className={styles.hero} aria-label="Hero">
        <div className={styles.imageWrapper}>
          <Image
            src="/kimono-lady-herosection.webp"
            alt="AKA Sushi - A Taste of Japan"
            fill
            priority
            quality={95}
            className={styles.bgImage}
            sizes="100vw"
          />

          {/* 2nd-video WebCodecs Canvas (sits directly over the aligned hero image) */}
          <canvas
            ref={canvas2Ref}
            className={styles.scrubCanvas}
            aria-hidden="true"
          />

          {/* Autoplaying opening video (plays on door open, then fades out) */}
          <video
            ref={videoRef}
            className={styles.openingVideo}
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnded}
            aria-hidden="true"
          />
        </div>

        {/* Bottom Hero Content */}
        <div ref={heroScrollFadeRef} className={styles.container}>
          <div ref={heroContentRef} className={styles.content}>
            <h1 className={styles.headline}>
              <span className={styles.lineMask}>
                <span className={styles.lineInner}>A Taste of Japan</span>
              </span>
              <span className={styles.lineMask}>
                <span className={styles.lineInner}>An Experience Beyond</span>
              </span>
            </h1>

            <div className={styles.buttonGroup}>
              <div className={styles.buttonMask}>
                <div className={styles.buttonInner}>
                  <Button
                    variant="primary"
                    onClick={onReserveClick ?? openReserve}
                    aria-label="Reserve a table"
                  >
                    Reserve
                  </Button>
                </div>
              </div>
              <div className={styles.buttonMask}>
                <div className={styles.buttonInner}>
                  <Button
                    variant="secondary"
                    onClick={onViewMenuClick ?? (() => router.push("/menu"))}
                    aria-label="View menu"
                  >
                    View Menu
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LAYER 2: HeartOfJapan Overlay Section ── */}
      <div ref={heartLayerRef} className={styles.heartLayer}>
        <HeartOfJapan />
      </div>

      {/* ── LAYER 3: 3rd-Video Scroll Scrub Section ── */}
      <section
        ref={video3LayerRef}
        className={styles.video3Layer}
        aria-label="Cinematic Experience"
      >
        <canvas
          ref={canvas3Ref}
          className={styles.scrubCanvas}
          aria-hidden="true"
        />

        {/* Finale Captions & Kanji Watermarks (Rise Effect) */}
        <div className={styles.finaleRise} aria-hidden="true">
          {FINALE_CAPTIONS.map((cap, i) => (
            <div
              key={cap.title}
              ref={(el) => {
                finaleItemRefs.current[i] = el;
              }}
              className={`${styles.finaleRiseItem} ${
                cap.side === "left"
                  ? styles.finaleRiseItem_left
                  : styles.finaleRiseItem_right
              }`}
            >
              <span
                ref={(el) => {
                  finaleKanjiRefs.current[i] = el;
                }}
                className={styles.finaleRiseKanji}
              >
                {cap.kanji}
              </span>
              <div
                ref={(el) => {
                  finaleTextRefs.current[i] = el;
                }}
                className={styles.finaleRiseText}
              >
                <p className={styles.finaleCaptionEyebrow}>{cap.eyebrow}</p>
                <h3 className={styles.finaleCaptionTitle}>{cap.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
