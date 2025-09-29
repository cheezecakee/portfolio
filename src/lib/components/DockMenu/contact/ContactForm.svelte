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

<form method="POST" use:enhance class="space-y-2">
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
					class="block h-12 w-52 rounded-md border-1 border-double border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)] [background-clip:padding-box,_border-box] bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none "
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

	<Form.Button class="relative inline-flex w-full overflow-hidden rounded-xl p-px">
		<span
			class="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#c2c2c2_0%,#505050_50%,#bebebe_100%)]"
		></span>
		<span
			class="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[11px] bg-neutral-950 px-4 py-2 text-sm font-medium text-gray-50 backdrop-blur-3xl"
		>
			Send
		</span>
	</Form.Button>
</form>

<!-- <SuperDebug data={$formData} /> -->
<style>
</style>
