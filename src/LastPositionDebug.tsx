import { useEffect, useState } from "react";

const size = 8 * 2;
function LastPositionDebug() {
	const [lastClick, setLastClick] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

	useEffect(() => {
		const onClick = (e: MouseEvent) => {
			setLastClick({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener('click', onClick);

		return () => {
			window.removeEventListener('click', onClick);
		};
	}, []);

	return <div style={
		{
			position: 'absolute',
			left: lastClick.x - size / 2,
			top: lastClick.y - size / 2,
			width: size,
			height: size,
			border: '2px solid red',
			zIndex: 1000,
		}} />;
}

export default LastPositionDebug;