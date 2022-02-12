import {spring, useCurrentFrame, useVideoConfig, Img} from 'remotion';

export const TextTest = ({string = '', index, frames}) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();

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
				padding: '3rem',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'flex-end',
				transform: index ? `translateX(${slideIn}px)` : '',
			}}
		>
			<div
				style={{
					transform: 'skew(20deg)',
					backgroundColor: '#5716A2',
					border: '10px solid #731DD8',
					padding: 20,
					borderRadius: '15px',
				}}
			>
				<div
					style={{
						transform: 'skew(-20deg)',
			
					}}
				>
					<p
						style={{
							color: '#ffffff',
							fontSize: '3rem',
							marginTop: 0,
							marginBottom: 0,
							marginRight:50,
							marginLeft:50,
							fontFamily: 'verdana',
						}}
					>
						{string}
					</p>
				</div>
			</div>
		</div>
	);
};
