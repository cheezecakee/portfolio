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
	<header
		class="fixed z-50 flex w-full items-center justify-between bg-linear-to-b from-black to-transparent px-5 py-5 md:px-30"
	>
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
	<main class="flex-1 overflow-y-auto pt-20 pb-40">
		{@render children?.()}
	</main>

	<!-- Dock Menu - Pass page data -->
	<div
		class="fixed bottom-10 left-1/2 z-50 w-full -translate-x-1/2 bg-linear-to-b from-transparent to-black"
	>
		<Menu />
	</div>

	<!-- Footer -->
	<footer class="fixed bottom-0 w-full bg-black pb-5 text-center text-sm text-neutral-400">
		&copy; {new Date().getFullYear()} Cheezecake. All rights reserved.
	</footer>
</div>
