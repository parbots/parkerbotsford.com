import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import esvVerses from "./src/integrations/esv-verses";
import {
  transformerNotationHighlight,
  transformerNotationFocus,
  transformerMetaHighlight,
} from "@shikijs/transformers";

// https://astro.build/config
export default defineConfig({
  site: "https://parkerbotsford.com",
  integrations: [esvVerses(), react(), mdx(), tailwind(), sitemap()],
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
  markdown: {
    shikiConfig: {
      theme: "css-variables",
      transformers: [
        transformerNotationHighlight(),
        transformerNotationFocus(),
        transformerMetaHighlight(),
      ],
    },
  },
});
