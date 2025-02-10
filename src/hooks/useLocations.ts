import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../utils/api';

export interface Location {
	zip_code: string;
	latitude: number;
	longitude: number;
	city: string;
	state: string;
	county: string;
}

export interface Coordinates {
	lat: number;
	lon: number;
}

interface GeoBoundingBox {
	top?: Coordinates;
	left?: Coordinates;
	bottom?: Coordinates;
	right?: Coordinates;
	bottom_left?: Coordinates;
	top_right?: Coordinates;
	bottom_right?: Coordinates;
	top_left?: Coordinates;
}

export interface LocationSearchParams {
	city?: string;
	states?: string[];
	geoBoundingBox?: GeoBoundingBox;
	size?: number;
	from?: string;
}

export function useLocations(zipCodes: string[]) {
	return useQuery<Location[]>({
		queryKey: ['locations', zipCodes],
		queryFn: async () => {
			if (!zipCodes.length) return [];

			const response = await fetch(`${API_BASE_URL}/locations`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(zipCodes.slice(0, 100)),
			});

			if (!response.ok) {
				throw new Error('Failed to fetch locations');
			}

			return response.json();
		},
		enabled: zipCodes.length > 0,
	});
}

export function useLocationSearch(searchParams: LocationSearchParams) {
	return useQuery<Location[]>({
		queryKey: ['locationSearch', searchParams],
		queryFn: async () => {
			const response = await fetch(`${API_BASE_URL}/locations/search`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(searchParams),
			});

			if (!response.ok) {
				throw new Error('Failed to search locations');
			}

			return response.json();
		},
		enabled: !!searchParams,
	});
}
