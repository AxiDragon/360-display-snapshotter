import { useEffect, useState } from 'react';
import { DeviceOrientationControls, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import Image360 from './Image360';
import SnapshotCamera from './SnapshotCamera';

function Display360() {
  const [supportsDeviceOrientation, setSupportsDeviceOrientation] = useState(false);

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

  return (
    <Canvas>
      <SnapshotCamera />
      <Image360 />
      {supportsDeviceOrientation ? <DeviceOrientationControls /> : <OrbitControls enablePan={false} />}
      <PerspectiveCamera makeDefault fov={55} position={[1, 0, 0]} /> {/* For some reason, position can't be 0, 0, 0 otherwise the controls no longer work */}
    </Canvas>
  );
}

export default Display360;
