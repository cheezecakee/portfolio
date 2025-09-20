<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import ShimmerButton from '$lib/components/ui/shimmer-button/shimmer-button.svelte';
	import Menu from '$lib/components/DockMenu/Menu.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="dark flex min-h-screen flex-col bg-black text-white">
	<!-- Header -->
	<header class="relative z-50 flex items-center justify-between px-5 py-5 md:px-30">
		<!-- Left side (button) -->
		<div></div>

		<!-- Right side -->
		<ShimmerButton class="shadow-2xl">
			<span
				class="text-center text-sm leading-none font-medium tracking-tight whitespace-pre-wrap text-white lg:text-lg dark:from-white dark:to-slate-900/10"
			>
				Resume
			</span>
		</ShimmerButton>
	</header>

	<!-- Main content -->
	<main class="flex-1">
		{@render children?.()}
	</main>

	<!-- Dock Menu -->
	<Menu />

	<!-- Footer -->
	<footer class="px-6 py-4 text-center text-sm text-neutral-400">
		&copy; {new Date().getFullYear()} My App. All rights reserved.
	</footer>
</div>
