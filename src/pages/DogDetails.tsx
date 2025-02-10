import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Dog } from '../hooks/useDogs';
import { useLocations } from '../hooks/useLocations';
import { OptimizedImage } from '../components/OptimizedImage';

export default function DogDetails() {
	const { id } = useParams<{ id: string }>();
	

	const { data: dog, isLoading } = useQuery<Dog>({
		queryKey: ['dog', id],
		queryFn: async () => {
			const response = await fetch('/dogs', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify([id]),
			});
			if (!response.ok) {
				throw new Error('Failed to fetch dog details');
			}
			const dogs = await response.json();
			return dogs[0];
		},
	});

	const { data: locations } = useLocations(dog ? [dog.zip_code] : []);
	const location = locations?.[0];

	if (isLoading) {
		return (
			<div className='min-h-screen bg-gray-50 px-4 py-8'>
				<div className='max-w-4xl mx-auto'>
					<p>Loading...</p>
				</div>
			</div>
		);
	}

	if (!dog) {
		return (
			<div className='min-h-screen bg-gray-50 px-4 py-8'>
				<div className='max-w-4xl mx-auto'>
					<p>Dog not found</p>
					<Link to='/home' className='text-blue-500 hover:underline'>
						Return to Home
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gray-50'>
			<div className='max-w-4xl mx-auto px-4 py-8'>
				<div className='mb-6 flex items-center justify-between'>
					<Link
						to='/home'
						className='text-blue-500 hover:underline flex items-center'
					>
						← Back to Search
					</Link>
				</div>

				<div className='bg-white rounded-xl overflow-hidden shadow-lg'>
					<OptimizedImage
						src={dog.img}
						alt={dog.name}
						className='w-full h-96 object-cover'
					/>

					<div className='p-8'>
						<div className='mb-8'>
							<h1 className='text-4xl font-bold text-gray-900 mb-2'>
								{dog.name}
							</h1>
							{location && (
								<p className='text-xl text-gray-600'>
									{location.city}, {location.state} {dog.zip_code}
								</p>
							)}
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
							<div>
								<h2 className='text-2xl font-semibold mb-4'>Details</h2>
								<div className='space-y-3'>
									<p className='text-gray-600'>
										<span className='font-medium'>Breed:</span> {dog.breed}
									</p>
									<p className='text-gray-600'>
										<span className='font-medium'>Age:</span> {dog.age} years
									</p>
								</div>
							</div>

							{location && (
								<div>
									<h2 className='text-2xl font-semibold mb-4'>Location</h2>
									<div className='space-y-3'>
										<p className='text-gray-600'>
											<span className='font-medium'>City:</span> {location.city}
										</p>
										<p className='text-gray-600'>
											<span className='font-medium'>State:</span>{' '}
											{location.state}
										</p>
										<p className='text-gray-600'>
											<span className='font-medium'>County:</span>{' '}
											{location.county}
										</p>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
