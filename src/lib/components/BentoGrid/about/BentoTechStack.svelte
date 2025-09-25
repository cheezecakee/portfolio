<script>
	import { cn } from '$lib/utils';

	let { title = 'Tech Stack', categories = [], showTitle = true, className = '' } = $props();
</script>

<div
	class={cn(
		'group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl p-6',
		'bg-transparent [box-shadow:none]',
		'transform-gpu dark:bg-transparent dark:[box-shadow:none]',
		className
	)}
>
	{#if showTitle && title}
		<div class="mb-4">
			<h3 class="mb-1 text-xl font-semibold text-foreground">{title}</h3>
			<div class="h-0.5 w-12 rounded-full bg-gradient-to-r from-primary to-primary/50"></div>
		</div>
	{/if}

	<!-- Categories Display -->
	{#if categories.length > 0}
		<div class="space-y-4">
			{#each categories as category, categoryIndex (category.name)}
				<div>
					<h4 class="mb-2 text-xs font-medium tracking-wide text-white/70 uppercase">
						{category.name}
					</h4>
					<div class="flex flex-wrap gap-2">
						{#each category.items as item, itemIndex (`${categoryIndex}-${itemIndex}`)}
							<span
								class="rounded-full bg-gray-700 px-3 py-1.5 text-sm font-medium transition-transform duration-200 hover:scale-105"
							>
								{item.name}
							</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{/if}
	<!-- Hover Overlay -->
	<!-- <div -->
	<!-- 	class="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" -->
	<!-- ></div> -->
</div>
