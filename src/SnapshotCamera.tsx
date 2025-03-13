import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

function SnapshotCamera() {
	const { scene, camera, gl } = useThree();

	useEffect(() => {
		const takeSnapshot = async () => {
			gl.render(scene, camera);
			const encodedUrl = gl.domElement.toDataURL("image/jpeg");
			const blob = await fetch(encodedUrl).then((response) => response.blob());
			const url = URL.createObjectURL(blob);

			window.dispatchEvent(new CustomEvent("snapshot-taken", { detail: { url, encodedUrl, blob } }));
		};

		window.addEventListener("take-snapshot", takeSnapshot);

		return () => {
			window.removeEventListener("take-snapshot", takeSnapshot);
		};
	}, [scene, camera, gl]);

	return null;
}

export default SnapshotCamera;