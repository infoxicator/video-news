import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import ArrowDown from './ArrowDown';
import TldrLogo from './Logo';

export const EndFrame = ({callToAction = ''}) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();
	const text = callToAction.split(' ').map((t) => ` ${t} `);

	const scaleIn = spring({
		frame,
		config: {
			mass: 3.5,
		},
		from: 1,
		to: 1.3,
		fps: 10,
	});

	return (
		<div
			style={{
				height: '100%',
				width: '100%',
				backgroundColor: '#5716A2',
				padding: `50px 70px 150px 70px`,
				color: '#FFD166',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: `space-between`,
			}}
		>
			<span
				style={{
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<TldrLogo fill="#FFD166" width={50} style={{display: 'inline'}} />
				<h4
					style={{
						fontFamily: 'SF Pro Text, Helvetica, Arial',
						fontWeight: 'bold',
						fontSize: 50,
						marginLeft: '50px',
						width: '100%',
						display: 'inline',
					}}
				>
					TLDR Stories
				</h4>
			</span>
			<h1
				style={{
					fontFamily: 'SF Pro Text, Helvetica, Arial',
					fontWeight: 'bold',
					fontSize: 130,
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
			<span style={{transform: `scale(${scaleIn})`}}>
				<ArrowDown fill="#FFD166" />
			</span>
		</div>
	);
};
