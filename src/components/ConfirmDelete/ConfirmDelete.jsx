import { useActiveBoardContext } from '../../contexts/ActiveBoardContext';

const ConfirmDelete = ({ itemToDelete, setConfirmDelete, deleteItem, message }) => {
	const { activeBoard } = useActiveBoardContext();

	const deleteRejected = () => {
		setConfirmDelete({
			status: false,
			itemToDelete: undefined,
		});
	};

	const deleteConfirmed = () => {
		if (itemToDelete) {
			deleteItem(itemToDelete);

			setConfirmDelete({
				status: false,
				itemToDelete: undefined,
			});
		} else {
			deleteItem();

			setConfirmDelete({
				status: false,
				itemToDelete: undefined,
			});
		}
	};

	return (
		<div className='fixed top-0 left-0  bg-black/80 w-screen h-screen flex justify-center items-center z-50'>
			<div
				className='w-[400px] h-[350px] p-10 text-white flex flex-col justify-between items-center'
				style={{ background: activeBoard.bgColor, color: activeBoard.textColor }}
			>
				<h2 className='text-2xl text-center font-semibold'>{message}</h2>

				<div className='flex justify-between items-center gap-6'>
					<button
						onClick={deleteRejected}
						className='p-4 transition-colors duration-300 hover:bg-white hover:text-black'
						style={{ border: '2px solid ' + activeBoard.textColor }}
					>
						No
					</button>

					<button
						onClick={deleteConfirmed}
						className='p-4 transition-colors duration-300 hover:bg-white hover:text-black'
						style={{ border: '2px solid ' + activeBoard.textColor }}
					>
						Yes
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmDelete;
