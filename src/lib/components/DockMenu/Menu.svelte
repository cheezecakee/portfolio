<script lang="ts">
	import { House, User, Code, GithubLogo, LinkedinLogo, EnvelopeSimple } from 'phosphor-svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Dock from './Dock.svelte';
	import DockIcon from './DockIcon.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import type { Navs, NavItem, PageNav } from '$lib/types';
	import * as NavURL from '$lib/constants/navigation';

	let currentPage = $derived(page.url.pathname);
	let activeModalId = $state<string | null>(null);

	const navigationConfig: Navs = {
		navbar: [
			{ label: 'Home', icon: House, href: NavURL.NAV_HOME, type: 'page' },
			{ label: 'About', icon: User, href: NavURL.NAV_ABOUT, type: 'page' },
			{ label: 'Projects', icon: Code, href: NavURL.NAV_PROJECTS, type: 'page' }
		],
		contact: [
			{ label: 'Github', icon: GithubLogo, href: NavURL.GITHUB_URL, type: 'external' },
			{ label: 'LinkedIn', icon: LinkedinLogo, href: NavURL.LINKEDIN_URL, type: 'external' },
			{ label: 'Email', icon: EnvelopeSimple, href: NavURL.EMAIL_URL, type: 'modal' }
		]
	};

	function isPageNav(item: NavItem): item is PageNav {
		return item.type === 'page';
	}

	function isActiveNavItem(item: NavItem): boolean {
		return isPageNav(item) && currentPage === item.href;
	}

	function handleNavigationClick(item: NavItem) {
		if (isPageNav(item)) goto(item.href);
		else if (item.type === 'external') window.open(item.href, '_blank', 'noopener,noreferrer');
		else if (item.type === 'modal') openModal(item.label);

		// Reset activeModalId if navigating to a page
		activeModalId = item.type === 'page' ? null : activeModalId;
	}

	function openModal(id: string) {
		activeModalId = id;
		setTimeout(() => closeModal(), 3000);
	}

	function closeModal() {
		activeModalId = null;
	}
</script>

<Tooltip.Provider>
	<div
		class="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg
		bg-gradient-to-t from-black/50 via-transparent to-transparent pb-10"
	>
		<Dock direction="middle" className="relative">
			{#snippet children({
				onHover,
				onRegister,
				onResize,
				isAnyIconHovered
			}: {
				onHover: (centerX: number, label: string) => void;
				onRegister: (centerX: number, label: string) => void;
				onResize: () => void;
				isAnyIconHovered: boolean;
			})}
				{#each navigationConfig.navbar as navItem (navItem.label)}
					{@const Icon = navItem.icon}
					{@const isActive = isActiveNavItem(navItem)}
					<DockIcon
						label={navItem.label}
						{onHover}
						{onRegister}
						{onResize}
						enableHover={true}
						{isActive}
						className=""
					>
						{#snippet children(isHovered, iconIsActive)}
							<Tooltip.Root>
								<Tooltip.Trigger
									class={`flex h-full w-full items-center justify-center transition-all duration-200
		${
			isHovered
				? 'scale-110 rounded-full bg-white/20'
				: iconIsActive && !isAnyIconHovered
					? 'rounded-full bg-white/10'
					: ''
		}`}
									onclick={() => handleNavigationClick(navItem)}
								>
									<Icon size={22} class="text-white" />
								</Tooltip.Trigger>

								<Tooltip.Content sideOffset={8}><p>{navItem.label}</p></Tooltip.Content>
							</Tooltip.Root>
						{/snippet}
					</DockIcon>
				{/each}

				<Separator orientation="vertical" class="h-full w-[0.6px]" />

				{#each navigationConfig.contact as contactItem (contactItem.label)}
					{@const Icon = contactItem.icon}
					<DockIcon
						label={contactItem.label}
						{onHover}
						{onRegister}
						{onResize}
						enableHover={true}
						isActive={false}
						className=""
					>
						{#snippet children(isHovered, iconIsActive)}
							<Tooltip.Root>
								<Tooltip.Trigger
									class={`flex h-full w-full items-center justify-center transition-all duration-200
		${
			isHovered
				? 'scale-110 rounded-full bg-white/20'
				: iconIsActive && !isAnyIconHovered
					? 'rounded-full bg-white/10'
					: ''
		}`}
									onclick={() => handleNavigationClick(contactItem)}
								>
									<Icon size={22} class="text-white" />
								</Tooltip.Trigger>

								<Tooltip.Content sideOffset={9}><p>{contactItem.label}</p></Tooltip.Content>
							</Tooltip.Root>
						{/snippet}
					</DockIcon>
				{/each}
			{/snippet}
		</Dock>
	</div>
</Tooltip.Provider>

{#if activeModalId}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
		<div class="rounded-lg bg-white p-6 text-black">
			<h2 class="text-xl font-bold">Modal: {activeModalId}</h2>
			<p>This is a modal for {activeModalId}</p>
			<button
				onclick={closeModal}
				class="mt-4 rounded bg-black px-4 py-2 text-white hover:bg-black"
			>
				Close
			</button>
		</div>
	</div>
{/if}
