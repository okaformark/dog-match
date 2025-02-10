import { useState, useCallback } from 'react';
import { LocationSearchParams } from '../hooks/useLocations';
import { LocationFilter } from './LocationFilter';

export interface SearchFilters {
	breeds: string[];
	zipCodes: string[];
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
	const [searchInput, setSearchInput] = useState('');
	const [zipCode, setZipCode] = useState('');

	const handleLocationChange = useCallback(
		(value: string, location?: LocationSearchParams) => {
			setSearchInput(value);
			onSearch({
				breeds: selectedBreed ? [selectedBreed] : [],
				zipCodes: [],
				sort: `breed:${currentSort}`,
				location,
			});
			console.log('location', location);
			console.log('value', value);
		},
		[selectedBreed, currentSort, onSearch]
	);

	const handleZipChange = useCallback(
		(value: string) => {
			setZipCode(value);
			onSearch({
				breeds: selectedBreed ? [selectedBreed] : [],
				zipCodes: value ? [value] : [],
				sort: `breed:${currentSort}`,
				location: undefined,
			});
		},
		[selectedBreed, currentSort, onSearch]
	);

	return (
		<div className='bg-white rounded-lg shadow-sm p-4 mb-6'>
			<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
				<div>
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

				<LocationFilter value={searchInput} onChange={handleLocationChange} />

				<div>
					<label
						htmlFor='zip-code'
						className='block text-sm font-medium text-gray-700 mb-1'
					>
						ZIP Code
					</label>
					<input
						id='zip-code'
						type='text'
						value={zipCode}
						onChange={(e) => handleZipChange(e.target.value)}
						placeholder='Enter ZIP code'
						className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
					/>
				</div>

				<div>
					<label
						htmlFor='sort-button'
						className='block text-sm font-medium text-gray-700 mb-1'
					>
						Sort Order
					</label>
					<button
						id='sort-button'
						onClick={() => onSortChange(currentSort === 'asc' ? 'desc' : 'asc')}
						className='w-full px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-left'
					>
						Sort by Breed {currentSort === 'asc' ? '↑' : '↓'}
					</button>
				</div>
			</div>
		</div>
	);
}
