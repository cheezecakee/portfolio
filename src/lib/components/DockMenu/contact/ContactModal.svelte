<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import ContactForm from './ContactForm.svelte';

	interface Props {
		open: boolean;
		data: { form: any };
	}

	let { open = $bindable(), data }: Props = $props();
</script>

<Dialog.Root bind:open>
	<Dialog.Content
		class="rounded-xl border border-white/10 bg-black p-6 shadow-[0_-20px_80px_-20px_rgba(255,255,255,0.12)_inset] sm:max-w-[425px]"
	>
		<Dialog.Header class="mb-4">
			<Dialog.Title
				class="pointer-events-none w-full bg-gradient-to-b from-gray-100 to-gray-300/80 bg-clip-text text-start text-2xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-gray-100 dark:to-gray-300/50"
			>
				Contact Me
			</Dialog.Title>
			<Dialog.Description class="text-start text-sm font-medium tracking-wider text-gray-200/80">
				Send me a message, I usually respond within a week!
			</Dialog.Description>
		</Dialog.Header>

		<ContactForm {data} />
	</Dialog.Content>
</Dialog.Root>
