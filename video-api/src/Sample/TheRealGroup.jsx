import {interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import { ImageSlideGroup } from './ImageSlideGroup';
import { TextSlideGroup } from './TextSlideGroup';

export const BigBadGroup = ({imgs=[], strings=[]}) => {
	const frame = useCurrentFrame();
	const videoConfig = useVideoConfig();
	return (
		<div style={{flex: 1, backgroundColor: 'white'}}>
              <Sequence from={0} durationInFrames={videoConfig.durationInFrames}>
                            <TextSlideGroup strings={strings} durationInFrames={videoConfig.durationInFrames}/>
                        </Sequence>
                        <Sequence from={0} durationInFrames={videoConfig.durationInFrames}>
                            <ImageSlideGroup imgs={imgs} durationInFrames={videoConfig.durationInFrames}/>
                        </Sequence>
                      
		</div>
	);
};
