import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../firebase/firebase';
import addData from './addData';

const addUser = (email, password, firstName, lastName) => {
	createUserWithEmailAndPassword(auth, email, password)
		.then(userCredential => {
			const user = userCredential.user;

			const newData = {
				firstName: firstName,
				lastName: lastName,
			};

			addData('users', user.uid, newData);
		})
		.catch(error => {
			const errorCode = error.code;
			const errorMessage = error.message;

			console.log('errorCode', ' => ', errorCode);
			console.log('errorMessage', ' => ', errorMessage);
		});
};

export default addUser;
