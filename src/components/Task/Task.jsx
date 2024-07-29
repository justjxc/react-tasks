import { useState } from 'react';
import { BiSolidEdit, BiSolidTrashAlt } from 'react-icons/bi';
import { PiArrowsInLineHorizontalFill, PiArrowsOutLineHorizontalFill } from 'react-icons/pi';
import EditTaskText from '../EditTaskText/EditTaskText';
import { useAuth } from '../../contexts/AuthContext';
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';

const Task = ({ task, taskIndex, list, boardId, setBoards }) => {
	const [isEditActive, setIsEditActive] = useState(false);
	const [isCollapsed, setIsCollapsed] = useState(task.isCollapsed ? task.isCollapsed : false);

	const [confirmDelete, setConfirmDelete] = useState({
		status: false,
		itemToDelete: undefined,
	});

	const taskId = task.id;
	const text = task.text;
	const creator = task.creator;
	const date = task.date.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });

	const user = useAuth();

	const handleCollapse = () => {
		setIsCollapsed(prev => !prev);

		setBoards(prev => {
			const copy = [...prev];

			const currentBoard = copy.find(board => board.id === boardId);

			const currentList = currentBoard.lists.find(currList => currList.id === list.id);

			const currentTask = currentList.tasks.find(currTask => currTask.id === taskId);

			currentTask.isCollapsed = currentTask.isCollapsed ? !currentTask.isCollapsed : true;

			console.log('handleCollapse currentTask = ', currentTask);

			return copy;
		});
	};

	const handleEdit = () => {
		setIsEditActive(prev => !prev);
	};

	const deleteTask = () => {
		setBoards(prev => {
			const copy = [...prev];

			const currentBoard = copy.find(board => board.id === boardId);

			const currentList = currentBoard.lists.find(crList => crList.id === list.id);

			currentList.tasks = currentList.tasks.filter(item => item.id !== taskId);

			return copy;
		});
	};

	const handleRemove = () => {
		setConfirmDelete({
			status: true,
			itemToDelete: task,
		});
	};

	const handleDragStart = (e, list) => {
		e.dataTransfer.setData('dragType', e.target.dataset.type);
		e.dataTransfer.setData('taskId', taskId);
		e.dataTransfer.setData('listId', list.id);
	};

	const handleDragOver = e => {
		e.preventDefault();

		if (e.target.classList.contains('task')) {
			e.target.style.boxShadow = '0 4px 3px gray';
		}
	};

	const handleDragLeave = e => {
		e.target.style.boxShadow = 'none';
	};

	const handleDragEnd = e => {
		e.target.style.boxShadow = 'none';
	};

	const handleDrop = (e, task, list, taskIndex) => {
		e.preventDefault();

		const dragListId = e.dataTransfer.getData('listId');
		const dragTaskId = e.dataTransfer.getData('taskId');
		const dragType = e.dataTransfer.getData('dragType');

		if (!user) {
			return;
		}

		if (dragType === 'task') {
			if (dragListId === list.id) {
				setBoards(prev => {
					const copy = [...prev];

					const currentBoard = copy.find(board => board.id === boardId);

					const currentList = currentBoard.lists.find(item => item.id === dragListId);

					const dragTask = currentList.tasks.find(item => item.id === dragTaskId);

					const dragTaskIndex = currentList.tasks.indexOf(dragTask);

					if (dragTaskId !== task.id) {
						const temp = currentList.tasks[taskIndex];

						currentList.tasks[taskIndex] = dragTask;

						currentList.tasks[dragTaskIndex] = temp;
					}

					return copy;
				});
			} else {
				setBoards(prev => {
					const copy = [...prev];

					const currentBoard = copy.find(board => board.id === boardId);

					const currentList = currentBoard.lists.find(item => item.id === list.id);

					const dragList = currentBoard.lists.find(item => item.id === dragListId);

					const dragTask = dragList.tasks.find(item => item.id === dragTaskId);

					const dragTaskIndex = dragList.tasks.indexOf(dragTask);

					const tempDragTask = dragList.tasks[dragTaskIndex];

					if (Object.prototype.toString.call(dragTask) == '[object Object]' && Object.keys(dragTask).length > 0) {
						currentList.tasks.splice(taskIndex, 1, tempDragTask);

						dragList.tasks.splice(dragTaskIndex, 1, task);
					}

					return copy;
				});
			}
		}

		e.target.style.boxShadow = 'none';
	};

	return (
		<>
			<li
				draggable
				onDragStart={e => handleDragStart(e, list)}
				onDragEnd={e => handleDragEnd(e, task, list, taskIndex)}
				onDragOver={e => handleDragOver(e)}
				onDragLeave={e => handleDragLeave(e)}
				onDrop={e => handleDrop(e, task, list, taskIndex)}
				data-type='task'
				className={`task group flex flex-col justify-between relative w-full overflow-hidden rounded-md text-black bg-stone-50 shadow-md ease-out transition-all duration-300 ${
					isCollapsed ? 'min-h-10 max-h-10' : 'min-h-[150px] '
				}`}
			>
				<div className='flex flex-col justify-start'>
					<div className='flex justify-end items-center absolute top-2 right-2'>
						<ul className='relative flex justify-between items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100'>
							<li className='translate-x-4 transition-transform group-hover:translate-x-0'>
								<button onClick={handleCollapse}>
									{!isCollapsed && <PiArrowsInLineHorizontalFill size={20} className='transition-colors duration-150' />}

									{isCollapsed && <PiArrowsOutLineHorizontalFill size={20} className='transition-colors duration-150' />}
								</button>
							</li>

							<li className='translate-x-4 transition-transform group-hover:translate-x-0'>
								<button onClick={handleEdit}>
									<BiSolidEdit size={20} className='transition-colors duration-150 hover:text-cyan-500' />
								</button>
							</li>

							<li className='-translate-x-3 transition-transform group-hover:translate-x-0'>
								<button onClick={handleRemove}>
									<BiSolidTrashAlt size={20} className='transition-colors duration-150 hover:text-red-600' />
								</button>
							</li>
						</ul>
					</div>

					<div className={`flex flex-col justify-start ease-out transition-all duration-300 ${isCollapsed ? 'p-2' : 'pt-12 pb-4 px-4'}`}>
						{!isEditActive && <p className={`${isCollapsed ? 'w-[200px] overflow-hidden whitespace-nowrap text-ellipsis' : 'break-words'}`}>{text}</p>}
						{isEditActive && (
							<EditTaskText text={text} boardId={boardId} listId={list.id} taskId={taskId} setIsEditActive={setIsEditActive} setBoards={setBoards} />
						)}
					</div>
				</div>

				{!isCollapsed && (
					<ul className='flex justify-between gap-4 px-2 py-1 border-t border-t-stone-400'>
						<li>
							{creator.firstName}
							{creator.lastName && ' ' + creator.lastName.slice(0, 1)}.
						</li>
						<li>{date}</li>
					</ul>
				)}
			</li>

			{confirmDelete.status && (
				<ConfirmDelete setConfirmDelete={setConfirmDelete} deleteItem={deleteTask} message='Are you sure you want to delete this task?' />
			)}
		</>
	);
};

export default Task;
