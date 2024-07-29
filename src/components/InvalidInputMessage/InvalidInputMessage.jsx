import { MdError } from 'react-icons/md';

const InvalidInputMessage = ({ message }) => {
	return (
		<div className='w-full flex items-center gap-1 text-red-600'>
			<MdError size={20} />
			{message}
		</div>
	);
};

export default InvalidInputMessage;
