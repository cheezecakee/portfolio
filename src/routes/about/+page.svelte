<script lang="ts">
	import BentoGrid from '$lib/components/BentoGrid/BentoGrid.svelte';
	import BentoText from '$lib/components/BentoGrid/about/BentoText.svelte';
	import BentoTechStack from '$lib/components/BentoGrid/about/BentoTechStack.svelte';
	import { techCategories } from '$lib/components/BentoGrid/about/techStackData';
	// import BentoOrbital from '$lib/components/BentoGrid/about/BentoOrbital.svelte';

	const aboutDescription =
		"Hi there, welcome to my portfolio.\n\nFor as long as I can remember, I’ve always loved computers, and understanding how machines work has always interested me. This led me to pursue a degree in computer science, though I wasn’t sure what I wanted to do.\n\nWhile trying to figure that out, I was competing on a professional esports team and doing freelance work as an illustrator.\n\nThat changed during the pandemic when I got into coding. I’ve been building web apps and tools ever since. Coding is an endless learning experience, and every day I pick up something new.\n\nMy main focus is backend and software development, but I’ve also worked on production-level frontend projects. I've included a list of tools, languages, and frameworks I've worked with before. If you’d like to get in touch, feel free to send a message through the contact form.";
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="Learn more about me and my journey as a developer." />
</svelte:head>

<div class="mx-auto flex flex-col items-center justify-center space-y-6 px-5 md:px-30 lg:px-80">
	<!-- Gradient Title outside the grid -->

	<span
		class="pointer-events-none w-full bg-linear-to-b from-gray-100 to-gray-300/80 bg-clip-text px-5 text-start text-3xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-gray-100 dark:to-gray-300/50"
	>
		About Me
	</span>

	<BentoGrid class="w-full gap-6">
		<!-- Left column: Text + TechStack -->
		<div class="col-span-1 flex flex-col">
			<BentoText description={aboutDescription} showTitle={false} />
		</div>

		<!-- Right column: Orbital only -->
		<div class="col-span-1 flex flex-col items-start justify-start">
			<BentoTechStack title="Tech Stack" categories={techCategories} showTitle={true} />
			<!-- <BentoOrbital /> -->
		</div>
	</BentoGrid>
</div>
