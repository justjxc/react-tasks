import { createContext, useContext, useState } from 'react';

export const AddContext = createContext(null);

export const AddProvider = ({ children }) => {
	const [isAddTaskActive, setIsAddTaskActive] = useState({ status: false, id: 0 });
	const [isAddUserActive, setIsAddUserActive] = useState(false);
	const [isAddListActive, setIsAddListActive] = useState(false);
	const [isAddBoardActive, setIsAddBoardActive] = useState(false);
	const [isLoginFormActive, setIsLoginFormActive] = useState(false);

	const value = {
		isAddTaskActive,
		isAddUserActive,
		isAddListActive,
		isAddBoardActive,
		isLoginFormActive,
		setIsAddTaskActive,
		setIsAddUserActive,
		setIsAddListActive,
		setIsAddBoardActive,
		setIsLoginFormActive,
	};

	return <AddContext.Provider value={value}>{children}</AddContext.Provider>;
};

export const useAddContext = () => {
	const context = useContext(AddContext);

	if (!context) throw new Error('Use add context within provider');

	return context;
};
