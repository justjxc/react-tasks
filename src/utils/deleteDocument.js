import { db } from '../firebase/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

const deleteDocument = docName => {
	deleteDoc(doc(db, 'boards', docName));
};

export default deleteDocument;
