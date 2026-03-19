<script lang="ts">
	import type { BlogPost } from '$lib/blog/types';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import MagicCard from '$lib/components/ui/magic-card/magic-card.svelte';
	import ShineBorder from '$lib/components/ui/shine-border/shine-border.svelte';

	let { post }: { post: BlogPost } = $props();
</script>

<Card.Root class="w-full border-none p-0 shadow-none">
	<MagicCard
		gradientSize={160}
		gradientColor="rgba(255,255,255,0.05)"
		gradientFrom="#ffffff"
		gradientTo="#e5e5e5"
		gradientOpacity={0.4}
		class="p-0"
	>
		<Card.Header class="border-b p-4 [.border-b]:pb-4">
			<Card.Title></Card.Title>
			{#if post}
				<Card.Title class="text-lg">{post.meta.title}</Card.Title>
				<Card.Description>
					{new Date(post.meta.date).toLocaleDateString(undefined, {
						year: 'numeric',
						month: 'short',
						day: 'numeric'
					})}
				</Card.Description>
			{:else}
				<Card.Title></Card.Title>
			{/if}
		</Card.Header>
		<Card.Content class="w-full px-4">
			{#if !post}
				<p class="text-md mt-2 text-neutral-400">No posts yet.</p>
			{:else}
				<p class="mt-2 text-sm text-neutral-400">
					{post.meta.description}
				</p>
			{/if}
		</Card.Content>
		<Card.Footer class="mx-auto justify-end gap-2 p-4">
			{#if post}
				<a href="/blog/{post.slug}">
					<Button variant="outline" class="group relative overflow-hidden">
						<ShineBorder
							class="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
							shineColor="#ffffff"
						/>
						Read article →
					</Button>
				</a>
			{/if}
		</Card.Footer>
	</MagicCard>
</Card.Root>
