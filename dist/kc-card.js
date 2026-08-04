(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode("kc-card,kc-card *,kc-card *:before,kc-card *:after{box-sizing:border-box}kc-card{display:block;width:100%;max-width:100%;color:#1f2937;font-family:Arial,Helvetica,sans-serif}.kc-card__inner{display:flex;flex-direction:column;width:100%;min-width:0;overflow:hidden;border:0;border-radius:10px;background:#eee}.kc-card__top{display:flex;flex-direction:column;flex:1}kc-card[data-layout=horizontal] .kc-card__inner{flex-direction:row}kc-card[data-layout=horizontal] .kc-card__top{flex-direction:column-reverse}.kc-card__header{display:flex;align-items:center;justify-content:space-between;gap:20px;width:100%;padding:14px 16px}.kc-card__logo{display:block;width:auto;max-width:48%;height:30px;object-fit:contain}.kc-card__image-wrap{width:100%;background:#eee}.kc-card__image{display:block;width:100%;height:180px;object-fit:contain;mix-blend-mode:darken}.kc-card__body{display:grid;gap:10px;padding:14px 16px;flex:1}.kc-card__title{margin:0;color:currentColor;font-size:16px;font-weight:700;line-height:1.2}.kc-card__description{margin:0;color:#4b5563;font-size:14px;line-height:1.5}kc-card a{color:#f26822}.kc-card__button{display:inline-flex;align-items:center;justify-content:center;gap:.4em;justify-self:start;height:30px;width:100%;padding:7px 10px;border-radius:4px;background:#f26822;color:#fff;font-size:14px;font-weight:400;line-height:1;text-decoration:none;margin-top:auto}.kc-card__button-text{min-width:0}.kc-card__button-icon{display:inline-block;width:1em;height:1em;flex:0 0 1em}.kc-card__button:hover,.kc-card__button:focus-visible{background:#d15618;color:#fff}.kc-card__status{margin:0;color:#4b5563;font-size:14px}.kc-card__inner--error{background:#fff7f7}")),document.head.appendChild(e)}}catch(c){console.error("vite-plugin-css-injected-by-js",c)}})();
(function(){"use strict";let n="";function _(){if(n)return;if(document.currentScript?.src){n=document.currentScript.src.replace(/[^/]+$/,"");return}const e=Array.from(document.querySelectorAll("script[src]")).map(r=>r.getAttribute("src")).filter(r=>typeof r=="string"&&r.includes("kc-card")).at(-1);e&&(n=new URL(e,document.baseURI).href.replace(/[^/]+$/,""))}function h(){return n}function i(t){if(!t||typeof t!="string")return"";if(/^(https?:)?\/\//i.test(t)||t.startsWith("/"))return t;const e=h();if(!e)return t;const r=t.replace(/^public\//,"");return e.includes("/src/")?new URL(`/${r}`,e).href:new URL(`../public/${r}`,e).href}const s=new Map,p=/^[a-z0-9][a-z0-9_-]*$/i;function g(t){if(!p.test(t))throw new Error(`"${t}" is not a valid DCC card id.`)}async function k(t){if(g(t),s.has(t))return s.get(t);const e=i(`data/${t}.json`),r=fetch(e,{credentials:"omit"}).then(async a=>{if(!a.ok)throw new Error(`No card data found for "${t}".`);return a.json()});return s.set(t,r),r}const o="kc-card",b=[{src:"assets/cfde_kc_logo.svg",alt:"CFDE Knowledge Center"},{src:"assets/cfde_logo.png",alt:"CFDE"}];function c(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function d(t){if(typeof t!="string")return"";const e=t.trim();if(!e)return"";const r=e.replace(/[\u0000-\u001F\u007F\s]+/g,"").toLowerCase();return/^(javascript|data|vbscript):/.test(r)?"":e}function l(){return`
    <div class="kc-card__header" aria-label="CFDE Knowledge Center card">
      ${b.map(t=>{const e=d(i(t.src));return`<img class="kc-card__logo" src="${c(e)}" alt="${c(t.alt)}" />`}).join("")}
    </div>
  `}function m(){return`
    <svg class="kc-card__button-icon" aria-hidden="true" viewBox="0 0 16 16" focusable="false">
      <path d="M9 2h5v5h-1.5V4.6L6.8 10.3 5.7 9.2l5.7-5.7H9V2Z" fill="currentColor" />
      <path d="M3.5 4.5h3V6h-3v6.5H10v-3h1.5v4.5H2V4.5h1.5Z" fill="currentColor" />
    </svg>
  `}function v(t){const e=c(t.title||"Knowledge Center"),r=c(t.description||""),a=d(i(t.image||"")),w=c(t.imageAlt||t.title||""),f=d(t.url),S=c(t.buttonLabel||"Learn more");return`
    <article class="kc-card__inner">
      <div class="kc-card__top">
        ${l()}
        ${a?`
          <div class="kc-card__image-wrap">
            <img class="kc-card__image" src="${c(a)}" alt="${w}" />
          </div>
        `:""}
      </div>
      <div class="kc-card__body">
        <h2 class="kc-card__title">${e}</h2>
        ${r?`<p class="kc-card__description">${r}</p>`:""}
        ${f?`
          <a class="kc-card__button" href="${c(f)}" target="_blank" rel="noopener noreferrer">
            <span class="kc-card__button-text">${S}</span>
            ${m()}
          </a>
        `:""}
      </div>
    </article>
  `}class C extends HTMLElement{static get observedAttributes(){return["data-dcc","data-layout"]}constructor(){super(),this.loadToken=0}connectedCallback(){this.render()}attributeChangedCallback(){this.isConnected&&this.render()}getDccSlug(){return this.getAttribute("data-dcc")?.trim()||""}renderLoading(){this.setAttribute("data-kc-card-state","loading"),this.innerHTML=`
      <article class="kc-card__inner kc-card__inner--placeholder" aria-busy="true">
        ${l()}
        <div class="kc-card__body">
          <p class="kc-card__status">Loading card...</p>
        </div>
      </article>
    `}renderError(e){this.setAttribute("data-kc-card-state","error"),this.innerHTML=`
      <article class="kc-card__inner kc-card__inner--error" role="status">
        ${l()}
        <div class="kc-card__body">
          <p class="kc-card__status">${c(e)}</p>
        </div>
      </article>
    `}async render(){const e=this.getDccSlug(),r=++this.loadToken;if(!e){this.renderError("Add a data-dcc value to load a card.");return}this.renderLoading();try{const a=await k(e);if(r!==this.loadToken)return;this.setAttribute("data-kc-card-state","ready"),this.innerHTML=v(a)}catch(a){if(r!==this.loadToken)return;this.renderError(a?.message||"Card data could not be loaded.")}}}function u(){customElements.get(o)||customElements.define(o,C)}function $(){document.querySelectorAll(o).forEach(t=>t.render?.())}const E={define:u,refresh:$};typeof window<"u"&&(_(),window.KcCard=E,u())})();
