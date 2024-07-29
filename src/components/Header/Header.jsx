import { useActiveBoardContext } from '../../contexts/ActiveBoardContext';
import BoardMenu from '../BoardMenu/BoardMenu';
import SelectBoard from '../SelectBoard/SelectBoard';
import UserBlock from '../UserBlock/UserBlock';

const Header = () => {
	const { activeBoard } = useActiveBoardContext();

	return (
		<header
			className='flex justify-between w-full fixed z-50 gap-4 p-5 shadow-md'
			style={{ background: activeBoard.headerColor, color: activeBoard.textColor }}
		>
			<div className=''>
				<ul className='flex justify-between items-center *:border-r *:border-current *:h-full last:*:border-r-0 *:px-4 first:*:pl-0'>
					<li className=''>
						<SelectBoard />
					</li>

					<li>
						<BoardMenu />
					</li>
				</ul>
			</div>

			<UserBlock />
		</header>
	);
};

export default Header;
