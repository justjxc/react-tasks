import UserMiniProfile from '../UserMiniProfile/UserMiniProfile';
import { useAuth } from '../../contexts/AuthContext';
import { useAddContext } from '../../contexts/AddContext';

const UserBlock = () => {
	const { setIsLoginFormActive, setIsAddUserActive } = useAddContext();

	const handleClickRegister = () => {
		setIsAddUserActive(prev => !prev);
	};

	const handleClickLogin = () => {
		setIsLoginFormActive(prev => !prev);
	};

	const user = useAuth();

	return (
		<div>
			{user && <UserMiniProfile />}

			{!user && (
				<div className='flex justify-between items-center gap-2'>
					<button onClick={handleClickRegister}>Register</button>
					<button onClick={handleClickLogin}>Login</button>
				</div>
			)}
		</div>
	);
};

export default UserBlock;
