import "./styles.css";

import { defineKcCardElement, refreshKcCards } from "./custom-element.js";
import { initScriptBase } from "./utils/script-base.js";

const api = {
  define: defineKcCardElement,
  refresh: refreshKcCards
};

if (typeof window !== "undefined") {
  initScriptBase();
  window.KcCard = api;
  defineKcCardElement();
}
