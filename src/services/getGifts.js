const getGifts = () => {
	return new Promise((res, rej) => {
		const data = JSON.parse(window.localStorage.getItem("gifts"));

		setTimeout(() => {
			res(data);
		}, 1000);
	});
}

export default getGifts;
