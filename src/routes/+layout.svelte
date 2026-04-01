<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import ShimmerButton from '$lib/components/ui/shimmer-button/shimmer-button.svelte';
	import Menu from '$lib/components/DockMenu/Menu.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import resumeEn from '$lib/assets/resume/resume.pdf';
	import resumePt from '$lib/assets/resume/resume-portuguese.pdf';

	let open = false;
	function toggle() {
		open = !open;
	}
	let { children, data } = $props();

	let headerRef: HTMLElement;

	function updateHeaderHeight() {
		if (!headerRef) return;
		const height = headerRef.getBoundingClientRect().height;
		document.documentElement.style.setProperty('--header-height', `${height}px`);
	}

	onMount(() => {
		updateHeaderHeight();
		window.addEventListener('resize', updateHeaderHeight);
		return () => window.removeEventListener('resize', updateHeaderHeight);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="dark flex min-h-screen flex-col bg-background text-white">
	<!-- Header -->
	<header
		bind:this={headerRef}
		class="fixed z-50 flex w-full items-center justify-between bg-background px-5 py-5 md:px-30 lg:px-85"
	>
		<!-- left side (empty) -->
		<div></div>
		<!-- right side -->
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<ShimmerButton {...props} class="shadow-2xl" on:click={toggle}>
						<span
							class="text-center text-sm leading-none font-medium tracking-tight whitespace-pre-wrap text-white lg:text-lg"
						>
							Resume
						</span>
					</ShimmerButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="border-none border-black bg-slate-900/10 text-center text-sm leading-none font-medium tracking-tight text-white lg:text-lg"
			>
				<DropdownMenu.Group>
					<a href={resumeEn} target="_blank" rel="noopener noreferrer">
						<DropdownMenu.Item>English</DropdownMenu.Item>
					</a>
					<a href={resumePt} target="_blank" rel="noopener noreferrer">
						<DropdownMenu.Item>Portuguese</DropdownMenu.Item>
					</a>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</header>

	<!-- Main content with dynamic top padding -->
	<main class="flex-1 overflow-y-auto pb-40" style="padding-top: var(--header-height, 0px);">
		{@render children?.()}
	</main>

	<!-- Dock Menu -->
	<div
		class="fixed bottom-10 left-1/2 z-50 w-full -translate-x-1/2 bg-linear-to-b from-transparent to-black"
	>
		<Menu {data} />
	</div>

	<!-- Footer -->
	<footer class="fixed bottom-0 z-60 w-full bg-black pb-5 text-center text-sm text-neutral-400">
		&copy; {new Date().getFullYear()} Cheezecake. All rights reserved.
	</footer>

	<Toaster ... />
</div>
