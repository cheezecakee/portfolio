<script lang="ts">
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import type { Snippet } from 'svelte';

	let {
		label,
		enableHover = true,
		isActive = false,
		className = '',
		onHover,
		onRegister,
		onResize,
		children
	} = $props<{
		label: string;
		enableHover?: boolean;
		isActive?: boolean;
		className?: string;
		onHover?: ((centerX: number, label: string) => void) | undefined;
		onRegister?: ((centerX: number, label: string) => void) | undefined;
		onResize?: (() => void) | undefined;
		children: Snippet<[boolean, boolean]>;
	}>();

	let iconElement: HTMLDivElement;
	let isHovered = $state(false);

	function calculateAndRegisterPosition() {
		if (!browser || !iconElement) return;

		const bounds = iconElement.getBoundingClientRect();
		const centerX = bounds.x + bounds.width / 2;
		onRegister?.(centerX, label);
	}

	function handleMouseEnter() {
		if (!enableHover) return;
		isHovered = true;

		if (!browser || !iconElement) return;
		const bounds = iconElement.getBoundingClientRect();
		const centerX = bounds.x + bounds.width / 2;
		onHover?.(centerX, label);
	}

	function handleMouseLeave() {
		isHovered = false;
	}

	onMount(() => {
		// Initial position registration
		calculateAndRegisterPosition();

		// Set up ResizeObserver for when the icon or container changes size
		const resizeObserver = new ResizeObserver(() => {
			calculateAndRegisterPosition();
		});

		// Observe both the icon element and its parent container
		resizeObserver.observe(iconElement);
		if (iconElement.parentElement) {
			resizeObserver.observe(iconElement.parentElement);
		}

		// Listen for window resize events as a fallback
		function handleWindowResize() {
			// Small delay to ensure layout has settled
			setTimeout(() => {
				onResize?.();
				calculateAndRegisterPosition();
			}, 50);
		}

		window.addEventListener('resize', handleWindowResize);

		return () => {
			resizeObserver.disconnect();
			window.removeEventListener('resize', handleWindowResize);
		};
	});

	let iconClass = $derived(
		cn(
			'flex aspect-square cursor-pointer items-center justify-center rounded-full w-[38px] h-[38px] transition-all duration-200',
			{ 'bg-zinc-900/50': isActive },
			className
		)
	);
</script>

<div
	bind:this={iconElement}
	class={iconClass}
	role="button"
	tabindex="0"
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
>
	{@render children(isHovered, isActive)}
</div>
