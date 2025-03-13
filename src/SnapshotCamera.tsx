import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

function SnapshotCamera() {
	const { scene, camera, gl } = useThree();

	useEffect(() => {
		const takeSnapshot = () => {
			gl.render(scene, camera);
			const dataUrl = gl.domElement.toDataURL("image/png");
			window.dispatchEvent(new CustomEvent("snapshot-taken", { detail: dataUrl }));
		};

		window.addEventListener("take-snapshot", takeSnapshot);

		return () => {
			window.removeEventListener("take-snapshot", takeSnapshot);
		};
	}, [scene, camera, gl]);

	return null;
}

export default SnapshotCamera;