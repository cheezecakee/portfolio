<script lang="ts">
	import BentoGrid from '$lib/components/BentoGrid/BentoGrid.svelte';
	import BentoCards from '$lib/components/BentoGrid/projects/BentoCards.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ projects, meta } = data);
</script>

<svelte:head>
	<title>Projects</title>
	<meta name="description" content="Explore my development projects and coding journey." />
</svelte:head>

<div class="mx-auto flex flex-col items-center justify-center space-y-6 px-5 md:px-30 lg:px-80">
	<div class="w-full space-y-2">
		<span
			class="pointer-events-none w-full bg-gradient-to-b from-gray-100 to-gray-300/80 bg-clip-text px-5 text-start text-3xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-gray-100 dark:to-gray-300/50"
		>
			Projects
		</span>

		{#if meta?.error}
			<p class="px-5 text-sm text-neutral-500 dark:text-neutral-400">
				Unable to load projects from GitHub. Please try again later.
			</p>
		{:else if projects.length > 0}
			<p class="px-5 text-sm text-neutral-600 dark:text-neutral-400">
				<!-- Showcasing {projects.length} of my recent public repositories -->
			</p>
		{/if}
	</div>

	{#if projects.length > 0}
		<!-- Use your existing BentoGrid component -->
		<BentoGrid class="w-full gap-6">
			{#each projects as project (project.id)}
				<BentoCards {project} />
			{/each}
		</BentoGrid>

		<!-- Link to full GitHub profile -->
		<div class="w-full pt-4 text-center">
			<a
				href="https://github.com/cheezecakee?tab=repositories"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
			>
				View all projects on GitHub
				<svg class="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
					<path
						fill-rule="evenodd"
						d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
			</a>
		</div>
	{:else}
		<!-- Empty state inside BentoGrid to maintain layout -->
		<BentoGrid class="w-full gap-6">
			<div
				class="col-span-full flex min-h-[400px] w-full flex-col items-center justify-center space-y-4 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800"
			>
				<svg
					class="h-12 w-12 text-neutral-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m0 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
					/>
				</svg>
				<div class="text-center">
					<h3 class="text-lg font-medium text-neutral-900 dark:text-neutral-100">
						No projects found
					</h3>
					<p class="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
						Projects will appear here once they're available.
					</p>
				</div>
			</div>
		</BentoGrid>
	{/if}
</div>
