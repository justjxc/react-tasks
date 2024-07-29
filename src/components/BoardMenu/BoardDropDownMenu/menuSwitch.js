const menuSwitch = (e, setConfirmDelete, setIsEditActive, setHeaderBg, bgType, setBgType, setBackground, setTextColor) => {
	const target = e.target.id;

	const changeBg = (bgColorType, bgColor) => {
		if (bgColorType === 'color') {
			setBackground(bgColor);
		}

		if (bgColorType === 'gradient') {
			setBackground(prev => {
				if (prev.find(color => color === bgColor)) {
					return prev;
				}

				if (prev.length > 1) {
					return [...prev.slice(1), bgColor];
				} else {
					return [...prev, bgColor];
				}
			});
		}
	};

	const changeHeaderBg = headerBgColor => {
		setHeaderBg(headerBgColor);
	};

	const changeTextColor = textColor => {
		setTextColor(textColor);
	};

	switch (target) {
		case 'delete': {
			setConfirmDelete({ status: true });

			break;
		}

		case 'edit': {
			setIsEditActive(prev => !prev);

			break;
		}

		case 'color': {
			setBgType('color');
			setBackground('');
			break;
		}

		case 'gradient': {
			setBgType('gradient');
			setBackground([]);
			break;
		}

		case 'text-white': {
			changeTextColor('white');

			break;
		}

		case 'text-black': {
			changeTextColor('black');

			break;
		}

		case 'header-white': {
			changeHeaderBg('white');

			break;
		}

		case 'header-black': {
			changeHeaderBg('black');

			break;
		}

		case 'header-#9e0142': {
			changeHeaderBg('#9e0142');

			break;
		}

		case 'header-#d53e4f': {
			changeHeaderBg('#d53e4f');

			break;
		}

		case 'header-#f46d43': {
			changeHeaderBg('#f46d43');

			break;
		}

		case 'header-#fdae61': {
			changeHeaderBg('#fdae61');

			break;
		}

		case 'header-#fee08b': {
			changeHeaderBg('#fee08b');

			break;
		}

		case 'header-#e6f598': {
			changeHeaderBg('#e6f598');

			break;
		}

		case 'header-#abdda4': {
			changeHeaderBg('#abdda4');

			break;
		}

		case 'header-#66c2a5': {
			changeHeaderBg('#66c2a5');

			break;
		}

		case 'header-#3288bd': {
			changeHeaderBg('#3288bd');

			break;
		}

		case 'header-#5e4fa2': {
			changeHeaderBg('#5e4fa2');

			break;
		}

		case 'bg-white': {
			changeBg(bgType, 'white');

			break;
		}

		case 'bg-black': {
			changeBg(bgType, 'black');

			break;
		}

		case 'bg-#9e0142': {
			changeBg(bgType, '#9e0142');

			break;
		}

		case 'bg-#d53e4f': {
			changeBg(bgType, '#d53e4f');

			break;
		}

		case 'bg-#f46d43': {
			changeBg(bgType, '#f46d43');

			break;
		}

		case 'bg-#fdae61': {
			changeBg(bgType, '#fdae61');

			break;
		}

		case 'bg-#fee08b': {
			changeBg(bgType, '#fee08b');

			break;
		}

		case 'bg-#e6f598': {
			changeBg(bgType, '#e6f598');

			break;
		}

		case 'bg-#abdda4': {
			changeBg(bgType, '#abdda4');

			break;
		}

		case 'bg-#66c2a5': {
			changeBg(bgType, '#66c2a5');

			break;
		}

		case 'bg-#3288bd': {
			changeBg(bgType, '#3288bd');

			break;
		}

		case 'bg-#5e4fa2': {
			changeBg(bgType, '#5e4fa2');

			break;
		}
	}
};

export default menuSwitch;
