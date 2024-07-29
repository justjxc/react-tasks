import { getDocs, collection } from 'firebase/firestore';

import { db } from '../firebase/firebase';

const getBoards = async () => {
	const queryBoards = await getDocs(collection(db, 'boards'));

	let boardsLocal = [];

	for (let i in queryBoards.docs) {
		const newArrayItem = { name: queryBoards.docs[i].id, ...queryBoards.docs[i].data() };

		boardsLocal = [...boardsLocal, newArrayItem];
	}

	return boardsLocal;
};

export default getBoards;
