export default function createInt8TypedArray(lng, pos, val) {
  if (pos >= lng) {
    throw new Error('Position outside range');
  }
  const buf = new DataView(new ArrayBuffer(lng), 0, lng);
  buf.setInt8(pos, val);
  return buf;
}
