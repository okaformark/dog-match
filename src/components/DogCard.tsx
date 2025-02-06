import { Dog } from '../hooks/useDogs';

interface DogCardProps {
	readonly dog: Dog;
}

export function DogCard({ dog }: DogCardProps) {
	return (
		<div className='bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1'>
			<div className='relative'>
				<img
					src={dog.img}
					alt={dog.name}
					className='w-full h-56 object-cover'
				/>
				<div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4'>
					<h2 className='text-2xl font-bold text-white'>{dog.name}</h2>
				</div>
			</div>
			<div className='p-5 space-y-3'>
				<div className='flex items-center space-x-2'>
					<span className='text-gray-600 font-medium'>Breed:</span>
					<span className='text-gray-800'>{dog.breed}</span>
				</div>
				<div className='flex items-center space-x-2'>
					<span className='text-gray-600 font-medium'>Age:</span>
					<span className='text-gray-800'>{dog.age} years</span>
				</div>
				<div className='flex items-center space-x-2'>
					<span className='text-gray-600 font-medium'>Location:</span>
					<span className='text-gray-800'>{dog.zip_code}</span>
				</div>
			</div>
		</div>
	);
}
