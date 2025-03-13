import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { useParams } from 'react-router-dom';
import * as THREE from 'three';

import images from './assets/images';

function Image360() {
	const [texture, setTexture] = useState(new THREE.TextureLoader().load(""));
	const { scene } = useThree();
	const params = useParams();

	useEffect(() => {
		texture.mapping = THREE.EquirectangularReflectionMapping;
		texture.colorSpace = THREE.SRGBColorSpace;
		scene.background = texture;
		scene.environment = texture;
	}, [scene, texture]);

	useEffect(() => {
		if (params.mode !== 'liminal') {
			return;
		}

		const snapshotTaken = (e: Event) => {
			const customEvent = e as CustomEvent;

			setTexture(new THREE.TextureLoader().load(customEvent.detail));
		}

		window.addEventListener('snapshot-taken', snapshotTaken);

		return () => {
			window.removeEventListener('snapshot-taken', snapshotTaken);
		}
	}, [params]);

	useEffect(() => {
		if (params.imgUrl) {
			const imgUrl = params.imgUrl;
			const imgNumber = Number(imgUrl);

			const loader = new THREE.TextureLoader();

			if (!isNaN(imgNumber) && imgNumber > 0 && imgNumber <= images.length) {
				loader.load(images[imgNumber - 1], (texture) => setTexture(texture));
			} else {
				//the image should be a URL
				loader.load(imgUrl,
					(texture) => setTexture(texture),
					undefined,
					(e) => {
						alert('Failed to load image: ' + e);
					});
			}
		} else {
			//no img specified loaded - use a random default
			const randomIndex = Math.floor(Math.random() * images.length);
			setTexture(new THREE.TextureLoader().load(images[randomIndex]));
		}
	}, [params]);

	return null;
}

export default Image360;