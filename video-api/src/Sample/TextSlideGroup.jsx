import {interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {TextTest} from './TextTest';

export const TextSlideGroup = ({strings = []}) => {
	const frame = useCurrentFrame();
	const videoConfig = useVideoConfig();

	const framesPerSlide = videoConfig.durationInFrames / strings.length;

	return (
		<div style={{flex: 1, display: 'relative', zIndex: 3}}>
			{strings.map((string, i) => {
				return (
					<Sequence
						from={0 + i * framesPerSlide}
						durationInFrames={videoConfig.durationInFrames}
					>
						<TextTest string={string} index={i} frames={framesPerSlide} />
					</Sequence>
				);
			})}
		</div>
	);
};
