import { useState, useEffect } from 'react';
import { useDogs } from '../hooks/useDogs';
import { useBreeds } from '../hooks/useBreeds';
import { DogCard } from '../components/DogCard.tsx';
import { DogSearch, SearchFilters } from '../components/DogSearch';
import { useLocationSearch, LocationSearchParams } from '../hooks/useLocations';

export default function Home() {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedBreed, setSelectedBreed] = useState('');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
	const [locationParams, setLocationParams] =
		useState<LocationSearchParams | null>(null);

	const { data: locations } = useLocationSearch(locationParams || {});
	const { data: breeds, isLoading: breedsLoading } = useBreeds();
	const { data, isLoading, error } = useDogs(
		searchQuery,
		selectedBreed,
		sortOrder
	);

	const handleSearch = async (filters: SearchFilters) => {
		if (filters.location) {
			setLocationParams(filters.location);
			return;
		}

		const params = new URLSearchParams();
		if (filters.breeds.length)
			params.append('breeds', filters.breeds.join(','));

		// Use locations from the hook
		if (locations?.length) {
			const zipCodes = locations.map((loc) => loc.zip_code);
			params.append('zipCodes', zipCodes.join(','));
		} else if (filters.zipCodes.length) {
			params.append('zipCodes', filters.zipCodes.join(','));
		}

		if (filters.ageMin) params.append('ageMin', filters.ageMin.toString());
		if (filters.ageMax) params.append('ageMax', filters.ageMax.toString());
		params.append('sort', filters.sort);

		setSearchQuery(`/dogs/search?${params.toString()}`);
	};

	// Update search when locations change
	useEffect(() => {
		if (locations?.length) {
			const params = new URLSearchParams(searchQuery.split('?')[1] || '');
			params.set('zipCodes', locations.map((loc) => loc.zip_code).join(','));
			setSearchQuery(`/dogs/search?${params.toString()}`);
		}
	}, [locations]);

	return (
		<div className='min-h-screen bg-gray-50 px-4 py-8'>
			<div className='max-w-7xl mx-auto'>
				<h1 className='text-4xl font-bold text-gray-900 mb-8'>
					Find Your Perfect Dog
				</h1>

				<DogSearch
					onSearch={handleSearch}
					breeds={breeds || []}
					currentSort={sortOrder}
					onSortChange={setSortOrder}
					selectedBreed={selectedBreed}
					onBreedChange={setSelectedBreed}
				/>

				{isLoading && (
					<div className='flex justify-center items-center min-h-[400px]'>
						<div className='text-xl text-gray-600'>Loading dogs...</div>
					</div>
				)}

				{error && (
					<div className='bg-red-50 text-red-600 p-4 rounded-lg text-center'>
						Error fetching dogs. Please try again.
					</div>
				)}

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{data?.dogs?.map((dog) => (
						<DogCard key={dog.id} dog={dog} />
					))}
				</div>

				{data?.dogs && data.dogs.length > 0 && (
					<div className='mt-8 flex items-center justify-between bg-white p-4 rounded-lg shadow-sm'>
						<button
							onClick={() => setSearchQuery(data?.prev || '')}
							disabled={!data?.prev}
							className='px-6 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors'
						>
							Previous
						</button>
						<span className='text-gray-600'>
							Showing {data?.dogs?.length} of {data?.total} dogs
						</span>
						<button
							onClick={() => setSearchQuery(data?.next || '')}
							disabled={!data?.next}
							className='px-6 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors'
						>
							Next
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
