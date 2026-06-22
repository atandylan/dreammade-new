import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

declare global {
  interface Window {
    __dreammadeHomeCleanup?: () => void;
  }
}

const ageKey = "dreammade:age-confirmed";

export function initHomeMotion() {
  if (typeof window === "undefined") return;
  window.__dreammadeHomeCleanup?.();

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.matchMedia("(max-width: 760px)").matches;
  const cleanup: Array<() => void> = [];
  window.__dreammadeHomeCleanup = () => {
    cleanup.splice(0).forEach((fn) => fn());
    ScrollTrigger.getAll()
      .filter((trigger) => trigger.vars.id?.startsWith("dreammade-home"))
      .forEach((trigger) => trigger.kill());
  };

  const ageGate = document.querySelector<HTMLElement>("#ageGate");
  const ageCard = document.querySelector<HTMLElement>(".age-card");
  const enterSite = document.querySelector<HTMLButtonElement>("#enterSite");
  const leaveSite = document.querySelector<HTMLButtonElement>("#leaveSite");
  const introLayer = document.querySelector<HTMLElement>("#introLayer");
  const confirmed = window.sessionStorage.getItem(ageKey) === "true";
  let heroIntroTimeline: gsap.core.Timeline | undefined;

  gsap.registerPlugin(ScrollTrigger);

  if (!reduceMotion) {
    const lenis = new Lenis({ lerp: 0.065, smoothWheel: true });
    const tick = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    cleanup.push(() => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    });
  }

  const setFaqHeights = () => {
    document.querySelectorAll<HTMLElement>(".faq-item").forEach((item) => {
      const answer = item.querySelector<HTMLElement>(".faq-answer");
      if (answer) answer.style.height = item.classList.contains("active") ? `${answer.scrollHeight}px` : "0px";
    });
  };

  document.querySelectorAll<HTMLElement>(".faq-item").forEach((item) => {
    const question = item.querySelector<HTMLButtonElement>(".faq-question");
    if (!question) return;
    const onClick = () => {
      const opening = !item.classList.contains("active");
      document.querySelectorAll<HTMLElement>(".faq-item").forEach((entry) => {
        entry.classList.remove("active");
        entry.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
      });
      if (opening) {
        item.classList.add("active");
        question.setAttribute("aria-expanded", "true");
      }
      setFaqHeights();
      ScrollTrigger.refresh();
    };
    question.addEventListener("click", onClick);
    cleanup.push(() => question.removeEventListener("click", onClick));
  });
  window.addEventListener("resize", setFaqHeights);
  cleanup.push(() => window.removeEventListener("resize", setFaqHeights));
  setFaqHeights();

  const finishIntro = () => {
    document.body.classList.remove("locked");
    if (ageGate) ageGate.style.display = "none";
    if (introLayer) introLayer.style.display = "none";
    heroIntroTimeline?.play(0);
    ScrollTrigger.refresh();
  };

  if (reduceMotion) {
    finishIntro();
    document.querySelectorAll<HTMLElement>(".reveal-line span").forEach((line) => {
      line.style.transform = "none";
    });
    return;
  }

  gsap.set(".title-line span", { yPercent: 110 });
  gsap.set(".hero-line, .hero-index", { opacity: 0 });
  gsap.set(".about-title .reveal-line span", { yPercent: 110 });
  gsap.set(".about-copy .body-lg, .about-copy .syok-geng-note", { opacity: 0, y: 36 });
  gsap.set(".about-logo-panel", { opacity: 0, y: isMobile ? 70 : 150, rotate: isMobile ? 0 : 2 });

  heroIntroTimeline = gsap.timeline({ paused: true })
    .to(".title-line span", { yPercent: 0, duration: .9, stagger: .12, ease: "power4.out" })
    .to(".hero-line, .hero-index", { opacity: 1, duration: .62, stagger: .07, ease: "power3.out" }, "-=.5");

  const prepareOpeningSequence = () => {
    if (!introLayer) return;
    gsap.set(introLayer, { display: "grid", opacity: 1 });
    gsap.set(".intro-mark", { y: 18, scale: 1, opacity: 0, filter: "blur(0px)" });
    gsap.set(".intro-glow", { scale: .2, opacity: 0 });
    gsap.set(".intro-dot", { scale: 0, opacity: 0 });
    gsap.set(".intro-wipe", { yPercent: 112, rotate: -7 });
  };

  const runOpeningSequence = () => {
    if (!introLayer) return finishIntro();
    gsap.timeline({ onComplete: finishIntro })
      .to(".intro-mark", { y: 0, opacity: 1, duration: .32, ease: "power3.out" })
      .to(".intro-dot", { scale: 1, opacity: 1, duration: .14, ease: "back.out(2)" }, "-=.06")
      .to(".intro-glow", { scale: 4.8, opacity: .88, duration: .58, ease: "power3.in" }, "-=.02")
      .to(".intro-mark", { scale: isMobile ? 30 : 38, filter: "blur(3px)", duration: .72, ease: "power4.in" }, "-=.48")
      .to(".intro-wipe", { yPercent: 0, rotate: -7, duration: .48, ease: "power4.inOut" }, "-=.12")
      .to(introLayer, { opacity: 0, duration: .18, ease: "power2.out" }, "-=.08");
  };

  const unlockSite = () => {
    window.sessionStorage.setItem(ageKey, "true");
    if (!ageGate || !ageCard) return runOpeningSequence();
    prepareOpeningSequence();
    gsap.timeline({ defaults: { ease: "power3.inOut" } })
      .to(ageCard, { scale: .94, y: -14, opacity: 0, duration: .38 })
      .to(ageGate, { opacity: 0, duration: .34, onComplete: () => { ageGate.style.display = "none"; } }, "-=.18")
      .add(runOpeningSequence, "-=.04");
  };

  if (confirmed) finishIntro();
  else {
    document.body.classList.add("locked");
    prepareOpeningSequence();
  }

  enterSite?.addEventListener("click", unlockSite);
  cleanup.push(() => enterSite?.removeEventListener("click", unlockSite));
  const leaveHandler = () => {
    const copy = ageCard?.querySelector("p");
    if (copy) copy.textContent = "Please return when you are of legal age in your location.";
  };
  leaveSite?.addEventListener("click", leaveHandler);
  cleanup.push(() => leaveSite?.removeEventListener("click", leaveHandler));

  gsap.timeline({
    scrollTrigger: {
      id: "dreammade-home-hero-reveal",
      trigger: ".hero",
      start: "top top",
      end: isMobile ? "+=52%" : "+=78%",
      scrub: 1
    }
  })
    .to(".title-line-one", { yPercent: -15, opacity: 0.5, ease: "none" }, 0)
    .to(".title-line-two", { yPercent: -10, opacity: 0.5, ease: "none" }, 0)
    .to(".hero-ghost", { yPercent: -18, opacity: 0.5, ease: "none" }, 0)
    .to(".hero-copy, .hero-index", { opacity: 0, y: -20, ease: "none" }, .2);

  gsap.timeline({
    scrollTrigger: {
      id: "dreammade-home-about-reveal",
      trigger: ".about",
      start: "top 80%",
    }
  })
    .to(".about-title .reveal-line span", { yPercent: 0, stagger: .08, ease: "power4.out" }, 0)
    .to(".about-copy .body-lg, .about-copy .syok-geng-note", { opacity: 1, y: 0, stagger: .06, ease: "power3.out" }, .1)
    .to(".about-logo-panel", { opacity: 1, y: 0, rotate: 0, ease: "power4.out", duration: 1 }, 0);

  document.querySelectorAll<HTMLElement>(".section-title").forEach((title, index) => {
    if (title.classList.contains("about-title")) return;
    const lines = title.querySelectorAll<HTMLElement>(".reveal-line span");
    if (!lines.length) return;
    gsap.fromTo(lines, { yPercent: 110 }, {
      yPercent: 0,
      duration: .9,
      stagger: .1,
      ease: "power4.out",
      immediateRender: false,
      scrollTrigger: { id: `dreammade-home-title-${index}`, trigger: title, start: "top 84%" }
    });
  });

  gsap.fromTo(".about-logo-panel img", { scale: 0.95, yPercent: 5 }, {
    scale: 1,
    yPercent: -5,
    ease: "none",
    scrollTrigger: { id: "dreammade-home-about-image", trigger: ".about", start: "top bottom", end: "bottom top", scrub: 1 }
  });
  gsap.fromTo(".about-track-primary", { xPercent: -10 }, {
    xPercent: -36,
    ease: "none",
    scrollTrigger: { id: "dreammade-home-about-track-primary", trigger: ".about", start: "top bottom", end: "bottom top", scrub: 1 }
  });
  gsap.fromTo(".about-track-secondary", { xPercent: -42 }, {
    xPercent: -14,
    ease: "none",
    scrollTrigger: { id: "dreammade-home-about-track-secondary", trigger: ".about", start: "top bottom", end: "bottom top", scrub: 1 }
  });

  const products = [
    {
      name: "SyokPod V2",
      desc: "A closed-system device built for smooth sessions, standout colourways, and the SyokGeng way of life.",
      compat: "Closed system / KOHS K1000",
      bg: "radial-gradient(circle at 76% 28%, rgba(247,243,238,.14), transparent 30%), linear-gradient(145deg, #91050b, #5f0307)"
    },
    {
      name: "SyokPod Pro",
      desc: "More grip, more control and a stronger silhouette.",
      compat: "Closed system / KOHS K1000",
      bg: "radial-gradient(circle at 72% 24%, rgba(247,243,238,.16), transparent 30%), linear-gradient(145deg, #7b0409, #5f0307)"
    },
    {
      name: "SyokBar",
      desc: "Designed around the ease of a disposable format while delivering bold flavours.",
      compat: "Disposable system / KOHS K3000",
      bg: "radial-gradient(circle at 74% 30%, rgba(247,243,238,.13), transparent 28%), linear-gradient(145deg, #91050b, #6f0308)"
    },
    {
      name: "SyokBar Target",
      desc: "Open-system flexibility with bold flavour control.",
      compat: "Open system / KOHS E-Liquid",
      bg: "radial-gradient(circle at 74% 30%, rgba(247,243,238,.15), transparent 28%), linear-gradient(145deg, #850409, #5f0307)"
    }
  ];
  const productName = document.querySelector<HTMLElement>("#productName");
  const productDesc = document.querySelector<HTMLElement>("#productDesc");
  const productCompat = document.querySelector<HTMLElement>("#productCompat");
  const productProgress = document.querySelector<HTMLElement>("#productProgress");
  const productBg = document.querySelector<HTMLElement>(".product-bg");
  const productFamilies = gsap.utils.toArray<HTMLElement>(".product-family");
  let activeProduct = -1;
  let productTransition: gsap.core.Timeline | undefined;

  const renderProduct = (index: number) => {
    if (index === activeProduct || !productName || !productDesc || !productCompat || !productProgress || !productBg) return;
    activeProduct = index;
    const selected = products[index];
    gsap.to(productBg, { background: selected.bg, duration: .55, ease: "power2.out" });
    gsap.to([productName, productDesc, productCompat, productProgress], {
      y: -14,
      opacity: 0,
      duration: .16,
      onComplete: () => {
        productName.textContent = selected.name;
        productDesc.textContent = selected.desc;
        productCompat.textContent = selected.compat;
        productProgress.textContent = `0${index + 1} / 04`;
        gsap.fromTo([productName, productDesc, productCompat, productProgress], { y: 24, opacity: 0 }, {
          y: 0, opacity: 1, duration: .42, stagger: .04, ease: "power3.out"
        });
      }
    });
    const previousFamily = productFamilies.find((family) => family.classList.contains("active"));
    productTransition?.kill();
    productTransition = gsap.timeline()
      .to(previousFamily?.querySelectorAll("img") ?? [], { 
        opacity: 0, 
        duration: .2, 
        stagger: 0.02,
        ease: "power2.in"
      }, 0)
      .add(() => {
        productFamilies.forEach((family, familyIndex) => family.classList.toggle("active", familyIndex === index));
      })
      .fromTo(productFamilies[index]?.querySelectorAll("img") ?? [], {
        opacity: 0
      }, {
        opacity: 1,
        duration: .45,
        stagger: 0.05,
        ease: "power2.out"
      });
  };

  renderProduct(0);
  ScrollTrigger.create({
    id: "dreammade-home-product-showcase",
    trigger: ".product-showcase",
    start: "top top",
    end: isMobile ? "+=220%" : "+=300%",
    scrub: 1,
    pin: ".product-stage",
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      renderProduct(Math.min(3, Math.floor(self.progress * 4)));
      gsap.set(".product-bg", { backgroundPosition: `${self.progress * 18}% center` });
    }
  });

  // Product Showcase Entrance Reveal
  gsap.fromTo(".product-copy > *", {
    opacity: 0,
    y: 35
  }, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.08,
    ease: "power3.out",
    scrollTrigger: {
      id: "dreammade-home-product-copy-reveal",
      trigger: ".product-showcase",
      start: "top 80%"
    }
  });

  const feedTrack = document.querySelector<HTMLElement>(".feed-track");
  if (feedTrack && !isMobile) {
    feedTrack.style.flexWrap = "wrap";
    feedTrack.style.justifyContent = "center";
  }

  // Reels Cards Stagger Reveal (Desktop & Mobile)
  gsap.fromTo(".reel-card", {
    opacity: 0,
    y: 50,
    scale: 0.95
  }, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    stagger: 0.06,
    ease: "power3.out",
    scrollTrigger: {
      id: "dreammade-home-reels-reveal",
      trigger: ".feed-section",
      start: "top 85%"
    }
  });

  // FAQ Accordion Stagger Reveal
  gsap.fromTo(".faq-item", {
    opacity: 0,
    y: 35
  }, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    stagger: 0.08,
    ease: "power2.out",
    scrollTrigger: {
      id: "dreammade-home-faq-items-reveal",
      trigger: ".faq-list",
      start: "top 85%"
    }
  });


  gsap.from(".footer-content", {
    yPercent: -20,
    ease: "none",
    scrollTrigger: { id: "dreammade-home-footer", trigger: ".footer-reveal", start: "top bottom", end: "top top", scrub: true }
  });

  ScrollTrigger.refresh();
}
