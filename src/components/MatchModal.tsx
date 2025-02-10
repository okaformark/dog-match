import { Dog } from '../hooks/useDogs';
import { OptimizedImage } from './OptimizedImage';

interface MatchModalProps {
	readonly dog: Dog;
	readonly onClose: () => void;
}

export function MatchModal({ dog, onClose }: MatchModalProps) {
	return (
		<div className='fixed inset-0 bg-gray-600/75 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
			<div className='bg-white rounded-xl max-w-lg w-full overflow-hidden shadow-xl'>
				<div className='relative'>
					<OptimizedImage
						src={dog.img}
						alt={dog.name}
						className='w-full h-64'
					/>
					<div className='absolute top-4 right-4'>
						<button
							onClick={onClose}
							className='bg-white rounded-full p-2 hover:bg-gray-100'
							aria-label='Close modal'
						>
							✕
						</button>
					</div>
				</div>
				<div className='p-6'>
					<h2 className='text-2xl font-bold text-center mb-4'>
						You've been matched with {dog.name}! 🎉
					</h2>
					<div className='space-y-3'>
						<p className='text-gray-600'>
							<span className='font-medium'>Breed:</span> {dog.breed}
						</p>
						<p className='text-gray-600'>
							<span className='font-medium'>Age:</span> {dog.age} years
						</p>
						<p className='text-gray-600'>
							<span className='font-medium'>Location:</span> {dog.zip_code}
						</p>
					</div>
					<button
						onClick={onClose}
						className='w-full mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
