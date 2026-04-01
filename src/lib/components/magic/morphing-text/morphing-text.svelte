<script lang="ts">
	import { onDestroy } from 'svelte';
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';

	interface MorphingTextProps {
		texts: string[];
		class?: string;
	}

	let { texts, class: className }: MorphingTextProps = $props();

	const morphTime = 1.5;
	const cooldownTime = 0.5;

	let text1Ref: HTMLSpanElement | null = $state(null);
	let text2Ref: HTMLSpanElement | null = $state(null);
	let placeholderRef: HTMLSpanElement | null = $state(null);

	let morph = $state(0);
	let cooldown = $state(0);
	let isMorphing = $state(false);
	let prevText = $state('');
	let nextText = $state('');

	let animationFrameId: number | null = null;
	let time = $state(Date.now());

	// Watch for text changes
	$effect(() => {
		if (!texts.length) return;
		// Update placeholder when texts changes
		if (placeholderRef) placeholderRef.textContent = texts[0];
		// Start a new morph if we already have an old text
		if (prevText && nextText !== texts[0]) {
			prevText = nextText;
			nextText = texts[0];
			isMorphing = true;
			morph = 0;
			cooldown = 0;
		} else if (!prevText) {
			// first load: show the first text immediately
			prevText = texts[0];
			nextText = texts[0];
			if (text1Ref) text1Ref.textContent = prevText;
			if (text2Ref) text2Ref.textContent = nextText;
		}
	});

	const setStyles = (fraction: number) => {
		if (!text1Ref || !text2Ref) return;
		text2Ref.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
		text2Ref.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
		const inv = 1 - fraction;
		text1Ref.style.filter = `blur(${Math.min(8 / inv - 8, 100)}px)`;
		text1Ref.style.opacity = `${Math.pow(inv, 0.4) * 100}%`;
		text1Ref.textContent = prevText;
		text2Ref.textContent = nextText;
	};

	const doMorph = () => {
		morph -= cooldown;
		cooldown = 0;
		let fraction = morph / morphTime;
		if (fraction > 1) {
			cooldown = cooldownTime;
			fraction = 1;
		}
		setStyles(fraction);
		if (fraction === 1) {
			// morph complete – swap texts
			prevText = nextText;
			isMorphing = false;
			if (text1Ref) text1Ref.style.opacity = '100%';
			if (text2Ref) text2Ref.style.opacity = '0%';
		}
	};

	const animate = () => {
		animationFrameId = requestAnimationFrame(animate);
		const now = Date.now();
		const dt = Math.min(0.1, (now - time) / 1000);
		time = now;
		if (isMorphing) {
			cooldown -= dt;
			if (cooldown <= 0) {
				doMorph();
			}
		}
	};

	onMount(() => {
		animate();
	});

	onDestroy(() => {
		if (animationFrameId) cancelAnimationFrame(animationFrameId);
	});
</script>

<div
	class={cn(
		'relative inline-block text-center font-sans text-[30pt] leading-none font-bold [filter:url(#threshold)_blur(0.6px)] lg:text-[3rem]',
		className
	)}
>
	<!-- invisible placeholder for sizing -->
	<span bind:this={placeholderRef} class="invisible whitespace-nowrap">
		{texts[0]}
	</span>
	<!-- morphing spans -->
	<span bind:this={text1Ref} class="absolute inset-0 flex items-center justify-center" />
	<span bind:this={text2Ref} class="absolute inset-0 flex items-center justify-center" />

	<svg id="filters" class="fixed h-0 w-0" preserveAspectRatio="xMidYMid slice">
		<defs>
			<filter id="threshold">
				<feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 255 -140" />
			</filter>
		</defs>
	</svg>
</div>
