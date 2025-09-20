<script lang="ts">
	import BackgroundRippleEffect from '$lib/components/BackgroundRippleEffect/BackgroundRippleEffect.svelte';
</script>

<div class="relative h-full overflow-hidden dark:bg-black">
	<BackgroundRippleEffect />

	<!-- Center text within the BackgroundRippleEffect area -->
	<div
		class="pointer-events-none absolute inset-0 bottom-1 z-30 flex w-full flex-col items-center justify-center"
	>
		<div class="px-20 text-center md:px-0">
			<h2
				class="text-left text-2xl font-bold text-neutral-800 md:text-4xl lg:text-5xl dark:text-neutral-100"
			>
				Hi, I'm Anabel
			</h2>
			<p class="mt-4 text-left text-neutral-800 dark:text-neutral-500">
				Full-stack developer creating responsive experiences.
			</p>
		</div>
	</div>
</div>
