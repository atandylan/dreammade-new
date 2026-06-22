import gsap from "gsap";
import type { ProductEdition, ProductExperience } from "../data/productExperience";

declare global {
  interface Window {
    __dreammadeConfiguratorCleanup?: () => void;
  }
}

const viewLabel = (edition: ProductEdition, index: number) => edition.viewLabels?.[index] ?? `VIEW 0${index + 1}`;
const defaultView = (edition: ProductEdition) => edition.defaultViewIndex ?? 0;
const clampView = (index: number, edition: ProductEdition, option = edition.options[0]) =>
  Math.max(0, Math.min(index, Math.max(0, option.images.length - 1)));

export function initProductConfigurator() {
  if (typeof window === "undefined") return;
  window.__dreammadeConfiguratorCleanup?.();

  const root = document.querySelector<HTMLElement>("[data-product-experience]");
  const dataNode = document.querySelector<HTMLScriptElement>("#productExperienceData");
  if (!root || !dataNode?.textContent) return;

  const experience = JSON.parse(dataNode.textContent) as ProductExperience;
  const image = root.querySelector<HTMLImageElement>("#configuratorImage");
  const optionGroup = root.querySelector<HTMLElement>("#configuratorOptionGroup");
  const optionHost = root.querySelector<HTMLElement>("#configuratorOptions");
  const viewGroup = root.querySelector<HTMLElement>("#configuratorViews");
  const viewHost = viewGroup?.querySelector<HTMLElement>(".view-selector");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cleanup: Array<() => void> = [];
  let edition = experience.editions[0];
  let option = edition.options[0];
  let viewIndex = clampView(defaultView(edition), edition, option);
  let swapToken = 0;

  const setText = (selector: string, value: string) => {
    const node = root.querySelector<HTMLElement>(selector);
    if (node) node.textContent = value;
  };

  const updatePressed = (selector: string, attribute: string, value: string) => {
    document.querySelectorAll<HTMLButtonElement>(selector).forEach((button) => {
      const active = button.dataset[attribute] === value;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  };

  const writeUrl = () => {
    const url = new URL(window.location.href);
    if (edition.id === "standard") {
      url.searchParams.set("variant", option.id);
      if (option.images.length > 1) url.searchParams.set("view", String(viewIndex + 1));
      else url.searchParams.delete("view");
      url.searchParams.delete("finish");
    } else {
      url.searchParams.set("variant", edition.id);
      if (edition.options.length > 1) url.searchParams.set("finish", option.id);
      else url.searchParams.delete("finish");
      if (option.images.length > 1) url.searchParams.set("view", String(viewIndex + 1));
      else url.searchParams.delete("view");
    }
    window.history.replaceState(null, "", url);
  };

  const swapImage = (src: string) => {
    if (!image || image.src.endsWith(src)) return;
    const token = ++swapToken;
    const preload = new Image();
    let applied = false;
    const applyLoadedImage = () => {
      if (applied || !preload.naturalWidth) return;
      applied = true;
      if (token !== swapToken) return;
      const swap = () => {
        image.src = src;
        image.alt = `${experience.name} ${option.displayName} ${viewLabel(edition, viewIndex)}`;
        if (reduceMotion) {
          image.style.opacity = "1";
          return;
        }
        gsap.fromTo(image, { opacity: 0, scale: 1.015, filter: "blur(2px)" }, {
          opacity: 1, scale: 1, filter: "blur(0px)", duration: .34, ease: "power3.out"
        });
      };
      if (reduceMotion) swap();
      else gsap.to(image, { opacity: 0, scale: .985, filter: "blur(2px)", duration: .18, ease: "power2.in", onComplete: swap });
    };
    preload.onload = applyLoadedImage;
    preload.src = src;
    if (preload.complete) applyLoadedImage();
    preload.decode?.().then(applyLoadedImage).catch(() => {
      // Keep the current real image visible when the requested asset cannot decode.
    });
  };

  const renderOptions = () => {
    if (optionGroup) optionGroup.hidden = edition.options.length < 2;
    if (!optionHost) return;
    optionHost.innerHTML = edition.options.map((item) => `
      <button type="button" class="configurator-option${item.id === option.id ? " active" : ""}" data-option="${item.id}" aria-pressed="${item.id === option.id}">
        <i style="--option-colour:${item.colour ?? "#91050b"}"></i><span>${item.displayName}</span>
      </button>
    `).join("");
  };

  const renderViews = () => {
    if (!viewGroup || !viewHost) return;
    viewGroup.hidden = option.images.length < 2;
    viewHost.innerHTML = option.images.map((_, index) => `
      <button type="button" class="view-selector-button${index === viewIndex ? " active" : ""}" data-view="${index + 1}" aria-pressed="${index === viewIndex}">
        ${viewLabel(edition, index)}
      </button>
    `).join("");
  };

  const renderState = (updateUrl = true) => {
    viewIndex = Math.min(viewIndex, option.images.length - 1);
    root.dataset.activeEdition = edition.id;
    root.dataset.activeOption = option.id;
    root.dataset.activeView = String(viewIndex);
    setText("#configuratorEdition", edition.name);
    setText("#configuratorOption", option.displayName);
    setText("#configuratorView", viewLabel(edition, viewIndex));
    setText("#configuratorEyebrow", edition.eyebrow);
    if (!experience.viewer) {
      setText("#configuratorHeadline", edition.headline);
      setText("#configuratorDescription", edition.description);
    }
    updatePressed(".product-edition-tab", "edition", edition.id);
    renderOptions();
    renderViews();
    swapImage(option.images[viewIndex]);
    const next = option.images[(viewIndex + 1) % option.images.length];
    if (next) new Image().src = next;
    if (updateUrl) writeUrl();
    window.dispatchEvent(new CustomEvent("dreammade:product-state-change", {
      detail: {
        experienceId: experience.id,
        editionId: edition.id,
        optionId: option.id,
        viewIndex
      }
    }));
  };

  const selectFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const variant = params.get("variant");
    const finish = params.get("finish");
    const hasRequestedView = params.has("view");
    const requestedView = Math.max(0, Number(params.get("view") ?? "1") - 1);
    const editionMatch = experience.editions.find((item) => item.id === variant);
    if (editionMatch && editionMatch.id !== "standard") {
      edition = editionMatch;
      option = edition.options.find((item) => item.id === finish) ?? edition.options[0];
    } else {
      edition = experience.editions[0];
      option = edition.options.find((item) => item.id === variant) ?? edition.options[0];
    }
    viewIndex = clampView(hasRequestedView ? requestedView : defaultView(edition), edition, option);
    renderState(false);
  };

  const onClick = (event: Event) => {
    const target = event.target as HTMLElement;
    const editionButton = target.closest<HTMLButtonElement>("[data-edition]");
    const optionButton = target.closest<HTMLButtonElement>("[data-option]");
    const viewButton = target.closest<HTMLButtonElement>("[data-view]");
    if (editionButton?.dataset.edition) {
      edition = experience.editions.find((item) => item.id === editionButton.dataset.edition) ?? edition;
      option = edition.options[0];
      viewIndex = clampView(defaultView(edition), edition, option);
      renderState();
      if (!root.contains(editionButton)) root.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    } else if (optionButton?.dataset.option) {
      const nextOption = edition.options.find((item) => item.id === optionButton.dataset.option);
      if (!nextOption) return;
      option = nextOption;
      viewIndex = Math.min(viewIndex, option.images.length - 1);
      renderState();
    } else if (viewButton?.dataset.view) {
      viewIndex = Math.min(Number(viewButton.dataset.view) - 1, option.images.length - 1);
      renderState();
    }
  };
  document.addEventListener("click", onClick);
  cleanup.push(() => document.removeEventListener("click", onClick));

  const onPopState = () => selectFromUrl();
  window.addEventListener("popstate", onPopState);
  cleanup.push(() => window.removeEventListener("popstate", onPopState));

  selectFromUrl();
  window.__dreammadeConfiguratorCleanup = () => cleanup.splice(0).forEach((fn) => fn());
}
