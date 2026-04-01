<script lang="ts">
	import Meteors from '$lib/components/magic/meteors/meteors.svelte';
</script>

<div
	id="home"
	class="panel-content flex min-h-[90vh] w-full items-center justify-end overflow-hidden md:shadow-xl"
>
	<Meteors number={30} />
</div>
