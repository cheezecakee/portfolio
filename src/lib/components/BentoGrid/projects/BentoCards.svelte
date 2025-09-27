<script lang="ts">
	import { ShineButton } from '$lib/components/ui/shine-button';
	import { cn } from '$lib/utils';
	import type { ProcessedProject } from '../../../../routes/projects/+page.server';

	let className: string = '';
	export { className as class };
	export let project: ProcessedProject;
	export let background: any = null;

	// State for description expansion
	let isDescriptionExpanded = false;

	// Configuration for description truncation
	const MAX_DESCRIPTION_LENGTH = 120;
	const shouldTruncateDescription = project.description.length > MAX_DESCRIPTION_LENGTH;
	const truncatedDescription = shouldTruncateDescription
		? project.description.slice(0, MAX_DESCRIPTION_LENGTH).trim() + '...'
		: project.description;

	function toggleDescription() {
		isDescriptionExpanded = !isDescriptionExpanded;
	}
</script>

<div
	class={cn(
		'group relative col-span-1 flex min-h-[280px] flex-col overflow-hidden rounded-xl border transition-colors',
		'border-transparent bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
		'dark:bg-black dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]',
		'hover:border-white dark:hover:border-white',
		className
	)}
>
	<!-- Background layer -->
	{#if background}
		<svelte:component this={background} />
	{/if}

	<!-- Content layer -->
	<div
		class="pointer-events-none relative z-10 flex flex-1 transform-gpu flex-col p-6 transition-all duration-300 group-hover:-translate-y-2"
	>
		<!-- Header -->
		<div class="mb-4">
			<h3 class="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
				{project.title}
			</h3>
		</div>

		<!-- Description -->
		<div class="mb-6 flex-1">
			<p class="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
				{isDescriptionExpanded ? project.description : truncatedDescription}
			</p>

			{#if shouldTruncateDescription}
				<button
					class="pointer-events-auto mt-2 text-xs text-black/70 transition-colors hover:text-black dark:text-white/70 dark:hover:text-white"
					on:click={toggleDescription}
				>
					{isDescriptionExpanded ? 'Show less' : 'Read more'}
				</button>
			{/if}
		</div>

		<!-- Technologies -->
		{#if project.languages.length > 0}
			<div class="mb-4 space-y-3">
				<h4
					class="text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-gray-400"
				>
					Technologies
				</h4>
				<div class="flex flex-wrap gap-2">
					{#each project.languages as tech (tech)}
						<span
							class="rounded-md border border-neutral-200 bg-neutral-100 px-2 py-1 text-xs text-neutral-700 transition-colors dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
						>
							{tech}
						</span>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Stats -->
		{#if project.stats.stars > 0 || project.stats.forks > 0}
			<div class="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
				{#if project.stats.stars > 0}
					<div class="flex items-center gap-1">
						<svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
							<path
								d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
							/>
						</svg>
						{project.stats.stars}
					</div>
				{/if}
				{#if project.stats.forks > 0}
					<div class="flex items-center gap-1">
						<svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414L2.586 8l3.707-3.707a1 1 0 011.414 0z"
								clip-rule="evenodd"
							/>
						</svg>
						{project.stats.forks}
					</div>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Action section - Always at bottom -->
	<div class="flex w-full flex-row items-center p-4 dark:border-neutral-800">
		<ShineButton>
			<a
				href={project.href}
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center justify-center"
			>
				View Project
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="ml-2 h-3 w-3"
				>
					<path d="M5 12h14" />
					<path d="m12 5 7 7-7 7" />
				</svg>
			</a>
		</ShineButton>
		<!-- </Button> -->
	</div>

	<!-- Hover overlay -->
	<div
		class="pointer-events-none absolute inset-0 z-5 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10"
	></div>
</div>
