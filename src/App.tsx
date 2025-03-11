import React, { useEffect, useState } from 'react';
import { DeviceOrientationControls, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

import image360 from './texel.jpg';

function App() {
  const panoramaTexture = new THREE.TextureLoader().load(image360);
  const [supportsDeviceOrientation, setSupportsDeviceOrientation] = useState(false);
  const { scene } = useThree();

  useEffect(() => {
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation, true);
    }

    function handleDeviceOrientation(event: DeviceOrientationEvent) {
      if (event.alpha && event.beta && event.gamma) {
        setSupportsDeviceOrientation(true);
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }
    }

    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);

  useEffect(() => {
    panoramaTexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = panoramaTexture;
    scene.environment = panoramaTexture;
  }, [scene, panoramaTexture]);

  return (
    <>
      {supportsDeviceOrientation ? <DeviceOrientationControls /> : <OrbitControls enablePan={false} />}
      <PerspectiveCamera makeDefault fov={55} position={[1, 0, 0]} /> {/* For some reason, position can't be 0, 0, 0 otherwise the controls no longer work */}
    </>
  );
}

export default App;
