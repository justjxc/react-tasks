import AddListButton from '../AddListButton/AddListButton';
import List from '../List/List';

const Board = ({ board }) => {
	const lists = board.lists;

	return (
		<div className='board flex justify-start gap-4 w-fit px-4 pt-28'>
			{lists.map((list, index) => {
				return <List key={list.id} board={board} list={list} listIndex={index} />;
			})}
			<div className='fixed left-0 top-0 -z-50 w-full h-full' style={{ background: board.bgColor }}></div> {/* for board's background */}
			<AddListButton />
		</div>
	);
};

export default Board;
