import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  interface Window {
    __dreammadeAboutCleanup?: () => void;
  }
}

const aboutTriggerId = (suffix: string) => `dreammade-about-${suffix}`;

export function initAboutMotion() {
  if (typeof window === "undefined") return;
  window.__dreammadeAboutCleanup?.();

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cleanup: Array<() => void> = [];
  const showStaticPage = () => {
    document.querySelectorAll<HTMLElement>("[data-about-reveal], [data-about-frame], [data-about-logo], [data-about-line], .about-mask-heading span, .about-hero-logo, .about-hero-title span, .about-principle-row, .about-vision-column").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.clipPath = "none";
    });
  };

  window.__dreammadeAboutCleanup = () => {
    cleanup.splice(0).forEach((fn) => fn());
    ScrollTrigger.getAll()
      .filter((trigger) => trigger.vars.id?.startsWith("dreammade-about-"))
      .forEach((trigger) => trigger.kill());
  };

  if (reduceMotion) {
    document.querySelectorAll<HTMLVideoElement>(".about-existence-media video").forEach((video) => video.pause());
    showStaticPage();
    return;
  }

  try {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set("[data-about-reveal]", { opacity: 0, y: 22 });
    gsap.set("[data-about-frame]", { opacity: 0, y: 22, clipPath: "inset(10% 0% 0% 0%)" });
    gsap.set("[data-about-logo]", { opacity: 0 });
    gsap.set("[data-about-line]", { opacity: 1, scaleY: 0, transformOrigin: "top" });
    gsap.set(".about-mask-heading span, .about-hero-title span", { opacity: 0, yPercent: 105 });
    gsap.set(".about-principle-row", { opacity: 0, y: 16 });
    gsap.set(".about-vision-column", { opacity: 0, x: 0, y: 18 });

    gsap.timeline()
      .to(".about-hero-logo", { opacity: 1, y: 0, duration: .55, ease: "power3.out" })
      .to('[data-about-section="hero"] .eyebrow', { opacity: 1, y: 0, duration: .48, ease: "power3.out" }, "-=.2")
      .to(".about-hero-title span", { opacity: 1, yPercent: 0, duration: .78, stagger: .08, ease: "power4.out" }, "-=.16")
      .to(".about-hero-label", { opacity: 1, y: 0, duration: .46, ease: "power3.out" }, "-=.3");

    gsap.to(".about-hero-content", {
      y: -12,
      ease: "none",
      scrollTrigger: {
        id: aboutTriggerId("hero-content"),
        trigger: '[data-about-section="hero"]',
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    });

    const revealHeading = (section: HTMLElement, id: string) => {
      const headingLines = section.querySelectorAll<HTMLElement>(".about-mask-heading span");
      if (!headingLines.length) return;
      gsap.to(headingLines, {
        opacity: 1,
        yPercent: 0,
        duration: .72,
        stagger: .07,
        ease: "power4.out",
        scrollTrigger: { id: aboutTriggerId(`${id}-heading`), trigger: section, start: "top 84%" }
      });
    };

    const existence = document.querySelector<HTMLElement>('[data-about-section="existence"]');
    if (existence) {
      gsap.to(existence.querySelector("[data-about-frame]"), {
        opacity: 1,
        y: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: .72,
        ease: "power3.out",
        scrollTrigger: { id: aboutTriggerId("existence-frame"), trigger: existence, start: "top 82%" }
      });
      gsap.to(existence.querySelectorAll("[data-about-reveal]"), {
        opacity: 1,
        y: 0,
        duration: .52,
        stagger: .07,
        ease: "power3.out",
        scrollTrigger: { id: aboutTriggerId("existence-copy"), trigger: existence, start: "top 78%" }
      });
    }

    const story = document.querySelector<HTMLElement>('[data-about-section="story"]');
    if (story) {
      revealHeading(story, "story");
      gsap.to(story.querySelectorAll("[data-about-reveal]"), {
        opacity: 1,
        y: 0,
        x: 0,
        duration: .55,
        stagger: .08,
        ease: "power3.out",
        scrollTrigger: { id: aboutTriggerId("story-copy"), trigger: story, start: "top 82%" }
      });
    }

    const philosophy = document.querySelector<HTMLElement>('[data-about-section="philosophy"]');
    if (philosophy) {
      revealHeading(philosophy, "philosophy");
      gsap.to(philosophy.querySelectorAll("[data-about-reveal]"), {
        opacity: 1,
        y: 0,
        duration: .48,
        ease: "power3.out",
        scrollTrigger: { id: aboutTriggerId("philosophy-label"), trigger: philosophy, start: "top 84%" }
      });
      gsap.to(".about-principle-row", {
        opacity: 1,
        y: 0,
        duration: .5,
        stagger: .07,
        ease: "power3.out",
        scrollTrigger: { id: aboutTriggerId("philosophy-rows"), trigger: ".about-principles", start: "top 84%" }
      });
    }

    const ecosystem = document.querySelector<HTMLElement>('[data-about-section="ecosystem"]');
    if (ecosystem) {
      revealHeading(ecosystem, "ecosystem");
      const ecosystemSequence = [
        ...gsap.utils.toArray<HTMLElement>(".about-ecosystem-parent"),
        ...gsap.utils.toArray<HTMLElement>(".about-ecosystem-connector"),
        ...gsap.utils.toArray<HTMLElement>(".about-ecosystem-children .ecosystem-logo"),
        ...gsap.utils.toArray<HTMLElement>('.about-ecosystem a[data-about-reveal]')
      ];
      gsap.to(ecosystem.querySelectorAll(".about-section-heading [data-about-reveal]"), {
        opacity: 1,
        y: 0,
        duration: .48,
        ease: "power3.out",
        scrollTrigger: { id: aboutTriggerId("ecosystem-label"), trigger: ecosystem, start: "top 84%" }
      });
      gsap.to(ecosystemSequence, {
        opacity: 1,
        y: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        scaleY: 1,
        duration: .54,
        stagger: .08,
        ease: "power3.out",
        scrollTrigger: { id: aboutTriggerId("ecosystem-logos"), trigger: ".about-ecosystem-architecture", start: "top 82%" }
      });
      gsap.to(ecosystem.querySelectorAll("[data-about-logo]"), {
        opacity: 1,
        duration: .45,
        stagger: .08,
        ease: "power2.out",
        scrollTrigger: { id: aboutTriggerId("ecosystem-logo-art"), trigger: ".about-ecosystem-architecture", start: "top 82%" }
      });
    }

    const vision = document.querySelector<HTMLElement>('[data-about-section="vision"]');
    if (vision) {
      gsap.set(".about-vision-column:first-of-type", { x: -20 });
      gsap.set(".about-vision-column:last-of-type", { x: 20 });
      gsap.to(vision.querySelectorAll("[data-about-reveal]"), {
        opacity: 1,
        y: 0,
        duration: .48,
        ease: "power3.out",
        scrollTrigger: { id: aboutTriggerId("vision-label"), trigger: vision, start: "top 84%" }
      });
      gsap.to(".about-vision-column", {
        opacity: 1,
        x: 0,
        y: 0,
        duration: .58,
        stagger: .08,
        ease: "power3.out",
        scrollTrigger: { id: aboutTriggerId("vision-columns"), trigger: ".about-vision-grid", start: "top 84%" }
      });
    }

    const cta = document.querySelector<HTMLElement>('[data-about-section="cta"]');
    if (cta) {
      revealHeading(cta, "cta");
      gsap.to(cta.querySelector("[data-about-frame]"), {
        opacity: 1,
        y: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: .64,
        ease: "power3.out",
        scrollTrigger: { id: aboutTriggerId("cta-frame"), trigger: cta, start: "top 84%" }
      });
      gsap.to(cta.querySelectorAll("[data-about-reveal]"), {
        opacity: 1,
        y: 0,
        duration: .5,
        stagger: .08,
        ease: "power3.out",
        scrollTrigger: { id: aboutTriggerId("cta-copy"), trigger: cta, start: "top 82%" }
      });
    }

    const refreshWhenReady = async () => {
      await document.fonts?.ready;
      const image = document.querySelector<HTMLImageElement>(".about-hero-image");
      if (image && !image.complete) {
        await image.decode().catch(() => undefined);
      }
      const video = document.querySelector<HTMLVideoElement>(".about-existence-media video");
      if (video && video.readyState < 1) {
        await new Promise<void>((resolve) => {
          video.addEventListener("loadedmetadata", () => resolve(), { once: true });
          window.setTimeout(resolve, 1200);
        });
      }
      ScrollTrigger.refresh();
    };
    refreshWhenReady();
  } catch (error) {
    console.error("Dreammade about motion failed to initialize", error);
    window.__dreammadeAboutCleanup?.();
    showStaticPage();
  }
}
