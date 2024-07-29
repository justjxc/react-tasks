import { useEffect, useState, useRef } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useBoardsContext } from '../../contexts/BoardsContext';
import { useActiveBoardContext } from '../../contexts/ActiveBoardContext';

import AddBoardButton from '../AddBoardButton/AddBoardButton';

const SelectBoard = () => {
	const [isListOpen, setIsListOpen] = useState(false);

	const selectBoardRef = useRef(null);

	const { boards } = useBoardsContext();

	const { activeBoard, setActiveBoard } = useActiveBoardContext();

	useEffect(() => {
		document.addEventListener('mousedown', closeSelectBoard);

		return () => {
			document.removeEventListener('mousedown', closeSelectBoard);
		};
	});

	const closeSelectBoard = e => {
		const target = e.target;

		if (!selectBoardRef.current.contains(target)) {
			setIsListOpen(false);
		}
	};

	const handleSelectClick = () => {
		setIsListOpen(prev => !prev);
	};

	const handleItemClick = e => {
		const target = e.target;

		boards.forEach(board => {
			if (board.id === target.id) {
				setActiveBoard({
					id: board.id,
					name: board.name,
					textColor: board.textColor,
					headerColor: board.headerColor,
					bgColor: board.bgColor,
				});
			}
		});

		setIsListOpen(prev => !prev);
	};

	return (
		<div ref={selectBoardRef} className='relative h-[42px] '>
			<button onClick={handleSelectClick} className='relative flex justify-start items-center w-full h-full gap-1 font-semibold rounded-sm select-none'>
				<p className='w-38 block overflow-hidden whitespace-nowrap text-ellipsis'>{activeBoard.name}</p>

				<IoIosArrowDown size={18} className={`transition-transform duration-200 ${isListOpen ? '-scale-y-100' : 'scale-y-100'} pointer-events-none`} />
			</button>

			<ul
				onClick={handleItemClick}
				className={`absolute  rounded-md shadow-md w-max left-0 bottom-0-0 z-10 transition-all  ${isListOpen ? 'visible' : 'hidden'}`}
				style={{ background: activeBoard.headerColor === 'transparent' ? activeBoard.bgColor : activeBoard.headerColor }}
			>
				{boards.map(board => {
					return (
						<li
							key={board.id}
							id={board.id}
							className='w-full flex justify-between items-center cursor-pointer px-4 py-3 border-b border-current last:border-b-0 hover:bg-white/40'
						>
							{board.name}
						</li>
					);
				})}

				<li className='px-4 py-3 border-b border-black last:border-b-0 cursor-pointer hover:bg-white/40'>
					<AddBoardButton />
				</li>
			</ul>
		</div>
	);
};

export default SelectBoard;
