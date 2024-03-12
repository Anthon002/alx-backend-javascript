export const weak_Map = new WeakMap();

const MAXENDPOINTCALLS = 5;

function queryAPI(endpoint) {
  if (!weak_Map.has(endpoint)) {
    weak_Map.set(endpoint, 0);
  }
  weak_Map.set(endpoint, weak_Map.get(endpoint) + 1);
  if (weak_Map.get(endpoint) >= MAXENDPOINTCALLS) {
    throw new Error('Endpoint load is high');
  }
}
export queryAPI;
