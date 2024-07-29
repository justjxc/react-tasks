import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { handleError } from '../utils/handleError';

export const UserContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState();

	useEffect(() => {
		const getUserInfo = async uid => {
			const userData = await getDoc(doc(db, 'users', uid)).catch(handleError);

			const userInfo = {
				uid: uid,
				firstName: userData.data().firstName,
				lastName: userData.data().lastName,
			};

			setUser(userInfo);
		};

		onAuthStateChanged(auth, user => {
			if (user) {
				getUserInfo(user.uid);
			} else {
				setUser(undefined);
			}
		});
	}, []);

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useAuth = () => useContext(UserContext);

export const logOut = () => {
	signOut(auth)
		.then(response => console.log(response))
		.catch(error => console.log(error.message));
};
