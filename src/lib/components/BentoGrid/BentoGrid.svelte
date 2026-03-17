<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface BentoGridProps extends HTMLAttributes<HTMLDivElement> {
		children: Snippet;
		class?: string;
	}

	let { children, class: className, ...props }: BentoGridProps = $props();
</script>

<div class={cn('grid w-full auto-rows-min grid-cols-1 gap-6 md:grid-cols-2', className)} {...props}>
	{@render children()}
</div>
