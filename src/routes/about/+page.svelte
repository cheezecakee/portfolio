<script lang="ts">
	// About page component
</script>

<svelte:head>
	<title>About - Your Portfolio</title>
	<meta name="description" content="Learn more about me and my journey as a developer." />
</svelte:head>

<div class="container mx-auto px-6 py-12">
	<div class="mx-auto max-w-4xl">
		<h1 class="mb-8 text-center text-4xl font-bold text-white">About Me</h1>

		<div class="grid items-center gap-8 md:grid-cols-2">
			<div class="space-y-6">
				<p class="text-lg leading-relaxed text-gray-300">
					Hello! I'm a passionate junior developer who loves building modern web applications. I
					enjoy creating scalable, modular solutions that are both functional and beautiful.
				</p>

				<p class="text-lg leading-relaxed text-gray-300">
					My journey in development started with curiosity and has grown into a passion for creating
					meaningful digital experiences. I'm always eager to learn new technologies and improve my
					craft.
				</p>

				<div class="space-y-4">
					<h2 class="text-2xl font-semibold text-white">Technologies I Work With</h2>
					<div class="flex flex-wrap gap-3">
						{#each ['Svelte', 'SvelteKit', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Node.js'] as tech}
							<span
								class="rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-sm text-white"
							>
								{tech}
							</span>
						{/each}
					</div>
				</div>
			</div>

			<div class="flex justify-center">
				<div
					class="flex h-64 w-64 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600"
				>
					<span class="text-6xl font-bold text-white">👨‍💻</span>
				</div>
			</div>
		</div>
	</div>
</div>
