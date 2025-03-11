import React, { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { useParams } from 'react-router-dom';
import * as THREE from 'three';

import images from './assets/images';

function Image360() {
	const [texture, setTexture] = useState(new THREE.TextureLoader().load(""));
	const { scene, gl } = useThree();
	const params = useParams();

	useEffect(() => {
		texture.mapping = THREE.EquirectangularReflectionMapping;
		scene.background = texture;
		scene.environment = texture;

		gl.toneMapping = THREE.ACESFilmicToneMapping;
		gl.toneMappingExposure = 0.5;
	}, [scene, texture]);

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

	return (
		<>
		</>
	);
}

export default Image360;