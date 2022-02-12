import {Composition} from 'remotion';
import {HelloWorld} from './HelloWorld';
import {TextTest} from './Sample/TextTest';
import { TextSlideGroup } from './Sample/TextSlideGroup';
import {ImageTest} from './Sample/ImageTest';
import {ImageSlideGroup} from './Sample/ImageSlideGroup';
import {Logo} from './HelloWorld/Logo';
import {Subtitle} from './HelloWorld/Subtitle';
import response from "../response.json"
import { BigBadGroup } from './Sample/TheRealGroup';
import { textBreaker } from './Sample/textBreaker';

export const RemotionVideo = () => {
	return (
		<>
			<Composition
				id="bigBadGroup"
				component={BigBadGroup}
				durationInFrames={450}
				fps={30}
				width={1080}
				height={1920}
				defaultProps={{
					imgs: response.images,
					strings: textBreaker(response.aiSummary),
			
				}}
			/>
		<Composition
				id="imageGroup"
				component={ImageSlideGroup}
				durationInFrames={150}
				fps={30}
				width={1080}
				height={1920}
				defaultProps={{
					imgs: response.images
				}}
			/>
			{/* <Composition
				id="textGroup"
				component={TextSlideGroup}
				durationInFrames={150}
				fps={30}
				width={1080}
				height={1920}
				defaultProps={{
					titleText: 'Welcome to Remotion',
					titleColor: 'black',
					strings: textBreaker(response.aiSummary),
				}}
			/> */}
		{/* <Composition
				id="ImageTest"
				component={ImageTest}
				durationInFrames={150}
				fps={30}
				width={1080}
				height={1920}
				defaultProps={{
					titleText: 'Welcome to Remotion',
					titleColor: 'black',
				}}
			/>
			<Composition
				id="HelloWorld"
				component={HelloWorld}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					titleText: 'Welcome to Remotion',
					titleColor: 'black',
				}}
			/>
			<Composition
				id="Logo"
				component={Logo}
				durationInFrames={200}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="Title"
				component={Subtitle}
				durationInFrames={100}
				fps={30}
				width={1920}
				height={1080}
			/> */}
		</>
	);
};
