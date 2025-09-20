<script>
	// Phosphor Svelte Icons
	import {
		House,
		PencilSimple,
		Code,
		GithubLogo,
		LinkedinLogo,
		EnvelopeSimple
	} from 'phosphor-svelte';
	//    Shadcn Components
	import * as Tooltip from '$lib/components/ui/tooltip';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	//   Major Components
	import Dock from './Dock.svelte';
	import DockIcon from './DockIcon.svelte';

	let navs = {
		navbar: [
			{ label: 'Home', icon: House, href: '#' },
			{ label: 'Blog', icon: PencilSimple, href: '#' },
			{ label: 'Developer', icon: Code, href: '#' }
		],
		contact: [
			{ label: 'Github', icon: GithubLogo, href: '#' },
			{ label: 'LinkedIn', icon: LinkedinLogo, href: '#' },
			{ label: 'Email', icon: EnvelopeSimple, href: '#' }
		]
	};
</script>

<Tooltip.Provider>
	<div
		class="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-transparent via-background to-transparent md:shadow-xl"
	>
		<div>
			<Dock direction="middle" class="relative" let:mouseX let:distance let:magnification>
				{#each navs.navbar as item (item.label)}
					<DockIcon {mouseX} {magnification} {distance}>
						<Tooltip.Root>
							<Tooltip.Trigger
								class="mx-0 rounded-full p-3 transition-all duration-200 hover:bg-zinc-900/80"
							>
								<svelte:component this={item.icon} size={22} class="text-white" />
							</Tooltip.Trigger>
							<Tooltip.Content sideOffset={8}>
								<p>{item.label}</p>
							</Tooltip.Content>
						</Tooltip.Root>
					</DockIcon>
				{/each}
				<Separator orientation="vertical" class="h-full w-[0.6px]" />
				{#each navs.contact as item (item.label)}
					<DockIcon {mouseX} {magnification} {distance}>
						<Tooltip.Root>
							<Tooltip.Trigger
								class="mx-0 rounded-full p-3 transition-all duration-200 hover:bg-zinc-900/80"
							>
								<svelte:component this={item.icon} size={20} class="text-white" />
							</Tooltip.Trigger>
							<Tooltip.Content sideOffset={9}>
								<p>{item.label}</p>
							</Tooltip.Content>
						</Tooltip.Root>
					</DockIcon>
				{/each}
			</Dock>
		</div>
	</div>
</Tooltip.Provider>
