<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import ContactForm from './contact-form.svelte';

	interface Props {
		open: boolean;
		data: { form: any };
	}

	let { open = $bindable(), data }: Props = $props();
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="rounded-xl border bg-card p-6 sm:max-w-[425px]">
		<Dialog.Header class="mb-6">
			<Dialog.Title
				class="bg-gradient-to-b from-gray-100 to-gray-300/80 bg-clip-text text-2xl font-semibold text-transparent"
			>
				Contact Me
			</Dialog.Title>
			<Dialog.Description class="text-sm font-medium tracking-wider text-foreground">
				Send me a message, I usually respond within a week!
			</Dialog.Description>
		</Dialog.Header>

		<ContactForm {data} />
	</Dialog.Content>
</Dialog.Root>
