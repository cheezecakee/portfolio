<script lang="ts">
	import { LinkIcon, CheckIcon } from 'phosphor-svelte';

	let {
		title,
		date,
		tags = [],
		children
	}: { title: string; date: string; tags: string[]; children?: any } = $props();

	const formatted = $derived(
		new Date(date ?? Date.now()).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	);

	let copied = $state(false);

	function copyLink() {
		navigator.clipboard.writeText(window.location.href);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
</svelte:head>

<article class="mx-auto flex min-h-[calc(100dvh-18rem)] flex-col space-y-6 px-5">
	<!-- Title  -->
	<div class="flex flex-col text-left">
		<h1 class="w-full text-4xl font-bold">{title}</h1>
		<div class="mt-2 flex w-full justify-start gap-3 text-sm text-white/50">
			<span>{formatted}</span>
			{#if tags.length}
				<span>|</span>
				{#each tags as tag, i}
					<span>{i > 0 ? '· ' : ''}{tag}</span>
				{/each}
			{/if}
		</div>
	</div>

	<hr class="border-white/10" />

	<!-- Content  -->
	<div class="flex-1 py-5">
		{@render children?.()}
	</div>

	<hr class="border-white/10" />

	<!-- Footer -->
	<div class="flex justify-between">
		<a href="/blog" class="text-sm text-white/40 hover:text-white/80">← Back to blog</a>
		<button
			onclick={copyLink}
			class="text-white/40 transition hover:text-white/80"
			aria-label="Copy link"
		>
			{#if copied}
				<CheckIcon size={18} />
			{:else}
				<LinkIcon size={18} />
			{/if}
		</button>
	</div>
</article>
