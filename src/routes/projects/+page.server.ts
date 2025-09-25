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

async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
	const apiUrl = `https://api.github.com/users/${username}/repos`;
	const params = new URLSearchParams({
		type: 'public',
		sort: 'updated',
		direction: 'desc',
		per_page: '20'
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
	return repos
		.filter(repo => 
			!repo.name.includes('config') && 
			repo.description && 
			!repo.name.startsWith('.')
		)
		.map(repo => ({
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
		}))
		.slice(0, 12); // Limit to 12 projects for clean grid
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

		return {
			projects,
			meta: {
				totalRepos: repos.length,
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
				lastUpdated: new Date().toISOString(),
				error: 'Failed to load projects'
			}
		};
	}
};
