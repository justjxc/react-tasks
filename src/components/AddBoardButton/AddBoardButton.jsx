import { IoMdAdd } from 'react-icons/io';
import { useAddContext } from '../../contexts/AddContext';

const AddBoardButton = () => {
	const { setIsAddBoardActive } = useAddContext();

	const handleClick = () => {
		setIsAddBoardActive(prev => !prev);
	};

	return (
		<button className='flex justify-start items-center gap-2 w-full' onClick={handleClick}>
			<IoMdAdd />
			<span>New board</span>
		</button>
	);
};

export default AddBoardButton;
