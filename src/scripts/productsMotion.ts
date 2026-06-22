import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  interface Window {
    __dreammadeProductsCleanup?: () => void;
  }
}

export function initProductsMotion() {
  if (typeof window === "undefined") return;
  window.__dreammadeProductsCleanup?.();

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cleanup: Array<() => void> = [];
  const showStaticPage = () => {
    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
      el.style.opacity = "1";
      el.style.clipPath = "none";
    });
    document.querySelectorAll<HTMLElement>("[data-products-hero-item], .campaign-copy, .device-float, .special-edition-panel").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "";
      el.style.clipPath = "none";
    });
  };
  window.__dreammadeProductsCleanup = () => {
    cleanup.splice(0).forEach((fn) => fn());
    ScrollTrigger.getAll().filter((trigger) => trigger.vars.id?.startsWith("dreammade-products")).forEach((trigger) => trigger.kill());
  };

  if (reduceMotion) {
    showStaticPage();
    return;
  }

  try {
    gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll<HTMLAnchorElement>(".system-pill").forEach((pill) => {
    const onClick = (event: MouseEvent) => {
      const href = pill.getAttribute("href");
      const target = href ? document.querySelector<HTMLElement>(href) : null;
      if (!target) return;
      event.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 126;
      window.scrollTo({ top, behavior: "smooth" });
    };
    pill.addEventListener("click", onClick);
    cleanup.push(() => pill.removeEventListener("click", onClick));
  });

  const revealedSystemHeads = document.querySelectorAll(".system-head.reveal");
  if (revealedSystemHeads.length) {
    gsap.set(revealedSystemHeads, { opacity: 1, y: 0 });
  }
  gsap.from("[data-products-hero-item]", {
    y: 18,
    opacity: 0,
    duration: .72,
    stagger: .08,
    ease: "power3.out"
  });

  gsap.utils.toArray<HTMLElement>("[data-product-campaign]").forEach((campaign, campaignIndex) => {
    const copy = campaign.querySelector<HTMLElement>(".campaign-copy");
    const group = campaign.querySelector<HTMLElement>("[data-campaign-group]");
    const layers = gsap.utils.toArray<HTMLElement>(campaign.querySelectorAll("[data-campaign-layer]"));
    if (copy) {
      gsap.from(copy, {
        y: 34,
        opacity: 0,
        duration: .8,
        ease: "power3.out",
        scrollTrigger: {
          id: `dreammade-products-campaign-copy-${campaignIndex}`,
          trigger: campaign,
          start: "top 78%"
        }
      });
    }
    if (group) {
      gsap.fromTo(group, { yPercent: 2 }, {
        yPercent: -1,
        ease: "none",
        scrollTrigger: {
          id: `dreammade-products-campaign-group-${campaignIndex}`,
          trigger: campaign,
          start: "top bottom",
          end: "bottom top",
          scrub: .9
        }
      });
    }
    layers.forEach((layer, index) => {
      gsap.fromTo(layer, {
        yPercent: index % 2 ? 1 : -1
      }, {
        yPercent: index % 2 ? -1 : 1,
        ease: "none",
        scrollTrigger: {
          id: `dreammade-products-campaign-layer-${campaignIndex}-${index}`,
          trigger: campaign,
          start: "top bottom",
          end: "bottom top",
          scrub: .8
        }
      });
    });
  });

  gsap.utils.toArray<HTMLElement>("[data-syokbar-campaign]").forEach((campaign, index) => {
    const copy = campaign.querySelector(".syokbar-copy");
    const lineup = campaign.querySelector("[data-syokbar-lineup]");
    if (copy) {
      gsap.from(copy, {
        y: 28,
        opacity: 0,
        duration: .72,
        ease: "power3.out",
        scrollTrigger: {
          id: `dreammade-products-syokbar-copy-${index}`,
          trigger: campaign,
          start: "top 78%"
        }
      });
    }
    if (lineup) {
      gsap.fromTo(lineup, { yPercent: 2 }, {
        yPercent: -1,
        ease: "none",
        scrollTrigger: {
          id: `dreammade-products-syokbar-lineup-${index}`,
          trigger: campaign,
          start: "top bottom",
          end: "bottom top",
          scrub: .9
        }
      });
    }
  });

  gsap.from("[data-syokbar-poster]", {
    y: 22,
    opacity: 0,
    clipPath: "inset(8% 0% 0% 0%)",
    duration: .68,
    stagger: .1,
    ease: "power3.out",
    scrollTrigger: {
      id: "dreammade-products-syokbar-posters",
      trigger: ".syokbar-special-grid",
      start: "top 84%"
    }
  });

  gsap.from(".special-edition-panel", {
    opacity: 0,
    clipPath: "inset(8% 0% 0% 0%)",
    duration: .65,
    stagger: .1,
    ease: "power3.out",
    clearProps: "transform",
    scrollTrigger: {
      id: "dreammade-products-special-editions",
      trigger: ".special-editions-grid",
      start: "top 84%"
    }
  });
  gsap.from(".special-edition-copy > *", {
    y: 10,
    opacity: 0,
    duration: .48,
    stagger: .045,
    ease: "power3.out",
    scrollTrigger: {
      id: "dreammade-products-special-edition-copy",
      trigger: ".special-editions-grid",
      start: "top 84%"
    }
  });
  gsap.from(".special-edition-panel img", {
    scale: 1.04,
    yPercent: 3,
    duration: .8,
    stagger: .1,
    ease: "power3.out",
    scrollTrigger: {
      id: "dreammade-products-special-edition-images",
      trigger: ".special-editions-grid",
      start: "top 84%"
    }
  });

  gsap.utils.toArray<HTMLElement>(".system-head").forEach((head, index) => {
    const eyebrow = head.querySelector(".eyebrow");
    const title = head.querySelector(".system-title");
    const copy = head.querySelector(".body-copy");
    if (!eyebrow || !title || !copy) return;
    gsap.set(title, { clipPath: "inset(18% 0% 0% 0%)" });
    gsap.timeline({
      scrollTrigger: { id: `dreammade-products-system-head-${index}`, trigger: head, start: "top 86%" },
      defaults: { ease: "power3.out" }
    })
      .fromTo(eyebrow, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.36 })
      .fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.68, ease: "power4.out" }, "-=.08")
      .fromTo(copy, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5 }, "-=.32");
  });

  gsap.utils.toArray<HTMLElement>(".system-subgroup").forEach((group, index) => {
    const title = group.querySelector(".subgroup-title");
    const items = group.querySelectorAll(".tile, .edition-card");
    if (!title || items.length === 0) return;
    gsap.set(items, { clipPath: "inset(12% 0% 0% 0%)" });
    gsap.set(items, { opacity: 0 });
    gsap.timeline({
      scrollTrigger: { id: `dreammade-products-subgroup-${index}`, trigger: group, start: "top 86%" },
      defaults: { ease: "power3.out" }
    })
      .fromTo(title, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.34 })
      .to(items, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.62, stagger: 0.09, ease: "power4.out" }, "-=.08");
  });

  gsap.utils.toArray<HTMLElement>(".tile, .edition-card").forEach((card, index) => {
    gsap.fromTo(card, { y: 28 }, {
      y: 0,
      ease: "none",
      scrollTrigger: {
        id: `dreammade-products-card-drift-${index}`,
        trigger: card,
        start: "top bottom",
        end: "top 58%",
        scrub: .7
      }
    });
  });

  gsap.utils.toArray<SVGElement>(".tile .visual svg").forEach((svg, index) => {
    const tile = svg.closest(".tile");
    if (!tile) return;
    gsap.fromTo(svg, { y: 18 }, {
      y: -18,
      ease: "none",
      scrollTrigger: { id: `dreammade-products-visual-${index}`, trigger: tile, start: "top bottom", end: "bottom top", scrub: true }
    });
  });

  gsap.from(".footer-word", {
    y: 28,
    opacity: 0.2,
    duration: 0.72,
    ease: "power3.out",
    scrollTrigger: { id: "dreammade-products-footer-word", trigger: ".footer", start: "top 82%" }
  });
  gsap.from(".footer-bottom > *", {
    y: 14,
    opacity: 0,
    duration: 0.5,
    stagger: 0.08,
    ease: "power3.out",
    scrollTrigger: { id: "dreammade-products-footer-bottom", trigger: ".footer-bottom", start: "top 92%" }
  });

  const setActivePill = (active: Element) => {
    document.querySelectorAll(".system-pill").forEach((pill) => pill.classList.toggle("active", pill === active));
  };
  ["syokpod-v2", "syokpod-special-editions", "syokpod-pro", "syokbar", "syokbar-special-editions", "syokbar-target"].forEach((id) => {
    const pill = document.querySelector(`.system-pill[href="#${id}"]`);
    const section = document.getElementById(id);
    if (!pill || !section) return;
    ScrollTrigger.create({
      id: `dreammade-products-nav-${id}`,
      trigger: section,
      start: "top center",
      end: "bottom center",
      onEnter: () => setActivePill(pill),
      onEnterBack: () => setActivePill(pill)
    });
  });

    ScrollTrigger.refresh();
  } catch (error) {
    console.error("Dreammade products motion failed to initialize", error);
    window.__dreammadeProductsCleanup?.();
    showStaticPage();
  }
}
