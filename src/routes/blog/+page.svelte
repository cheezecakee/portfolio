<script lang="ts">
	import BentoGrid from '$lib/components/BentoGrid/BentoGrid.svelte';
	import { getPosts } from '$lib/blog/parser';
	import LatestCard from '$lib/components/BlogCards/latest-card.svelte';
	import { useIsMobile } from '$lib/hooks/isMobile.svelte';
	import Archive from '$lib/components/BlogCards/archive.svelte';

	const posts = getPosts();
	const mobile = useIsMobile();

	type Post = (typeof posts)[number];

	let selectedYear = $state<string | null>(null);
	let selectedTags = $state<string[]>([]);

	const filteredPosts = $derived(
		posts.filter((post) => {
			const postYear = String(new Date(post.meta.date).getFullYear());
			const postTags = post.meta.tags ?? [];

			const matchesYear = !selectedYear || postYear === selectedYear;
			const matchesTags =
				selectedTags.length === 0 || selectedTags.some((t) => postTags.includes(t));

			return matchesYear && matchesTags;
		})
	);

	const archive = $derived(
		(() => {
			const archiveMap = new Map<string, Map<string, Post[]>>();

			for (const post of filteredPosts) {
				const date = new Date(post.meta.date);
				const year = String(date.getFullYear());
				const month = date.toLocaleString('default', { month: 'long' });

				if (!archiveMap.has(year)) archiveMap.set(year, new Map());
				const yearMap = archiveMap.get(year)!;

				if (!yearMap.has(month)) yearMap.set(month, []);
				yearMap.get(month)!.push(post);
			}

			return Array.from(archiveMap.entries()).map(([year, months]) => ({
				year,
				months: Array.from(months.entries()).map(([month, posts]) => ({ month, posts }))
			}));
		})()
	);

	const years = [
		{ value: '', label: 'All' },
		...Array.from(new Set(posts.map((p) => new Date(p.meta.date).getFullYear())))
			.sort((a, b) => b - a)
			.map((year) => ({ value: String(year), label: String(year) }))
	];

	const tags = Array.from(new Set(posts.flatMap((p) => p.meta.tags ?? []))).map((tag) => ({
		value: tag,
		label: tag
	}));
</script>

<svelte:head>
	<title>Blog</title>
	<meta name="description" content="" />
</svelte:head>

<div class="mx-auto flex flex-col items-center justify-center space-y-6 px-5 md:px-30 lg:px-80">
	<span
		class="pointer-events-none w-full bg-linear-to-b from-gray-100 to-gray-300/80 bg-clip-text px-5 text-start text-3xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-gray-100 dark:to-gray-300/50"
	>
		Blog
	</span>

	<BentoGrid class="w-full gap-6 px-5">
		<!-- Left column: Latest posts -->
		<div class="col-span-1 flex flex-col">
			<div class="flex flex-col space-y-4">
				<span
					class="pointer-events-none w-full bg-linear-to-b from-gray-100 to-gray-300/80 bg-clip-text text-start text-2xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-gray-100 dark:to-gray-300/50"
				>
					Latest
				</span>
				{#if mobile.current}
					{#each posts.slice(0, 1) as post}
						<LatestCard {post} />
					{/each}
				{:else}
					{#each posts.slice(0, 3) as post}
						<LatestCard {post} />
					{/each}
				{/if}
			</div>
		</div>

		<!-- Right column: Archive + filters -->
		<div class="col-span-1 flex items-start justify-center">
			<Archive {years} {tags} bind:selectedYear bind:selectedTags {archive} />
		</div>
	</BentoGrid>
</div>
