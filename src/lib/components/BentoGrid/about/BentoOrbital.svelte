<script lang="ts">
	import { cn } from '$lib/utils';
	import OrbitingCircles from '$lib/components/OrbitingCircles/OrbitingCircles.svelte';
	import { MediaQuery } from 'svelte/reactivity';

	const isDesktop = new MediaQuery('(min-width: 950px)');

	// Use Svelte 5 runes for reactive state
	let className = $state('');
	export { className as class };

	// SVG icons as components for cleaner code and XSS safety
	const icons = {
		golang: `<svg width="64px" height="64px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M292.533152,13.2950639 L293.657233,14.0455076 C306.869315,22.7704678 316.342129,34.7361275 322.574244,49.1946331 C324.069951,51.4381943 323.072813,52.6846171 320.081398,53.4324709 L315.017741,54.7277932 C303.571167,57.6768058 294.487155,60.1566573 283.191384,63.10567 L276.74841,64.7843862 C274.428264,65.3583626 273.787695,65.1170696 271.320433,62.3073717 L270.972336,61.9081465 C267.453024,57.9195933 264.816991,55.2559574 260.154613,52.878088 L259.255961,52.4353326 C243.551033,44.7075107 228.344673,46.9510719 214.135452,56.1746012 C197.184101,67.1431227 188.459141,83.3466202 188.708425,103.538671 C188.95771,123.481438 202.668362,139.93422 222.361843,142.67635 C239.313195,144.919911 253.522416,138.937081 264.740222,126.223568 C266.983783,123.481438 268.978059,120.490023 271.470905,117.000039 L223.358982,117.000039 C218.124006,117.000039 216.877583,113.759339 218.622575,109.521501 L219.486848,107.487264 C222.690544,100.033179 227.659682,89.3185944 230.887235,83.1925665 L231.591356,81.8743455 C232.452883,80.3801337 234.202861,78.3609287 237.568203,78.3609287 L317.791861,78.3603482 C321.394911,66.9456209 327.24084,56.159659 335.038473,45.9539335 C353.236247,22.0226141 375.17329,9.55838523 404.838154,4.32340907 C430.265181,-0.163713323 454.196501,2.32913245 475.884259,17.0369225 C495.577741,30.4982897 507.792685,48.6960639 511.033385,72.6273834 C515.271222,106.280802 505.549124,133.702105 482.365658,157.134856 C465.912876,173.836922 445.720825,184.306875 422.537359,189.043282 C415.806676,190.289704 409.075992,190.538989 402.594593,191.286843 C379.909697,190.788274 359.219077,184.306875 341.769156,169.3498 C329.496056,158.740849 321.041799,145.701725 316.840932,130.522127 C313.926247,136.409796 310.44016,142.04853 306.370746,147.412757 C288.422257,171.094792 264.989506,185.802582 235.324641,189.791135 C210.894753,193.031835 188.209856,188.295428 168.26709,173.338353 C149.820031,159.378417 139.350079,140.931358 136.607949,117.997177 C133.367249,90.8251575 141.344356,66.3952689 157.797138,44.9567952 C175.496343,21.7733295 198.929093,7.06553943 227.59682,1.8305633 C250.59563,-2.32879605 272.633891,0.235689133 292.533152,13.2950639 L292.533152,13.2950639 Z M411.120284,49.0171223 L410.322415,49.1946331 C387.138949,54.4296092 372.181875,69.1373993 366.697614,92.5701496 C362.210492,112.014347 371.683306,131.707829 389.631795,139.684935 C403.342447,145.667765 417.053099,144.919911 430.265181,138.189228 C449.958663,127.96856 460.6779,112.014347 461.924323,90.575873 C461.675038,87.3351735 461.675038,84.8423277 461.176469,82.3494819 C456.739764,57.9476028 434.511926,44.025432 411.120284,49.0171223 L411.120284,49.0171223 Z M116.415898,94.5644262 C117.413036,94.5644262 117.911605,95.3122799 117.911605,96.3094183 L117.413036,102.292248 C117.413036,103.289387 116.415898,104.03724 115.668044,104.03724 L61.3240061,103.787956 C60.3268678,103.787956 60.0775833,103.040102 60.5761524,102.292248 L64.0661365,96.0601337 C64.5647057,95.3122799 65.561844,94.5644262 66.5589823,94.5644262 L116.415898,94.5644262 Z M121.900159,71.6302451 C122.897297,71.6302451 123.395866,72.3780988 123.146581,73.1259525 L121.152305,79.1087824 C120.90302,80.1059207 119.905882,80.6044899 118.908744,80.6044899 L0.99713831,80.8537744 C0,80.8537744 -0.249284578,80.3552053 0.249284578,79.6073515 L5.48426071,72.8766679 C5.98282987,72.1288142 7.22925276,71.6302451 8.22639107,71.6302451 L121.900159,71.6302451 Z M134.862957,48.6960639 C135.860095,48.6960639 136.109379,49.4439176 135.61081,50.1917714 L131.372973,56.6731704 C130.874403,57.4210241 129.62798,58.1688779 128.880127,58.1688779 L38.6391096,57.9195933 C37.6419713,57.9195933 37.3926867,57.4210241 37.8912558,56.6731704 L43.126232,49.9424868 C43.6248011,49.1946331 44.871224,48.6960639 45.8683623,48.6960639 L134.862957,48.6960639 Z" fill="#00ACD7" fill-rule="nonzero"> </path> </g> </g></svg>`,
		supabase: `<svg viewBox="0 0 109 113" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" fill="url(#paint0_linear)"/><path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" fill="url(#paint1_linear)" fill-opacity="0.2"/><path d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z" fill="#3ECF8E"/><defs><linearGradient id="paint0_linear" x1="53.9738" y1="54.974" x2="94.1635" y2="71.8295" gradientUnits="userSpaceOnUse"><stop stop-color="#249361"/><stop offset="1" stop-color="#3ECF8E"/></linearGradient><linearGradient id="paint1_linear" x1="36.1558" y1="30.578" x2="54.4844" y2="65.0806" gradientUnits="userSpaceOnUse"><stop/><stop offset="1" stop-opacity="0"/></linearGradient></defs></svg>`,
		svelte: `<svg viewBox="0 0 256 308" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M239.682 40.707C211.113-.182 154.69-12.301 113.895 13.69L42.247 59.356a82.198 82.198 0 0 0-37.135 55.056 86.566 86.566 0 0 0 8.536 55.576 82.425 82.425 0 0 0-12.296 30.719 87.596 87.596 0 0 0 14.964 66.244c28.574 40.893 84.997 53.007 125.787 27.016l71.648-45.664a82.182 82.182 0 0 0 37.135-55.057 86.601 86.601 0 0 0-8.53-55.577 82.409 82.409 0 0 0 12.29-30.718 87.573 87.573 0 0 0-14.963-66.244" fill="#FF3E00"/><path d="M106.889 270.841c-23.102 6.007-47.497-3.036-61.103-22.648a52.685 52.685 0 0 1-9.003-39.85 49.978 49.978 0 0 1 1.713-6.693l1.35-4.115 3.671 2.697a92.447 92.447 0 0 0 28.036 14.007l2.663.808-.245 2.659a16.067 16.067 0 0 0 2.89 10.656 17.143 17.143 0 0 0 18.397 6.828 15.786 15.786 0 0 0 4.403-1.935l71.67-45.672a14.922 14.922 0 0 0 6.734-9.977 15.923 15.923 0 0 0-2.713-12.011 17.156 17.156 0 0 0-18.404-6.832 15.78 15.78 0 0 0-4.396 1.933l-27.35 17.434a52.298 52.298 0 0 1-14.553 6.391c-23.101 6.007-47.497-3.036-61.101-22.649a52.681 52.681 0 0 1-9.004-39.849 49.428 49.428 0 0 1 22.34-33.114l71.664-45.677a52.218 52.218 0 0 1 14.563-6.398c23.101-6.007 47.497 3.036 61.101 22.648a52.685 52.685 0 0 1 9.004 39.85 50.559 50.559 0 0 1-1.713 6.692l-1.35 4.116-3.67-2.693a92.373 92.373 0 0 0-28.037-14.013l-2.664-.809.246-2.658a16.099 16.099 0 0 0-2.89-10.656 17.143 17.143 0 0 0-18.398-6.828 15.786 15.786 0 0 0-4.402 1.935l-71.67 45.674a14.898 14.898 0 0 0-6.73 9.975 15.9 15.9 0 0 0 2.709 12.012 17.156 17.156 0 0 0 18.404 6.832 15.841 15.841 0 0 0 4.402-1.935l27.345-17.427a52.147 52.147 0 0 1 14.552-6.397c23.101-6.006 47.497 3.037 61.102 22.65a52.681 52.681 0 0 1 9.003 39.848 49.453 49.453 0 0 1-22.34 33.12l-71.664 45.673a52.218 52.218 0 0 1-14.563 6.398" fill="#FFF"/></svg>`,
		github: `<svg viewBox="0 0 256 250" fill="currentColor" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z"/></svg>`
	};

	function createOrbitItem(
		iconHtml: string,
		angle: number,
		calculatedDuration: number,
		radius: number,
		iconSize: number,
		reverse: boolean,
		className: string
	) {
		return {
			iconHtml,
			style: `--duration: ${calculatedDuration}; --radius: ${radius}; --angle: ${angle}; --icon-size: ${iconSize}px;`,
			class: cn(
				'animate-orbit absolute flex transform-gpu items-center justify-center rounded-full border-none bg-transparent',
				`size-[var(--icon-size)]`,
				className
			),
			dataReverse: reverse.toString()
		};
	}
