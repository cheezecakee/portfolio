<script lang="ts">
	// Projects page component
	const projects = [
		{
			title: 'Portfolio Website',
			description:
				'A modern portfolio built with SvelteKit and Tailwind CSS featuring a floating dock navigation.',
			tech: ['SvelteKit', 'TypeScript', 'Tailwind CSS'],
			status: 'In Progress'
		},
		{
			title: 'Task Management App',
			description:
				'A modular task management application with drag-and-drop functionality and real-time updates.',
			tech: ['Svelte', 'Firebase', 'TypeScript'],
			status: 'Planning'
		},
		{
			title: 'Weather Dashboard',
			description:
				'A responsive weather dashboard with location-based forecasts and interactive charts.',
			tech: ['JavaScript', 'Chart.js', 'CSS Grid'],
			status: 'Completed'
		}
	];

	function getStatusColor(status: string) {
		switch (status) {
			case 'Completed':
				return 'bg-green-500/20 text-green-400 border-green-500/30';
			case 'In Progress':
				return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
			case 'Planning':
				return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
			default:
				return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
		}
	}
</script>

<svelte:head>
	<title>Projects - Your Portfolio</title>
	<meta name="description" content="Explore my development projects and coding journey." />
</svelte:head>

<div class="container mx-auto px-6 py-12">
	<div class="mx-auto max-w-6xl">
		<h1 class="mb-8 text-center text-4xl font-bold text-white">My Projects</h1>
		<p class="mx-auto mb-12 max-w-2xl text-center text-lg text-gray-300">
			Here's a collection of projects I've been working on. Each one represents a step forward in my
			development journey.
		</p>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each projects as project}
				<div
					class="rounded-lg border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:scale-105 hover:transform hover:border-zinc-700"
				>
					<div class="mb-4 flex items-start justify-between">
						<h3 class="text-xl font-semibold text-white">{project.title}</h3>
						<span class="rounded-full border px-3 py-1 text-xs {getStatusColor(project.status)}">
							{project.status}
						</span>
					</div>

					<p class="mb-4 text-sm leading-relaxed text-gray-300">
						{project.description}
					</p>

					<div class="space-y-3">
						<h4 class="text-sm font-medium text-gray-400">Technologies:</h4>
						<div class="flex flex-wrap gap-2">
							{#each project.tech as tech}
								<span
									class="rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-xs text-white"
								>
									{tech}
								</span>
							{/each}
						</div>
					</div>

					<div class="mt-6 flex gap-3">
						<button
							class="rounded bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700"
						>
							View Project
						</button>
						<button
							class="rounded border border-zinc-700 px-4 py-2 text-sm text-white transition-colors hover:border-zinc-600"
						>
							Source Code
						</button>
					</div>
				</div>
			{/each}
		</div>

		<div class="mt-12 text-center">
			<p class="mb-4 text-gray-400">More projects coming soon!</p>
			<button
				class="rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-medium text-white transition-all hover:from-purple-700 hover:to-blue-700"
			>
				View All on GitHub
			</button>
		</div>
	</div>
</div>
