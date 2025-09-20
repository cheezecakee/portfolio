<script lang="ts">
	import { cn } from '$lib/utils';
	import DivGrid from './DivGrid.svelte';

	let {
		rows = 8,
		cols = 27,
		cellSize = 56,
		className = '',
		containerHeight = '100%'
	} = $props<{
		rows?: number;
		cols?: number;
		cellSize?: number;
		className?: string;
		containerHeight?: string;
	}>();

	let clickedCell: { row: number; col: number } | null = $state(null);
	let rippleKey = $state(0);
	let ref = $state<HTMLDivElement>();

	function handleCellClick(row: number, col: number) {
		clickedCell = { row, col };
		rippleKey = rippleKey + 1;
	}
</script>

<div
	bind:this={ref}
	class={cn(
		'w-full',
		'[--cell-border-color:var(--color-neutral-300)] [--cell-fill-color:var(--color-neutral-100)] [--cell-shadow-color:var(--color-neutral-500)]',
		'dark:[--cell-border-color:var(--color-neutral-700)] dark:[--cell-fill-color:var(--color-neutral-900)] dark:[--cell-shadow-color:var(--color-neutral-800)]',
		// Fade-out mask
		'mask-origin-border',
		'[mask-image:radial-gradient(circle,black_50%,transparent_80%)]',
		className
	)}
	style={`height: ${containerHeight}`}
>
	<div class="relative h-full w-full overflow-hidden">
		<div class="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden"></div>
		{#key `base-${rippleKey}`}
			<DivGrid
				className="opacity-80 w-full h-full"
				{rows}
				cols={cols > 15 ? cols : Math.max(8, Math.floor(cols * 0.6))}
				{cellSize}
				borderColor="var(--cell-border-color)"
				fillColor="var(--cell-fill-color)"
				{clickedCell}
				onCellClick={handleCellClick}
				interactive={true}
			/>
		{/key}
	</div>
</div>
