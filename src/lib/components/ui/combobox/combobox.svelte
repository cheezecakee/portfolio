<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { useIsMobile } from '$lib/hooks/isMobile.svelte';

	const mobile = useIsMobile();

	type Option = {
		value: string;
		label: string;
	};

	let {
		options,
		placeholder = 'Select',
		value = $bindable<string | null>()
	}: {
		options: Option[];
		placeholder?: string;
		value?: string | null;
	} = $props();

	let open = $state(false);
	let selectedOption = $derived(options.find((o) => o.value === value) ?? null);

	function handleOptionSelect(v: string) {
		value = v;
		open = false;
	}
</script>

{#if !mobile.current}
	<Popover.Root bind:open>
		<Popover.Trigger>
			<Button variant="outline" class="w-37.5 justify-start">
				{selectedOption ? selectedOption.label : placeholder}
			</Button>
		</Popover.Trigger>
		<Popover.Content class="w-50 p-0" align="start">
			<Command.Root class="bg-card-foreground">
				<Command.Input placeholder={`Filter ${placeholder}...`} class="text-background" />
				<Command.List>
					<Command.Empty class="text-background">No results found.</Command.Empty>
					<Command.Group>
						{#each options as option (option.value)}
							<Command.Item
								value={option.value}
								onSelect={() => handleOptionSelect(option.value)}
								class=" text-background"
							>
								{option.label}
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.List>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Trigger>
			<Button variant="outline" class="w-37.5 justify-start">
				{selectedOption ? selectedOption.label : placeholder}
			</Button>
		</Drawer.Trigger>
		<Drawer.Content>
			<div class="mt-4 border-t">
				<Command.Root>
					<Command.Input placeholder={`Filter ${placeholder}...`} />
					<Command.List>
						<Command.Empty>No results found.</Command.Empty>
						<Command.Group>
							{#each options as option (option.value)}
								<Command.Item
									value={option.value}
									onSelect={() => handleOptionSelect(option.value)}
								>
									{option.label}
								</Command.Item>
							{/each}
						</Command.Group>
					</Command.List>
				</Command.Root>
			</div>
		</Drawer.Content>
	</Drawer.Root>
{/if}
