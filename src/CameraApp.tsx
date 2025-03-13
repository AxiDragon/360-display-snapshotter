import Display360 from "./Display360";
import PhotoBook from "./PhotoBook";
import PhotoSaver from "./PhotoSaver";
import SnapshotCameraControls from "./SnapshotCameraControls";

function CameraApp() {
	return (
		<>
			<Display360 />
			<SnapshotCameraControls />
			<PhotoBook />
			<PhotoSaver />
		</>
	)
}

export default CameraApp;