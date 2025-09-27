import { GITHUB_TOKEN } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export interface GitHubRepo {
	id: number;
	name: string;
	description: string | null;
	html_url: string;
	language: string | null;
	topics: string[];
	stargazers_count: number;
	forks_count: number;
	updated_at: string;
	created_at: string;
	pushed_at: string;
}

export interface ProcessedProject {
	id: number;
	title: string;
	description: string;
	href: string;
	languages: string[];
	stats: {
		stars: number;
		forks: number;
	};
	updatedAt: Date;
}

// Featured projects list - edit this array to control which projects are displayed
const FEATURED_PROJECTS = [
	'mpris-daemon',
	'hypesoft-challenge',
	'fitrkr-cli',
	'eww-notify-go',
	'discordBot-speech-nlp',
	'portfolio'
];

async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
	const apiUrl = `https://api.github.com/users/${username}/repos`;
	const params = new URLSearchParams({
		type: 'public',
		sort: 'updated',
		direction: 'desc',
		per_page: '100' // Increased to ensure we fetch all repos to find featured ones
	});

	const response = await fetch(`${apiUrl}?${params}`, {
		headers: {
			'Authorization': `Bearer ${GITHUB_TOKEN}`,
			'Accept': 'application/vnd.github+json',
			'X-GitHub-Api-Version': '2022-11-28',
			'User-Agent': 'Portfolio-App'
		}
	});

	if (!response.ok) {
		console.error('GitHub API Error:', response.status, response.statusText);
		throw error(response.status, `Failed to fetch repositories: ${response.statusText}`);
	}

	return response.json();
}

function processRepoData(repos: GitHubRepo[]): ProcessedProject[] {
	// Filter to only include featured projects
	const featuredRepos = repos.filter(repo => 
		FEATURED_PROJECTS.includes(repo.name) &&
		repo.description // Keep description check for quality
	);

	// Sort featured repos to match the order in FEATURED_PROJECTS array
	const sortedFeaturedRepos = featuredRepos.sort((a, b) => {
		const indexA = FEATURED_PROJECTS.indexOf(a.name);
		const indexB = FEATURED_PROJECTS.indexOf(b.name);
		return indexA - indexB;
	});

	return sortedFeaturedRepos.map(repo => ({
		id: repo.id,
		title: formatRepoName(repo.name),
		description: repo.description || 'No description available',
		href: repo.html_url,
		languages: extractLanguages(repo),
		stats: {
			stars: repo.stargazers_count,
			forks: repo.forks_count
		},
		updatedAt: new Date(repo.updated_at)
	}));
}

function formatRepoName(name: string): string {
	return name
		.split('-')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

function extractLanguages(repo: GitHubRepo): string[] {
	const languages = [];
	
	if (repo.language) {
		languages.push(repo.language);
	}
	
	// Add topics as additional tech tags (GitHub topics are often technologies)
	if (repo.topics && repo.topics.length > 0) {
		languages.push(...repo.topics.slice(0, 3)); // Limit to avoid clutter
	}
	
	return languages;
}

export const load: PageServerLoad = async () => {
	try {
		const username = 'cheezecakee'; // Replace with your GitHub username
		const repos = await fetchGitHubRepos(username);
		const projects = processRepoData(repos);

		// Log missing projects for debugging
		const missingProjects = FEATURED_PROJECTS.filter(projectName => 
			!repos.some(repo => repo.name === projectName)
		);
		
		if (missingProjects.length > 0) {
			console.warn('Featured projects not found:', missingProjects);
		}

		return {
			projects,
			meta: {
				totalRepos: repos.length,
				featuredCount: projects.length,
				lastUpdated: new Date().toISOString()
			}
		};
	} catch (err) {
		console.error('Error loading GitHub projects:', err);
		
		// Return empty state instead of throwing error for better UX
		return {
			projects: [],
			meta: {
				totalRepos: 0,
				featuredCount: 0,
				lastUpdated: new Date().toISOString(),
				error: 'Failed to load projects'
			}
		};
	}
};
