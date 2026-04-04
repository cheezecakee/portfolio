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
		"Hello! I'm Anabel a self-taught software developer whose curiosity turned into a passion for building the invisible infrastructure that makes applications work. I love building tools in Golang that help create and enhance workflow.\n\n" +
		"Currently I'm building a TUI framework built on Bubble Tea, you can follow that journey on my blog down below.\n\n" +
		"I'm early in my career and hungry to learn. If you have any questions I would love to chat.";
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
