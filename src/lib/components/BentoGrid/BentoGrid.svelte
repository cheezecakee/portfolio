<script lang="ts">
	import { cn } from '$lib/utils';
	let className: string = '';
	export { className as class };
</script>

<div class={cn('grid w-full auto-rows-min grid-cols-1 gap-6 md:grid-cols-2', className)}>
	<slot></slot>
</div>
