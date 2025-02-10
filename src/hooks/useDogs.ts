import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../utils/api';

export interface Dog {
	id: string;
	img: string;
	name: string;
	age: number;
	zip_code: string;
	breed: string;
}

export function useDogs(
	searchParams: string = '',
	breed?: string,
	sortOrder: 'asc' | 'desc' = 'asc'
) {
	return useQuery<{ dogs: Dog[]; next: string; prev: string; total: number }>({
		queryKey: ['dogs', searchParams, breed, sortOrder],
		queryFn: async () => {
			const params = new URLSearchParams(searchParams);
			if (!params.has('sort')) {
				params.append('sort', 'breed:asc');
			}

			const url = `${API_BASE_URL}/dogs/search?${params.toString()}`;
			const response = await fetch(url, {
				credentials: 'include',
			});
			if (!response.ok) {
				throw new Error('Failed to fetch dogs');
			}
			const searchResult = await response.json();

			if (!searchResult.resultIds?.length) {
				return { dogs: [], next: '', prev: '', total: 0 };
			}

			// Fetch dog details
			const dogsResponse = await fetch(`${API_BASE_URL}/dogs`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(searchResult.resultIds),
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
