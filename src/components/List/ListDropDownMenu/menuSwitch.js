const menuSwitch = (e, setIsDropDownActive, setIsEditActive, setConfirmDelete, changeListColor, setIsMoveList) => {
	const target = e.target.id;

	console.log(setIsMoveList);

	switch (target) {
		case 'delete': {
			setConfirmDelete({
				status: true,
			});

			setIsDropDownActive(prev => !prev);

			break;
		}

		case 'edit': {
			setIsEditActive(prev => !prev);

			setIsDropDownActive(prev => !prev);

			break;
		}

		case 'moveList': {
			setIsMoveList(prev => !prev);

			setIsDropDownActive(prev => !prev);

			break;
		}

		case 'bg-001219': {
			changeListColor('bgColor', '#001219');

			break;
		}

		case 'bg-005F73': {
			changeListColor('bgColor', '#005F73');

			break;
		}

		case 'bg-0A9396': {
			changeListColor('bgColor', '#0A9396');

			break;
		}

		case 'bg-94D2BD': {
			changeListColor('bgColor', '#94D2BD');

			break;
		}

		case 'bg-E9D8A6': {
			changeListColor('bgColor', '#E9D8A6');

			break;
		}

		case 'bg-EE9B00': {
			changeListColor('bgColor', '#EE9B00');

			break;
		}

		case 'bg-CA6702': {
			changeListColor('bgColor', '#CA6702');

			break;
		}

		case 'bg-BB3E03': {
			changeListColor('bgColor', '#BB3E03');

			break;
		}

		case 'bg-AE2012': {
			changeListColor('bgColor', '#AE2012');

			break;
		}

		case 'bg-9B2226': {
			changeListColor('bgColor', '#9B2226');

			break;
		}

		case 'textWhite': {
			changeListColor('textColor', '#ffffff');

			break;
		}

		case 'textBlack': {
			changeListColor('textColor', '#000000');

			break;
		}
	}
};

export default menuSwitch;
