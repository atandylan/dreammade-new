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

  // ─── FULL-PAGE SECTION STACKING (cinematic slide-over on desktop)
  if (!isMobile && !reduceMotion) {
    const stackPanels = [
      ".hero-section",
      ".tagline-section",
      ".about",
      ".product-stacking-section"
    ];

    stackPanels.forEach((panelSelector, i) => {
      const panel = document.querySelector<HTMLElement>(panelSelector);
      if (!panel) return;
      panel.style.zIndex = `${(i + 1) * 10}`;
      panel.style.position = "relative";

      if (i < stackPanels.length - 1) {
        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          pin: true,
          pinSpacing: false,
          id: `dreammade-section-pin-${i}`,
        });
      }
    });
  }

  // Hero scroll-out parallax with converging "menguncup" device animation
  const heroRevealTimeline = gsap.timeline({
    scrollTrigger: {
      id: "dreammade-home-hero-reveal",
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: 1
    }
  });

  heroRevealTimeline.to(".hero-left-column", { opacity: 0, y: -50, ease: "none" }, 0);

  if (!reduceMotion) {
    heroRevealTimeline
      .to(".hero-device.device-1", { x: 140, rotate: 5, scale: 0.82, opacity: 0, ease: "power1.inOut" }, 0)
      .to(".hero-device.device-2", { x: 50, rotate: 1, scale: 0.82, opacity: 0, ease: "power1.inOut" }, 0)
      .to(".hero-device.device-3", { x: -50, rotate: -1, scale: 0.82, opacity: 0, ease: "power1.inOut" }, 0)
      .to(".hero-device.device-4", { x: -140, rotate: -5, scale: 0.82, opacity: 0, ease: "power1.inOut" }, 0);
  } else {
    heroRevealTimeline.to(".hero-right-column", { opacity: 0, y: -150, ease: "none" }, 0);
  }

  // Hero Floating Devices
  if (!reduceMotion) {
    gsap.to(".hero-device", {
      y: -15,
      yoyo: true,
      repeat: -1,
      duration: 2.5,
      ease: "sine.inOut",
      stagger: 0.15
    });
  }

  // Kinetic Tagline Scrub
  gsap.set(".kinetic-tagline", {
    scale: 0.7,
    filter: "blur(15px)",
    opacity: 0
  });

  gsap.to(".kinetic-tagline", {
    scale: 1,
    filter: "blur(0px)",
    opacity: 1,
    scrollTrigger: {
      id: "dreammade-home-tagline-reveal",
      trigger: ".tagline-section",
      start: "top bottom",
      end: "bottom center",
      scrub: 1
    }
  });

  gsap.timeline({
    scrollTrigger: {
      id: "dreammade-home-about-reveal",
      trigger: ".about",
      start: "top 80%",
    }
  })
    .to(".about-title .reveal-line span", { yPercent: 0, stagger: .08, ease: "power4.out" }, 0)
    .to(".about-copy .body-lg, .about-copy .syok-geng-note", { opacity: 1, y: 0, stagger: .06, ease: "power3.out" }, .1);

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

  // Sticky Scroll Showcase Animations
  const indicators = gsap.utils.toArray<HTMLElement>(".product-indicator");
  const productGroups = gsap.utils.toArray<HTMLElement>(".showcase-product-group");

  productGroups.forEach((group, idx) => {
    ScrollTrigger.create({
      id: `dreammade-home-product-highlight-${idx}`,
      trigger: group,
      start: "top 40%",
      end: "bottom 40%",
      onEnter: () => {
        indicators.forEach((ind) => ind.classList.remove("active"));
        indicators[idx]?.classList.add("active");
      },
      onEnterBack: () => {
        indicators.forEach((ind) => ind.classList.remove("active"));
        indicators[idx]?.classList.add("active");
      }
    });
  });

  // Smooth click scroll for indicators
  indicators.forEach((indicator) => {
    indicator.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = indicator.getAttribute("href");
      if (targetId) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // Parallax effect for product cards
  if (!reduceMotion && !isMobile) {
    gsap.utils.toArray<HTMLElement>("[data-parallax-item]").forEach((item) => {
      let yVal = -40;
      if (item.classList.contains("parallax-speed-1")) yVal = -20;
      if (item.classList.contains("parallax-speed-2")) yVal = -50;
      if (item.classList.contains("parallax-speed-3")) yVal = -80;

      gsap.fromTo(item,
        { y: 0 },
        {
          y: yVal,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    });
  }



  function startFeedMarquee() {
    const feedTrack = document.getElementById("feedTrack");
    if (!feedTrack) return;
    const cards = feedTrack.querySelectorAll(".reel-card");
    gsap.set(feedTrack, { x: 0, xPercent: 0 });
    const duration = (cards.length / 2) * 5;
    const marqueeTween = gsap.to(feedTrack, {
      xPercent: -50,
      ease: "none",
      duration: duration > 0 ? duration : 25,
      repeat: -1
    });

    // Stagger reveal — only runs when cards are present in DOM
    if (cards.length) {
      gsap.fromTo(".reel-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            id: "dreammade-home-reels-reveal",
            trigger: "#feedTrack",
            start: "top 85%"
          }
        }
      );
    }

    const pauseMarquee = () => { marqueeTween.pause(); };
    const resumeMarquee = () => { marqueeTween.play(); };

    feedTrack.addEventListener("mouseenter", pauseMarquee);
    feedTrack.addEventListener("mouseleave", resumeMarquee);
    feedTrack.addEventListener("touchstart", pauseMarquee, { passive: true });
    feedTrack.addEventListener("touchend", resumeMarquee, { passive: true });

    cleanup.push(() => {
      marqueeTween.kill();
      feedTrack.removeEventListener("mouseenter", pauseMarquee);
      feedTrack.removeEventListener("mouseleave", resumeMarquee);
      feedTrack.removeEventListener("touchstart", pauseMarquee);
      feedTrack.removeEventListener("touchend", resumeMarquee);
    });
  }

  // expose for ReelsPreview to call after DOM inject
  (window as any).__startFeedMarquee = startFeedMarquee;

  // also call it on init in case cards already exist
  startFeedMarquee();

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

  // Intersection Observer for scroll reveal animations
  const revealObserver = new IntersectionObserver((entries, observer) => {
    const intersecting = entries.filter(entry => entry.isIntersecting);
    intersecting.forEach((entry, index) => {
      const target = entry.target as HTMLElement;
      setTimeout(() => {
        target.classList.add("is-visible");
      }, index * 80);
      observer.unobserve(target);
    });
  }, {
    threshold: 0.15
  });

  document.querySelectorAll("[data-reveal], [data-reveal-clip]").forEach(el => {
    revealObserver.observe(el);
  });

  cleanup.push(() => {
    revealObserver.disconnect();
  });

  ScrollTrigger.refresh();

  // ─── STACKING PRODUCT CARDS (nexgen-style)
  const stackCards = gsap.utils.toArray<HTMLElement>(".product-stack-card");

  // 3D Card Stacking Reveal: Scale down and fade out each card as the next one enters
  stackCards.forEach((card, idx) => {
    if (idx === stackCards.length - 1) return;
    gsap.to(card, {
      scale: 0.93,
      filter: "brightness(0.3) blur(4px)",
      opacity: 0,
      scrollTrigger: {
        id: `dreammade-home-pstack-blur-${idx}`,
        trigger: stackCards[idx + 1],
        start: "top 60%",
        end: "top 25%",
        scrub: 0.8,
      },
    });
  });

  // Scale + fade in each card from below (except first)
  stackCards.forEach((card, idx) => {
    if (idx === 0) return;
    gsap.fromTo(
      card,
      { scale: 0.82, opacity: 0, y: 120 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        scrollTrigger: {
          id: `dreammade-home-pstack-enter-${idx}`,
          trigger: card,
          start: "top bottom",
          end: "top 20%",
          scrub: 0.8,
        },
      }
    );
  });

  // Device Stagger Entry: Slide in devices from the right and start infinite floating on complete
  stackCards.forEach((card, idx) => {
    const imgs = card.querySelectorAll<HTMLElement>(".pstack-img");
    if (!imgs.length) return;

    gsap.fromTo(
      imgs,
      {
        x: 100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.1,
        ease: "back.out(1.2)",
        immediateRender: false,
        scrollTrigger: {
          id: `dreammade-home-pstack-imgs-${idx}`,
          trigger: card,
          start: "top 45%",
          once: true,
        },
        onComplete: () => {
          if (!reduceMotion) {
            imgs.forEach((img) => {
              gsap.to(img, {
                y: -8,
                yoyo: true,
                repeat: -1,
                duration: 2,
                ease: "sine.inOut",
                delay: Math.random() * 1.5, // Randomized delay to mimic zero-gravity breathing
              });
            });
          }
        },
      }
    );
  });


  // Card Text Info Stagger: Fade and slide up content children
  stackCards.forEach((card, idx) => {
    const infoElements = card.querySelectorAll<HTMLElement>(".pstack-info > *");
    if (!infoElements.length) return;

    gsap.fromTo(
      infoElements,
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: {
          id: `dreammade-home-pstack-info-${idx}`,
          trigger: card,
          start: "top 55%",
          once: true,
        },
      }
    );
  });


  // ─── ABOUT SECTION: scrub parallax on the section title
  gsap.fromTo(".about .section-title, .about .eyebrow",
    { opacity: 0, y: 28 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.07,
      ease: "power3.out",
      scrollTrigger: {
        id: "dreammade-home-about-eyebrow",
        trigger: ".about",
        start: "top 82%",
      }
    }
  );

  // ─── PRODUCT SHOWCASE section header reveal
  gsap.fromTo(".product-stacking-section .eyebrow, .product-stacking-header h2",
    { opacity: 0, y: 22 },
    {
      opacity: 1,
      y: 0,
      duration: 0.65,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        id: "dreammade-home-showcase-header",
        trigger: ".product-stacking-section",
        start: "top 80%",
      }
    }
  );

  // ─── FEED SECTION header clip reveal
  gsap.fromTo(".feed-section .section-title .reveal-line span",
    { yPercent: 110 },
    {
      yPercent: 0,
      duration: 0.85,
      stagger: 0.09,
      ease: "power4.out",
      immediateRender: false,
      scrollTrigger: {
        id: "dreammade-home-feed-title",
        trigger: ".feed-section",
        start: "top 82%",
      }
    }
  );

  // ─── FAQ SECTION header
  gsap.fromTo(".faq .section-title .reveal-line span, .faq .eyebrow",
    { yPercent: 110, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.08,
      ease: "power4.out",
      immediateRender: false,
      scrollTrigger: {
        id: "dreammade-home-faq-header",
        trigger: ".faq",
        start: "top 82%",
      }
    }
  );
}
