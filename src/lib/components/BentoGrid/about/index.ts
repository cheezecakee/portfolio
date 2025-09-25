export { default as BentoAbout } from './BentoAbout.svelte';
export { default as BentoTechStack } from './BentoTechStack.svelte';

// Type definitions for better development experience
export interface TechStackItem {
  name: string;
  icon?: string;
  color?: string;
}

export interface TechCategories {
  all: TechStackItem[];
  languages: TechStackItem[];
  frameworks: TechStackItem[];
  databases: TechStackItem[];
  tools: TechStackItem[];
}

export type TechCategoryKey = keyof TechCategories;
