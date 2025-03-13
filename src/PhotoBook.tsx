import { useEffect, useState } from "react";
import { useParams } from "react-router";

function PhotoBook() {
	const [photos, setPhotos] = useState<string[]>([]);
	const params = useParams();

	const onClickPhoto = (photo: string) => () => {
		window.open(photo, '_blank');
	}

	useEffect(() => {
		const snapshotTaken = (e: Event) => {
			const customEvent = e as CustomEvent;

			if (params.mode !== 'liminal') {
				setPhotos((photos) => [...photos, customEvent.detail]);
			}
		}

		window.addEventListener('snapshot-taken', snapshotTaken);

		return () => {
			window.removeEventListener('snapshot-taken', snapshotTaken);
		}
	}, [params]);

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