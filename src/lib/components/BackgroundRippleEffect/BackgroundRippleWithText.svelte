<script lang="ts">
	import BackgroundRippleEffect from '$lib/components/BackgroundRippleEffect/BackgroundRippleEffect.svelte';
</script>

<div class="relative h-full overflow-hidden dark:bg-black">
	<BackgroundRippleEffect />

	<!-- Center text within the BackgroundRippleEffect area -->
    <div class="space-y-3 px-20 text-center md:px-0">
        <h2 class="text-3xl font-bold text-neutral-800 md:text-5xl lg:text-6xl dark:text-neutral-100">
            Backend developer.<br />
            <span class="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Systems explorer.
            </span>
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-neutral-600 dark:text-neutral-400">
            I build infrastructure and tools. Currently crafting a TUI framework in Go.
        </p>
    </div>
</div>
