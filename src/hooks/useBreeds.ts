import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../utils/api';

export function useBreeds() {
	return useQuery<string[]>({
		queryKey: ['breeds'],
		queryFn: async () => {
			const response = await fetch(`${API_BASE_URL}/breeds`, {
				credentials: 'include',
			});
			if (!response.ok) {
				throw new Error('Failed to fetch breeds');
			}
			return response.json();
		},
	});
}
