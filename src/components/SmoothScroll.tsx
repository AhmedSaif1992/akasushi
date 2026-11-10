"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    // Force browser to start at the top of the page on every refresh
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    ScrollTrigger.clearScrollMemory("manual");
    window.scrollTo(0, 0);

    // Use Lenis smooth wheel on desktop, and keep native hardware touch scroll on mobile (syncTouch: false)
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
    });

    // Lock Lenis at scroll position 0 until the loading screen finishes
    lenis.scrollTo(0, { immediate: true, force: true });
    lenis.stop();

    lenis.on("scroll", ScrollTrigger.update);

    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    let isLoadingDone = false;
    let isLockedByOverlay = false;

    const onLoadingComplete = () => {
      isLoadingDone = true;
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true, force: true });
      if (!isLockedByOverlay) lenis.start();
      ScrollTrigger.refresh();
    };

    // Overlays (e.g. full-screen nav menu) can pause/resume smooth scrolling
    const onScrollLock = () => {
      isLockedByOverlay = true;
      lenis.stop();
    };
    const onScrollUnlock = () => {
      isLockedByOverlay = false;
      if (isLoadingDone) lenis.start();
    };
    window.addEventListener("aka:scroll-lock", onScrollLock);
    window.addEventListener("aka:scroll-unlock", onScrollUnlock);

    const onBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener("aka:loading-complete", onLoadingComplete);
    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      window.removeEventListener("aka:loading-complete", onLoadingComplete);
      window.removeEventListener("beforeunload", onBeforeUnload);
      window.removeEventListener("aka:scroll-lock", onScrollLock);
      window.removeEventListener("aka:scroll-unlock", onScrollUnlock);
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
    };
  }, []);

  return null;
}
