const weakMap = new WeakMap();
const max_calls = 5;

function queryAPI(endpoint) {
  if (!weakMap.has(endpoint)) {
    weakMap.set(endpoint, 0);
  }
  weakMap.set(endpoint, weakMap.get(endpoint) + 1);
  if (weakMap.get(endpoint) >= max_calls) {
    throw new Error('Endpoint load is high');
  }
}
export weakMap;
export queryAPI;
