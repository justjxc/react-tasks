import { IoLogOut } from 'react-icons/io5';
import { BsPersonCircle } from 'react-icons/bs';
import { logOut, useAuth } from '../../contexts/AuthContext';

const UserMiniProfile = () => {
	const handleClick = () => {
		logOut();
	};

	const user = useAuth();

	return (
		<div className='flex justify-between items-center gap-2'>
			<div className='flex justify-between items-center gap-2 text-current'>
				<BsPersonCircle size={40} className='bg-neutral-200 text-slate-400 rounded-full' />
				{user.firstName + ' ' + user.lastName.slice(0, 1)}.
			</div>

			<IoLogOut size={26} onClick={handleClick} className='cursor-pointer text-current hover:text-red-600 transition duration-300' />
		</div>
	);
};

export default UserMiniProfile;
