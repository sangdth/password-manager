
/**
 * Returns a hash code for a string.
 *
 * @param {string} s a string
 * @return {number} a hash code value for the given string.
 */
const hashCode = (s) => {
  const l = s.length;
  let h = 0;
  let i = 0;

  if (l > 0) {
    while (i < l) {
      h = ((h << 2) - h) + s.charCodeAt(i++) | 0; // eslint-disable-line no-bitwise
    }
  }
  return h;
};

export default {
  encode(s, p) {
    let enc = '';
    const k = hashCode(p);
    // make sure that input is string
    const str = s.toString();
    for (let i = 0; i < str.length; i++) {
      // create block
      const a = str.charCodeAt(i);
      // bitwise XOR
      const b = a ^ k; // eslint-disable-line no-bitwise
      enc += String.fromCharCode(b);
    }
    return enc;
  },

  decode(s, p) {
    return this.encode(s, p);
  },
};
