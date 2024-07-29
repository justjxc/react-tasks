import { useState, useEffect, useRef } from 'react';
import { IoCloseSharp, IoCheckmarkSharp } from 'react-icons/io5';

import EditBoardName from '../../EditBoardName/EditBoardName';
import deleteDocument from '../../../utils/deleteDocument';
import ConfirmDelete from '../../ConfirmDelete/ConfirmDelete';
import menuList from './menuList';
import { useBoardsContext } from '../../../contexts/BoardsContext';
import { useActiveBoardContext } from '../../../contexts/ActiveBoardContext';
import menuSwitch from './menuSwitch';
import ListItem from './ListItem';

const BoardDropDownMenu = ({ dropDownBtnRef, setIsDropDownActive }) => {
	const [isEditActive, setIsEditActive] = useState(false);
	const [isAddCssActive, setIsAddCssActive] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState({
		status: false,
		itemToDelete: undefined,
	});
	const [headerBg, setHeaderBg] = useState('');
	const [textColor, setTextColor] = useState('');
	const [bgType, setBgType] = useState('color');
	const [background, setBackground] = useState('');

	const dropDownMenuRef = useRef(null);
	const addCssTextareaRef = useRef(null);

	const { boards, setBoards } = useBoardsContext();
	const { activeBoard, setActiveBoard } = useActiveBoardContext();

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

	const handleClick = e => {
		menuSwitch(e, setConfirmDelete, setIsEditActive, setHeaderBg, bgType, setBgType, setBackground, setTextColor);
	};

	const changeBoardColor = (colorType, newColor) => {
		setBoards(prev => {
			const copy = [...prev];

			const currentBoard = copy.find(board => board.id === activeBoard.id);

			currentBoard[colorType] = newColor;

			return copy;
		});

		if (colorType === 'textColor') {
			setActiveBoard(prev => {
				return {
					...prev,
					textColor: newColor,
				};
			});

			setTextColor('');
		}

		if (colorType === 'headerColor') {
			setActiveBoard(prev => {
				return {
					...prev,
					headerColor: newColor,
				};
			});

			setHeaderBg('');
		}

		if (colorType === 'background') {
			setActiveBoard(prev => {
				return {
					...prev,
					bgColor: newColor,
				};
			});
		}
	};

	const handleBgChange = () => {
		if (textColor !== '') {
			changeBoardColor('textColor', textColor);
		}

		if (headerBg !== '') {
			changeBoardColor('headerColor', headerBg);
		}

		if (isAddCssActive) {
			let value = addCssTextareaRef.current.value.trim();

			if (value === '') {
				alert('Fill the field ');

				return;
			}

			if (value[value.length - 1] === ';') value = value.slice(0, -1);

			changeBoardColor('bgColor', value);

			setIsAddCssActive(false);

			setBackground([]);

			return;
		}

		if (bgType === 'color' && background !== '') {
			changeBoardColor('bgColor', background);

			setBackground('');
		}

		if (bgType === 'gradient' && background.length > 0) {
			if (background.length < 2) {
				alert('You must choose two colors for the gradient');
				return;
			}

			changeBoardColor('bgColor', `linear-gradient(${background.join(',')})`);

			setBackground([]);
		}
	};

	const deleteBoard = () => {
		const currBoardIndex = boards.indexOf(boards.find(board => board.id === activeBoard.id));

		setBoards(prev => {
			const copy = [...prev];

			const newBoards = copy.filter(board => board.id !== activeBoard.id);

			if (currBoardIndex > 0) {
				setActiveBoard({
					id: boards[currBoardIndex - 1].id,
					name: boards[currBoardIndex - 1].name,
					textColor: boards[currBoardIndex - 1].textColor,
					headerColor: boards[currBoardIndex - 1].headerColor,
					bgColor: boards[currBoardIndex - 1].bgColor,
				});
			} else {
				setActiveBoard({
					id: boards[currBoardIndex + 1].id,
					name: boards[currBoardIndex + 1].name,
					textColor: boards[currBoardIndex + 1].textColor,
					headerColor: boards[currBoardIndex + 1].headerColor,
					bgColor: boards[currBoardIndex + 1].bgColor,
				});
			}

			return newBoards;
		});

		setIsDropDownActive(prev => !prev);

		deleteDocument(activeBoard.name);
	};

	return (
		<div
			onClick={handleClick}
			ref={dropDownMenuRef}
			className='absolute flex flex-col justify-between items-start gap-4 min-w-80 py-4 px-2 w-max rounded-md shadow-md z-10 bg-neutral-100 text-black'
		>
			<button onClick={() => setIsDropDownActive(prev => !prev)} className='absolute top-4 right-4'>
				<IoCloseSharp size={24} className='pointer-events-none' />
			</button>

			<h3 className='flex justify-center items-center w-full font-bold'>Board actions</h3>

			<ul className='w-full'>
				{menuList.map(item => {
					return (
						<ListItem
							key={item.id}
							item={item}
							textColor={textColor}
							headerBg={headerBg}
							bgType={bgType}
							setBgType={setBgType}
							background={background}
							setBackground={setBackground}
							isAddCssActive={isAddCssActive}
							setIsAddCssActive={setIsAddCssActive}
							addCssTextareaRef={addCssTextareaRef}
							changeBoardColor={changeBoardColor}
						/>
					);
				})}

				<button
					id='apply'
					onClick={() => handleBgChange()}
					className='w-full flex justify-center items-center gap-2 bg-slate-200 shadow-sm p-2 rounded-md transition-colors hover:bg-white'
				>
					<IoCheckmarkSharp size={24} />
					Apply
				</button>
			</ul>

			{isEditActive && <EditBoardName boardId={activeBoard.id} activeBoard={activeBoard} setActiveBoard={setActiveBoard} setIsEditActive={setIsEditActive} />}

			{confirmDelete.status && (
				<ConfirmDelete
					itemToDelete={confirmDelete.itemToDelete}
					setConfirmDelete={setConfirmDelete}
					deleteItem={deleteBoard}
					message='Are you sure you want to delete this board?'
				/>
			)}
		</div>
	);
};

export default BoardDropDownMenu;
