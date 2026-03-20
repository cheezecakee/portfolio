<script lang="ts">
	import Combobox from '../ui/combobox/combobox.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { CaretDownIcon } from 'phosphor-svelte';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';

	type Option = {
		value: string;
		label: string;
	};

	type Props = {
		archive: {
			year: string;
			months: {
				month: string;
				posts: any[];
			}[];
		}[];
		years: Option[];
		tags: Option[];
		selectedYear: string | null;
		selectedTags: string[];
	};

	let {
		archive,
		years,
		tags,
		selectedYear = $bindable(),
		selectedTags = $bindable()
	}: Props = $props();

	function toggleTag(value: string) {
		if (selectedTags.includes(value)) {
			selectedTags = selectedTags.filter((t) => t !== value);
		} else {
			selectedTags = [...selectedTags, value];
		}
	}
</script>

<div class="flex w-full flex-col space-y-4">
	<!-- Title -->
	<!-- <span -->
	<!-- 	class="pointer-events-none w-full bg-linear-to-b from-gray-100 to-gray-300/80 bg-clip-text text-start text-2xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-gray-100 dark:to-gray-300/50" -->
	<!-- > -->
	<!-- 	Archive -->
	<!-- </span> -->
	<div class="mb-4">
		<h3 class="mb-1 text-xl font-semibold text-foreground">Archive</h3>
		<div class="h-0.5 w-12 rounded-full bg-linear-to-r from-primary to-primary/50"></div>
	</div>

	<!-- Filters -->
	<div class="flex flex-row gap-2">
		<!-- Year -->
		<Combobox options={years} placeholder="Year" bind:value={selectedYear} />

		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button {...props} variant="outline">
						{selectedTags.length
							? `${selectedTags.length} tag${selectedTags.length > 1 ? 's' : ''}`
							: 'Tags'}
					</Button>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-56 bg-card-foreground text-background">
				<DropdownMenu.Group>
					{#each tags as tag (tag.value)}
						<DropdownMenu.CheckboxItem
							checked={selectedTags.includes(tag.value)}
							onCheckedChange={() => toggleTag(tag.value)}
						>
							{tag.label}
						</DropdownMenu.CheckboxItem>
					{/each}
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>

		{#if selectedYear || selectedTags.length > 0}
			<Button
				variant="ghost"
				class="text-muted-foreground hover:text-foreground"
				onclick={() => {
					selectedYear = null;
					selectedTags = [];
				}}
			>
				Reset
			</Button>
		{/if}
	</div>
	<!-- Selected tags -->
	{#if selectedTags.length}
		<div class="flex flex-wrap gap-2">
			{#each selectedTags as tag}
				<Badge
					variant="secondary"
					class="cursor-pointer"
					onclick={() => (selectedTags = selectedTags.filter((t) => t !== tag))}
				>
					{tag} ✕
				</Badge>
			{/each}
		</div>
	{/if}

	{#each archive as yearBlock (yearBlock.year)}
		<Collapsible.Root class="w-full">
			<Collapsible.Trigger
				class={buttonVariants({ variant: 'ghost', class: 'w-full justify-between text-start' })}
			>
				<h4 class="text-xl font-bold">{yearBlock.year}</h4>
				<CaretDownIcon />
			</Collapsible.Trigger>

			<Collapsible.Content hiddenUntilFound class="space-y-2 pl-4">
				{#each yearBlock.months as monthBlock (monthBlock.month)}
					<div class="text-base font-semibold text-muted-foreground">
						{monthBlock.month}
						<div class="ml-3 space-y-1 border-l pl-3 text-foreground">
							{#each monthBlock.posts as post}
								<a href="/blog/{post.slug}">
									<div class="text-sm hover:text-white hover:underline">{post.meta.title}</div>
								</a>
							{/each}
						</div>
					</div>
				{/each}
			</Collapsible.Content>
		</Collapsible.Root>
	{/each}
</div>
