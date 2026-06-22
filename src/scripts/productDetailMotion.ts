import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  interface Window {
    __dreammadeProductDetailCleanup?: () => void;
  }
}

export function initProductDetailMotion() {
  if (typeof window === "undefined") return;
  window.__dreammadeProductDetailCleanup?.();

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isDesktop = window.matchMedia("(min-width: 1000px)").matches;
  const richExperience = Boolean(document.querySelector('[data-rich-experience="true"]'));
  const cleanup: Array<() => void> = [];
  window.__dreammadeProductDetailCleanup = () => {
    cleanup.forEach((fn) => fn());
    ScrollTrigger.getAll()
      .filter((trigger) => trigger.vars.id?.startsWith("dreammade-product-detail"))
      .forEach((trigger) => trigger.kill());
  };

  if (!reduceMotion) {
    gsap.registerPlugin(ScrollTrigger);

    if (!richExperience) gsap.from(".detail-copy > *", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    });

    if (!richExperience) gsap.from(".detail-visual", {
      opacity: 0,
      scale: 0.95,
      duration: 1,
      ease: "power3.out",
      delay: 0.2
    });

    gsap.utils.toArray<HTMLElement>(".variant-section, .specs-section, .flavour-section, .system-details, .compatibility-section, .related-section, .cta-section").forEach((section, i) => {
      gsap.from(section, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          id: `dreammade-product-detail-section-${i}`,
          trigger: section,
          start: "top 85%",
        }
      });
    });

    gsap.utils.toArray<HTMLElement>(".spec-card").forEach((card, index) => {
      gsap.from(card, {
        y: 34,
        opacity: 0,
        clipPath: "inset(14% 0% 0% 0%)",
        duration: .62,
        ease: "power3.out",
        scrollTrigger: {
          id: `dreammade-product-detail-spec-${index}`,
          trigger: card,
          start: "top 88%"
        }
      });
    });

    const flavourCards = gsap.utils.toArray<HTMLElement>(".flavour-card");
    if (flavourCards.length) {
      gsap.from(flavourCards, {
        y: 26,
        opacity: 0,
        clipPath: "inset(12% 0% 0% 0%)",
        duration: .5,
        stagger: .045,
        ease: "power3.out",
        scrollTrigger: {
          id: "dreammade-product-detail-flavours",
          trigger: ".flavour-grid",
          start: "top 86%"
        }
      });
    }

    const stickyEnd = document.querySelector<HTMLElement>(".compatibility-section")
      ?? document.querySelector<HTMLElement>(".system-details")
      ?? document.querySelector<HTMLElement>(".specs-section")
      ?? document.querySelector<HTMLElement>(".variant-section");
    const coreDevice = document.querySelector<HTMLElement>('.product-detail[data-core-device="true"]');
    if (!richExperience && isDesktop && stickyEnd && coreDevice) {
      ScrollTrigger.create({
        id: "dreammade-product-detail-sticky-visual",
        trigger: ".detail-visual",
        start: "top 124px",
        endTrigger: stickyEnd,
        end: "bottom 72%",
        pin: true,
        pinSpacing: false,
        pinReparent: true,
        invalidateOnRefresh: true
      });

      gsap.to(".visual-panel img, .visual-panel .svg-fallback", {
        yPercent: -5,
        scale: 1.045,
        ease: "none",
        scrollTrigger: {
          id: "dreammade-product-detail-visual-parallax",
          trigger: ".hero-detail",
          start: "top top",
          endTrigger: stickyEnd,
          end: "bottom 72%",
          scrub: 1
        }
      });
    }

    if (richExperience) {
      gsap.from(".product-editorial-copy > *", {
        y: 30,
        opacity: 0,
        duration: .8,
        stagger: .08,
        ease: "power3.out"
      });
      gsap.from(".product-editorial-visual", {
        x: -34,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
      });
      gsap.from(".editorial-device-layer img, .syokbar-hero-device img", {
        y: 12,
        scale: 1.02,
        opacity: 0,
        duration: .72,
        stagger: .045,
        ease: "power3.out"
      });
      gsap.utils.toArray<HTMLElement>(".feature-closeup-panel, .feature-copy-panel, .feature-lineup-panel, .feature-spec-cell, .product-narrative-heading, .product-narrative-copy, .product-collection-grid a").forEach((card, index) => {
        gsap.from(card, {
          y: 20,
          opacity: 0,
          clipPath: "inset(8% 0% 0% 0%)",
          duration: .58,
          ease: "power3.out",
          scrollTrigger: {
            id: `dreammade-product-detail-board-${index}`,
            trigger: card,
            start: "top 88%"
          }
        });
      });
      const animatePosterGallery = (gallery: HTMLElement) => {
        if (gallery.hidden || gallery.dataset.posterGalleryAnimated === "true") return;
        const heading = gallery.querySelector<HTMLElement>("[data-poster-gallery-heading]");
        const items = gsap.utils.toArray<HTMLElement>(gallery.querySelectorAll("[data-poster-gallery-item]"));
        if (heading) {
          gsap.from(heading, {
            y: 18,
            opacity: 0,
            duration: .5,
            ease: "power3.out"
          });
        }
        if (items.length) {
          gsap.from(items, {
            y: 18,
            scale: 1.02,
            opacity: 0,
            clipPath: "inset(8% 0% 0% 0%)",
            duration: .62,
            stagger: .035,
            ease: "power3.out"
          });
        }
        gallery.dataset.posterGalleryAnimated = "true";
      };
      gsap.utils.toArray<HTMLElement>("[data-poster-gallery]").forEach((gallery, index) => {
        if (gallery.hidden) return;
        ScrollTrigger.create({
          id: `dreammade-product-detail-poster-gallery-${index}`,
          trigger: gallery,
          start: "top 84%",
          once: true,
          onEnter: () => animatePosterGallery(gallery)
        });
      });
      const onPosterGalleryVisible = () => {
        requestAnimationFrame(() => {
          gsap.utils.toArray<HTMLElement>("[data-poster-gallery]").forEach((gallery) => {
            if (gallery.hidden) return;
            const bounds = gallery.getBoundingClientRect();
            if (bounds.top < window.innerHeight && bounds.bottom > 0) animatePosterGallery(gallery);
          });
          ScrollTrigger.refresh();
        });
      };
      window.addEventListener("dreammade:poster-gallery-visible", onPosterGalleryVisible);
      cleanup.push(() => window.removeEventListener("dreammade:poster-gallery-visible", onPosterGalleryVisible));
      gsap.from(".flavour-index-item", {
        y: 18,
        opacity: 0,
        duration: .4,
        stagger: .025,
        ease: "power2.out",
        scrollTrigger: {
          id: "dreammade-product-detail-flavour-index",
          trigger: ".flavour-index-grid",
          start: "top 88%"
        }
      });
    }
  }

  const swatches = document.querySelectorAll<HTMLButtonElement>(".swatch-btn:not(.link-swatch)");
  const productImage = document.getElementById("activeProductImage") as HTMLImageElement | null;
  const svgFallback = document.getElementById("svgFallback") as HTMLElement | null;
  const activeLabel = document.getElementById("activeVariantLabel") as HTMLElement | null;
  const activeType = document.getElementById("activeVariantType") as HTMLElement | null;
  const activeVariantName = document.getElementById("activeVariantName") as HTMLElement | null;
  const activeVariantTypeLabel = document.getElementById("activeVariantTypeLabel") as HTMLElement | null;
  const activeVariantNote = document.getElementById("activeVariantNote") as HTMLElement | null;

  const setProductImage = (src: string) => {
    if (!productImage || !svgFallback) return;
    if (src.startsWith("data:image/svg+xml")) {
      productImage.src = src;
      productImage.style.display = "block";
      svgFallback.style.display = "none";
      return;
    }

    productImage.style.display = 'none';
    svgFallback.style.display = 'block';
    
    const img = new Image();
    img.onload = () => {
      productImage.src = src;
      productImage.style.display = 'block';
      svgFallback.style.display = 'none';
    };
    img.onerror = () => {
      productImage.style.display = 'none';
      svgFallback.style.display = 'block';
    };
    img.src = src;
  };

  if (productImage) {
    productImage.onerror = () => {
      productImage.style.display = 'none';
      if (svgFallback) svgFallback.style.display = 'block';
    };
  }

  swatches.forEach(swatch => {
    const onClick = () => {
      swatches.forEach(s => s.classList.remove("active"));
      swatch.classList.add("active");

      const newName = swatch.getAttribute("data-variant-name");
      if (newName) {
        if (activeLabel) activeLabel.textContent = newName;
        if (activeVariantName) activeVariantName.textContent = newName;
      }

      const newType = swatch.getAttribute("data-variant-type");
      if (newType) {
        if (activeType) activeType.textContent = newType;
        if (activeVariantTypeLabel) activeVariantTypeLabel.textContent = newType;
      }

      const newNote = swatch.getAttribute("data-variant-note");
      if (newNote && activeVariantNote) activeVariantNote.textContent = newNote;

      const newImage = swatch.getAttribute("data-variant-image");
      if (newImage) {
        setProductImage(newImage);
      }

      const variantId = swatch.getAttribute("data-variant-id");
      if (variantId) {
        const productDetail = document.querySelector('.product-detail');
        if (productDetail && productDetail.hasAttribute('data-core-device')) {
          const url = new URL(window.location.href);
          url.searchParams.set("variant", variantId);
          window.history.replaceState(null, "", url.toString());
        }
      }
    };
    swatch.addEventListener("click", onClick);
    cleanup.push(() => swatch.removeEventListener("click", onClick));
  });

  const params = new URLSearchParams(window.location.search);
  const variantId = params.get("variant");
  if (variantId) {
    const targetSwatch = Array.from(swatches).find(s => s.getAttribute("data-variant-id") === variantId);
    if (targetSwatch) {
      targetSwatch.click();
    }
  }

  ScrollTrigger.refresh();
}
