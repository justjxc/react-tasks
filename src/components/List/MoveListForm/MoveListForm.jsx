import { useState } from 'react';
import addData from '../../../utils/addData';

const MoveListForm = ({ boards, setIsMoveList, setBoards, boardId, listId }) => {
	const [boardCheck, setBoardCheck] = useState(boards[0].id);

	const handleClick = () => {
		setIsMoveList(prev => !prev);
	};

	const handleSubmit = () => {
		setBoards(prev => {
			const copy = [...prev];

			const currentBoard = copy.find(board => board.id === boardId);

			const currentList = currentBoard.lists.find(list => list.id === listId);

			const boardMoveTo = copy.find(board => board.id === boardCheck);

			boardMoveTo.lists = [...boardMoveTo.lists, currentList];

			currentBoard.lists = currentBoard.lists.filter(list => list.id !== currentList.id);

			addData('boards', boardMoveTo.name, boardMoveTo);

			return copy;
		});
	};

	return (
		<div className='fixed top-0 left-0 w-screen h-screen bg-black/80 z-50 flex justify-center items-center'>
			<form onSubmit={handleSubmit} className='flex flex-col justify-between gap-4 w-[400px] max-h-[600px] p-6 absolute bg-neutral-100 text-black rounded-lg'>
				<h2 className='font-semibold'>Choose board</h2>

				<ul className='flex flex-col justify-start items-center w-full h-[200px] overflow-y-scroll border-2 border-neutral-300 rounded-lg  '>
					{boards.map(board => {
						if (board.id !== boardId)
							return (
								<li
									key={board.id}
									onClick={() => setBoardCheck(board.id)}
									className={`w-full p-2 cursor-pointer ${boardCheck === board.id ? 'bg-green-400' : ''} `}
								>
									<label className='w-full cursor-pointer' htmlFor={board.id}>
										{board.name}
									</label>

									<input
										className='hidden'
										id={board.id}
										type='radio'
										name='board'
										value={board.id}
										checked={boardCheck === board.id}
										onChange={e => setBoardCheck(e.target.value)}
									/>
								</li>
							);
					})}
				</ul>

				<div className='flex justify-between items-center gap-2'>
					<button
						className='rounded-lg border-2 border-neutral-300 p-3 min-w-32 transition-colors duration-300 hover:bg-white'
						type='button'
						onClick={handleClick}
					>
						Cancel
					</button>

					<button className='rounded-lg border-2 border-neutral-300 p-3 min-w-32 transition-colors duration-300 hover:bg-white' type='submit'>
						Move
					</button>
				</div>
			</form>
		</div>
	);
};

export default MoveListForm;
