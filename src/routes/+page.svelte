<script lang="ts">
	import { onMount } from 'svelte';
	import { Timeline } from '$lib/components/timeline';
	import { MorphingText } from '$lib/components/magic/morphing-text';
	import { AboutSection, BlogSection, ProjectsSection } from '$lib/sections';

	let { data } = $props();

	let activeSection = $state(1);
	let sectionProgress = $state(0);

	const sectionTitles = {
		1: 'About',
		2: 'Projects',
		3: 'Blog'
	} as const;
	let currentTitle = $derived(sectionTitles[activeSection as 1 | 2 | 3]);

	// update sectionProgress on scroll
	function updateSectionProgress() {
		const sectionId = activeSection === 1 ? 'about' : activeSection === 2 ? 'projects' : 'blog';
		const section = document.getElementById(sectionId);
		if (!section) return;

		const rect = section.getBoundingClientRect();
		const sectionTop = rect.top;
		const sectionHeight = rect.height;
		const viewportHeight = window.innerHeight;
		const scrollOffset = -sectionTop;
		// Avoid division by zero – if the section fits in the viewport, progress is 1 when active
		const maxScroll = Math.max(0.001, sectionHeight - viewportHeight);
		let progress = scrollOffset / maxScroll;
		sectionProgress = Math.min(1, Math.max(0, progress));
	}

	onMount(() => {
		const sections = [
			{ id: 'about', step: 1 },
			{ id: 'projects', step: 2 },
			{ id: 'blog', step: 3 }
		];

		const observer = new IntersectionObserver(
			(entries) => {
				let maxRatio = 0;
				let newActiveStep = activeSection;
				for (const entry of entries) {
					if (entry.intersectionRatio > 0.3 && entry.intersectionRatio > maxRatio) {
						maxRatio = entry.intersectionRatio;
						const section = sections.find((s) => s.id === entry.target.id);
						if (section) newActiveStep = section.step;
					}
				}
				if (newActiveStep !== activeSection && maxRatio > 0.5) {
					activeSection = newActiveStep;
				}
			},
			{
				threshold: [0, 0.3, 0.5, 0.7, 1],
				rootMargin: '0px'
			}
		);

		sections.forEach(({ id }) => {
			const element = document.getElementById(id);
			if (element) observer.observe(element);
		});

		// scroll listener and initial progress update
		window.addEventListener('scroll', updateSectionProgress);
		updateSectionProgress();

		return () => {
			observer.disconnect();
			window.removeEventListener('scroll', updateSectionProgress);
		};
	});

	$effect(() => {
		updateSectionProgress();
	});
</script>

<div class="flex min-h-screen">
	<!-- Fixed left sidebar with timeline -->
	<aside
		class="tl fixed top-1/2 left-4 w-auto -translate-y-1/2 pr-5 md:left-8 lg:left-20 xl:left-32"
	>
		<Timeline bind:activeSection formData={data?.form} {sectionProgress} />
	</aside>

	<div
		class="heading fixed z-1000 mx-auto flex min-h-[8rem] w-full items-end bg-background px-21 py-2 md:px-35 lg:min-h-[9.25rem] lg:px-85"
	>
		<MorphingText texts={[currentTitle]} />
	</div>

	<!-- Scrollable main content – your existing classes untouched -->
	<div
		class="mx-auto flex w-full flex-col items-center space-y-10 px-16 pt-[8rem] md:px-30 lg:px-80 lg:pt-[9.25rem]"
	>
		<AboutSection
			class="min-h-[calc(100vh-(9rem*1.2))] scroll-mt-[8rem] lg:min-h-[calc(100vh-(10.25rem*1.2))] lg:scroll-mt-[9.25rem]"
		/>
		<ProjectsSection
			projects={data.projects}
			meta={data.meta}
			class="min-h-[calc(100vh-(9rem*1.2))] scroll-mt-[8rem] lg:min-h-[calc(100vh-(10.25rem*1.2))] lg:scroll-mt-[9.25rem]"
		/>
		<BlogSection
			class="min-h-[calc(100vh-(9rem*2))] scroll-mt-[8rem] lg:min-h-[calc(100vh-(10.25rem*2))] lg:scroll-mt-[9.25rem]"
		/>
	</div>
</div>
