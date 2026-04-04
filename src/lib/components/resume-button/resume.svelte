<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import resumeEn from '$lib/assets/resume/resume.pdf';
	import resumePt from '$lib/assets/resume/resume-portuguese.pdf';
	import Button from '../ui/button/button.svelte';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button
				{...props}
				variant="outline"
				size="lg"
				class="leading-none text-foreground"
				aria-label="Resume"
				style="animation: pulse-ring 2.5s ease-out infinite; --pulse-color: #ffffff;"
			>
				Resume
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content
		class="border-none bg-background text-center text-sm leading-none font-medium tracking-tight text-foreground lg:text-lg"
	>
		<DropdownMenu.Group>
			<a href={resumeEn} target="_blank" rel="noopener noreferrer">
				<DropdownMenu.Item>English</DropdownMenu.Item>
			</a>
			<a href={resumePt} target="_blank" rel="noopener noreferrer">
				<DropdownMenu.Item>Portuguese</DropdownMenu.Item>
			</a>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
