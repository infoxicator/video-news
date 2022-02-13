import {interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import { ImageTest } from './ImageTest';

export const ImageSlideGroup = ({imgs=[]}) => {
	const frame = useCurrentFrame();
	const videoConfig = useVideoConfig();

	const framesPerSlide = Math.floor(videoConfig.durationInFrames / imgs.length);
	return (
		<div style={{flex: 1, display:'relative', zIndex:0}}>

                {imgs.map((img, i) => {
                    return (
                        <Sequence from={0 + i * framesPerSlide} durationInFrames={videoConfig.durationInFrames}>
                            <ImageTest img={img} index={i} frames={framesPerSlide}/>
                        </Sequence>
                    )
                })}

		</div>
	);
};
