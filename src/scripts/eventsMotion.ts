import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initProgressiveMediaRails } from "./progressiveMediaRail";

declare global {
  interface Window {
    __dreammadeEventsCleanup?: () => void;
  }
}

const eventsTriggerId = (suffix: string) => `dreammade-events-${suffix}`;

export function initEventsMotion() {
  if (typeof window === "undefined") return;

  window.__dreammadeEventsCleanup?.();

  gsap.registerPlugin(ScrollTrigger);

  const cleanupRails = initProgressiveMediaRails();
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.__dreammadeEventsCleanup = () => {
    cleanupRails();
    ScrollTrigger.getAll()
      .filter((trigger) => trigger.vars.id?.startsWith("dreammade-events-"))
      .forEach((trigger) => trigger.kill());
    window.__dreammadeEventsCleanup = undefined;
  };

  const showStaticPage = () => {
    document.querySelectorAll<HTMLElement>(".reveal, [data-event-reveal], [data-event-title], .horizontal-media-shell, .horizontal-media-card, .horizontal-media-card img, .progressive-gallery-toggle").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.clipPath = "none";
    });
  };

  if (prefersReducedMotion) {
    showStaticPage();
    ScrollTrigger.refresh();
    return;
  }

  try {
    gsap.fromTo(
      ".events-hero .reveal",
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: .72, stagger: .08, ease: "power3.out" }
    );

    document.querySelectorAll<HTMLElement>(".event-album").forEach((album, albumIndex) => {
      const eyebrow = album.querySelector<HTMLElement>("[data-event-reveal]");
      const title = album.querySelector<HTMLElement>("[data-event-title]");
      const railShell = album.querySelector<HTMLElement>(".horizontal-media-shell");
      const visibleCards = Array.from(album.querySelectorAll<HTMLElement>(".horizontal-media-card:not([hidden])"));
      const visibleImages = visibleCards.map((card) => card.querySelector("img")).filter(Boolean);
      const toggle = album.querySelector<HTMLElement>(".progressive-gallery-toggle");

      gsap.timeline({
        scrollTrigger: {
          id: eventsTriggerId(`album-${albumIndex}`),
          trigger: album,
          start: "top 82%",
        },
      })
        .fromTo(eyebrow, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .42, ease: "power3.out" })
        .fromTo(title, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: .62, ease: "power4.out" }, "-=.18")
        .fromTo(railShell, { y: 24, opacity: 0, clipPath: "inset(8% 0% 0% 0%)" }, { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: .62, ease: "power3.out" }, "-=.16")
        .fromTo(visibleCards, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .42, stagger: .045, ease: "power3.out" }, "-=.28")
        .fromTo(visibleImages, { scale: 1.02 }, { scale: 1, duration: .78, stagger: .035, ease: "power3.out" }, "-=.5")
        .fromTo(toggle, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: .36, ease: "power3.out" }, "-=.24");
    });

    window.setTimeout(() => ScrollTrigger.refresh(), 400);
  } catch (error) {
    console.error("Dreammade events motion failed to initialize", error);
    window.__dreammadeEventsCleanup?.();
    showStaticPage();
  }
}
