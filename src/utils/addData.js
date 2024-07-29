import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const addData = async (collection, documentToUpdate, newData) => {
	if (collection && documentToUpdate && newData) {
		console.log('setDoc');
		console.log('collection = ', collection);
		console.log('documentToUpdate = ', documentToUpdate);
		console.log('newData = ', newData);

		await setDoc(doc(db, collection, documentToUpdate), newData);
	} else {
		throw new Error('invalid argument');
	}
};

export default addData;
