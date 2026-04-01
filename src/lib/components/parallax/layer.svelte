<!-- Layer.svelte -->
<script lang="ts">
	let scroll = $state(0);
	let { speed, children, start = 0 } = $props();
	
	// Calculate transform: content starts at 0, then moves up after passing start point
	let transform = $derived(() => {
		if (scroll <= start) return 0;
		return -(scroll - start) * (1 - speed);
	});
</script>

<svelte:window bind:scrollY={scroll} />

<div 
	class="relative"
	style:transform={`translateY(${transform()}px)`}
	style:will-change="transform"
>
	{@render children?.()}
</div>
