import { useState } from 'react';
import { LocationSearchParams, Coordinates } from '../hooks/useLocations';

interface LocationSearchProps {
	readonly onSearch: (params: LocationSearchParams) => void;
}

export function LocationSearch({ onSearch }: LocationSearchProps) {
	const [searchInput, setSearchInput] = useState('');

	const handleSearch = () => {
		// Check if input might be coordinates
		if (searchInput.includes(',')) {
			const [lat, lon] = searchInput.split(',').map(Number);
			if (!isNaN(lat) && !isNaN(lon)) {
				const coords: Coordinates = { lat, lon };
				onSearch({
					geoBoundingBox: {
						top_left: coords,
						bottom_right: {
							lat: coords.lat - 0.1, // Create a small bounding box
							lon: coords.lon + 0.1,
						},
					},
				});
				return;
			}
		}

		// Check if input is a state code (2 letters)
		if (searchInput.length === 2) {
			onSearch({
				states: [searchInput.toUpperCase()],
			});
			return;
		}

		// Default to city search
		onSearch({
			city: searchInput,
		});
	};

	return (
		<div className='flex gap-2'>
			<input
				type='text'
				value={searchInput}
				onChange={(e) => setSearchInput(e.target.value)}
				placeholder='Enter city, state code, or coordinates (lat,lon)'
				className='flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
			/>
			<button
				onClick={handleSearch}
				className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors'
			>
				Search
			</button>
		</div>
	);
}
