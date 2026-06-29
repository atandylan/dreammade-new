import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initProgressiveMediaRails } from "./progressiveMediaRail";

declare global {
  interface Window {
    __dreammadeClothingCleanup?: () => void;
  }
}

const clothingTriggerId = (suffix: string) => `dreammade-clothing-${suffix}`;

export function initClothingMotion() {
  if (typeof window === "undefined") return;

  window.__dreammadeClothingCleanup?.();

  gsap.registerPlugin(ScrollTrigger);

  const cleanupRails = initProgressiveMediaRails();
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.__dreammadeClothingCleanup = () => {
    cleanupRails();
    ScrollTrigger.getAll()
      .filter((trigger) => trigger.vars.id?.startsWith("dreammade-clothing-"))
      .forEach((trigger) => trigger.kill());
    window.__dreammadeClothingCleanup = undefined;
  };

  const showStaticPage = () => {
    document.querySelectorAll<HTMLElement>(".reveal, [data-clothing-title], .horizontal-media-shell, .horizontal-media-card, .horizontal-media-card img, .progressive-gallery-toggle, .accessories-header, .accessory-casing-card, .accessory-casing-card img, .accessory-eyewear, .clothing-social-inner, .clothing-social-links a").forEach((el) => {
      if (el.classList.contains("clothing-brand")) {
        el.style.opacity = "0.08";
      } else {
        el.style.opacity = "1";
      }
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
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .fromTo(".clothing-hero .eyebrow", { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: .62 })
      .fromTo(".clothing-brand", { y: 20, opacity: 0 }, { y: 0, opacity: 0.08, duration: .72 }, "-=.42")
      .fromTo(".clothing-hero h1", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .78 }, "-=.5");

    document.querySelectorAll<HTMLElement>(".lookbook-group").forEach((group, groupIndex) => {
      const title = group.querySelector<HTMLElement>("[data-clothing-title]");
      const items = Array.from(group.querySelectorAll<HTMLElement>(".lookbook-item"));

      gsap.timeline({
        scrollTrigger: {
          id: clothingTriggerId(`lookbook-${groupIndex}`),
          trigger: group,
          start: "top 82%",
        },
      })
        .fromTo(title, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: .62, ease: "power4.out" });

      items.forEach((item, itemIndex) => {
        gsap.fromTo(item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              id: clothingTriggerId(`lookbook-${groupIndex}-item-${itemIndex}`),
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    });

    const accessories = document.querySelector<HTMLElement>(".accessories-section");
    if (accessories) {
      const casingCard = accessories.querySelector<HTMLElement>(".accessory-casing-card");
      const casingImage = accessories.querySelector<HTMLElement>(".accessory-casing-card img");
      const eyewear = accessories.querySelector<HTMLElement>(".accessory-eyewear");
      const eyewearRail = accessories.querySelector<HTMLElement>(".accessories-eyewear-gallery");
      const eyewearCards = Array.from(accessories.querySelectorAll<HTMLElement>(".accessories-eyewear-gallery .horizontal-media-card:not([hidden])"));

      gsap.timeline({
        scrollTrigger: {
          id: clothingTriggerId("accessories"),
          trigger: accessories,
          start: "top 78%",
        },
      })
        .fromTo(".accessories-header", { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: .62, ease: "power3.out" })
        .fromTo(casingCard, { y: 26, opacity: 0, clipPath: "inset(8% 0% 0% 0%)" }, { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: .62, ease: "power3.out" }, "-=.18")
        .fromTo(casingImage, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: .52, ease: "power3.out" }, "-=.32")
        .fromTo(eyewear, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: .54, ease: "power3.out" }, "-=.28")
        .fromTo(eyewearRail, { clipPath: "inset(8% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: .5, ease: "power3.out" }, "-=.24")
        .fromTo(eyewearCards, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: .42, stagger: .045, ease: "power3.out" }, "-=.28");
    }

    gsap.timeline({
      scrollTrigger: {
        id: clothingTriggerId("social"),
        trigger: ".clothing-social",
        start: "top 84%",
      },
    })
      .fromTo(".clothing-social-inner > div:first-child", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .52, ease: "power3.out" })
      .fromTo(".clothing-social-links a", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .42, stagger: .06, ease: "power3.out" }, "-=.18");

    window.setTimeout(() => ScrollTrigger.refresh(), 400);
  } catch (error) {
    console.error("Dreammade clothing motion failed to initialize", error);
    window.__dreammadeClothingCleanup?.();
    showStaticPage();
  }
}
