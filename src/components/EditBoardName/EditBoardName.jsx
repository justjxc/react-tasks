import { useState } from 'react';
import { ImCheckmark, ImCross } from 'react-icons/im';
import { useBoardsContext } from '../../contexts/BoardsContext';
import deleteDocument from '../../utils/deleteDocument';

const EditBoardName = ({ boardId, activeBoard, setActiveBoard, setIsEditActive }) => {
	const [newText, setNewText] = useState(activeBoard.name);

	const { setBoards } = useBoardsContext();

	const handleSubmit = e => {
		e.preventDefault();

		const boardToDelete = activeBoard;

		setBoards(prev => {
			const copy = [...prev];

			const currentBoard = copy.find(board => board.id === boardId);

			currentBoard.name = newText;

			setActiveBoard({
				id: currentBoard.id,
				name: currentBoard.name,
			});

			return copy;
		});

		deleteDocument(boardToDelete.name);

		setIsEditActive(prev => !prev);
	};

	const handleClick = () => {
		setIsEditActive(prev => !prev);
	};

	return (
		<div className='flex justify-center items-center w-screen h-screen fixed z-50 top-0 left-0 bg-black/80'>
			<form onSubmit={handleSubmit} className='bg-slate-300 text-black p-4 flex flex-col justify-between items-center gap-4 rounded-md'>
				<h2>Change board's name</h2>

				<input className='bg-slate-200 outline-none' value={newText} onChange={e => setNewText(e.target.value)} autoFocus type='text' />

				<div className='flex justify-between items-center gap-2'>
					<button type='submit' className='flex justify-center items-center  rounded-sm bg-green-500 p-1'>
						<ImCheckmark size={18} />
					</button>

					<button onClick={handleClick} className='flex justify-center items-center  rounded-sm bg-red-500 p-1'>
						<ImCross size={18} />
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditBoardName;
