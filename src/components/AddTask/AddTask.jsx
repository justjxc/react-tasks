import { useEffect, useRef, useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import createUniqID from '../../utils/createUniqID';
import { useAuth } from '../../contexts/AuthContext';
import { useAddContext } from '../../contexts/AddContext';
import { useBoardsContext } from '../../contexts/BoardsContext';

const AddTask = ({ listId, activeBoard }) => {
	const [text, setText] = useState('');

	const textAreaRef = useRef(null);

	const user = useAuth();

	const { setIsAddTaskActive } = useAddContext();
	const { setBoards } = useBoardsContext();

	useEffect(() => {
		textAreaRef.current.style.height = 'auto';
		textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
	}, [text]);

	const handleSubmit = e => {
		e.preventDefault();

		if (!user) {
			alert("unauthorized users can't make changes");
			return;
		}

		if (text === '') {
			alert('Enter text');
			return;
		}

		const newTask = {
			id: createUniqID(),
			text: text,
			creator: { firstName: user.firstName, lastName: user.lastName },
			date: Timestamp.fromDate(new Date()),
			status: 'pending',
			isCollapsed: false,
		};

		setBoards(prev => {
			const copy = [...prev];

			const currentBoard = copy.find(board => board.id === activeBoard.id);

			const currentList = currentBoard.lists.find(list => list.id === listId);

			currentList.tasks = [...currentList.tasks, newTask];

			return copy;
		});

		setText('');

		setIsAddTaskActive(prev => {
			return { status: !prev.status, id: 0 };
		});
	};

	const handleClick = () => {
		setIsAddTaskActive(prev => {
			return { status: !prev.status, id: 0 };
		});
	};

	return (
		<div className='flex justify-center items-center fixed z-50 top-0 left-0 w-screen h-screen  bg-black/80'>
			<div className='w-[400px] p-6 absolute bg-neutral-100 text-black rounded-lg'>
				<h2 className='font-semibold'>New Task</h2>

				<form className='flex flex-col gap-5 mt-4' onSubmit={handleSubmit}>
					<textarea
						ref={textAreaRef}
						onChange={e => setText(e.target.value)}
						value={text}
						placeholder='Write a new task'
						className='p-2 outline-none bg-white text-black text-2xl resize-none border-2 border-neutral-300 rounded-lg focus:border-neutral-500'
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

export default AddTask;
