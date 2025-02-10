import { Dog } from '../hooks/useDogs';
import { useLocations } from '../hooks/useLocations';
import { OptimizedImage } from './OptimizedImage';
import { Link } from 'react-router-dom';

interface DogCardProps {
	readonly dog: Dog;
	readonly isFavorite: boolean;
	readonly onFavoriteClick: () => void;
}

export function DogCard({ dog, isFavorite, onFavoriteClick }: DogCardProps) {
	const { data: locations } = useLocations([dog.zip_code]);
	const location = locations?.[0];

	return (
		<Link
			to={`/dogs/${dog.id}`}
			className='block bg-white rounded-lg shadow-sm overflow-hidden transform transition-transform duration-200 hover:scale-105 hover:shadow-md'
		>
			<OptimizedImage src={dog.img} alt={dog.name} className='w-full h-48' />
			<div className='p-4'>
				<div className='flex justify-between items-start'>
					<h3 className='text-lg font-semibold'>{dog.name}</h3>
					<button
						onClick={(e) => {
							e.preventDefault(); // Prevent navigation when clicking favorite
							onFavoriteClick();
						}}
						className='text-2xl text-red-500 hover:text-red-600 transition-colors'
						aria-label={
							isFavorite ? 'Remove from favorites' : 'Add to favorites'
						}
					>
						{isFavorite ? '❤️' : '🤍'}
					</button>
				</div>
				<p className='text-gray-600'>{dog.breed}</p>
				<p className='text-gray-600'>Age: {dog.age}</p>
				<p className='text-gray-600'>
					{location
						? `${location.city}, ${location.state}, ${dog.zip_code}`
						: ''}
				</p>
			</div>
		</Link>
	);
}
