<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import MagicCard from '$lib/components/ui/magic-card/magic-card.svelte';
	import { Button } from '$lib/components/ui/button';
	import ShineBorder from '$lib/components/ui/shine-border/shine-border.svelte';
	import type { ProcessedProject } from '../../../routes/+page.server';

	export const className = '';
	export let project: ProcessedProject;

	let isDescriptionExpanded = false;

	// Configuration for description truncation
	const MAX_DESCRIPTION_LENGTH = 120;
	const shouldTruncateDescription = project.description.length > MAX_DESCRIPTION_LENGTH;
	const truncatedDescription = shouldTruncateDescription
		? project.description.slice(0, MAX_DESCRIPTION_LENGTH).trim() + '...'
		: project.description;

	function toggleDescription() {
		isDescriptionExpanded = !isDescriptionExpanded;
	}
</script>

<Card.Root class="flex min-h-70 w-full flex-1 border-none p-0 shadow-none">
	<MagicCard
		gradientSize={160}
		gradientColor="rgba(255,255,255,0.05)"
		gradientFrom="#ffffff"
		gradientTo="#e5e5e5"
		gradientOpacity={0.4}
		class="h-full p-0"
	>
		<Card.Header class="p-4 px-6">
			<Card.Title class="text-xl font-semibold">
				{project.title}
			</Card.Title>
		</Card.Header>
		<Card.Content class="flex w-full flex-1 flex-col px-6">
			<div class="mb-6 flex-1">
				<p class="text-sm leading-relaxed">
					{isDescriptionExpanded ? project.description : truncatedDescription}
				</p>
				{#if shouldTruncateDescription}
					<Button
						variant="link"
						size="xs"
						class="pointer-events-auto px-0  text-muted-foreground hover:underline hover:underline-offset-2 dark:hover:text-foreground"
						onclick={toggleDescription}
					>
						{isDescriptionExpanded ? 'Show less' : 'Read more'}
					</Button>
				{/if}
			</div>
			{#if project.languages.length > 0}
				<div class="mb-4 space-y-3">
					<h4 class="text-xs font-medium tracking-wider uppercase">Technologies</h4>
					<div class="flex flex-wrap gap-2">
						{#each project.languages as tech (tech)}
							<span class="rounded-md border bg-background px-2 py-1 text-xs transition-colors">
								{tech}
							</span>
						{/each}
					</div>
				</div>
			{/if}
		</Card.Content>
		<Card.Footer class="mx-auto w-full justify-start p-4">
			<a href={project.href} target="_blank" rel="noopener noreferrer">
				<Button variant="outline" class="group relative overflow-hidden">
					<ShineBorder
						class="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						shineColor="#ffffff"
					/>
					View Project →
				</Button>
			</a>
		</Card.Footer>
	</MagicCard>
</Card.Root>
