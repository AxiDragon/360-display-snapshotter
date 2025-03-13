import { useEffect, useRef } from "react";

function SnapshotCameraControls() {
	const snapshotRef = useRef<HTMLAnchorElement>(null!);

	const onClick = () => {
		window.dispatchEvent(new CustomEvent('take-snapshot'));
	};

	useEffect(() => {
		const snapshotTaken = (e: Event) => {
			const customEvent = e as CustomEvent;
			const dataUrl = customEvent.detail;

			const byteString = atob(dataUrl.split(',')[1]);
			const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
			const ab = new ArrayBuffer(byteString.length);
			const ia = new Uint8Array(ab);
			for (let i = 0; i < byteString.length; i++) {
				ia[i] = byteString.charCodeAt(i);
			}
			const blob = new Blob([ab], { type: mimeString });

			const url = URL.createObjectURL(blob);
			window.open(url, '_blank');
		}

		window.addEventListener('snapshot-taken', snapshotTaken);

		return () => {
			window.removeEventListener('snapshot-taken', snapshotTaken);
		}
	}, []);

	return (<div className="camera-controls">
		<button onClick={onClick}>Take snapshot</button>
		<a ref={snapshotRef} style={{ display: 'none' }}>Snapshot Link</a>
	</div>);
}

export default SnapshotCameraControls;