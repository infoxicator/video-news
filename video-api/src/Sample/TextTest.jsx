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

	const slideOut = spring({
		frame: frame-((frames/10)*9),
		config: {
			mass: 0.1,
		},
		from: 0,
		to: 700,
		fps: 30,
	});


	return (
		<div style={{
			transform:`translateY(${slideOut}px)`,
			transformOrigin: "bottom center",
			display: 'flex',
			alignItems:'center'
		}}>
		<div
			style={{
				marginTop: 'auto',
				padding: '3rem',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'flex-end',
				transform: `translateX(${slideIn}px)`,
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
							fontSize: '3.5rem',
							marginTop: 0,
							marginBottom: 0,
							marginRight:60,
							marginLeft:60,
							fontFamily: 'verdana',
						}}
					>
						{string}
					</p>
				</div>
			</div>
		</div>
		</div>
	);
};
