<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import ShimmerButton from '$lib/components/ui/shimmer-button/ShimmerButton.svelte';
	import Menu from '$lib/components/DockMenu/Menu.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';

	import resumeEn from '$lib/assets/resume/resume.pdf';
	import resumePt from '$lib/assets/resume/resume-portuguese.pdf';

	let open = false;

	function toggle() {
		open = !open;
	}

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="dark flex min-h-screen flex-col bg-black text-white">
	<!-- Header -->
	<header
		class="fixed z-50 flex w-full items-center justify-between bg-linear-to-b from-black to-transparent px-5 py-5 md:px-30 lg:px-60"
	>
		<!-- Left side (button) -->
		<div></div>

		<!-- Right side -->
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<ShimmerButton class="shadow-2xl" on:click={toggle}>
					<span
						class="text-center text-sm leading-none font-medium tracking-tight whitespace-pre-wrap text-white lg:text-lg dark:from-white dark:to-slate-900/10"
					>
						Resume
					</span>
				</ShimmerButton>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class=" border-none border-black bg-slate-900/10 text-center text-sm leading-none font-medium tracking-tight text-white lg:text-lg "
			>
				<DropdownMenu.Group>
					<DropdownMenu.Item>
						<a href={resumeEn} target="_blank" rel="noopener noreferrer">Resume - English</a>
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<a href={resumePt} target="_blank" rel="noopener noreferrer">Resume - Portuguese</a>
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</header>

	<!-- Main content -->
	<main class="flex-1 overflow-y-auto pt-20 pb-40">
		{@render children?.()}
	</main>

	<!-- Dock Menu - Pass page data -->
	<div
		class="fixed bottom-10 left-1/2 z-50 w-full -translate-x-1/2 bg-linear-to-b from-transparent to-black"
	>
		<Menu {data} />
	</div>

	<!-- Footer -->
	<footer class="fixed bottom-0 z-60 w-full bg-black pb-5 text-center text-sm text-neutral-400">
		&copy; {new Date().getFullYear()} Cheezecake. All rights reserved.
	</footer>

	<!-- Toast Notifications -->
	<Toaster
		theme="dark"
		class="toaster group"
		toastOptions={{
			classes: {
				toast:
					'group toast group-[.toaster]:bg-black group-[.toaster]:text-white group-[.toaster]:border-zinc-700 group-[.toaster]:shadow-lg',
				description: 'group-[.toast]:text-neutral-400',
				actionButton: 'group-[.toast]:bg-white group-[.toast]:text-black',
				cancelButton: 'group-[.toast]:bg-neutral-800 group-[.toast]:text-white'
			}
		}}
	/>
</div>
