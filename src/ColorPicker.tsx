import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

function ColorPicker() {
	const { gl, scene, camera } = useThree();

	useEffect(() => {
		const handleClick = async (event: MouseEvent) => {
			if (event.button === 0) { // Left mouse button
				await pickColor(event.clientX, event.clientY);
			}
		};

		window.addEventListener('click', handleClick);

		return () => {
			window.removeEventListener('click', handleClick);
		};
	}, [gl, scene, camera]);

	const pickColor = async (x: number, y: number) => {
		gl.render(scene, camera);
		const img = new Image();
		img.src = gl.domElement.toDataURL("image/png");

		await new Promise<void>((res, rej) => {
			img.onload = () => {
				res();
			};

			img.onerror = (err) => {
				console.error("Failed to load image:", err);
				rej(err);
			};
		});

		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");

		if (!ctx) {
			console.error("No canvas context");
			return;
		}

		canvas.width = img.width;
		canvas.height = img.height;

		ctx.drawImage(img, 0, 0);

		const pixel = ctx.getImageData(x, y, 1, 1).data;
		const [r, g, b] = pixel;
		const color = `rgb(${r}, ${g}, ${b})`;
		console.log("Picked Color: %c   ", `background: ${color}; padding: 5px; border: 1px solid black`);
	};

	return null;
}

export default ColorPicker;