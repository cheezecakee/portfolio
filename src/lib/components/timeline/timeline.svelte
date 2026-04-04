<script lang="ts">
	import {
		UserIcon,
		CodeIcon,
		ArticleIcon,
		GithubLogoIcon,
		LinkedinLogoIcon,
		ChatTextIcon
	} from 'phosphor-svelte';
	import { ContactModal } from '$lib/components/contact';
	import { ResumeButton } from '$lib/components/resume-button';
	import { onMount } from 'svelte';

	let { activeSection = $bindable(1), formData = $bindable(null), sectionProgress = 0 } = $props();

	const routes = [
		{ id: 1, icon: UserIcon, label: 'About', sectionId: 'about' },
		{ id: 2, icon: CodeIcon, label: 'Projects', sectionId: 'projects' },
		{ id: 3, icon: ArticleIcon, label: 'Blog', sectionId: 'blog' }
	];

	const contactItems = [
		{ icon: ChatTextIcon, label: 'Email', type: 'modal', href: null },
		{
			icon: GithubLogoIcon,
			label: 'GitHub',
			type: 'external',
			href: 'https://github.com/cheezecakee'
		},
		{
			icon: LinkedinLogoIcon,
			label: 'LinkedIn',
			type: 'external',
			href: 'https://www.linkedin.com/in/anabel-pereira-moraes-00806a156/'
		}
	];

	let isContactModalOpen = $state(false);
	let containerRef: HTMLElement | null = $state(null);
	let buttonRefs: (HTMLElement | null)[] = $state([]);

	// Store connector positions and lengths
	let connectors: { top: number; height: number }[] = $state([]);

	function updateConnectors() {
		if (!containerRef) return;
		const containerRect = containerRef.getBoundingClientRect();
		const newConnectors = [];

		for (let i = 0; i < routes.length - 1; i++) {
			const fromEl = buttonRefs[i];
			const toEl = buttonRefs[i + 1];
			if (!fromEl || !toEl) continue;

			const fromRect = fromEl.getBoundingClientRect();
			const toRect = toEl.getBoundingClientRect();
			const fromCenterY = fromRect.top + fromRect.height / 2 - containerRect.top;
			const toCenterY = toRect.top + toRect.height / 2 - containerRect.top;
			const height = Math.abs(toCenterY - fromCenterY);
			const top = Math.min(fromCenterY, toCenterY);
			newConnectors.push({ top, height });
		}
		connectors = newConnectors;
	}

	// Fill for each connector (between route i and i+1)
	let connectorFills = $derived(
		routes.slice(0, -1).map((_, idx) => {
			const sectionNum = idx + 1;
			if (activeSection === sectionNum) return sectionProgress;
			if (activeSection > sectionNum) return 1;
			return 0;
		})
	);

	$effect(() => {
		updateConnectors();
	});

	let resizeObserver: ResizeObserver | null = null;
	onMount(() => {
		updateConnectors();
		resizeObserver = new ResizeObserver(() => updateConnectors());
		if (containerRef) resizeObserver.observe(containerRef);
		window.addEventListener('resize', updateConnectors);
		return () => {
			resizeObserver?.disconnect();
			window.removeEventListener('resize', updateConnectors);
		};
	});

	function scrollToSection(sectionId: string) {
		document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
	}

	function handleContactClick(item: (typeof contactItems)[0]) {
		if (item.type === 'modal') isContactModalOpen = true;
		else if (item.type === 'external' && item.href)
			window.open(item.href, '_blank', 'noopener,noreferrer');
	}
</script>

<div bind:this={containerRef} class="relative flex flex-col">
	<!-- Connectors  -->
	{#each connectors as conn, idx}
		<div
			class="absolute w-0.5 -translate-x-1/2"
			style="left: 50%; top: {conn.top}px; height: {conn.height}px; background-color: rgba(255,255,255,0.2);"
		>
			<!-- Progress fill -->
			<div
				class="absolute top-0 w-full transition-all duration-300"
				style="height: {connectorFills[idx] *
					100}%; background-color: oklch(0.9636 0.0086 264.5200);"
			></div>
		</div>
	{/each}

	<!-- Navigation buttons -->
	<div class="flex flex-col gap-14 md:gap-16">
		{#each routes as item, idx}
			<button
				bind:this={buttonRefs[idx]}
				class="group relative flex items-center justify-center rounded-full border border-white/75 bg-background"
				onclick={() => {
					activeSection = item.id;
					scrollToSection(item.sectionId);
				}}
			>
				<div
					class="flex size-10 items-center justify-center rounded-full transition-all md:size-12
            {activeSection === item.id
						? 'bg-primary text-primary-foreground'
						: 'bg-background text-muted-foreground hover:bg-primary/20'}"
				>
					<item.icon size={20} class="md:size-6" />
				</div>
				<span
					class="absolute left-12 rounded-md bg-background px-2 py-1 text-sm whitespace-nowrap opacity-0 shadow-md transition-opacity group-hover:opacity-100 md:left-14"
				>
					{item.label}
				</span>
			</button>
		{/each}
	</div>

	<!-- Contact + Resume -->
	<div class="mt-14 flex flex-col gap-4 md:gap-5">
		{#each contactItems as item}
			<button
				class="group relative flex items-center justify-center rounded-full border border-white/75 bg-background"
				onclick={() => handleContactClick(item)}
			>
				<div
					class="flex size-10 items-center justify-center rounded-full bg-background text-muted-foreground transition-all hover:bg-primary/20 md:size-12"
				>
					<item.icon size={20} class="md:size-6" />
				</div>
				<span
					class="absolute left-12 rounded-md bg-background px-2 py-1 text-sm whitespace-nowrap opacity-0 shadow-md transition-opacity group-hover:opacity-100 md:left-14"
				>
					{item.label}
				</span>
			</button>
		{/each}
		<div class="mt-0"><ResumeButton /></div>
	</div>
</div>

<ContactModal bind:open={isContactModalOpen} data={{ form: formData }} />
