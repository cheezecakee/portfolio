<script>
	import { cn } from '$lib/utils';

	let { title = '', description = '', showTitle = true, className = '' } = $props();

	const paragraphs = description.split('\n\n').filter((p) => p.trim());
</script>

<div
	class={cn(
		'group relative col-span-3 flex flex-col overflow-hidden rounded-xl p-6',
		'bg-transparent [box-shadow:none]',
		'transform-gpu dark:bg-transparent dark:[box-shadow:none]',
		className
	)}
>
	<div class="relative">
		{#if showTitle && title}
			<div class="mb-4">
				<h3 class="mb-1 text-xl font-semibold text-foreground">{title}</h3>
				<div class="h-0.5 w-12 rounded-full bg-gradient-to-r from-primary to-primary/50"></div>
			</div>
		{/if}

		{#if paragraphs.length > 0}
			<div class="space-y-4 leading-relaxed text-muted-foreground">
				{#each paragraphs as paragraph, i (i)}
					<p class="text-sm md:text-base">{paragraph}</p>
				{/each}
			</div>
		{/if}
		<!-- Hover Overlay -->
		<!-- <div -->
		<!-- 	class="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" -->
		<!-- ></div> -->
	</div>
</div>

<style>
	.animate-pulse {
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}
</style>
