import {interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {ImageSlideGroup} from './ImageSlideGroup';
import { textBreaker } from './textBreaker';
import {TextSlideGroup} from './TextSlideGroup';
import {Title} from './Title';

export const BigBadGroup = ({images = [], aiSummary, title}) => {
	const frame = useCurrentFrame();
	const videoConfig = useVideoConfig();
    const strings = textBreaker(aiSummary);
	return (
		<div style={{flex: 1, backgroundColor: 'white'}}>
			<Sequence from={0} durationInFrames={videoConfig.durationInFrames}>
				<Title titleText={title} />
			</Sequence>
			<Sequence from={60} durationInFrames={videoConfig.durationInFrames}>
				<TextSlideGroup
					strings={strings}
					durationInFrames={videoConfig.durationInFrames}
				/>
			</Sequence>
			<Sequence from={60} durationInFrames={videoConfig.durationInFrames}>
				<ImageSlideGroup
					imgs={images.slice(0, 5)}
					durationInFrames={videoConfig.durationInFrames}
				/>
			</Sequence>
		</div>
	);
};
