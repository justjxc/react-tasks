import { useState } from 'react';
import createUniqID from '../../utils/createUniqID';
import { useAddContext } from '../../contexts/AddContext';
import { useBoardsContext } from '../../contexts/BoardsContext';
import { useAuth } from '../../contexts/AuthContext';

const AddList = ({ activeBoard }) => {
	const [text, setText] = useState('');

	const { setIsAddListActive } = useAddContext();

	const { setBoards } = useBoardsContext();

	const user = useAuth();

	const handleSubmit = e => {
		e.preventDefault();

		if (!user) {
			alert("unauthorized users can't make changes");
			return;
		}

		setBoards(prev => {
			const copy = [...prev];

			const current = copy.find(board => board.id === activeBoard.id);

			const newList = { id: createUniqID(), tasks: [], name: text, isCollapsed: false };

			current.lists.push(newList);

			return copy;
		});

		setIsAddListActive(prev => !prev);
	};

	const handleClick = () => {
		setIsAddListActive(prev => !prev);
	};

	return (
		<div className='flex justify-center items-center fixed z-50 top-0 left-0 w-screen h-screen  bg-black/80'>
			<div className='w-[400px] p-6 absolute bg-neutral-100 text-black rounded-lg'>
				<h2 className='font-semibold'>New list</h2>

				<form className='flex flex-col gap-5 mt-4' onSubmit={handleSubmit}>
					<input
						className='p-4 text-2xl outline-none text-black border-2 border-neutral-300 rounded-lg focus:border-neutral-500'
						type='text'
						placeholder='Write list name'
						value={text}
						onChange={e => setText(e.target.value)}
						autoFocus
					/>

					<div className='flex justify-between items-center gap-2'>
						<button
							className='rounded-lg border-2 border-neutral-300 p-3 min-w-32 transition-colors duration-300 hover:bg-white'
							type='button'
							onClick={handleClick}
						>
							Cancel
						</button>

						<button className='rounded-lg border-2 border-neutral-300 p-3 min-w-32 transition-colors duration-300 hover:bg-white' type='submit'>
							Add
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddList;