</script>

<div
	class={cn(
		'group relative flex h-full min-h-[400px] w-full max-w-[44rem] items-center justify-center overflow-hidden rounded-xl p-6',
		'bg-transparent [box-shadow:none]',
		'transform-gpu dark:bg-transparent dark:[box-shadow:none]',
		className
	)}
>
	<!-- Inner orbit -->
	{#if isDesktop.current}
		<OrbitingCircles duration={20} radius={80} iconSize={30}>
			<svelte:fragment
				slot="default"
				let:calculatedDuration
				let:radius
				let:iconSize
				let:reverse
				let:className
			>
				{@const innerIcons: string[] = [icons.golang, icons.supabase]}
				{#each innerIcons as iconHtml, index (index)}
					{@const angle = (360 / innerIcons.length) * index}
					{@const item = createOrbitItem(
						iconHtml,
						angle,
						calculatedDuration,
						radius,
						iconSize,
						reverse,
						className
					)}
					<div style={item.style} class={item.class} data-reverse={item.dataReverse}>
						<div
							contenteditable
							bind:innerHTML={item.iconHtml}
							class="h-[var(--icon-size)] w-[var(--icon-size)]"
						></div>
					</div>
				{/each}
			</svelte:fragment>
		</OrbitingCircles>
	{:else}
		<OrbitingCircles duration={20} radius={60} iconSize={25}>
			<svelte:fragment
				slot="default"
				let:calculatedDuration
				let:radius
				let:iconSize
				let:reverse
				let:className
			>
				{@const innerIcons: string[] = [icons.golang, icons.supabase]}
				{#each innerIcons as iconHtml, index (index)}
					{@const angle = (360 / innerIcons.length) * index}
					{@const item = createOrbitItem(
						iconHtml,
						angle,
						calculatedDuration,
						radius,
						iconSize,
						reverse,
						className
					)}
					<div style={item.style} class={item.class} data-reverse={item.dataReverse}>
						<div
							contenteditable
							bind:innerHTML={item.iconHtml}
							class="h-[var(--icon-size)] w-[var(--icon-size)]"
						></div>
					</div>
				{/each}
			</svelte:fragment>
		</OrbitingCircles>
	{/if}
	{#if isDesktop.current}
		<!-- Outer orbit -->
		<OrbitingCircles duration={20} radius={160} iconSize={45} reverse={true}>
			<svelte:fragment
				slot="default"
				let:calculatedDuration
				let:radius
				let:iconSize
				let:reverse
				let:className
			>
				{@const outerIcons: string[] = [icons.svelte, icons.github]}
				{#each outerIcons as iconHtml, index (index)}
					{@const angle = (360 / outerIcons.length) * index}
					{@const item = createOrbitItem(
						iconHtml,
						angle,
						calculatedDuration,
						radius,
						iconSize,
						reverse,
						className
					)}
					<div style={item.style} class={item.class} data-reverse={item.dataReverse}>
						<div
							contenteditable
							bind:innerHTML={item.iconHtml}
							class="h-[var(--icon-size)] w-[var(--icon-size)]"
						></div>
					</div>
				{/each}
			</svelte:fragment>
		</OrbitingCircles>
	{:else}
		<OrbitingCircles duration={20} radius={140} iconSize={35} reverse={true}>
			<svelte:fragment
				slot="default"
				let:calculatedDuration
				let:radius
				let:iconSize
				let:reverse
				let:className
			>
				{@const outerIcons: string[] = [icons.svelte, icons.github]}
				{#each outerIcons as iconHtml, index (index)}
					{@const angle = (360 / outerIcons.length) * index}
					{@const item = createOrbitItem(
						iconHtml,
						angle,
						calculatedDuration,
						radius,
						iconSize,
						reverse,
						className
					)}
					<div style={item.style} class={item.class} data-reverse={item.dataReverse}>
						<div
							contenteditable
							bind:innerHTML={item.iconHtml}
							class="h-[var(--icon-size)] w-[var(--icon-size)]"
						></div>
					</div>
				{/each}
			</svelte:fragment>
		</OrbitingCircles>
	{/if}
	<!-- Hover Overlay -->
	<!-- <div -->
	<!-- 	class="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" -->
	<!-- ></div> -->
</div>
