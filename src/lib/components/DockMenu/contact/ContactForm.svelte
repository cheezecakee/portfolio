<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { toast } from 'svelte-sonner';

	import { superForm } from 'sveltekit-superforms';
	// import SuperDebug from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { FormSchema, Subjects } from './contact-schema';

	let { data } = $props();

	const form = superForm(data.form, {
		validators: zod4Client(FormSchema),
		SPA: true,
		async onUpdate({ form }) {
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
					// Form resets automatically in v2
				} else {
					toast.error(result.error || 'Failed to send message');
				}
			} catch (error) {
				toast.error('Network error. Please try again.');
				console.error('Error:', error);
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="space-y-4">
	<!-- Name -->
	<Form.Field {form} name="name">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label
					class="text-xs font-medium tracking-wider text-gray-200 uppercase dark:text-gray-200"
				>
					Name
				</Form.Label>
				<Input
					{...props}
					bind:value={$formData.name}
					placeholder="Your name"
					class="rounded-md border  border-zinc-700 bg-transparent text-gray-200"
				/>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Email -->
	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label
					class="text-xs font-medium tracking-wider text-gray-200 uppercase dark:text-gray-200"
					>Email</Form.Label
				>
				<Input
					{...props}
					type="email"
					bind:value={$formData.email}
					placeholder="your.email@example.com"
					class="rounded-md border  border-zinc-700 bg-transparent text-gray-200"
				/>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Subject -->
	<Form.Field {form} name="subject" class="flex flex-row gap-2">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label
					class="text-xs font-medium tracking-wider text-gray-200 uppercase dark:text-gray-200"
					>Subject</Form.Label
				>
				<Select.Root type="single" bind:value={$formData.subject} name={props.name}>
					<Select.Trigger placeholder="Select a subject" {...props} class="w-[180px] text-gray-200">
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
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Message -->
	<Form.Field {form} name="message">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label
					class="text-xs font-medium tracking-wider text-gray-200 uppercase dark:text-gray-200"
					>Message</Form.Label
				>
				<Textarea
					{...props}
					bind:value={$formData.message}
					placeholder="Your message..."
					rows={5}
					class="rounded-md border  border-zinc-700  bg-transparent text-gray-200 "
				/>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button class="w-full">Send</Form.Button>
</form>

<!-- <SuperDebug data={$formData} /> -->
