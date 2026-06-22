import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const reduceMotionQuery = "(prefers-reduced-motion: reduce)";

const getReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia(reduceMotionQuery).matches;

const refreshScrollTriggers = () => {
  if (typeof window === "undefined") return;
  ScrollTrigger.refresh();
};

export function initProgressiveMediaRails(root: ParentNode = document): () => void {
  const cleanup: Array<() => void> = [];
  const galleries = Array.from(root.querySelectorAll<HTMLElement>("[data-progressive-gallery]"));

  galleries.forEach((gallery) => {
    const button = gallery.querySelector<HTMLButtonElement>("[data-progressive-toggle]");
    const rail = gallery.querySelector<HTMLElement>("[data-progressive-rail]");
    const items = Array.from(gallery.querySelectorAll<HTMLElement>("[data-progressive-item]"));
    const initialCount = Number(gallery.dataset.galleryInitial ?? "6");

    if (!button || !rail) return;

    const toggleGallery = () => {
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      const hiddenItems = items.slice(initialCount);

      if (isExpanded) {
        hiddenItems.forEach((item) => {
          item.hidden = true;
          item.style.opacity = "";
          item.style.transform = "";
        });
        button.setAttribute("aria-expanded", "false");
        button.textContent = "See More";
        rail.scrollTo({ left: 0, behavior: getReducedMotion() ? "auto" : "smooth" });
        refreshScrollTriggers();
        return;
      }

      hiddenItems.forEach((item) => {
        item.hidden = false;
      });
      button.setAttribute("aria-expanded", "true");
      button.textContent = "Show Less";

      if (!getReducedMotion()) {
        gsap.fromTo(
          hiddenItems,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: .36, stagger: .035, ease: "power3.out" }
        );
      } else {
        hiddenItems.forEach((item) => {
          item.style.opacity = "1";
          item.style.transform = "none";
        });
      }

      refreshScrollTriggers();
    };

    button.addEventListener("click", toggleGallery);
    cleanup.push(() => button.removeEventListener("click", toggleGallery));
  });

  return () => {
    cleanup.splice(0).forEach((fn) => fn());
  };
}
