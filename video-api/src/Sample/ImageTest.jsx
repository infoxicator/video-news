import {spring, useCurrentFrame, useVideoConfig, Img} from 'remotion';

export const ImageTest = ({
	frames,
	index,
	img = 'https://themoorlander.co.uk/wp-content/uploads/2022/02/Museum-of-the-Moon-by-Luke-Jerram-Photo-James-Billings.jpg',
}) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();
	const gradualScale = spring({
		frame,
		config: {
			stiffness: 200,
			overshootClamping: true,
		},
		from: index % 2 === 0 ? 1 : 1.1,
		to: index % 2 === 0 ? 1.1 : 1,
		fps: 30,
	});
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
	const slideOut = spring({
		frame: frame - (frames / 10) * 9,
		config: {
			mass: 0.1,
		},
		from: 0,
		to: -200,
		fps: 30,
	});

	return (
		<div
			style={{
				position: 'relative',
				backgroundColor: 'black',
				top: 0,
				transform: index ? `translateX(${slideIn}px)` : '',
			}}
		>
			<div
				style={{
					position: 'absolute',
					fontFamily: 'SF Pro Text, Helvetica, Arial',
					zIndex: 5,
					top: 12,
					fontSize: 80,
					fontWeight: 600,
					padding: 10,
					borderRadius: '50%',
					left: 12,
					width: 120,
					height: 120,
					color: 'white',
					backgroundColor: '#5716A2',
					border: '10px solid #731DD8',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					transform: `translateY(${slideOut}px)`,
				}}
			>
				<p style={{margin: 0}}>{index + 1}</p>
			</div>
			<Img
				style={{
					width: '1080px',
					minHeight: '100%',
					objectFit: 'cover',
					opacity: 0.8,
					transform: index ? `scale(${gradualScale})` : `scale(${scaleIn})`,
				}}
				src={img}
			/>
		</div>
	);
};
