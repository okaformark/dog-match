import { useCallback } from 'react';
import { LocationSearchParams } from '../hooks/useLocations';

interface LocationFilterProps {
	readonly value: string;
	readonly onChange: (value: string, location?: LocationSearchParams) => void;
}

export function LocationFilter({ value, onChange }: LocationFilterProps) {
	const handleChange = useCallback(
		(newValue: string) => {
			let location: LocationSearchParams | undefined;

			if (newValue.length === 0) {
				// Clear the filter when input is empty
				location = undefined;
			} else if (newValue.length === 2) {
				location = { states: [newValue.toUpperCase()] };
			} else if (newValue.length > 2) {
				location = { city: newValue };
			}

			onChange(newValue, location);
		},
		[onChange]
	);

	return (
		<div>
			<label
				htmlFor='location-search'
				className='block text-sm font-medium text-gray-700 mb-1'
			>
				Location (city or state code)
			</label>
			<input
				id='location-search'
				type='text'
				value={value}
				onChange={(e) => handleChange(e.target.value)}
				placeholder='Enter city or state (e.g., Boston or MA)'
				className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
			/>
		</div>
	);
}
