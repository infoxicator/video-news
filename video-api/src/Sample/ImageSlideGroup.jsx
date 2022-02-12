import {interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import { ImageTest } from './ImageTest';

export const ImageSlideGroup = ({imgs=[]}) => {
	const frame = useCurrentFrame();
	const videoConfig = useVideoConfig();

	const framesPerSlide = videoConfig.durationInFrames / imgs.length;
	return (
		<div style={{flex: 1, backgroundColor: 'white', display:'relative', zIndex:0}}>

                {imgs.map((img, i) => {
                    return (
                        <Sequence from={0 + i * framesPerSlide} durationInFrames={videoConfig.durationInFrames}>
                            <ImageTest img={img} index={i}mframes={framesPerSlide}/>
                        </Sequence>
                    )
                })}

		</div>
	);
};
