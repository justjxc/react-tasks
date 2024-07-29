import { useState } from 'react';
import { ImCheckmark, ImCross } from 'react-icons/im';

const EditListName = ({ name, setBoards, boardId, listId, setIsEditActive }) => {
	const [newName, setNewName] = useState(name);

	const handleSubmit = e => {
		e.preventDefault();

		setBoards(prev => {
			const copy = [...prev];

			const currentBoard = copy.find(board => board.id === boardId);

			const currentList = currentBoard.lists.find(list => list.id === listId);

			currentList.name = newName;

			return copy;
		});

		setIsEditActive(prev => !prev);
	};

	const handleClick = () => {
		setIsEditActive(prev => !prev);
	};

	return (
		<form onSubmit={handleSubmit} className='flex justify-between items-center w-full'>
			<input className='bg-transparent outline-none capitalize' value={newName} onChange={e => setNewName(e.target.value)} autoFocus type='text' />

			<div className='flex justify-between items-center gap-2'>
				<button type='submit' className='flex justify-center items-center  rounded-sm bg-green-500 p-1'>
					<ImCheckmark size={18} />
				</button>

				<button onClick={handleClick} className='flex justify-center items-center  rounded-sm bg-red-500 p-1'>
					<ImCross size={18} />
				</button>
			</div>
		</form>
	);
};

export default EditListName;
