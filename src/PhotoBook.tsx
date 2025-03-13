import { useEffect, useState } from "react";

function PhotoBook() {
	const [photos, setPhotos] = useState<string[]>([]);

	const onClickPhoto = (photo: string) => () => {
		window.open(photo, '_blank');
	}

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

			setPhotos((photos) => [...photos, url]);
		}

		window.addEventListener('snapshot-taken', snapshotTaken);

		return () => {
			window.removeEventListener('snapshot-taken', snapshotTaken);
		}
	}, []);

	return (
		<div className="photo-book" style={{ padding: photos[0] ? 10 : 0 }}>
			{photos.map((photo, index) =>
				<img
					key={index}
					src={photo}
					alt={`Snapshot ${index}`}
					title={"Click to view full size"}
					className="photo"
					onClick={onClickPhoto(photo)} />)}
		</div>
	);
}

export default PhotoBook;