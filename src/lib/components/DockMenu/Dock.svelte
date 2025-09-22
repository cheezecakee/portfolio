<script lang="ts">
	import { Motion } from 'svelte-motion';
	import { cva } from 'class-variance-authority';
	import { cn } from '$lib/utils';
	import Lamp from './Lamp.svelte';
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { browser } from '$app/environment';

	let currentPage = $derived(page.url.pathname);

	let {
		className = undefined,
		direction = 'middle',
		children
	} = $props<{
		className?: string | undefined;
		direction?: 'top' | 'middle' | 'bottom';
		children?: Snippet<
			[
				{
					onHover: (centerX: number, label: string) => void;
					onRegister: (centerX: number, label: string) => void;
					onResize: () => void;
				}
			]
		>;
	}>();

	const dockVariants = cva(
		'mx-auto w-max mt-8 h-[58px] p-2 flex gap-2 rounded-lg border supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 backdrop-blur-md'
	);

	let dockElement: HTMLDivElement | undefined;
	let dockBounds: DOMRect | undefined;

	let lampX = $state<number | undefined>();
	let iconPositions: Record<string, number> = {};
	let isHoveringDock = $state(false);

	// Create route to label mapping
	const routeLabelsMap: Record<string, string> = {
		'/': 'Home',
		'/about': 'About',
		'/projects': 'Projects'
	};

	let dockClass = $derived(
		cn(dockVariants({ className }), {
			'items-start': direction === 'top',
			'items-center': direction === 'middle',
			'items-end': direction === 'bottom'
		})
	);

	// Update dock bounds when element changes
	function updateDockBounds() {
		if (dockElement) {
			dockBounds = dockElement.getBoundingClientRect();
		}
	}

	// Calculate lamp position for current page
	function updateLampForCurrentPage() {
		const activeLabel = routeLabelsMap[currentPage];
		if (activeLabel && iconPositions[activeLabel] && dockElement) {
			updateDockBounds();
			lampX = iconPositions[activeLabel] - (dockBounds?.left ?? 0);
		}
	}

	// Update lamp position whenever currentPage or positions change
	$effect(() => {
		if (browser && !isHoveringDock) {
			updateLampForCurrentPage();
		}
	});

	// Window resize handler
	$effect(() => {
		if (!browser) return;

		function handleResize() {
			// Trigger re-registration of all icon positions
			handleGlobalResize();
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});

	// Called by DockIcon on hover
	function handleIconHover(centerX: number, _label: string) {
		if (dockElement) {
			updateDockBounds();
			lampX = centerX - (dockBounds?.left ?? 0);
		}
	}

	// Called by DockIcon on mount or position change
	function handleIconRegister(centerX: number, label: string) {
		iconPositions[label] = centerX;

		// Set initial lamp position if this is the active item and we're not hovering
		const activeLabel = routeLabelsMap[currentPage];
		if (!isHoveringDock && label === activeLabel) {
			updateDockBounds();
			lampX = centerX - (dockBounds?.left ?? 0);
		}
	}

	// Global resize handler to trigger icon re-registration
	function handleGlobalResize() {
		// Clear current positions
		iconPositions = {};
		// The icons will re-register themselves via their resize observers
	}

	function handleMouseEnter() {
		isHoveringDock = true;
	}

	function handleMouseLeave() {
		isHoveringDock = false;
		// Return to active item position on mouse leave
		updateLampForCurrentPage();
	}
</script>

<Motion let:motion>
	<div class="relative">
		<div
			use:motion
			bind:this={dockElement}
			class={dockClass}
			role="toolbar"
			tabindex="0"
			onmouseenter={handleMouseEnter}
			onmouseleave={handleMouseLeave}
		>
			<Lamp isActive={true} posX={lampX ?? 0} />
			{@render children?.({
				onHover: handleIconHover,
				onRegister: handleIconRegister,
				onResize: handleGlobalResize
			})}
		</div>
	</div>
</Motion>
