import {interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {ImageSlideGroup} from './ImageSlideGroup';
import {textBreaker} from './textBreaker';
import {TextSlideGroup} from './TextSlideGroup';
import {Title} from './Title';
import {EndFrame} from './EndFrame';

export const BigBadGroup = ({images = [], aiSummary, title}) => {
	const frame = useCurrentFrame();
	const videoConfig = useVideoConfig();
	const strings = textBreaker(aiSummary);
	const titleDuration = title.length * 1.5;
	const endDuration = 90;
	const sequenceDuration =
		videoConfig.durationInFrames - titleDuration - endDuration;

	return (
		<div style={{flex: 1, backgroundColor: 'white'}}>
			<Sequence from={0} durationInFrames={titleDuration}>
				<Title titleText={title} />
			</Sequence>
			<Sequence from={titleDuration} durationInFrames={sequenceDuration}>
				<TextSlideGroup strings={strings} durationInFrames={sequenceDuration} />
			</Sequence>
			<Sequence from={titleDuration} durationInFrames={sequenceDuration}>
				<ImageSlideGroup
					imgs={images.slice(0, 5)}
					durationInFrames={sequenceDuration}
				/>
			</Sequence>
			<Sequence
				from={videoConfig.durationInFrames - endDuration}
				durationInFrames={endDuration}
			>
				<EndFrame callToAction="Hit the link to read more..." />
			</Sequence>
		</div>
	);
};
