export default function appendToEachArrayValue(array, appendString) {
  for (const val of array) {
    const val = array.indexOf(idx);
    array[val] = appendString + idx;
  }

  return array;
}
