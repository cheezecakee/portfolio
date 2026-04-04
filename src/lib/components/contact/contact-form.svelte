<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { toast } from 'svelte-sonner';

	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { FormSchema, Subjects } from './contact-schema';
	import ShineBorder from '$lib/components/ui/shine-border/shine-border.svelte';

	let { data } = $props();

	const form = superForm(data.form, {
		validators: zod4Client(FormSchema),
		SPA: true,
		onSubmit: async ({ form }) => {
			if (!form.valid) {
				toast.error('Please fix the errors in the form.');
				return;
			}

			try {
				const response = await fetch('/api/contact', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(form.data)
				});

				const result = await response.json();

				if (response.ok) {
					toast.success('Message sent successfully!');
				} else {
					toast.error(result.error || 'Failed to send message');
				}
			} catch {
				toast.error('Network error. Please try again.');
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="space-y-5">
	<!-- Name -->
	<Form.Field {form} name="name">
		<Form.Control>
			{#snippet children({ props })}
				<div class="flex flex-col gap-2">
					<Form.Label class="text-xs font-medium tracking-wider uppercase">Name</Form.Label>
					<Input
						{...props}
						bind:value={$formData.name}
						placeholder="Your name"
						class="h-12 w-full rounded-md"
					/>
				</div>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Email -->
	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<div class="flex flex-col gap-2">
					<Form.Label class="text-xs font-medium tracking-wider uppercase">Email</Form.Label>
					<Input
						{...props}
						type="email"
						bind:value={$formData.email}
						placeholder="your.email@example.com"
						class="h-12 w-full rounded-md"
					/>
				</div>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Subject -->
	<Form.Field {form} name="subject">
		<Form.Control>
			{#snippet children({ props })}
				<div class="flex flex-col gap-2">
					<Form.Label class="text-xs font-medium tracking-wider uppercase">Subject</Form.Label>
					<Select.Root type="single" bind:value={$formData.subject} name={props.name}>
						<Select.Trigger {...props} class="h-12 w-full">
							{$formData.subject || 'Select a subject'}
						</Select.Trigger>
						<Select.Content>
							{#each Object.entries(Subjects) as [key, value] (key)}
								<Select.Item {value}>
									{value}
								</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Message -->
	<Form.Field {form} name="message">
		<Form.Control>
			{#snippet children({ props })}
				<div class="flex flex-col gap-2">
					<Form.Label class="text-xs font-medium tracking-wider uppercase">Message</Form.Label>
					<Textarea
						{...props}
						bind:value={$formData.message}
						placeholder="Your message..."
						rows={5}
						class="w-full rounded-md"
					/>
				</div>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button variant="outline" class="w-full rounded-md py-4 text-sm font-medium">
		<ShineBorder
			class="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
			shineColor="#ffffff"
		/>

		Send
	</Form.Button>
</form>
