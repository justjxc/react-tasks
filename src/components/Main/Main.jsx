import { useState, useEffect } from 'react';

import Board from '../Board/Board';
import AddTask from '../AddTask/AddTask';
import AddUser from '../AddUser/AddUser';
import AddList from '../AddList/AddList';
import AddBoard from '../AddBoard/AddBoard';
import LoginForm from '../LoginForm/LoginForm';
import { useBoardsContext } from '../../contexts/BoardsContext';
import { useAddContext } from '../../contexts/AddContext';
import { useActiveBoardContext } from '../../contexts/ActiveBoardContext';

import addData from '../../utils/addData';

const Main = () => {
	const [isLoaded, setIsLoaded] = useState(false);

	const { boards } = useBoardsContext();

	const { activeBoard, setActiveBoard } = useActiveBoardContext();

	const { isAddBoardActive, isAddListActive, isAddTaskActive, isLoginFormActive, isAddUserActive } = useAddContext();

	useEffect(() => {
		if (boards[0] && !isLoaded) {
			setIsLoaded(true);

			setActiveBoard({
				id: boards[0].id,
				name: boards[0].name,
				textColor: boards[0].textColor,
				headerColor: boards[0].headerColor,
				bgColor: boards[0].bgColor,
			});
		}

		if (isLoaded) {
			let activeBoardIndex;

			boards.forEach(board => {
				if (board.id === activeBoard.id) activeBoardIndex = boards.indexOf(board);
			});

			addData('boards', boards[activeBoardIndex].name, boards[activeBoardIndex]);
		}
	}, [boards]);

	if (isLoaded) {
		return (
			<main className='flex justify-between'>
				<div className='flex flex-col justify-start gap-4 w-full'>
					{boards.map(board => {
						if (board.id === activeBoard.id) return <Board key={board.id} board={board} />;
					})}
				</div>

				{isAddTaskActive.status && <AddTask listId={isAddTaskActive.id} activeBoard={activeBoard} />}
				{isAddUserActive && <AddUser />}
				{isAddListActive && <AddList activeBoard={activeBoard} />}
				{isAddBoardActive && <AddBoard setActiveBoard={setActiveBoard} />}
				{isLoginFormActive && <LoginForm />}
			</main>
		);
	} else {
		return <p>not loaded</p>;
	}
};

export default Main;
