<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { DockMenu } from '$lib/components/dock-menu';
	import { Toaster } from '$lib/components/ui/sonner';
	import Header from '$lib/components/header/header.svelte';
	import { onMount } from 'svelte';
	import Meteors from '$lib/components/magic/meteors/meteors.svelte';
	import { ResumeButton } from '$lib/components/resume-button';

	let { children, data } = $props();

	let activeSection = $state('About');

	onMount(() => {
		const sections = ['about', 'projects', 'blog'];
		const sectionTitles: Record<string, string> = {
			about: 'About',
			projects: 'Projects',
			blog: 'Blog'
		};

		const observer = new IntersectionObserver(
			(entries) => {
				let bestSection = null;
				let bestRatio = 0;

				for (const entry of entries) {
					if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
						bestRatio = entry.intersectionRatio;
						bestSection = entry.target.id;
					}
				}

				if (bestSection) {
					activeSection = sectionTitles[bestSection];
				}
			},
			{
				threshold: [0.2, 0.4, 0.6, 0.8],
				rootMargin: '-20% 0px -20% 0px'
			}
		);

		sections.forEach((id) => {
			const element = document.getElementById(id);
			if (element) observer.observe(element);
		});

		const mutationObserver = new MutationObserver(() => {
			sections.forEach((id) => {
				const element = document.getElementById(id);

				if (element && !element.hasAttribute('data-observed')) {
					observer.observe(element);
					element.setAttribute('data-observed', 'true');
				}
			});
		});

		mutationObserver.observe(document.body, { childList: true, subtree: true });

		return () => {
			observer.disconnect();
			mutationObserver.disconnect();
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<!-- <script src="https://tweakcn.com/live-preview.min.js"></script> -->
</svelte:head>

<div class="flex min-h-screen flex-col bg-background text-foreground">
	<!-- Header -->
	<div
		class="md:min-h-header-height-md fixed top-0 z-50 mx-auto flex min-h-header-height-sm w-full items-center justify-between bg-linear-to-t from-transparent via-background to-background px-10 py-5 md:px-35 lg:min-h-header-height lg:px-85"
	>
		<Header currentTitle={activeSection} />
		<ResumeButton />
	</div>

	<!-- <Meteors number={30} class="fixed" /> -->
	<!-- Main -->
	<main
		class="sm-pt-header-height-sm flex-1 overflow-x-hidden overflow-y-auto pt-header-height pb-40"
	>
		{@render children?.()}
	</main>

	<!-- Dock Menu -->
	<div
		class="fixed bottom-10 left-1/2 z-50 w-full -translate-x-1/2 bg-linear-to-b from-transparent to-background"
	>
		<DockMenu {data} {activeSection} />
	</div>

	<footer
		class="fixed bottom-0 z-60 w-full bg-background pb-5 text-center text-sm text-muted-foreground"
	>
		&copy; {new Date().getFullYear()} Cheezecake. All rights reserved.
	</footer>

	<Toaster />
</div>
