<script lang="ts">
	import { BentoGrid, ProjectCard } from '$lib/components/bento-grid';
	import MagicCard from '$lib/components/ui/magic-card/magic-card.svelte';
	import { cn } from '$lib/utils';

	let {
		class: className,
		projects = [],
		meta = {}
	}: {
		class?: string;
		projects?: any[];
		meta?: any;
	} = $props();
</script>

<div id="projects" class={cn('mx-auto flex w-full items-center', className)}>
	{#if meta?.error}
		<p class="px-5 text-sm text-neutral-500 dark:text-neutral-400">
			Unable to load projects from GitHub. Please try again later.
		</p>
	{:else if projects.length > 0}
		<div class="w-full space-y-6">
			<BentoGrid class="w-full gap-6 px-5">
				{#each projects as project (project.id)}
					<ProjectCard {project} background={MagicCard} />
				{/each}
			</BentoGrid>
			<div class="w-full py-4 text-center">
				<a
					href="https://github.com/cheezecakee?tab=repositories"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
				>
					View all projects on GitHub
				</a>
			</div>
		</div>
	{:else}
		<BentoGrid class="w-full gap-6 px-5">
			<div
				class="col-span-full flex min-h-100 w-full flex-col items-center justify-center space-y-4 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800"
			>
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
