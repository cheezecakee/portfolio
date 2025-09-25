<script lang="ts">
	let className: string = '';
	export { className as class };
	export let reverse: boolean = false;
	export let duration: number = 20;
	export let radius: number = 160;
	export let path: boolean = true;
	export let iconSize: number = 30;
	export let speed: number = 1;

	const calculatedDuration = duration / speed;
</script>

{#if path}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		version="1.1"
		class="pointer-events-none absolute inset-0 size-full"
	>
		<circle
			class="stroke-black/10 stroke-1 dark:stroke-white/10"
			cx="50%"
			cy="50%"
			r={radius}
			fill="none"
		/>
	</svg>
{/if}

<slot {calculatedDuration} {radius} {iconSize} {reverse} {className} />

<style>
	:global(.animate-orbit) {
		animation: orbit calc(var(--duration) * 1s) linear infinite;
	}

	:global(.animate-orbit[data-reverse='true']) {
		animation-direction: reverse;
	}

	@keyframes orbit {
		0% {
			transform: rotate(calc(var(--angle) * 1deg)) translateY(calc(var(--radius) * 1px))
				rotate(calc(var(--angle) * -1deg));
		}
		100% {
			transform: rotate(calc(var(--angle) * 1deg + 360deg)) translateY(calc(var(--radius) * 1px))
				rotate(calc((var(--angle) * -1deg) - 360deg));
		}
	}
</style>
