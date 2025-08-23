import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
    site: 'https://www.parkerbotsford.com',
    integrations: [react()],
    adapter: vercel(),
    vite: {
        plugins: [
            visualizer({
                template: 'flamegraph',
                emitFile: true,
                filename: 'stats.html',
            }),
        ],
    },
});
