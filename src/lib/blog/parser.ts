import type { BlogPost } from './types';

const modules = import.meta.glob('./posts/*.svx', { eager: true });

export function getPosts(): BlogPost[] {
	const posts: BlogPost[] = [];

	for (const path in modules) {
		const mod = modules[path] as any;

		const slug = path.split('/').pop()?.replace('.svx', '') ?? '';

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
