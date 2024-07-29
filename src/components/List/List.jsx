import { useRef, useState } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { PiArrowsInLineHorizontalFill, PiArrowsOutLineHorizontalFill } from 'react-icons/pi';
import Task from '../Task/Task';
import AddTaskButton from '../AddTaskButton/AddTaskButton';
import ListDropDownMenu from './ListDropDownMenu/ListDropDownMenu';
import EditListName from '../EditListName/EditListName';
import { useAuth } from '../../contexts/AuthContext';
import { useBoardsContext } from '../../contexts/BoardsContext';
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';
import MoveListForm from './MoveListForm/MoveListForm';
import handleDrop from './handleDrop';

const List = ({ board, list, listIndex }) => {
	const [isDropDownActive, setIsDropDownActive] = useState(false);
	const [isEditActive, setIsEditActive] = useState(false);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [isMoveList, setIsMoveList] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState({
		status: false,
		itemToDelete: undefined,
	});

	const dropDownBtnRef = useRef(null);

	const listId = list.id;
	const boardId = board.id;

	const user = useAuth();

	const { boards, setBoards } = useBoardsContext();

	const handleCollapse = () => {
		setIsCollapsed(prev => !prev);

		setBoards(prev => {
			const copy = [...prev];

			const currentBoard = copy.find(board => board.id === boardId);

			const currentList = currentBoard.lists.find(list => list.id === listId);

			currentList.isCollapsed = currentList.isCollapsed ? !currentList.isCollapsed : true;

			return copy;
		});
	};

	const handleClick = () => {
		setIsDropDownActive(prev => !prev);
	};

	const deleteList = () => {
		setBoards(prev => {
			const copy = [...prev];

			const currentBoard = copy.find(board => board.id === boardId);

			currentBoard.lists = currentBoard.lists.filter(list => list.id !== listId);

			return copy;
		});
	};

	const handleDragStart = e => {
		e.dataTransfer.setData('dragType', e.target.dataset.type);
		e.dataTransfer.setData('listId', listId);
	};

	const handleDragOver = e => {
		e.preventDefault();
	};

	return (
		<div
			draggable
			onDragStart={e => handleDragStart(e)}
			onDrop={e => handleDrop(e, listId, listIndex, boardId, user, setBoards)}
			onDragOver={e => handleDragOver(e)}
			data-type='list'
			className={`list flex flex-col gap-4 relative h-fit bg-slate-300 p-4 rounded-md shadow-md transition-all duration-300 ${
				isCollapsed ? 'items-center w-14' : 'w-[350px]'
			}`}
			style={{ backgroundColor: list.bgColor, color: list.textColor }}
		>
			<header className={`flex justify-between items-start gap-4 origin-left ${isCollapsed ? 'flex-col w-fit' : ''}`}>
				{!isEditActive && (
					<div className={`flex gap-2 ${isCollapsed ? 'flex-col' : ''}`}>
						<h2
							className={`capitalize ${
								isCollapsed
									? '[writing-mode:vertical-lr] [text-orientation:upright] tracking-[-3px] max-h-96 overflow-hidden whitespace-nowrap text-ellipsis'
									: ''
							}`}
						>
							{list.name}
						</h2>

						<div className={`flex justify-center items-center bg-white/30 rounded-full h-6 w-6 min-w-6`}>{list.tasks.length}</div>
					</div>
				)}
				{isEditActive && <EditListName name={list.name} setBoards={setBoards} boardId={boardId} listId={listId} setIsEditActive={setIsEditActive} />}

				<ul className={`flex items-center gap-2 ${isCollapsed ? 'flex-col' : ''}`}>
					<li>
						<button onClick={handleCollapse}>
							{!isCollapsed ? (
								<PiArrowsInLineHorizontalFill size={22} className='pointer-events-none' />
							) : (
								<PiArrowsOutLineHorizontalFill size={22} className='pointer-events-none' />
							)}
						</button>
					</li>

					<li>
						<button ref={dropDownBtnRef} onClick={handleClick}>
							<BiDotsHorizontalRounded size={30} className='pointer-events-none' />
						</button>
					</li>
				</ul>

				{isDropDownActive && (
					<ListDropDownMenu
						listId={listId}
						boardId={boardId}
						setIsEditActive={setIsEditActive}
						setIsDropDownActive={setIsDropDownActive}
						setConfirmDelete={setConfirmDelete}
						dropDownBtnRef={dropDownBtnRef}
						setIsMoveList={setIsMoveList}
					/>
				)}
			</header>

			{!isCollapsed && (
				<>
					<ul className='flex flex-col justify-between gap-4 '>
						{list.tasks.map((item, index) => {
							return <Task key={item.id} task={item} taskIndex={index} list={list} boardId={boardId} setBoards={setBoards} />;
						})}
					</ul>

					<AddTaskButton listId={listId} />
				</>
			)}

			{isMoveList && <MoveListForm boards={boards} setIsMoveList={setIsMoveList} setBoards={setBoards} boardId={boardId} listId={listId} />}

			{confirmDelete.status && (
				<ConfirmDelete setConfirmDelete={setConfirmDelete} deleteItem={deleteList} message='Are you sure you want to delete this list?' />
			)}
		</div>
	);
};

export default List;
