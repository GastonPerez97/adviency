const getGifts = () => {
	return new Promise((res, rej) => {
		const data = JSON.parse(window.localStorage.getItem("gifts")) || [];

		setTimeout(() => {
			res(data);
		}, 1700);
	});
}

export default getGifts;
