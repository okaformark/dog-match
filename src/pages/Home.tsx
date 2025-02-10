import { useState } from 'react';
import { useDogs, Dog } from '../hooks/useDogs';
import { useBreeds } from '../hooks/useBreeds';
import { DogCard } from '../components/DogCard.tsx';
import { DogSearch, SearchFilters } from '../components/DogSearch';
import { LocationSearchParams } from '../hooks/useLocations';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

import { useMatch } from '../hooks/useMatch';
import { MatchModal } from '../components/MatchModal';
import { API_BASE_URL } from '../utils/api.ts';

export default function Home() {
	const navigate = useNavigate();
	const { logoutMutation } = useAuth();
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedBreed, setSelectedBreed] = useState('');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
	const [locationParams, setLocationParams] =
		useState<LocationSearchParams | null>(null);
	const [favorites, setFavorites] = useState<string[]>([]);
	const matchMutation = useMatch();
	const [matchedDog, setMatchedDog] = useState<Dog | null>(null);

	const { data: breeds } = useBreeds();
	const { data, isLoading, error } = useDogs(
		searchQuery,
		selectedBreed,
		sortOrder
	);

	const handleSearch = async (filters: SearchFilters) => {
		if (filters.location) {
			console.log('Location search:', filters.location);
			try {
				const searchBody = {
					...(filters.location.states && { states: filters.location.states }),
					...(filters.location.city && { city: filters.location.city }),
				};

				const response = await fetch(`${API_BASE_URL}/locations/search`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',
					body: JSON.stringify(searchBody),
				});

				const locations = await response.json();
				console.log('Location results:', locations);

				if (locations?.results?.length) {
					const zipCodes = locations.results.map(
						(result: { zip_code: string }) => result.zip_code
					);
					console.log('Found ZIP codes:', zipCodes);

					// Create new URLSearchParams with breed sort by default
					const params = new URLSearchParams();
					// Send each ZIP code individually
					zipCodes.forEach((zip: string) => params.append('zipCodes[]', zip));
					params.append('sort', `breed:${sortOrder}`);

					// Set the raw parameters
					const searchString = params.toString();
					console.log('Setting search params:', searchString);
					setSearchQuery(searchString);

					// Clear location params
					setLocationParams(null);
				}
			} catch (error) {
				console.error('Location search error:', error);
			}
			return;
		}

		// For non-location searches
		const params = new URLSearchParams();

		if (filters.breeds.length) {
			params.append('breeds', filters.breeds.join(','));
		}

		if (filters.zipCodes.length) {
			params.append('zipCodes', filters.zipCodes.join(','));
		}

		// Always include sort parameter
		params.append('sort', `breed:${sortOrder}`);
		setSearchQuery(params.toString());
	};

	const handleBreedChange = (breed: string) => {
		setSelectedBreed(breed);
		handleSearch({
			breeds: breed ? [breed] : [],
			zipCodes: [],
			sort: `breed:${sortOrder}`,
			location: locationParams || undefined,
		});
	};

	const handleSortChange = (newSort: 'asc' | 'desc') => {
		setSortOrder(newSort);
		// Trigger new search with current filters but new sort order
		handleSearch({
			breeds: selectedBreed ? [selectedBreed] : [],
			zipCodes: [],
			sort: `breed:${newSort}`,
			location: locationParams || undefined,
		});
	};

	const handleLogout = () => {
		logoutMutation.mutate(undefined, {
			onSuccess: () => navigate('/signin'),
		});
	};

	const toggleFavorite = (dogId: string) => {
		setFavorites((prev) =>
			prev.includes(dogId)
				? prev.filter((id) => id !== dogId)
				: [...prev, dogId]
		);
	};

	const handleFindMatch = async () => {
		if (favorites.length === 0) {
			alert('Please favorite some dogs first!');
			return;
		}

		try {
			const result = await matchMutation.mutateAsync(favorites);
			const matchedDog = data?.dogs.find((dog) => dog.id === result.match);
			if (matchedDog) {
				setMatchedDog(matchedDog);
			}
		} catch (error) {
			console.error('Match error:', error);
			alert('Failed to find a match. Please try again.');
		}
	};

	const clearFavorites = () => {
		setFavorites([]);
		setMatchedDog(null); // Also clear any matched dog
	};

	return (
		<div className='min-h-screen bg-gray-50 px-4 py-8'>
			<div className='max-w-7xl mx-auto'>
				<div className='flex justify-between items-center mb-8'>
					<Link to='/home'>
						<h1 className='text-4xl font-bold text-gray-900 hover:text-gray-700 transition-colors cursor-pointer'>
							Find Your Perfect Dog
						</h1>
					</Link>
					<button
						onClick={handleLogout}
						className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors'
						disabled={logoutMutation.isPending}
					>
						{logoutMutation.isPending ? 'Logging out...' : 'Logout'}
					</button>
				</div>

				<DogSearch
					onSearch={handleSearch}
					breeds={breeds || []}
					currentSort={sortOrder}
					onSortChange={handleSortChange}
					selectedBreed={selectedBreed}
					onBreedChange={handleBreedChange}
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

				{favorites.length > 0 && (
					<div className='mb-6 flex justify-between items-center bg-white p-4 rounded-lg shadow-sm'>
						<span className='text-gray-600'>
							{favorites.length} dogs favorited
						</span>
						<div className='flex gap-4'>
							<button
								onClick={clearFavorites}
								className='px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors'
							>
								Clear Favorites
							</button>
							<button
								onClick={handleFindMatch}
								disabled={matchMutation.isPending}
								className='px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300'
							>
								{matchMutation.isPending ? 'Finding Match...' : 'Find My Match'}
							</button>
						</div>
					</div>
				)}

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{data?.dogs?.map((dog) => (
						<DogCard
							key={dog.id}
							dog={dog}
							isFavorite={favorites.includes(dog.id)}
							onFavoriteClick={() => toggleFavorite(dog.id)}
						/>
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

				{matchedDog && (
					<MatchModal dog={matchedDog} onClose={() => setMatchedDog(null)} />
				)}
			</div>
		</div>
	);
}
