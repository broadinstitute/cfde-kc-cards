import { getScriptBase } from "./script-base.js";

export function resolvePublicPath(path) {
  if (!path || typeof path !== "string") return "";

  if (/^(https?:)?\/\//i.test(path) || path.startsWith("/")) {
    return path;
  }

  const base = getScriptBase();
  if (!base) return path;

  const normalizedPath = path.replace(/^public\//, "");

  if (base.includes("/src/")) {
    return new URL(`/${normalizedPath}`, base).href;
  }

  return new URL(`../public/${normalizedPath}`, base).href;
}
