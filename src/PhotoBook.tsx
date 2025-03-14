import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { getBlobUrlPhotos } from "./PhotoSaver";

function PhotoBook() {
	const [photos, setPhotos] = useState<string[]>([]);
	const [visible, setVisible] = useState(true);
	const photoBookRef = useRef<HTMLDivElement>(null!);
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
				if (params.mode === 'playtest') {
					if (params.modeType && params.modeType === 'copyText') {
						//to be shared via a platform like Discord
						navigator.clipboard.writeText(customEvent.detail.encodedUrl);
					} else {
						//this is the default behaviour of the playtest mode, downloads the image for sharing
						const link = document.createElement('a');
						link.href = customEvent.detail.url;
						link.download = `360-display-snapshotter-${photos.length}.png`;
						link.click();
					}
				}
			}
		}

		window.addEventListener('snapshot-taken', snapshotTaken);

		return () => {
			window.removeEventListener('snapshot-taken', snapshotTaken);
		}
	}, [params, photos]);

	useEffect(() => {
		// timeout to let the component rerender first
		setTimeout(() => {
			const photoBook = photoBookRef.current;
			photoBook.scrollTo({ left: photoBook.scrollWidth, behavior: 'smooth' });
		}, 1);
	}, [photos]);

	return (
		<div className="photo-book-container" style={{ opacity: visible ? 1 : 0.2, translate: visible ? 0 : '0 calc(-100% + 2rem)' }} >
			<div className="photo-book" ref={photoBookRef}>
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