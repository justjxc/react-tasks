import { useEffect, useRef, useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';

import { useBoardsContext } from '../../../contexts/BoardsContext';
import menuList from './menuList';
import menuSwitch from './menuSwitch';

const ListDropDownMenu = ({ listId, boardId, setIsEditActive, setIsDropDownActive, setConfirmDelete, dropDownBtnRef, setIsMoveList }) => {
	const dropDownMenuRef = useRef(null);

	const { setBoards } = useBoardsContext();

	useEffect(() => {
		document.addEventListener('mousedown', closeDropDown);

		return () => {
			document.removeEventListener('mousedown', closeDropDown);
		};
	});

	const closeDropDown = e => {
		const target = e.target;

		if (!dropDownMenuRef.current.contains(target) && target !== dropDownBtnRef.current && target !== dropDownMenuRef.current) {
			setIsDropDownActive(false);
		}
	};

	const changeListColor = (colorType, newColor) => {
		setBoards(prev => {
			const copy = [...prev];

			const currentBoard = copy.find(board => board.id === boardId);

			const currentList = currentBoard.lists.find(list => list.id === listId);

			currentList[colorType] = newColor;

			return copy;
		});
	};

	const handleClick = e => {
		menuSwitch(e, setIsDropDownActive, setIsEditActive, setConfirmDelete, changeListColor, setIsMoveList);
	};

	return (
		<div
			onClick={handleClick}
			ref={dropDownMenuRef}
			className='flex flex-col justify-between items-start gap-4 py-4 px-2 min-w-80 rounded-md shadow-md absolute -top-4 left-1/2 z-10 bg-neutral-100 text-black'
		>
			<button onClick={() => setIsDropDownActive(prev => !prev)} className='absolute top-4 right-4'>
				<IoCloseSharp size={24} className='pointer-events-none' />
			</button>

			<h3 className='flex justify-center items-center w-full font-bold'>List actions</h3>

			<ul className='flex flex-col justify-between items-center w-full'>
				{menuList.map(item => {
					return (
						<li
							id={item.id}
							className={`capitalize text-left relative w-full flex flex-col items-start p-2 font-semibold ${
								item.items ? 'border-t border-black' : 'border-0 cursor-pointer'
							}`}
							key={item.id}
						>
							{item.value}

							{item.items && (
								<ul className='w-full grid grid-cols-5'>
									{item.items.map(subItem => {
										return (
											<li key={subItem.id} className='p-2 '>
												<button
													id={subItem.id}
													className='w-12 h-8 rounded-md shadow-md transition-all hover:opacity-80 hover:scale-110 '
													style={{ backgroundColor: subItem.code }}
												></button>
											</li>
										);
									})}
								</ul>
							)}

							{item.removeColor && (
								<button
									id={item.removeColor.id}
									onClick={() => {
										changeListColor('bgColor', item.removeColor.code);
									}}
									className='w-full flex justify-center items-center gap-2 bg-slate-200 shadow-sm p-2 rounded-md transition-colors hover:bg-white'
								>
									<IoCloseSharp size={24} />
									Remove color
								</button>
							)}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default ListDropDownMenu;
