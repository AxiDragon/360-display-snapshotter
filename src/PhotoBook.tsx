import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getBlobUrlPhotos } from "./PhotoSaver";

function PhotoBook() {
	const [photos, setPhotos] = useState<string[]>([]);
	const params = useParams();

	const onClickPhoto = (photo: string) => () => {
		window.open(photo, '_blank');
	}

	useEffect(() => {
		async function fetchPhotos() {
			setPhotos(await getBlobUrlPhotos());
		}

		fetchPhotos();
	}, []);

	useEffect(() => {
		const snapshotTaken = (e: Event) => {
			const customEvent = e as CustomEvent;

			if (params.mode !== 'liminal') {
				setPhotos((photos) => [...photos, customEvent.detail.url]);
			}
		}

		window.addEventListener('snapshot-taken', snapshotTaken);

		return () => {
			window.removeEventListener('snapshot-taken', snapshotTaken);
		}
	}, [params, photos]);

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