<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	export let className: string = '';
	export let children: Snippet;
</script>

<button
	class={cn(
		'relative cursor-pointer rounded-lg border px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow dark:bg-[radial-gradient(circle_at_50%_0%,var(--primary)/10%_0%,transparent_60%)] dark:hover:shadow-[0_0_20px_var(--primary)/10%]',
		className
	)}
>
	<span
		class="shiny-text relative block size-full text-sm font-light tracking-wide text-[rgb(0,0,0,65%)] uppercase dark:text-[rgb(255,255,255,90%)]"
	>
		{@render children()}
	</span>
</button>

<style>
	:global(.animate-shine) {
		animation: orbit calc(var(--duration) * 1s) linear infinite;
	}

	@keyframes shine {
		from {
			backgroundposition: '0 0';
		}
		to {
			backgroundposition: '-200% 0';
		}
	}
</style>
