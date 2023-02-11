export const customSort = (a, b) => {
	const dateA = new Date(a.release_date);
	const dateB = new Date(b.release_date);
	if (dateA > dateB) return -1;
	else if (dateA < dateB) return 1;
	return 0;
};

export const shuffleMovies = (topMovies) => {
	const randomNumbers = [];
	const newData = [];
	let ranNumber = null;
	for (let i = 0; i < 5; i++) {
		ranNumber = Math.floor(Math.random() * topMovies.length);
		if (!randomNumbers.includes(ranNumber)) {
			randomNumbers.push(ranNumber);
			newData.push(topMovies[ranNumber]);
		} else {
			i--;
		}
	}
	return newData;
};
