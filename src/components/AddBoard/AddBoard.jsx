import { useState } from 'react';
import createUniqID from '../../utils/createUniqID';
import { useAddContext } from '../../contexts/AddContext';
import { useBoardsContext } from '../../contexts/BoardsContext';
import { useActiveBoardContext } from '../../contexts/ActiveBoardContext';

const AddBoard = ({ setActiveBoard }) => {
	const [text, setText] = useState('');

	const { setIsAddBoardActive } = useAddContext();

	const { setBoards } = useBoardsContext();

	const handleSubmit = e => {
		e.preventDefault();

		const newBoard = {
			id: createUniqID(),
			name: text,
			textColor: 'black',
			headerColor: 'transparent',
			bgColor: 'linear-gradient(to top, #3f51b1 0%,#5a55ae 13%,#7b5fac 25%,#8f6aae 38%,#a86aa4 50%,#cc6b8e 62%,#f18271 75%,#f3a469 87%,#f7c978 100%)',
			lists: [],
		};

		setBoards(prev => {
			const newBoards = [...prev, newBoard];

			setActiveBoard({
				id: newBoards[newBoards.length - 1].id,
				name: newBoards[newBoards.length - 1].name,
				textColor: newBoards[newBoards.length - 1].textColor,
				headerColor: newBoards[newBoards.length - 1].headerColor,
				bgColor: newBoards[newBoards.length - 1].bgColor,
			});

			return newBoards;
		});

		setIsAddBoardActive(prev => !prev);
	};

	const handleClick = () => {
		setIsAddBoardActive(prev => !prev);
	};

	return (
		<div className='flex justify-center items-center fixed z-50 top-0 left-0 w-screen h-screen bg-black/80'>
			<div className='w-[400px] p-6 absolute bg-neutral-100 text-black rounded-lg'>
				<h2 className='font-semibold'>New Board</h2>

				<form className='flex flex-col gap-5 mt-4' onSubmit={handleSubmit}>
					<input
						className='p-4 text-2xl outline-none text-black border-2 border-neutral-300 rounded-lg focus:border-neutral-500'
						type='text'
						placeholder='Write board name'
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

export default AddBoard;
