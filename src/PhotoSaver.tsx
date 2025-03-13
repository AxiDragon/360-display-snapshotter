import { useEffect, useState } from "react";
import { PREFIX } from "./constants";
import { useParams } from "react-router";
import { openDB } from "idb";

async function initDB() {
	return openDB(PREFIX + 'photos', 1, {
		upgrade(db) {
			db.createObjectStore('photos', { keyPath: 'id', autoIncrement: true });
		}
	});
}

export async function getBlobUrlPhotos() {
	const db = await initDB();
	const encodedPhotos = await db.getAll('photos');
	const blobUrlPhotos = [];

	for (const encodedPhoto of encodedPhotos) {
		const blob = await fetch(encodedPhoto.data).then((response) => response.blob());
		blobUrlPhotos.push(URL.createObjectURL(blob));
	}

	return blobUrlPhotos;
}

function PhotoSaver() {
	const params = useParams();

	useEffect(() => {
		const snapshotTaken = async (e: Event) => {
			if (params.mode === 'liminal') {
				return;
			}

			const customEvent = e as CustomEvent;


			// const reader = new FileReader();
			// reader.onloadend = async () => {
			// 	const base64Data = reader.result as string;

			const db = await initDB();
			// const newPhoto = { id: Date.now(), data: base64Data };
			const newPhoto = { id: Date.now(), data: customEvent.detail.encodedUrl };
			await db.put('photos', newPhoto);

			// 	const allPhotos = await db.getAll('photos');
			// 	setSavedPhotos(allPhotos.map((photo) => photo.data));
			// 	console.log(customEvent.detail.encodedUrl);
			// };
			// reader.readAsDataURL(customEvent.detail.blob);
		}

		window.addEventListener('snapshot-taken', snapshotTaken);

		return () => {
			window.removeEventListener('snapshot-taken', snapshotTaken);
		}
	}, [params]);

	return null;
}

export default PhotoSaver;