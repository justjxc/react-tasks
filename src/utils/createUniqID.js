const createUniqID = () => {
	return Math.round(Math.random() * Date.now()).toString(16) + Math.round(Math.random() * Date.now()).toString(16);
};

export default createUniqID;
