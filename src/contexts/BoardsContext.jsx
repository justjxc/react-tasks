import { createContext, useContext, useState, useEffect } from 'react';

import getBoards from '../utils/getBoards';

export const BoardsContext = createContext(null);

export const BoardsProvider = ({ children }) => {
	const [boards, setBoards] = useState([]);

	useEffect(() => {
		const localBoards = getBoards();

		localBoards.then(data => {
			if (data[0]) {
				setBoards(data);
			}
		});
	}, []);

	return <BoardsContext.Provider value={{ boards, setBoards }}>{children}</BoardsContext.Provider>;
};

export const useBoardsContext = () => {
	const context = useContext(BoardsContext);

	if (!context) throw new Error('Use boards context within provider');

	return context;
};
