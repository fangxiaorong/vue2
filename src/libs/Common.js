export class Base64 {
  static cb_utob(c) {
    const fromCharCode = String.fromCharCode;
    if (c.length < 2) {
      const cc = c.charCodeAt(0);
      return cc < 0x80 ? c
        : cc < 0x800 ? (fromCharCode(0xc0 | (cc >>> 6))
                      + fromCharCode(0x80 | (cc & 0x3f)))
        : (fromCharCode(0xe0 | ((cc >>> 12) & 0x0f))
          + fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
          + fromCharCode(0x80 | ( cc         & 0x3f)));
    } else {
      const cc = 0x10000
        + (c.charCodeAt(0) - 0xD800) * 0x400
        + (c.charCodeAt(1) - 0xDC00);
      return (fromCharCode(0xf0 | ((cc >>> 18) & 0x07))
              + fromCharCode(0x80 | ((cc >>> 12) & 0x3f))
              + fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
              + fromCharCode(0x80 | ( cc         & 0x3f)));
    }
  }
  static utob(u) {
    return u.replace(/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g, Base64.cb_utob);
  }
  static cb_encode(ccc) {
    const b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    const padlen = [0, 2, 1][ccc.length % 3],
    ord = ccc.charCodeAt(0) << 16
        | ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8)
        | ((ccc.length > 2 ? ccc.charCodeAt(2) : 0)),
    chars = [
        b64chars.charAt( ord >>> 18),
        b64chars.charAt((ord >>> 12) & 63),
        padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
        padlen >= 1 ? '=' : b64chars.charAt(ord & 63)
    ];
    return chars.join('');
  }
  static btoa (b) {
    return b.replace(/[\s\S]{1,3}/g, Base64.cb_encode);
  }
  static encode(content, urisafe) {
    if (!urisafe) {
      return Base64.btoa(Base64.utob(content));
    }
  }
}


export const utility = {
  getInnerText(el) {
    return (typeof el.textContent === 'string') ? el.textContent : el.innerText;
  },
  setInnerText(el, val) {
    if (typeof el.textContent === 'string') {
      el.textContent = val;
    } else {
      el.innerText = el;
    }
  }
};
