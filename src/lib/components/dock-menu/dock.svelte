<script lang="ts">
	import { Motion } from 'svelte-motion';
	import { MediaQuery } from 'svelte/reactivity';
	import { cva } from 'class-variance-authority';
	import { cn } from '$lib/utils';
	import Lamp from './lamp.svelte';

	const isDesktop = new MediaQuery('(min-width: 640px)');

	let { className = undefined, direction = 'middle', activeSection = 'About', children } = $props();

	const dockVariants = cva(
		'mx-auto w-max mt-8 h-[58px] p-2 flex gap-2 rounded-lg border supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 backdrop-blur-md'
	);

	let isHoveringDock = $state(false);
	let hoveredIcon: string | null = $state(null);

	const iconWidth = 38;
	const gap = 8;
	const paddingLeft = 8;
	const separatorWidth = 0.6;

	const navbarIcons = ['About', 'Projects', 'Blog'];
	const contactIcons = ['Email', 'Github', 'LinkedIn'];

	const navbarWidth = navbarIcons.length * (iconWidth + gap);
	const separatorOffset = navbarWidth + gap + separatorWidth + gap;

	function getLampX(label: string): number {
		const navbarIndex = navbarIcons.indexOf(label);
		if (navbarIndex !== -1) {
			return navbarIndex * (iconWidth + gap) + iconWidth / 2 + paddingLeft;
		}

		const contactIndex = contactIcons.indexOf(label);
		if (contactIndex !== -1) {
			return separatorOffset + contactIndex * (iconWidth + gap) + iconWidth / 2;
		}

		return 0;
	}

	function handleIconHover(_centerX: number, label: string) {
		hoveredIcon = label;
		isHoveringDock = true;
	}

	function handleMouseEnter() {
		isHoveringDock = true;
	}

	function handleMouseLeave() {
		isHoveringDock = false;
		hoveredIcon = null;
	}

	let lampX = $derived(
		getLampX(
			isHoveringDock && hoveredIcon
				? hoveredIcon
				: navbarIcons.includes(activeSection)
					? activeSection
					: 'About'
		)
	);

	let dockClass = $derived(
		cn(dockVariants({ className }), {
			'items-start': direction === 'top',
			'items-center': direction === 'middle',
			'items-end': direction === 'bottom'
		})
	);
</script>

<Motion let:motion>
	<div class="relative">
		<div
			use:motion
			class={dockClass}
			role="toolbar"
			tabindex="0"
			onmouseenter={handleMouseEnter}
			onmouseleave={handleMouseLeave}
		>
			{#if isDesktop.current}
				<Lamp isActive={true} posX={lampX} />
			{/if}
			{@render children?.({
				onHover: handleIconHover,
				onResize: () => {},
				isAnyIconHovered: isHoveringDock
			})}
		</div>
	</div>
</Motion>
