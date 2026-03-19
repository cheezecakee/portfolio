<script lang="ts">
	import { page } from '$app/state';
	import { getPosts } from '$lib/blog/parser';

	const posts = getPosts();
	const post = posts.find((p) => p.slug === page.params.slug);
</script>

<div class="mx-auto flex flex-col items-center justify-center space-y-6 px-5 md:px-30 lg:px-80">
    {#if post}
        <svelte:component this={post.component} />
    {:else}
        <p>Post not found</p>
    {/if}
</div>
