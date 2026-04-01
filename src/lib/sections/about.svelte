<script lang="ts">
	import BentoGrid from '$lib/components/BentoGrid/BentoGrid.svelte';
	import BentoText from '$lib/components/BentoGrid/about/BentoText.svelte';
	import BentoTechStack from '$lib/components/BentoGrid/about/BentoTechStack.svelte';
	import { techCategories } from '$lib/components/BentoGrid/about/techStackData';

	export let titleHolderRef: HTMLElement | null = null;

	const aboutDescription =
		"I'm a backend developer who started coding during the pandemic. Like many people, I was looking for something to dive into while the world was on pause.\n\n" +
		"What started as curiosity became an obsession. I love the feeling of building something from nothing, especially when it's the invisible infrastructure that makes applications work.\n\n" +
		"Most of my experience is in backend development, working with databases, APIs, and system architecture. But what excites me most right now is moving closer to the metal. I'm currently building a TUI framework in Go, exploring how to create rich user experiences at the terminal level, while also diving into embedded systems and hardware programming to understand how code interacts with physical components. You can follow this journey on my blog.\n\n" +
		'Before coding, I competed professionally in esports and worked as an illustrator. That background taught me discipline, strategy, and attention to detail, skills that surprisingly translate well to writing reliable software.\n\n' +
		"I'm early in my career but hungry to learn. If you're working on interesting backend problems or hardware-adjacent projects, I'd love to chat.";
</script>

<div
	id="about"
	class="panel-content mx-auto flex min-h-[80vh] w-full flex-col items-center bg-background px-5 md:px-30 lg:px-80"
>
	<BentoGrid class="w-full gap-6">
		<!-- left column -->
		<div class="col-span-1 flex flex-col">
			<BentoText description={aboutDescription} showTitle={false} />
		</div>
		<!-- right column -->
		<div class="col-span-1 flex flex-col items-start justify-start">
			<BentoTechStack title="Tech Stack" categories={techCategories} showTitle={true} />
		</div>
	</BentoGrid>
</div>
