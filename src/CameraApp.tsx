import Display360 from "./Display360";
import PhotoBook from "./PhotoBook";
import SnapshotCameraControls from "./SnapshotCameraControls";

function CameraApp() {
	return (
		<>
			<Display360 />
			<SnapshotCameraControls />
			<PhotoBook />
		</>
	)
}

export default CameraApp;