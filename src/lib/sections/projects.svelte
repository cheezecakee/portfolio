<script lang="ts">
	import BentoGrid from '$lib/components/BentoGrid/BentoGrid.svelte';
	import BentoCards from '$lib/components/BentoGrid/projects/BentoCards.svelte';
	import MagicCard from '$lib/components/ui/magic-card/magic-card.svelte';

	// Define props
	export let projects: any[] = [];
	export let meta: any = {};
</script>

<div
	id="projects"
	class="panel-content mx-auto flex min-h-[90vh] w-full flex-col bg-background px-5 pt-6 md:px-30 lg:px-80"
>
	<!-- <div class="h-16 w-full items-start px-5 md:h-24"></div> -->
	<div class="w-full space-y-2">
		{#if meta?.error}
			<p class="px-5 text-sm text-neutral-500 dark:text-neutral-400">
				Unable to load projects from GitHub. Please try again later.
			</p>
		{:else if projects.length > 0}
			<p class="px-5 text-sm text-neutral-600 dark:text-neutral-400"></p>
		{/if}
	</div>

	{#if projects.length > 0}
		<BentoGrid class="w-full gap-6 px-5">
			{#snippet children()}
				{#each projects as project (project.id)}
					<BentoCards {project} background={MagicCard} />
				{/each}
			{/snippet}
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
	{:else if !meta?.error}
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
