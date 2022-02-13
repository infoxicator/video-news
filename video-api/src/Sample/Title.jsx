import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const Title = ({titleText}) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();
	const text = titleText.split(' ').map((t) => ` ${t} `);
	return (
		<div
			style={{
				height: '100%',
				width: '100%',
				backgroundColor: '#5716A2',
				padding: 50,
				color: '#FFD166',
			}}
		>
			<p style={{
				fontSize: 80,
				color: '#ffffff',
				fontFamily: 'SF Pro Text, Helvetica, Arial',
			}}>NEWS FLASH</p>
			<h1
				style={{
					fontFamily: 'SF Pro Text, Helvetica, Arial',
					fontWeight: 'bold',
					fontSize: 140,
					textAlign: 'left',
					
					width: '100%',
				}}
			>
				{text.map((t, i) => {
					return (
						<span
							key={t}
							style={{
								marginLeft: 10,
								marginRight: 10,
								transform: `scale(${spring({
									fps: videoConfig.fps,
									frame: frame - i * 5,
									config: {
										damping: 100,
										stiffness: 200,
										mass: 0.5,
									},
								})})`,
								display: 'inline-block',
							}}
						>
							{t}
						</span>
					);
				})}
			</h1>
		</div>
	);
};
