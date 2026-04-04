<script lang="ts">
	import { AboutSection, BlogSection, ProjectsSection } from '$lib/sections';

	let { data } = $props();
</script>

<div class="flex min-h-screen w-full">
	<div class="mx-auto flex w-full flex-col items-center space-y-10 px-5 md:px-30 lg:px-80">
		<AboutSection
			class="min-h-[calc(100vh-(9rem*1.2))] scroll-mt-32 lg:min-h-[calc(100vh-(10.25rem*1.2))] lg:scroll-mt-header-height"
		/>
		<ProjectsSection
			projects={data.projects}
			meta={data.meta}
			class="mb-20 min-h-[calc(100vh-(9rem*1.2))] scroll-mt-32 lg:min-h-[calc(100vh-(10.25rem*1.2))] lg:scroll-mt-header-height"
		/>
		<BlogSection
			class="min-h-[calc(100vh-(9rem*2))] scroll-mt-32 lg:min-h-[calc(100vh-(10.25rem*2))] lg:scroll-mt-header-height"
		/>
	</div>
</div>
