export interface TechStackItem {
  name: string;
  icon: string;
}

export interface TechCategory {
  name: string;
  items: TechStackItem[];
}

export type TechCategories = TechCategory[];

const languages: TechStackItem[] = [
  { name: 'Golang', icon: 'FileJs' },
  { name: 'Python', icon: 'Code' },
  { name: 'TypeScript', icon: 'FileTs' },
  { name: 'JavaScript', icon: 'FileJs' },
];

const frameworks: TechStackItem[] = [
  { name: 'Svelte/SvelteKit', icon: 'Lightning' },
  { name: 'React', icon: 'Atom' },
  { name: 'Node.js', icon: 'Tree' },
  { name: 'TailwindCSS', icon: 'PaintBrush' }
];

const databases: TechStackItem[] = [
  { name: 'PostgreSQL', icon: 'Database' },
  { name: 'MongoDB', icon: 'Leaf' },
  { name: 'Redis', icon: 'Lightning' },
  { name: 'SQLite', icon: 'HardDrive' },
  { name: 'SQL', icon: 'Database' }
];

const tools: TechStackItem[] = [
  { name: 'Git', icon: 'GitBranch' },
  { name: 'Docker', icon: 'Package' },
  { name: 'AWS', icon: 'Cloud' },
  { name: 'Linux', icon: 'Terminal' },
  { name: 'FFmpeg', icon: 'Code' },
  { name: 'Vosk', icon: 'Code' }
];

export const techCategories: TechCategories = [
  { name: 'Languages', items: languages },
  { name: 'Frameworks', items: frameworks },
  { name: 'Databases', items: databases },
  { name: 'Tools', items: tools }
];

export { languages, frameworks, databases, tools };

