import { useState, FormEvent } from 'react';
import { LocationSearchParams } from '../hooks/useLocations';
import { LocationSearch } from './LocationSearch';

export interface SearchFilters {
	breeds: string[];
	zipCodes: string[];
	ageMin?: number;
	ageMax?: number;
	sort: string;
	location?: LocationSearchParams;
}

interface DogSearchProps {
	readonly onSearch: (filters: SearchFilters) => void;
	readonly breeds: string[];
	readonly currentSort: 'asc' | 'desc';
	readonly onSortChange: (sort: 'asc' | 'desc') => void;
	readonly selectedBreed: string;
	readonly onBreedChange: (breed: string) => void;
}

export function DogSearch({
	onSearch,
	breeds,
	currentSort,
	onSortChange,
	selectedBreed,
	onBreedChange,
}: DogSearchProps) {
	const [zipCode, setZipCode] = useState('');
	const [ageMin, setAgeMin] = useState('');
	const [ageMax, setAgeMax] = useState('');
	const [showFilters, setShowFilters] = useState(false);
	const [city, setCity] = useState('');
	const [selectedStates, setSelectedStates] = useState<string[]>([]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const filters: SearchFilters = {
			breeds: selectedBreed ? [selectedBreed] : [],
			zipCodes: zipCode ? [zipCode] : [],
			sort: `breed:${currentSort}`,
		};

		if (ageMin) filters.ageMin = parseInt(ageMin);
		if (ageMax) filters.ageMax = parseInt(ageMax);

		if (city || selectedStates.length > 0) {
			filters.location = {
				city,
				states: selectedStates.length > 0 ? selectedStates : undefined,
				size: 100,
			};
		}

		onSearch(filters);
	};

	const handleLocationSearch = (locationParams: LocationSearchParams) => {
		const filters: SearchFilters = {
			breeds: selectedBreed ? [selectedBreed] : [],
			zipCodes: [],
			sort: `breed:${currentSort}`,
			location: locationParams,
		};

		if (ageMin) filters.ageMin = parseInt(ageMin);
		if (ageMax) filters.ageMax = parseInt(ageMax);

		onSearch(filters);
	};

	return (
		<div className='bg-white rounded-lg shadow-sm p-4 mb-6'>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-lg font-semibold text-gray-700'>Search Filters</h2>
				<button
					onClick={() => setShowFilters(!showFilters)}
					className='text-blue-500 hover:text-blue-600'
				>
					{showFilters ? 'Hide Filters' : 'Show Filters'}
				</button>
			</div>

			<form onSubmit={handleSubmit} className='space-y-4'>
				<div className='flex flex-wrap gap-4'>
					<div className='flex-1 min-w-[200px]'>
						<label
							htmlFor='breed-select'
							className='block text-sm font-medium text-gray-700 mb-1'
						>
							Breed
						</label>
						<select
							id='breed-select'
							value={selectedBreed}
							onChange={(e) => onBreedChange(e.target.value)}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
						>
							<option value=''>All Breeds</option>
							{breeds.map((breed) => (
								<option key={breed} value={breed}>
									{breed}
								</option>
							))}
						</select>
					</div>

					<div className='flex-1 min-w-[200px]'>
						<label
							htmlFor='sort-button'
							className='block text-sm font-medium text-gray-700 mb-1'
						>
							Sort Order
						</label>
						<button
							id='sort-button'
							type='button'
							onClick={() =>
								onSortChange(currentSort === 'asc' ? 'desc' : 'asc')
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-left'
						>
							Sort by Breed {currentSort === 'asc' ? '↑' : '↓'}
						</button>
					</div>
				</div>

				{showFilters && (
					<div className='flex flex-wrap gap-4'>
						<div className='flex-1 min-w-[200px]'>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Zip Code
							</label>
							<input
								type='text'
								value={zipCode}
								onChange={(e) => setZipCode(e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
								placeholder='Enter zip code'
							/>
						</div>

						<div className='flex-1 min-w-[200px]'>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Min Age
							</label>
							<input
								type='number'
								value={ageMin}
								onChange={(e) => setAgeMin(e.target.value)}
								min='0'
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
							/>
						</div>

						<div className='flex-1 min-w-[200px]'>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Max Age
							</label>
							<input
								type='number'
								value={ageMax}
								onChange={(e) => setAgeMax(e.target.value)}
								min='0'
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
							/>
						</div>

						<div className='flex-1 min-w-[200px]'>
							<label
								htmlFor='city-input'
								className='block text-sm font-medium text-gray-700 mb-1'
							>
								City
							</label>
							<input
								id='city-input'
								type='text'
								value={city}
								onChange={(e) => setCity(e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
								placeholder='Enter city name'
							/>
						</div>
					</div>
				)}

				{showFilters && (
					<div className='space-y-4'>
						<div className='flex-1'>
							<label
								htmlFor='location-search'
								className='block text-sm font-medium text-gray-700 mb-1'
							>
								Location Search
							</label>
							<LocationSearch onSearch={handleLocationSearch} />
						</div>
					</div>
				)}

				<div className='flex justify-end'>
					<button
						type='submit'
						className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors'
					>
						Apply Filters
					</button>
				</div>
			</form>
		</div>
	);
}
