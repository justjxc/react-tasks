import { useRef } from 'react';

const SelectUser = ({ users, setIsAddUserActive, setActiveUser, activeUser }) => {
	const selectRef = useRef(null);

	const handleChange = userId => {
		setActiveUser(users[userId]);

		console.log(selectRef.current.value);
	};

	const handleClick = () => {
		setIsAddUserActive(prev => !prev);
	};

	// return (
	// 	<div className='flex justify-between gap-2'>
	// 		<div className='flex justify-between items-center gap-2'>
	// 			<select ref={selectRef} onChange={e => handleChange(e.target.value)} value={activeUser.id}>
	// 				{users.map(user => {
	// 					return (
	// 						<option key={user.id} value={user.id}>
	// 							{user.firstName}
	// 							{' ' + user.lastName.slice(0, 1)}.
	// 						</option>
	// 					);
	// 				})}
	// 			</select>
	// 		</div>

	// 		<button className='border border-black rounded-md px-2 py-1' onClick={handleClick}>
	// 			New user
	// 		</button>
	// 	</div>
	// );

	return (
		<div className='flex justify-between gap-2'>
			<div className='flex justify-between items-center gap-2'>
				<div>
					<div>
						<div>
							<img src='/' alt='user avatar' />
							Username
						</div>

						<button>Logout</button>
					</div>
				</div>
			</div>

			<button className='border border-black rounded-md px-2 py-1' onClick={handleClick}>
				New user
			</button>
		</div>
	);
};

export default SelectUser;
