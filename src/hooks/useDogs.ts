import { useQuery } from '@tanstack/react-query';

export interface Dog {
	id: string;
	img: string;
	name: string;
	age: number;
	zip_code: string;
	breed: string;
}

interface SearchResult {
	resultIds: string[];
	total: number;
	next: string;
	prev: string;
}

export function useDogs(
	searchQuery: string = '',
	breed?: string,
	sortOrder: 'asc' | 'desc' = 'asc'
) {
	return useQuery<{ dogs: Dog[]; next: string; prev: string; total: number }>({
		queryKey: ['dogs', searchQuery, breed, sortOrder],
		queryFn: async () => {
			// Build the search URL with filters
			let url = searchQuery || '/dogs/search';
			const params = new URLSearchParams();
			if (breed) params.append('breeds', breed);
			params.append('sort', `breed:${sortOrder}`);

			// Append params if it's the initial search
			if (!searchQuery) {
				url = `${url}?${params.toString()}`;
			}

			const searchResponse = await fetch(url, {
				credentials: 'include',
			});
			if (!searchResponse.ok) {
				throw new Error('Failed to fetch dog IDs');
			}
			const searchResult: SearchResult = await searchResponse.json();

			// Then, fetch the dog details
			const dogsResponse = await fetch('/dogs', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(searchResult.resultIds.slice(0, 100)),
			});
			if (!dogsResponse.ok) {
				throw new Error('Failed to fetch dog details');
			}
			const dogs = await dogsResponse.json();

			return {
				dogs,
				next: searchResult.next,
				prev: searchResult.prev,
				total: searchResult.total,
			};
		},
	});
}
