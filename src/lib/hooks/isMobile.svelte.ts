import { onMount } from 'svelte';

export function useIsMobile(breakpoint = 768) {
    let isMobile = $state(false);

    onMount(() => {
        const query = window.matchMedia(`(max-width: ${breakpoint}px)`);
        
        // Set initial value
        isMobile = query.matches;

        // Listen for changes
        const handler = (e: MediaQueryListEvent) => isMobile = e.matches;
        query.addEventListener('change', handler);
        
        return () => query.removeEventListener('change', handler);
    });

    return {
        get current() { return isMobile; }
    };
}

