export interface BlogPostMeta {
	title: string;
	date: string;
	description: string;
	tags: string[];
}

export interface BlogPost {
	slug: string;
	meta: BlogPostMeta;
	component: any;
}
