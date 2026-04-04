<script lang="ts">
	import { SpeedDial, SpeedDialTrigger, Listgroup, ListgroupItem } from 'flowbite-svelte';
	import CVIcon from '$lib/components/icons/CVIcon.svelte';
	import resumeEn from '$lib/assets/resume/resume.pdf';
	import resumePt from '$lib/assets/resume/resume-portuguese.pdf';
</script>

<SpeedDialTrigger class="group relative !m-0 flex items-center justify-center !p-0">
	{#snippet icon()}
		<div
			class="flex size-10 items-center justify-center rounded-full bg-primary/10 transition-all hover:bg-primary/20 md:size-12"
			style="animation: pulse-ring 2.5s ease-out infinite; --pulse-color: #3b82f6;"
		>
			<CVIcon class="size-5 md:size-6" />
		</div>
	{/snippet}
</SpeedDialTrigger>

<SpeedDial tooltip="none" placement="right-start" class="!mt-0 !p-0">
	<Listgroup class="divide-none rounded-lg bg-primary/10 backdrop-blur-sm">
		<a href={resumeEn} target="_blank" rel="noopener noreferrer">
			<ListgroupItem class="flex gap-2 px-4 py-2 text-sm text-foreground hover:bg-primary/20">
				English CV
			</ListgroupItem>
		</a>
		<a href={resumePt} target="_blank" rel="noopener noreferrer">
			<ListgroupItem class="flex gap-2 px-4 py-2 text-sm text-foreground hover:bg-primary/20">
				Portuguese CV
			</ListgroupItem>
		</a>
	</Listgroup>
</SpeedDial>
