import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";

const maxColors = 4;

function ColorPicker() {
	const { gl, scene, camera } = useThree();
	const [colors, setColors] = useState<string[]>([]);

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
	}, [gl, scene, camera, colors]);

	const pickColor = async (x: number, y: number) => {
		gl.render(scene, camera);
		const encodedUrl = gl.domElement.toDataURL("image/png");
		const blob = await fetch(encodedUrl).then((response) => response.blob());
		const url = URL.createObjectURL(blob);
		const img = new Image();
		//TODO: only render specific pixel?
		img.src = url;

		//NOTE: If I make some prior input (like a button that prevents accidental rotating),
		// I could render a static image first and then get the color when the user selects something. 
		// It would look less laggy
		// then again, I am planning on using motion controls with phone
		await new Promise<void>((res, rej) => {
			img.onload = () => res();
			img.onerror = (err) => rej(err);
		});

		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");

		if (!ctx) {
			console.error("No canvas context");
			return;
		}

		//window.devicePixelRatio can result in decimal numbers, which dont work properly
		const dpr = img.width / window.innerWidth;
		canvas.width = img.width;
		canvas.height = img.height;

		ctx.drawImage(img, 0, 0);

		//image becomes double size for some reason - why?
		console.log("Click position: ", x, y);
		console.log("Image size: ", img.width, img.height);
		console.log("Window size: ", window.innerWidth, window.innerHeight);
		const pixel = ctx.getImageData(x * dpr, y * dpr, 1, 1).data;
		const [r, g, b] = pixel;
		const color = `rgb(${r}, ${g}, ${b})`;
		console.log("Picked Color: %c   ", `background: ${color}; padding: 5px; border: 1px solid black`);

		const newColors = [color, ...colors];

		if (newColors.length > maxColors) {
			newColors.splice(maxColors);
		}

		setColors(newColors);

		//create a rectangle around the pixel for debugging
		ctx.strokeStyle = "red";
		ctx.lineWidth = 2;
		ctx.strokeRect(x * dpr - 2, y * dpr - 2, 5, 5);

		const canvasBlob = await fetch(canvas.toDataURL("image/png")).then((response) => response.blob());
		// window.open(URL.createObjectURL(canvasBlob));
	};

	return (
		<>
			{colors.map((color, i) => (
				<mesh key={i} position={[i * 3, -1, 0]} scale={0.5}>
					<boxGeometry args={[1, 1, 1]} />
					<meshBasicMaterial color={color} />
				</mesh>
			))}
		</>
	);
}

export default ColorPicker;