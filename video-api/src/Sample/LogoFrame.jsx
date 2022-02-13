import {spring, useCurrentFrame, useVideoConfig, Img} from 'remotion';

export const LogoFrame = ({
	index,
	img = 'https://raw.githubusercontent.com/victormasson21/files/main/newsreel.png',
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

const width = (frame >= 70) ? `${60 - (60 / (90-frame))}%`: '60%';

	return (
		<div
			style={{
				backgroundColor: 'white',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Img
				style={{
					width: {width},
					transform: index ? `scale(${gradualScale})` : `scale(${scaleIn})`,
				}}
				src={img}
			/>
		</div>
	);
};

// const gradualScale = spring({
// 	frame,
// 	config: {
// 		stiffness: 200,
// 		overshootClamping: true,
// 	},
// 	from: index % 2 === 0 ? 1 : 1.1,
// 	to: index % 2 === 0 ? 1.1 : 1,
// 	fps: 30,
// });

// const slideIn = spring({
// 	frame,
// 	config: {
// 		mass: 0.5,
// 	},
// 	from: 1080,
// 	to: 0,
// 	fps: 30,
// });
