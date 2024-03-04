export default function concatArrays(array1, array2, string) {
	var concatenated = [...array1, ...array2, ...string];
	return concatenated;
}
