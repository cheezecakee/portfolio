<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { MorphingText } from '$lib/components/magic/morphing-text';
	import { HomeSection, AboutSection, BlogSection } from '$lib/sections';
	import ProjectsSection from '$lib/sections/projects.svelte';
	import { useIsMobile } from '$lib/hooks/isMobile.svelte.js';
	let { data } = $props();

	let currentTitle = $state('Backend Developer');

	const mobile = useIsMobile();

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		ScrollTrigger.defaults({ markers: true });

		const title = document.querySelector('.title');
		const header = document.querySelector('header');
		if (!title || !header) return;

		const style = window.getComputedStyle(header);
		const pl = parseFloat(style.paddingLeft);
		const headerRect = header.getBoundingClientRect();

		gsap.set('.title', {
			position: 'fixed',
			left: '50%',
			top: '50%',
			x: '-50%',
			y: '-50%'
		});

		gsap.to('.title', {
			scrollTrigger: {
				trigger: '#home',
				start: 'top top',
				end: '+=400',
				scrub: true,
				markers: true
			},
			left: headerRect.left + pl + 'px',
			top: headerRect.bottom + 'px',
			x: 0,
			y: 0,
			duration: 1,
			ease: 'none'
		});

		const panels = gsap.utils.toArray<HTMLElement>('.panel');

		panels.forEach((panel, _i) => {
			const innerpanel = panel.querySelector('.panel-content') as HTMLElement | null;
			if (!innerpanel) return;

			let scrollNeeded: number;
			let spacing = false;
			const panelHeight = innerpanel.scrollHeight;
			const windowHeight = window.innerHeight;
			const contentOverflow = panelHeight - windowHeight;
			const pinOffset = windowHeight * 0.15;

			if (mobile.current) {
				scrollNeeded = contentOverflow + pinOffset;
				spacing = true;
			} else {
				scrollNeeded = panel.scrollHeight;
			}

			ScrollTrigger.create({
				trigger: panel,
				start: 'top 15%',
				end: `+=${scrollNeeded}`,
				pin: true,
				// snap: 1,
				pinSpacing: spacing,
				markers: true
			});
		});
	});
</script>

<div class="title-header fixed z-999 h-14 w-full bg-background md:h-18 lg:h-20"></div>

<div class="title z-1000 bg-background">
	<MorphingText texts={[currentTitle]} />
</div>

<!-- <div id="container" class="flex h-full w-full flex-col place-items-center"> -->
<div class="panel">
	<HomeSection />
</div>
<div class="panel">
	<AboutSection />
</div>
<div class="panel">
	<ProjectsSection projects={data.projects} meta={data.meta} />
</div>
<div class="panel">
	<BlogSection />
</div>
<!-- </div> -->
