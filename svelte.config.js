import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
    extensions: ['.svelte', '.svx', '.md'],
	preprocess: [
        vitePreprocess(),
        mdsvex({ 
            extensions: ['.svx', '.md'],
            layout: {
                blog: resolve(__dirname, './src/lib/blog/layout.svelte'),
            },
        })
    ],
	kit: { adapter: adapter() }
};

export default config;
