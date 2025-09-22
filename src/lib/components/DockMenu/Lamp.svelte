<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		posX,
		style = '',
		className = '',
		isActive = false
	} = $props<{
		posX: number;
		style?: string;
		className?: string;
		isActive: boolean;
	}>();

	let showLamp = $derived(() => isActive);
</script>

<div
	class={cn(
		'absolute -top-0 flex -translate-x-1/2 transform flex-col items-center transition-all duration-200',
		className
	)}
	style={`left: ${posX ?? 0}px; ${style}`}
>
	{#if showLamp()}
		<!-- Lamp fixture/housing -->
		<div class="mb-1 h-1 w-4 rounded-sm border border-white bg-white"></div>
		<!-- Light beam shining down -->
		<div
			class="mx-auto -mt-1 h-8 w-8 bg-gradient-to-b from-white/40 via-white/20 to-transparent"
			style="clip-path: polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%);"
		></div>
	{/if}
</div>
