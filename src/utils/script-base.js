let SCRIPT_BASE = "";

export function initScriptBase() {
  if (SCRIPT_BASE) return;

  if (document.currentScript?.src) {
    SCRIPT_BASE = document.currentScript.src.replace(/[^/]+$/, "");
    return;
  }

  const matchingScripts = Array.from(document.querySelectorAll("script[src]"))
    .map((script) => script.getAttribute("src"))
    .filter((src) => typeof src === "string" && src.includes("kc-card"));

  const scriptSrc = matchingScripts.at(-1);
  if (scriptSrc) {
    SCRIPT_BASE = new URL(scriptSrc, document.baseURI).href.replace(/[^/]+$/, "");
  }
}

export function getScriptBase() {
  return SCRIPT_BASE;
}
