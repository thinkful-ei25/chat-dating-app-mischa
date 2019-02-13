export function pad(num) {
  let s = num.toString();
  if (s.length < 2) {
    s = '0' + s;
  }
  return s;
}
