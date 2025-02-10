import { useEffect, useRef, useState } from 'react';

interface OptimizedImageProps {
	readonly src: string;
	readonly alt: string;
	readonly className?: string;
}

export function OptimizedImage({
	src,
	alt,
	className = '',
}: OptimizedImageProps) {
	const [isInView, setIsInView] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const imgRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsInView(true);
						observer.unobserve(entry.target);
					}
				});
			},
			{
				rootMargin: '50px', // Start loading images 50px before they enter viewport
				threshold: 0.1,
			}
		);

		const currentRef = imgRef.current;

		if (currentRef) {
			observer.observe(currentRef);
		}

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef);
			}
		};
	}, []);

	return (
		<div ref={imgRef} className={`relative bg-gray-200 ${className}`}>
			{isInView && (
				<img
					src={src}
					alt={alt}
					loading='lazy'
					className={`w-full h-full object-cover transition-opacity duration-300 ${
						isLoaded ? 'opacity-100' : 'opacity-0'
					} ${className}`}
					onLoad={() => setIsLoaded(true)}
					onError={(e) => {
						const img = e.target as HTMLImageElement;
						img.src = 'https://placehold.co/400x300?text=No+Image';
					}}
				/>
			)}
		</div>
	);
}
