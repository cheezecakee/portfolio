<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		className = '',
		rows = 7,
		cols = 30,
		cellSize = 56,
		borderColor = '#3f3f46',
		fillColor = 'rgba(14,165,233,0.3)',
		clickedCell = null,
		onCellClick = () => {},
		interactive = true
	} = $props<{
		className?: string;
		rows?: number;
		cols?: number;
		cellSize?: number;
		borderColor?: string;
		fillColor?: string;
		clickedCell?: { row: number; col: number } | null;
		onCellClick?: (row: number, col: number) => void;
		interactive?: boolean;
	}>();

	// Generate cells array
	const cells = $derived(Array.from({ length: rows * cols }, (_, idx) => idx));

	// Grid container styles using CSS Grid - responsive columns
	const gridStyle = $derived(`
		display: grid;
		grid-template-columns: repeat(${cols}, ${cellSize}px);
		grid-template-rows: repeat(${rows}, ${cellSize}px);
		gap: 0;
		width: 100%;
		height: 100%;
		justify-content: center;
	`);
</script>

<div class={cn('h-full w-full', className)} style={gridStyle}>
	{#each cells as idx (idx)}
		{@const rowIdx = Math.floor(idx / cols)}
		{@const colIdx = idx % cols}
		{@const distance = clickedCell
			? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
			: 0}
		{@const delay = clickedCell ? Math.max(0, distance * 55) : 0}
		{@const duration = 200 + distance * 80}
		{@const customProps = clickedCell ? `--delay: ${delay}ms; --duration: ${duration}ms;` : ''}

		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<div
			class={cn(
				'cell relative aspect-square border-[0.5px] opacity-40 transition-opacity duration-150 will-change-transform hover:opacity-80 dark:shadow-[0px_0px_40px_1px_var(--cell-shadow-color)_inset]',
				clickedCell && 'animate-cell-ripple [animation-fill-mode:none]',
				!interactive && 'pointer-events-none'
			)}
			style={`background-color: ${fillColor}; border-color: ${borderColor}; ${customProps}`}
			onclick={interactive ? () => onCellClick?.(rowIdx, colIdx) : undefined}
			role={interactive ? 'button' : 'presentation'}
			tabindex={interactive ? 0 : undefined}
		></div>
	{/each}
</div>
