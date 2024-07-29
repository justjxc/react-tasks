import { IoAdd } from 'react-icons/io5';

import { useAddContext } from '../../contexts/AddContext';

const AddTaskButton = ({ listId }) => {
	const { setIsAddTaskActive } = useAddContext();

	const handleClick = () => {
		setIsAddTaskActive(prev => {
			return { status: !prev.status, id: listId };
		});
	};

	return (
		<button className='flex items-center text-inherit opacity-60 transition-opacity hover:opacity-100' onClick={handleClick}>
			<IoAdd size={26} />
			Add a task
		</button>
	);
};

export default AddTaskButton;
