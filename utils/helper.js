export const customSort = (a, b) => {
	const dateA = new Date(a.release_date);
	const dateB = new Date(b.release_date);
	if (dateA > dateB) return -1;
	else if (dateA < dateB) return 1;
	return 0;
};

export const shuffleArray = (array, shuffledItems = array.length) => {
	const randomNumbers = [];
	const newData = [];
	let ranNumber = null;
	for (let i = 0; i < shuffledItems; i++) {
		ranNumber = Math.floor(Math.random() * array.length);
		if (!randomNumbers.includes(ranNumber)) {
			randomNumbers.push(ranNumber);
			newData.push(array[ranNumber]);
		} else {
			i--;
		}
	}
	return newData;
};

export const filterByQuery = (
	from,
	to,
	minmumRating,
	minmumVotes,
	genre,
	runTime
) => {
	let uri;
	if (from)
		uri += `&vote_count.gte=100&sort_by=vote_average.desc&primary_release_date.gte=${from}`;
	if (to)
		uri += `&vote_count.gte=100&sort_by=vote_average.desc&primary_release_date.lte=${to}`;
	if (minmumRating)
		uri += `&vote_count.gte=${minmumVotes}&sort_by=vote_average.desc`;
	if (minmumVotes)
		uri += `&vote_count.gte=100&sort_by=vote_average.desc&with_genres=${genre}`;
	if (runTime)
		uri += `&vote_count.gte=100&with_runtime.lte=${runTime}&sort_by=vote_average.desc`;
	return uri;
};
