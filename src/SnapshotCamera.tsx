import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

function SnapshotCamera() {
	const { scene, camera, gl } = useThree();

	useEffect(() => {
		const takeSnapshot = () => {
			gl.render(scene, camera);
			const dataUrl = gl.domElement.toDataURL("image/png");

			const byteString = atob(dataUrl.split(',')[1]);
			const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
			const ab = new ArrayBuffer(byteString.length);
			const ia = new Uint8Array(ab);
			for (let i = 0; i < byteString.length; i++) {
				ia[i] = byteString.charCodeAt(i);
			}
			const blob = new Blob([ab], { type: mimeString });

			const url = URL.createObjectURL(blob);

			window.dispatchEvent(new CustomEvent("snapshot-taken", { detail: url }));
		};

		window.addEventListener("take-snapshot", takeSnapshot);

		return () => {
			window.removeEventListener("take-snapshot", takeSnapshot);
		};
	}, [scene, camera, gl]);

	return null;
}

export default SnapshotCamera;