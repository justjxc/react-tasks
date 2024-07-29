import { IoAdd } from 'react-icons/io5';

import { useAddContext } from '../../contexts/AddContext';

const AddListButton = () => {
	const { setIsAddListActive } = useAddContext();

	const handleClick = () => {
		setIsAddListActive(prev => !prev);
	};

	return (
		<button className='flex items-center gap-2 p-4 w-[350px] h-fit rounded-md transition-colors text-white bg-black/20 hover:bg-black/10' onClick={handleClick}>
			<IoAdd size={26} />
			Add a list
		</button>
	);
};

export default AddListButton;
