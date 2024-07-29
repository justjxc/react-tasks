const ListButton = ({ id, clickFunction, value }) => {
	return (
		<button
			id={id}
			onClick={clickFunction}
			className='w-full flex justify-center items-center gap-2 bg-slate-200 shadow-sm p-2 rounded-md transition-colors hover:bg-white'
		>
			{value}
		</button>
	);
};

export default ListButton;
