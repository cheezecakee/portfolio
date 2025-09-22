export type PageNav = {
	label: string;
	icon: typeof import('phosphor-svelte').House;
	href: `/${string}`;
	type: 'page';
};

export type ExternalNav = {
	label: string;
	icon: typeof import('phosphor-svelte').House;
	href: `http${string}`;
	type: 'external';
};

export type ModalNav = {
	label: string;
	icon: typeof import('phosphor-svelte').House;
	href: string; // mailto: or custom id
	type: 'modal';
};

export type NavItem = PageNav | ExternalNav | ModalNav;

export type Navs = {
	navbar: PageNav[];
	contact: (ExternalNav | ModalNav)[];
};

