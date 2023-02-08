export const customSort = (a, b) => {
	const dateA = new Date(a.release_date);
	const dateB = new Date(b.release_date);
	if (dateA > dateB) return -1;
	else if (dateA < dateB) return 1;
	return 0;
};
