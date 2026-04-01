<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let titleRef: HTMLElement;
	let aboutHeadingRef: HTMLElement;
	let startPosition = { x: 0, y: 0 };
	let endPosition = { x: 0, y: 0 };
	let distance = { x: 0, y: 0 };

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Get positions once (run after layout is stable)
		setTimeout(() => {
			const titleRect = titleRef.getBoundingClientRect();
			startPosition = { x: titleRect.left, y: titleRect.top };

			// Get heading position
			const headingRect = aboutHeadingRef.getBoundingClientRect();
			endPosition = { x: headingRect.left, y: headingRect.top };

			distance = {
				x: endPosition.x - startPosition.x,
				y: endPosition.y - startPosition.y
			};
		}, 100);

		// Create scroll animation that moves title from start to end
		ScrollTrigger.create({
			trigger: '.about-section',
			start: 'top 60%',
			end: 'top 20%',
			scrub: true,
			markers: true,
			onUpdate: (self) => {
				if (!titleRef) return;
				const progress = self.progress;
				const currentX = startPosition.x + distance.x * progress;
				const currentY = startPosition.y + distance.y * progress;

				titleRef.style.transform = `translate(${currentX - startPosition.x}px, ${currentY - startPosition.y}px)`;
			}
		});
	});
</script>

<div class="container">
	<h1>Title Movement Test</h1>
	<p>Title moves to about heading and stays there</p>

	<!-- Home section -->
	<section class="home-section">
		<div class="home-content">
			<div bind:this={titleRef} class="title z-1000">Moving Title</div>
		</div>
	</section>

	<!-- About section with titleHolder -->
	<section class="about-section">
		<div class="about-content">
			<span class="heading">About Section</span>
			<div bind:this={aboutHeadingRef} class="titleHolder z-1">About Heading (titleHolder)</div>
			<div class="bento-grid-placeholder">
				<div class="left-column">
					<h3>About Content</h3>
					<p>
						This is where your about content would go. The title should move here and stay pinned.
					</p>
				</div>
				<div class="right-column">
					<h3>Tech Stack</h3>
					<p>Go, TypeScript, Svelte, etc.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Mock Projects section with extra spacing -->
	<section class="projects-section">
		<div class="projects-content">
			<h2>Projects Section</h2>
			<p>
				This is a mock projects section to test if the title stays at the about heading when you
				scroll past it.
			</p>
			<div class="project-cards">
				<div class="card">Project 1</div>
				<div class="card">Project 2</div>
				<div class="card">Project 3</div>
			</div>
		</div>
	</section>
</div>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.container {
		font-family: sans-serif;
		width: 100%;
	}

	/* Home section */
	.home-section {
		width: 100%;
		min-height: 100vh;
		background: #f0f0f0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.home-content {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
		text-align: center;
	}

	.title {
		width: 200px;
		padding: 20px;
		background: #2196f3;
		color: white;
		text-align: center;
		border-radius: 8px;
		font-weight: bold;
		transition: transform 0.05s linear;
		will-change: transform;
		display: inline-block;
		z-index: 100;
		position: relative;
	}

	/* About section */
	.about-section {
		width: 100%;
		min-height: 100vh;
		background: #e0e0e0;
	}

	.about-content {
		max-width: 1280px;
		margin: 0 auto;
		padding: 0 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 100vh;
	}

	.heading {
		width: 100%;
		margin-bottom: 20px;
		display: block;
		font-size: 24px;
		font-weight: bold;
		color: #333;
	}

	.titleHolder {
		width: 200px;
		padding: 20px;
		background: #4caf50;
		color: white;
		text-align: center;
		border-radius: 8px;
		font-weight: bold;
		margin-bottom: 40px;
		display: inline-block;
		position: relative;
	}

	.bento-grid-placeholder {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 24px;
		width: 100%;
		margin-top: 20px;
	}

	.left-column,
	.right-column {
		padding: 20px;
		background: rgba(255, 255, 255, 0.5);
		border-radius: 8px;
		min-height: 200px;
	}

	/* Projects section - extra spacing */
	.projects-section {
		width: 100%;
		min-height: 100vh;
		background: #d0d0d0;
	}

	.projects-content {
		max-width: 1280px;
		margin: 0 auto;
		padding: 80px 20px;
		text-align: center;
	}

	.projects-content h2 {
		font-size: 32px;
		margin-bottom: 20px;
	}

	.project-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 24px;
		margin-top: 40px;
	}

	.card {
		padding: 60px 20px;
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		font-weight: bold;
	}

	h1 {
		position: fixed;
		top: 20px;
		left: 20px;
		z-index: 1000;
		font-size: 18px;
		background: white;
		padding: 8px 12px;
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	p {
		position: fixed;
		top: 60px;
		left: 20px;
		z-index: 1000;
		font-size: 12px;
		background: white;
		padding: 4px 8px;
		border-radius: 4px;
	}
</style>
