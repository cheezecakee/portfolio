import type { BlogPost } from './types';

const modules = import.meta.glob('./posts/*.{svx,md}', { eager: true });

export function getPosts(): BlogPost[] {
	const posts: BlogPost[] = [];

	for (const path in modules) {
		const mod = modules[path] as any;

		const filename = path.split('/').pop() ?? '';
		const slug = filename.replace(/\.(svx|md)$/, '');

		posts.push({
			slug,
			meta: mod.metadata,
			component: mod.default
		});
	}

	return posts.sort(
		(a, b) =>
			new Date(b.meta.date).getTime() -
			new Date(a.meta.date).getTime()
	);
}
