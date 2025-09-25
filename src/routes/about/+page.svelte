<script lang="ts">
	import BentoGrid from '$lib/components/BentoGrid/BentoGrid.svelte';
	import BentoText from '$lib/components/BentoGrid/about/BentoText.svelte';
	import BentoTechStack from '$lib/components/BentoGrid/about/BentoTechStack.svelte';
	import { techCategories } from '$lib/components/BentoGrid/about/techStackData';
	import BentoOrbital from '$lib/components/BentoGrid/about/BentoOrbital.svelte';
	import { ShineButton } from '$lib/components/ui/shine-button';

	// Sample description for the about section
	const aboutDescription =
		"I'm a passionate junior developer with a love for creating innovative solutions and learning new technologies. My journey in software development has been driven by curiosity and a desire to build meaningful applications that make a difference.\n\nI enjoy working with modern web technologies and am always eager to tackle new challenges that help me grow as a developer.";
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="Learn more about me and my journey as a developer." />
</svelte:head>

<div class="mx-auto flex flex-col items-center justify-center space-y-6 px-5 md:px-30 lg:px-80">
	<!-- Gradient Title outside the grid -->

	<span
		class="pointer-events-none w-full bg-gradient-to-b from-gray-100 to-gray-300/80 bg-clip-text px-5 text-start text-3xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-gray-100 dark:to-gray-300/50"
	>
		About Me
	</span>

	<BentoGrid class="w-full gap-6">
		<!-- Left column: Text + TechStack -->
		<div class="col-span-1 flex flex-col">
			<BentoText description={aboutDescription} showTitle={false} />
			<BentoTechStack
				title="Tech Stack"
				categories={techCategories}
				showTitle={true}
				className="mt-6"
			/>
		</div>

		<!-- Right column: Orbital only -->
		<div class="col-span-1 flex items-start justify-center">
			<BentoOrbital />
		</div>
	</BentoGrid>
	<ShineButton>Test</ShineButton>
</div>
