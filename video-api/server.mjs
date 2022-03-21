/**
 * This is an example of a server that returns dynamic video.
 * Run `npm run server` to try it out!
 * If you don't want to render videos on a server, you can safely
 * delete this file.
 */
import {initializeApp, applicationDefault} from 'firebase-admin/app';
import {getStorage} from 'firebase-admin/storage';
import dotenv from 'dotenv';
dotenv.config({
	path: `.env`,
});

import {bundle} from '@remotion/bundler';
import {
	getCompositions,
	renderFrames,
	stitchFramesToVideo,
} from '@remotion/renderer';
import express from 'express';
import fs from 'fs';
import os from 'os';
import path from 'path';
import cors from 'cors';
import md5 from 'md5';


const app = express();
const port = process.env.PORT || 8000;
const compositionId = 'bigBadGroup';

const whitelist = [
	'http://localhost:8000',
	'http://localhost:9000',
	'https://video-news-fe.onrender.com',
	'http://video-news-fe.onrender.com',
];

const corsOptions = {
	origin (origin, callback) {
		const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
		callback(null, originIsWhitelisted);
	},
};

initializeApp({
	credential: applicationDefault(),
	storageBucket: 'video-news-d652f.appspot.com',
});

const bucket = getStorage().bucket();
const uuid = 'newsTime';
async function upload(storagePath, file) {
	const data = await bucket.upload(file, {
		destination: storagePath,
		metadata: {
			metadata: {
				firebaseStorageDownloadTokens: uuid,
			},
		},
	});
	const uploadedFile = data[0];
	return (
		'https://firebasestorage.googleapis.com/v0/b/' +
		bucket.name +
		'/o/' +
		encodeURIComponent(uploadedFile.name) +
		'?alt=media&token=' +
		uuid
	);
}

app.use(cors(corsOptions));
app.use(express.json());
app.post('/', async (req, res) => {
	try {
		const fileID = md5(req.body.title);
		const storageFile = bucket.file(`${fileID}.mp4`);
		storageFile.exists().then(async (exists) => {
			if (exists[0]) {	
				const url =
					'https://firebasestorage.googleapis.com/v0/b/' +
					bucket.name +
					'/o/' +
					encodeURIComponent(storageFile.name) +
					'?alt=media&token=' +
					uuid;
				res.send({url});
				return;
			} else {
				const bundled = await bundle(
					path.join(process.cwd(), './src/index.jsx')
				);
				const comps = await getCompositions(bundled);
				const video = comps.find((c) => c.id === compositionId);
				if (!video) {
					throw new Error(`No video called ${compositionId}`);
				}
				res.set('content-type', 'video/mp4');

				const tmpDir = await fs.promises.mkdtemp(
					path.join(os.tmpdir(), 'remotion-')
				);
				const {assetsInfo} = await renderFrames({
					config: video,
					webpackBundle: bundled,
					onStart: () => console.log('Rendering frames...'),
					onFrameUpdate: (f) => {
						if (f % 10 === 0) {
							console.log(`Rendered frame ${f}`);
						}
					},
					parallelism: null,
					outputDir: tmpDir,
					inputProps: req.body,
					compositionId,
					imageFormat: 'jpeg',
				});

				const finalOutput = path.join(tmpDir, 'out.mp4');
				await stitchFramesToVideo({
					dir: tmpDir,
					force: true,
					fps: video.fps,
					height: video.height,
					width: video.width,
					outputLocation: finalOutput,
					imageFormat: 'jpeg',
					assetsInfo,
				});
				// cache.set(JSON.stringify(req.query), finalOutput);
				const url = await upload(`${fileID}.mp4`, finalOutput);
				console.log(url);
				res.send({url});
				console.log('Video rendered and sent!');
				return
			}
		});
	} catch (err) {
		console.error(err);
		res.json({
			error: err,
		});
	}
});

app.listen(port);

console.log(
	[
		`The server has started on http://localhost:${port}!`,
		'You can render a video by passing props as URL parameters.',
		'',
		'If you are running Hello World, try this:',
		'',
		`http://localhost:${port}?titleText=Hello,+World!&titleColor=red`,
		'',
	].join('\n')
);
