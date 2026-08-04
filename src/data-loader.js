import { resolvePublicPath } from "./utils/resolve-public-path.js";

const cache = new Map();
const SAFE_DCC_SLUG = /^[a-z0-9][a-z0-9_-]*$/i;

function validateDccSlug(slug) {
  if (!SAFE_DCC_SLUG.test(slug)) {
    throw new Error(`"${slug}" is not a valid DCC card id.`);
  }
}

export async function loadDccCard(slug) {
  validateDccSlug(slug);

  if (cache.has(slug)) {
    return cache.get(slug);
  }

  const url = resolvePublicPath(`data/${slug}.json`);
  const request = fetch(url, { credentials: "omit" }).then(async (response) => {
    if (!response.ok) {
      throw new Error(`No card data found for "${slug}".`);
    }
    return response.json();
  });

  cache.set(slug, request);
  return request;
}
