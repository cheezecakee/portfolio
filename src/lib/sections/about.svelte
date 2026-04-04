<script lang="ts">
	import {
		BentoGrid,
		AboutTextCard,
		AboutTechStackCard,
		techCategories as techCategoriesData
	} from '$lib/components/bento-grid';
	import { cn } from '$lib/utils';

	let { class: className }: { class?: string } = $props();

	const aboutDescription =
		"I'm a backend developer who started coding during the pandemic. Curiosity turned into a deep passion for building the invisible infrastructure that makes applications work.\n\n" +
		"Most of my experience is with databases, APIs, and system architecture. I'm currently building a TUI framework in Go and exploring embedded systems. You can follow that journey on my blog.\n\n" +
		'Before coding, I competed professionally in esports and worked as an illustrator. That background taught me discipline, strategy, and attention to detail, skills that translate well to writing reliable software.\n\n' +
		"I'm early in my career and hungry to learn. If you're working on interesting backend or hardware‑adjacent projects, I'd love to chat.";
</script>

<div id="about" class={cn('mx-auto flex w-full items-center', className)}>
	<BentoGrid class="w-full gap-6">
		<!-- left column -->
		<div class="col-span-1 flex flex-col">
			<AboutTextCard description={aboutDescription} showTitle={false} />
		</div>
		<!-- right column -->
		<div class="col-span-1 flex flex-col items-start justify-start">
			<AboutTechStackCard title="Tech Stack" categories={techCategoriesData} showTitle={true} />
		</div>
	</BentoGrid>
</div>
