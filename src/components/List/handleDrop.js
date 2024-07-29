const handleDrop = (e, listId, listIndex, boardId, user, setBoards) => {
	e.preventDefault();

	if (!user) {
		alert("Unauthorized users can't make changes");
		return;
	}

	const dragType = e.dataTransfer.getData('dragType');

	if (dragType === 'task') {
		const dragListId = e.dataTransfer.getData('listId');
		const dragTaskId = e.dataTransfer.getData('taskId');

		if (dragListId !== listId) {
			setBoards(prev => {
				const copy = [...prev];

				const currentBoard = copy.find(board => board.id === boardId);

				const dragList = currentBoard.lists.find(list => list.id === dragListId);

				const dragTask = dragList.tasks.find(task => task.id === dragTaskId);

				const dropList = currentBoard.lists.find(list => list.id === listId);

				if (Object.prototype.toString.call(dragTask) == '[object Object]' && Object.keys(dragTask).length > 0) {
					dropList.tasks = [...dropList.tasks, dragTask];

					dragList.tasks = dragList.tasks.filter(list => list.id !== dragTaskId);
				}

				return copy;
			});
		}
	}

	if (dragType === 'list') {
		const dragListId = e.dataTransfer.getData('listId');

		if (dragListId !== listId) {
			setBoards(prev => {
				const copy = [...prev];

				const currentBoard = copy.find(board => board.id === boardId);

				const dragList = currentBoard.lists.find(item => item.id === dragListId);

				const dragListIndex = currentBoard.lists.indexOf(dragList);

				const temp = currentBoard.lists[listIndex];

				currentBoard.lists[listIndex] = dragList;

				currentBoard.lists[dragListIndex] = temp;

				return copy;
			});
		}
	}
};

export default handleDrop;
