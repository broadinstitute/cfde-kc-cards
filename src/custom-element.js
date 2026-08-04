import { loadDccCard } from "./data-loader.js";
import { resolvePublicPath } from "./utils/resolve-public-path.js";

const ELEMENT_TAG = "kc-card";
const HEADER_LOGOS = [
  {
    src: "assets/cfde_kc_logo.svg",
    alt: "CFDE Knowledge Center"
  },
  {
    src: "assets/cfde_logo.png",
    alt: "CFDE"
  }
];

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeUrl(url) {
  if (typeof url !== "string") return "";
  const value = url.trim();
  if (!value) return "";
  const normalized = value.replace(/[\u0000-\u001F\u007F\s]+/g, "").toLowerCase();
  if (/^(javascript|data|vbscript):/.test(normalized)) return "";
  return value;
}

function buildHeaderMarkup() {
  return `
    <div class="kc-card__header" aria-label="CFDE Knowledge Center card">
      ${HEADER_LOGOS.map((logo) => {
        const src = sanitizeUrl(resolvePublicPath(logo.src));
        return `<img class="kc-card__logo" src="${escapeHtml(src)}" alt="${escapeHtml(logo.alt)}" />`;
      }).join("")}
    </div>
  `;
}

function buildExternalIconMarkup() {
  return `
    <svg class="kc-card__button-icon" aria-hidden="true" viewBox="0 0 16 16" focusable="false">
      <path d="M9 2h5v5h-1.5V4.6L6.8 10.3 5.7 9.2l5.7-5.7H9V2Z" fill="currentColor" />
      <path d="M3.5 4.5h3V6h-3v6.5H10v-3h1.5v4.5H2V4.5h1.5Z" fill="currentColor" />
    </svg>
  `;
}

function buildCardMarkup(card) {
  const title = escapeHtml(card.title || "Knowledge Center");
  const description = escapeHtml(card.description || "");
  const imageSrc = sanitizeUrl(resolvePublicPath(card.image || ""));
  const imageAlt = escapeHtml(card.imageAlt || card.title || "");
  const href = sanitizeUrl(card.url);
  const buttonLabel = escapeHtml(card.buttonLabel || "Learn more");

  return `
    <article class="kc-card__inner">
      <div class="kc-card__top">
        ${buildHeaderMarkup()}
        ${imageSrc ? `
          <div class="kc-card__image-wrap">
            <img class="kc-card__image" src="${escapeHtml(imageSrc)}" alt="${imageAlt}" />
          </div>
        ` : ""}
      </div>
      <div class="kc-card__body">
        <h2 class="kc-card__title">${title}</h2>
        ${description ? `<p class="kc-card__description">${description}</p>` : ""}
        ${href ? `
          <a class="kc-card__button" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">
            <span class="kc-card__button-text">${buttonLabel}</span>
            ${buildExternalIconMarkup()}
          </a>
        ` : ""}
      </div>
    </article>
  `;
}

class KcCardElement extends HTMLElement {
  static get observedAttributes() {
    return ["data-dcc", "data-layout"];
  }

  constructor() {
    super();
    this.loadToken = 0;
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) {
      this.render();
    }
  }

  getDccSlug() {
    return this.getAttribute("data-dcc")?.trim() || "";
  }

  renderLoading() {
    this.setAttribute("data-kc-card-state", "loading");
    this.innerHTML = `
      <article class="kc-card__inner kc-card__inner--placeholder" aria-busy="true">
        ${buildHeaderMarkup()}
        <div class="kc-card__body">
          <p class="kc-card__status">Loading card...</p>
        </div>
      </article>
    `;
  }

  renderError(message) {
    this.setAttribute("data-kc-card-state", "error");
    this.innerHTML = `
      <article class="kc-card__inner kc-card__inner--error" role="status">
        ${buildHeaderMarkup()}
        <div class="kc-card__body">
          <p class="kc-card__status">${escapeHtml(message)}</p>
        </div>
      </article>
    `;
  }

  async render() {
    const slug = this.getDccSlug();
    const token = ++this.loadToken;

    if (!slug) {
      this.renderError("Add a data-dcc value to load a card.");
      return;
    }

    this.renderLoading();

    try {
      const card = await loadDccCard(slug);
      if (token !== this.loadToken) return;

      this.setAttribute("data-kc-card-state", "ready");
      this.innerHTML = buildCardMarkup(card);
    } catch (error) {
      if (token !== this.loadToken) return;
      this.renderError(error?.message || "Card data could not be loaded.");
    }
  }
}

export function defineKcCardElement() {
  if (!customElements.get(ELEMENT_TAG)) {
    customElements.define(ELEMENT_TAG, KcCardElement);
  }
}

export function refreshKcCards() {
  document.querySelectorAll(ELEMENT_TAG).forEach((card) => card.render?.());
}
