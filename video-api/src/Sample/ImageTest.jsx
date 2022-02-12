import {spring, useCurrentFrame, useVideoConfig, Img} from 'remotion';

export const ImageTest = ({
	index,
	img = 'https://themoorlander.co.uk/wp-content/uploads/2022/02/Museum-of-the-Moon-by-Luke-Jerram-Photo-James-Billings.jpg',
}) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();
	const scaleIn = spring({
		frame,
		config: {
			mass: 2.5,
		},
		from: 1,
		to: 1.1,
		fps: 30,
	});
	const slideIn = spring({
		frame,
		config: {
			mass: 0.5,
		},
		from: 1080,
		to: 0,
		fps: 30,
	});
	return (
		<div
			style={{
				position: 'relative',
				backgroundColor: 'black',
				top: 0,
				transform: index? `translateX(${slideIn}px)` : "",
			}}
		>
			<Img
				style={{
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					opacity: 0.8,
					transform: index ? '' : `scale(${scaleIn})`,
				}}
				src={img}
			/>
		</div>
	);
};
