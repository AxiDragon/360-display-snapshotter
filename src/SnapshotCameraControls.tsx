import { useEffect, useRef } from "react";

function SnapshotCameraControls() {
	const snapshotRef = useRef<HTMLAnchorElement>(null!);

	const onClick = () => {
		window.dispatchEvent(new CustomEvent('take-snapshot'));
	};


	return (<div className="camera-controls">
		<button onClick={onClick}>Take snapshot</button>
		<a ref={snapshotRef} style={{ display: 'none' }}>Snapshot Link</a>
	</div>);
}

export default SnapshotCameraControls;