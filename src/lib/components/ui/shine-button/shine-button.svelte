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
		class="shiny-text relative block size-full text-sm tracking-wide text-[rgb(0,0,0,65%)] uppercase dark:font-light dark:text-[rgb(255,255,255,90%)]"
	>
		{@render children()}
	</span>
</button>

<style>
	.shiny-text {
		-webkit-mask-image: linear-gradient(
			-75deg,
			var(--primary, #007bff) calc(var(--x, 100%) + 20%),
			transparent calc(var(--x, 100%) + 30%),
			var(--primary, #007bff) calc(var(--x, 100%) + 100%)
		);
		mask-image: linear-gradient(
			-75deg,
			var(--primary, #007bff) calc(var(--x, 100%) + 20%),
			transparent calc(var(--x, 100%) + 30%),
			var(--primary, #007bff) calc(var(--x, 100%) + 100%)
		);
	}

	/* Apply animation on button hover */
	:where(button:hover) .shiny-text {
		animation: shine 2s infinite linear;
	}

	@keyframes shine {
		from {
			--x: 100%;
		}
		to {
			--x: -100%;
		}
	}
</style>
