<script lang="ts">
	import {
		NewspaperIcon,
		CodeIcon,
		GithubLogoIcon,
		LinkedinLogoIcon,
		UserIcon,
		ChatTextIcon
	} from 'phosphor-svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { ContactModal } from '$lib/components/contact';
	import Dock from './dock.svelte';
	import DockIcon from './dock-icon.svelte';
	import type { Navs, NavItem, PageNav } from '$lib/types';
	import * as NavURL from '$lib/constants/navigation';
	import { goto } from '$app/navigation';

	interface Props {
		data?: { form: any };
		activeSection?: string;
	}

	let { data, activeSection = 'About' }: Props = $props();

	let currentSection = $derived(activeSection);

	let isContactModalOpen = $state(false);

	const navigationConfig: Navs = {
		navbar: [
			{ label: 'About', icon: UserIcon, type: 'page' },
			{ label: 'Projects', icon: CodeIcon, type: 'page' },
			{ label: 'Blog', icon: NewspaperIcon, type: 'page' }
		],
		contact: [
			{ label: 'Email', icon: ChatTextIcon, href: NavURL.EMAIL_URL, type: 'modal' },
			{ label: 'Github', icon: GithubLogoIcon, href: NavURL.GITHUB_URL, type: 'external' },
			{ label: 'LinkedIn', icon: LinkedinLogoIcon, href: NavURL.LINKEDIN_URL, type: 'external' }
		]
	};

	const sectionToHash: Record<string, string> = {
		About: NavURL.NAV_ABOUT,
		Projects: NavURL.NAV_PROJECTS,
		Blog: NavURL.NAV_BLOG
	};

	function isActiveNavItem(item: NavItem): boolean {
		return isPageNav(item) && item.label === currentSection;
	}
	function isPageNav(item: NavItem): item is PageNav {
		return item.type === 'page';
	}

	function handleNavigationClick(item: NavItem) {
		if (item.type === 'page') {
			const hashUrl = sectionToHash[item.label];
			if (hashUrl) {
				goto(hashUrl);
			}
		} else if (item.type === 'external') {
			window.open(item.href, '_blank', 'noopener,noreferrer');
		} else if (item.type === 'modal' && item.label === 'Email') {
			isContactModalOpen = true;
		}
	}
</script>

<Tooltip.Provider>
	<div
		class="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg
		bg-linear-to-t from-background/50 via-transparent to-transparent pb-5"
	>
		<Dock direction="middle" className="relative" activeSection={currentSection}>
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
									aria-label={navItem.label}
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
									aria-label={contactItem.label}
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

<ContactModal bind:open={isContactModalOpen} data={data ?? { form: null }} />
