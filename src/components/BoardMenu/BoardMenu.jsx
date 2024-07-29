import { useState, useEffect, useRef } from 'react';
import { BiMenu } from 'react-icons/bi';
import BoardDropDownMenu from './BoardDropDownMenu/BoardDropDownMenu';

const BoardMenu = () => {
	const [isDropDownActive, setIsDropDownActive] = useState(false);

	const dropDownBtnRef = useRef(null);

	const handleOpenMenu = () => {
		setIsDropDownActive(prev => !prev);
	};

	return (
		<div>
			<button ref={dropDownBtnRef} onClick={handleOpenMenu} className='text-current flex items-center'>
				<BiMenu size={30} className='pointer-events-none' />
			</button>

			{isDropDownActive && <BoardDropDownMenu dropDownBtnRef={dropDownBtnRef} setIsDropDownActive={setIsDropDownActive} />}
		</div>
	);
};

export default BoardMenu;
