import { useState } from 'react';

import images from './assets/images';
import Image360Input from './Image360Input';

function NoInput() {
	const [hidden, setHidden] = useState(false);
	const location = window.location.href;

	return (
		<div className="no-input-warning" style={{ opacity: hidden ? 0 : 1 }}>
			<div className="no-input-warning-content" style={{ pointerEvents: hidden ? "none" : "all" }}>
				<p>You haven't loaded a 360° image!</p>
				<Image360Input />
				<p>There's also {images.length} default images, like this one. To look at those, put the index (1 to {images.length}) after the URL, like:</p>
				<p>{location}1 or {location}{images.length}</p>
				<p>Also, a fun fact: you can toggle fullscreen by pressing F11.</p>
				<p onClick={() => setHidden(true)} style={{ cursor: "pointer" }}>
					<b>If you just want to look at this image, you can dismiss this message by clicking here. Have fun!</b>
				</p>
			</div>
		</div>
	);
}

export default NoInput;