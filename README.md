# CFDE KC Cards

A small embeddable web component for rendering Knowledge Center cards from static JSON files in this repository.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production artifact is `dist/kc-card.js`.

## Usage

Add the script to a page:

```html
<script src="https://cdn.jsdelivr.net/gh/broadinstitute/cfde-kc-cards@main/dist/kc-card.js"></script>
```

Then add a card element:

```html
<kc-card data-dcc="kids-first"></kc-card>
```

The value of `data-dcc` maps to a static JSON file in `public/data/`. For example, `data-dcc="kids-first"` loads `public/data/kids-first.json`.

Cards render vertically by default. To render the image/logo area beside the body, set `data-layout="horizontal"`:

```html
<kc-card data-dcc="hubmap" data-layout="horizontal"></kc-card>
```

## Card Data

Each data file should describe a Knowledge Center secondary analysis result for the selected DCC:

```json
{
  "title": "Pediatric Variant Signals Across CFDE Tissues",
  "image": "assets/kids-first.svg",
  "imageAlt": "Sample visualization for Kids First secondary analysis results",
  "description": "The Knowledge Center re-analyzed Kids First data to highlight tissue-linked variant patterns that may help researchers prioritize follow-up pediatric disease questions.",
  "buttonLabel": "View KC Results",
  "url": "https://cfdeknowledge.org/"
}
```

Use `url` for the KC page where users can inspect the result. Relative image paths are resolved from the widget script URL. In production, `assets/example.svg` resolves to `../public/assets/example.svg` relative to `dist/kc-card.js`.

## Styling

The widget renders light DOM, so host pages can override styles with normal CSS:

```css
kc-card .kc-card__title {
  font-size: 22px;
}

kc-card .kc-card__description {
  font-size: 18px;
}

kc-card .kc-card__button {
  background: #1c5084;
}
```

Every rendered element has a `kc-card__...` class so consumers can override the card directly.
