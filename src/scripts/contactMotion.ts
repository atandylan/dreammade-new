import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  interface Window {
    __dreammadeContactCleanup?: () => void;
  }
}

const contactTriggerId = (suffix: string) => `dreammade-contact-${suffix}`;

export function initContactMotion() {
  if (typeof window === "undefined") return;

  window.__dreammadeContactCleanup?.();

  const cleanup: Array<() => void> = [];
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const form = document.querySelector<HTMLFormElement>("#contactForm");
  if (form) {
    const onSubmit = (event: SubmitEvent) => {
      event.preventDefault();
      const formData = new FormData(form);
      const name = formData.get("name") || "";
      const email = formData.get("email") || "";
      const countryCode = formData.get("countryCode") || "";
      const whatsapp = formData.get("whatsapp") || "";
      const message = formData.get("message") || "";
      const contactEmail = form.dataset.contactEmail || "";

      const subject = encodeURIComponent("Dreammade Website Inquiry");
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nWhatsapp: ${countryCode} ${whatsapp}\n\nMessage:\n${message}`);

      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    };
    form.addEventListener("submit", onSubmit);
    cleanup.push(() => form.removeEventListener("submit", onSubmit));
  }

  window.__dreammadeContactCleanup = () => {
    cleanup.splice(0).forEach((fn) => fn());
    ScrollTrigger.getAll()
      .filter((trigger) => trigger.vars.id?.startsWith("dreammade-contact-"))
      .forEach((trigger) => trigger.kill());
    window.__dreammadeContactCleanup = undefined;
  };

  const showStaticPage = () => {
    document.querySelectorAll<HTMLElement>("[data-contact-reveal], [data-contact-heading], [data-contact-info], [data-contact-form-title], .form-group, .form-actions, .contact-links-inner, .contact-links-inner a").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.clipPath = "none";
      el.style.scale = "";
    });
  };

  if (prefersReducedMotion) {
    showStaticPage();
    return;
  }

  try {
    gsap.registerPlugin(ScrollTrigger);

    gsap.timeline({ defaults: { ease: "power3.out" } })
      .fromTo("[data-contact-reveal]", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .5, stagger: .08 })
      .fromTo("[data-contact-heading]", { y: 42, opacity: 0, clipPath: "inset(10% 0% 0% 0%)" }, { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: .78, ease: "power4.out" }, "-=.18")
      .fromTo("[data-contact-info]", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .46, stagger: .08 }, "-=.18")
      .fromTo("[data-contact-form-title]", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .48 }, "-=.42")
      .fromTo(".form-group", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: .42, stagger: .06 }, "-=.18")
      .fromTo(".form-actions", { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: .42 }, "-=.12");

    gsap.timeline({
      scrollTrigger: {
        id: contactTriggerId("links"),
        trigger: ".contact-links",
        start: "top 86%",
      },
    })
      .fromTo(".contact-links-inner", { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: .7, ease: "power3.out" })
      .fromTo(".contact-links-inner a", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .44, stagger: .08, ease: "power3.out" }, "-=.34");

    window.setTimeout(() => ScrollTrigger.refresh(), 300);
  } catch (error) {
    console.error("Dreammade contact motion failed to initialize", error);
    ScrollTrigger.getAll()
      .filter((trigger) => trigger.vars.id?.startsWith("dreammade-contact-"))
      .forEach((trigger) => trigger.kill());
    showStaticPage();
  }
}
