function SnapshotCameraControls() {
	const onClick = () => {
		window.dispatchEvent(new CustomEvent('take-snapshot'));
	};


	return (<div className="camera-controls">
		<button onClick={onClick}>📸</button>
	</div>);
}

export default SnapshotCameraControls;