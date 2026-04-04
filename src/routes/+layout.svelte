<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from '$lib/components/ui/sonner';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<script src="https://tweakcn.com/live-preview.min.js"></script>
</svelte:head>

<div class="flex min-h-screen flex-col bg-background text-foreground">
	<main class="flex-1 overflow-y-auto pb-40" style="padding-top: var(--header-height, 0px);">
		{@render children?.()}
	</main>

	<footer
		class="fixed bottom-0 z-60 w-full bg-background pb-5 text-center text-sm text-neutral-400"
	>
		&copy; {new Date().getFullYear()} Cheezecake. All rights reserved.
	</footer>

	<Toaster />
</div>
