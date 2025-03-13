import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getBlobUrlPhotos } from "./PhotoSaver";

function PhotoBook() {
	const [photos, setPhotos] = useState<string[]>([]);
	const [visible, setVisible] = useState(true);
	const params = useParams();

	const onClickPhoto = (photo: string) => () => {
		window.open(photo, '_blank');
	}

	const onClickToggle = () => {
		setVisible(!visible);
	};

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
		<div className="photo-book-container" style={{ opacity: visible ? 1 : 0.2, translate: visible ? 0 : '0 calc(-100% + 2rem)' }} >
			<div className="photo-book">
				<div className="photo-roll">
					{photos.map((photo, index) =>
						<img
							key={index}
							src={photo}
							alt={`Snapshot ${index}`}
							title={"Click to view full size"}
							className="photo"
							onClick={onClickPhoto(photo)} />)}
				</div>
			</div>
			<div className="photo-book-toggler-container">
				<button className="photo-book-toggler" onClick={onClickToggle} />
			</div>
		</div>
	);
}

export default PhotoBook;