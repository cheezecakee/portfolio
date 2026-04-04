<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { cn } from '$lib/utils';

	interface MorphingTextProps {
		texts: string[];
		class?: string;
	}

	let { texts, class: className }: MorphingTextProps = $props();

	const morphTime = 1.5;
	let morph = $state(0);
	let isMorphing = $state(false);
	let currentText = $state('');
	let nextText = $state('');
	let text1Ref: HTMLSpanElement | null = $state(null);
	let text2Ref: HTMLSpanElement | null = $state(null);
	let containerRef: HTMLDivElement | null = $state(null);
	let animationFrameId: number | null = null;
	let lastTimestamp = 0;

	$effect(() => {
		if (!texts.length) return;
		const newText = texts[0];
		if (!currentText) {
			currentText = newText;
			nextText = newText;
			if (text1Ref) text1Ref.textContent = currentText;
			if (text2Ref) text2Ref.textContent = nextText;
		} else if (newText !== currentText && newText !== nextText) {
			nextText = newText;
			isMorphing = true;
			morph = 0;
		}
	});

	function setStyles(fraction: number) {
		if (!text1Ref || !text2Ref) return;
		const blurCurrent = Math.min(8 / (1 - fraction + 0.01) - 8, 100);
		const blurNext = Math.min(8 / (fraction + 0.01) - 8, 100);
		text1Ref.style.filter = `blur(${blurCurrent}px)`;
		text1Ref.style.opacity = `${Math.pow(1 - fraction, 0.4) * 100}%`;
		text2Ref.style.filter = `blur(${blurNext}px)`;
		text2Ref.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
		text1Ref.textContent = currentText;
		text2Ref.textContent = nextText;
	}

	function animate(timestamp: number) {
		if (!animationFrameId) return;
		const dt = Math.min(0.033, (timestamp - lastTimestamp) / 1000);
		lastTimestamp = timestamp;

		if (isMorphing) {
			morph += dt / morphTime;
			if (morph >= 1) {
				morph = 1;
				setStyles(1);
				currentText = nextText;
				isMorphing = false;
				morph = 0;
				if (text1Ref) {
					text1Ref.style.filter = '';
					text1Ref.style.opacity = '100%';
				}
				if (text2Ref) {
					text2Ref.style.filter = '';
					text2Ref.style.opacity = '0%';
				}
				text1Ref!.textContent = currentText;
				text2Ref!.textContent = currentText;
			} else {
				setStyles(morph);
			}
		}
		animationFrameId = requestAnimationFrame(animate);
	}

	onMount(() => {
		lastTimestamp = performance.now();
		animationFrameId = requestAnimationFrame(animate);
	});

	onDestroy(() => {
		if (animationFrameId) cancelAnimationFrame(animationFrameId);
	});
</script>

<div
	bind:this={containerRef}
	class={cn(
		'relative inline-block text-left font-sans text-[30pt] leading-none font-bold [filter:url(#threshold)_blur(0.6px)] lg:text-[3rem]',
		className
	)}
	style="white-space: nowrap;"
>
	<!-- Invisible placeholder to reserve width -->
	<span class="invisible" aria-hidden="true" style="display: inline-block;">
		{texts[0]}
	</span>
	<!-- Morphing spans -->
	<span
		bind:this={text1Ref}
		class="absolute inset-0 flex place-items-start"
		style="width: 100%; text-align: center; white-space: nowrap; display: inline-flex;"
	></span>
	<span
		bind:this={text2Ref}
		class="absolute inset-0 flex place-items-start"
		style="width: 100%; text-align: center; white-space: nowrap; display: inline-flex;"
	></span>
	<svg id="filters" class="fixed h-0 w-0" preserveAspectRatio="xMidYMid slice">
		<defs>
			<filter id="threshold">
				<feColorMatrix
					in="SourceGraphic"
					type="matrix"
					values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 255 -140"
				/>
			</filter>
		</defs>
	</svg>
</div>
