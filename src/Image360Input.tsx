import { useState } from "react";
import { useNavigate } from "react-router";

function Image360Input() {
	const [imageUrl, setImageUrl] = useState('');
	const navigate = useNavigate();

	const onImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			const res = e.target?.result;

			if (typeof res === "string") {
				navigate(`/${encodeURIComponent(res)}`);
			}
		};
		reader.readAsDataURL(file);
	};

	const onLinkInput = async () => {
		if (!imageUrl) {
			alert("Please enter a URL!");
			return;
		}

		try {
			const res = await fetch(imageUrl, { method: "HEAD" });

			const type = res.headers.get("content-type");
			if (type && type.startsWith("image/")) {
				navigate(`/${encodeURIComponent(imageUrl)}`);
			} else {
				alert("The URL is not an image!");
			}
		} catch {
			alert("Failed to load image!");
		}
	};

	return (
		<div style={{ paddingBottom: 20, display: "flex", flexDirection: "column", alignItems: "center" }}>
			<div>
				<p>Load from device</p>
				<input type="file" accept="image/*" onChange={onImageInput} />
			</div>
			<div style={{ width: "75%" }} >
				<p>Load from web</p>
				<input type="text"
					placeholder="Image URL"
					onChange={(e) => setImageUrl(e.target.value)}
					style={{ width: "75%" }} />
				<button onClick={onLinkInput}>Load</button>
			</div>
		</div >
	);
}

export default Image360Input;