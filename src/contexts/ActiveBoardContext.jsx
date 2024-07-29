import { createContext, useContext, useState } from 'react';

export const ActiveBoardContext = createContext(null);

export const ActiveBoardProvider = ({ children }) => {
	const [activeBoard, setActiveBoard] = useState({});

	const value = { activeBoard, setActiveBoard };

	return <ActiveBoardContext.Provider value={value}>{children}</ActiveBoardContext.Provider>;
};

export const useActiveBoardContext = () => {
	const context = useContext(ActiveBoardContext);

	if (!context) throw new Error('Use activeBoard context within provider');

	return context;
};
