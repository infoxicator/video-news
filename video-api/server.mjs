/**
 * This is an example of a server that returns dynamic video.
 * Run `npm run server` to try it out!
 * If you don't want to render videos on a server, you can safely
 * delete this file.
 */
import {initializeApp, cert} from 'firebase-admin/app';
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
import cors from "cors";

const app = express();
const port = process.env.PORT || 8000;
const compositionId = 'bigBadGroup';

var whitelist = [
	"http://localhost:8000",
	"http://localhost:9000",
  ];
  
  var corsOptions = {
	origin: function (origin, callback) {
	  var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
	  callback(null, originIsWhitelisted);
	},
  };

const firebaseCERT = JSON.parse(process.env.FIREBASE_CERT);

initializeApp({
	credential: cert(firebaseCERT),
	storageBucket: 'video-news-5bfc0.appspot.com',
});

const bucket = getStorage().bucket();

async function upload(storagePath, file) {
	const uuid = 'testToken';
	const data = await bucket.upload(file, {
		destination: storagePath,
		metadata: {
			metadata: {
				firebaseStorageDownloadTokens: uuid,
			},
		},
	});
	let uploadedFile = data[0];
	return (
		'https://firebasestorage.googleapis.com/v0/b/' +
		bucket.name +
		'/o/' +
		encodeURIComponent(uploadedFile.name) +
		'?alt=media&token=' +
		uuid
	);
	// const storage = getStorage()
	// const storageRef = ref(storage, storagePath)
	// await uploadBytes(storageRef, file)
	// const url = await getDownloadURL(storageRef)
	// return url
}

app.use(cors(corsOptions))
app.use(express.json());
app.post('/', async (req, res) => {
	try {
		// if (cache.get(JSON.stringify(req.query))) {
		// 	sendFile(cache.get(JSON.stringify(req.query)));
		// 	return;
		// }
		const bundled = await bundle(path.join(process.cwd(), './src/index.jsx'));
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
		const url = await upload('test/file.mp4', finalOutput);
		console.log(url);
		res.send({url});
		console.log('Video rendered and sent!');
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
