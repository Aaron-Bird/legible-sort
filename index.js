module.exports = function legibleSort(list) {
  function isNumeric(letter) {
    const code = letter.charCodeAt();
    return code >= 48 && code <= 57;
  }

  list.sort(function(a, b) {
    if (a === b) {
      return 0;
    }

    if (typeof a !== "string") {
      a = String(a);
    }
    if (typeof b !== "string") {
      b = String(b);
    }

    const aLen = a.length;
    const bLen = b.length;
    if (aLen === 0 && bLen === 0) {
      return 0;
    } else if (aLen === 0) {
      return -1;
    } else if (bLen === 0) {
      return 1;
    }

    let i = 0,
      len = Math.min(aLen, bLen);

    while (i < len) {
      const al = a[i];
      const bl = b[i];

      if (isNumeric(al) && isNumeric(bl)) {
        // numeric

        let alNumStr = al;
        let j = i + 1;

        while (j < aLen && isNumeric(a[j])) {
          alNumStr += a[j];
          j++;
        }

        let blNumStr = bl;
        let k = i + 1;
        while (k < bLen && isNumeric(b[k])) {
          blNumStr += b[k];
          k++;
        }

        const order = Number(alNumStr) - Number(blNumStr);
        if (order !== 0) {
          return order;
        }
      } else if (al !== bl) {
        // Unequal characters

        const lowerA = al.toLowerCase();
        const lowerB = bl.toLowerCase();
        const order1 = al > bl;
        const order2 = lowerA > lowerB;
        const order3 = lowerA === lowerB;

        // input:     [A, a]      [a, A]
        // order1:   A > a     a > A
        //               true        false
        // order3:  a === a  a === a
        // result:   [A, a]        [A, a]
        if (order3) {
          return order1 ? 1 : -1;
        } else {
          // input:     [B, A]  [b, a]  [b, A]
          // order1:  B > A  b > a  b > A
          //               true    true    false
          // order2:  b > a  b > a  b > a
          //              true    true    ture
          // result:   [A, B]  [a, b]  [A, b]
          if (order1 === order2) {
            return order1 ? 1 : -1;
          } else {
            // input:      [B, a]
            // order1:   B > a
            //               false
            // order2:  b > a
            //               true
            // result:    [a, B]
            return order2 ? 1 : -1;
          }
        }
      }

      i++;
    }

    return aLen > bLen ? 1 : -1;
  });

  return list;
};
