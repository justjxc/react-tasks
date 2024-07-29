import { IoCloseSharp } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import ListButton from './ListButton';
import { useState } from 'react';

const ListItem = ({
	item,
	textColor,
	headerBg,
	bgType,
	setBgType,
	background,
	setBackground,
	isAddCssActive,
	addCssTextareaRef,
	setIsAddCssActive,
	changeBoardColor,
}) => {
	const [isTabOpen, setIsTabOpen] = useState(false);

	const handleTab = e => {
		const targetId = e.target.id;

		if (targetId === 'textColor' || targetId === 'header' || targetId === 'background') {
			setIsTabOpen(prev => !prev);
		}
	};

	const handleAddCss = () => {
		setIsAddCssActive(prev => !prev);
	};

	const removeColor = id => {
		if (id === 'header') {
			changeBoardColor('headerColor', 'transparent');
		}

		if (id === 'background') {
			changeBoardColor(
				'bgColor',
				'linear-gradient(to top, #3f51b1 0%,#5a55ae 13%,#7b5fac 25%,#8f6aae 38%,#a86aa4 50%,#cc6b8e 62%,#f18271 75%,#f3a469 87%,#f7c978 100%)'
			);

			setBgType('gradient');
			setBackground([]);
		}
	};

	const outlineColor = (itemId, colorValue) => {
		if (itemId === 'textColor') {
			return textColor === colorValue;
		}

		if (itemId === 'header') {
			return headerBg === colorValue;
		}

		if (itemId === 'background') {
			if (bgType === 'color') return background === colorValue;

			if (bgType === 'gradient') return background.find(color => color === colorValue);
		}
	};

	return (
		<li
			key={item.id}
			id={item.id}
			onClick={handleTab}
			className={`cursor-pointer p-2 font-semibold capitalize ${item.colors ? 'border-t border-black last:border-b' : ''}`}
		>
			<div className='flex justify-between items-center pointer-events-none'>
				{item.value}
				{item.colors && <IoIosArrowDown className={`${isTabOpen ? 'rotate-180' : 'rotate-0'}`} />}
			</div>

			{item.colors && (
				<div className={`flex flex-col justify-between gap-4  overflow-hidden transition-all ${isTabOpen ? 'h-auto p-4' : 'h-0 p-0'}`}>
					{item.type && (
						<ul className='grid grid-cols-2'>
							{item.type.map(type => {
								return (
									<li key={type.id} id={type.id} className={`relative text-center border-black ${bgType === type.id ? 'border-b-2' : 'border-0'}`}>
										{type.value}
									</li>
								);
							})}
						</ul>
					)}

					{item.colors && (
						<>
							<ul className='grid grid-cols-4 justify-items-center'>
								{item.colors.map(color => {
									return (
										<li key={color.id}>
											<button
												id={color.id}
												className={`w-12 h-8 rounded-md shadow-md transition-all hover:opacity-80 hover:scale-110 ${
													outlineColor(item.id, color.code) ? 'outline outline-blue-500' : ''
												}`}
												style={{ backgroundColor: color.code }}
											></button>
										</li>
									);
								})}
							</ul>

							{item.id === 'background' && isAddCssActive && <textarea ref={addCssTextareaRef} autoFocus className=''></textarea>}

							{item.type && bgType === 'gradient' && <ListButton id='addCss' clickFunction={handleAddCss} value={!isAddCssActive ? 'Add CSS' : 'Cancel'} />}

							{(item.id === 'background' || item.id === 'header') && (
								<ListButton
									id='removeColor'
									clickFunction={() => removeColor(item.id)}
									value={
										<>
											<IoCloseSharp />
											Remove color
										</>
									}
								/>
							)}
						</>
					)}
				</div>
			)}
		</li>
	);
};

export default ListItem;
