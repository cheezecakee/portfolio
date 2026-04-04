<script lang="ts">
	import { MorphingText } from '$lib/components/magic/morphing-text';

	let { currentTitle = 'Home' } = $props();
</script>

<MorphingText texts={[currentTitle]} />
