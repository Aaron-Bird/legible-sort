const legibleSort = require("../index.js");
const expect = require("chai").expect;

function randomStr(maxLen = 10) {
  const key = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const keyLen = key.length;
  let str = "";
  let len = Math.floor(Math.random() * (maxLen + 1));
  for (var i = 0; i < len; i++) {
    const num = Math.floor(Math.random() * keyLen);
    str += key[num];
  }
  return str;
}

function shuffleArray(array) {
  const len = array.length;
  for (let i = len - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * len);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

describe("legibleSort test", function() {
  it("base", function() {
    expect(legibleSort(["01", "00"])).to.deep.equal(["00", "01"]);
    expect(legibleSort(["-01", "-00"])).to.deep.equal(["-00", "-01"]);
    expect(legibleSort(["22", "11"])).to.deep.equal(["11", "22"]);
    expect(legibleSort(["22", "11"])).to.deep.equal(["11", "22"]);
    expect(legibleSort(["54321", "12345"])).to.deep.equal(["12345", "54321"]);
    expect(legibleSort(["5", "4", "3", "2", "1"])).to.deep.equal(["1", "2", "3", "4", "5"]);
    expect(legibleSort(["11", "3", "74", "6", "410"])).to.deep.equal(["3", "6", "11", "74", "410"]);

    expect(legibleSort(["B", "A"])).to.deep.equal(["A", "B"]);
    expect(legibleSort(["A", "B"])).to.deep.equal(["A", "B"]);
    expect(legibleSort(["a", "A"])).to.deep.equal(["A", "a"]);
    expect(legibleSort(["A", "a"])).to.deep.equal(["A", "a"]);
    expect(legibleSort(["b", "A"])).to.deep.equal(["A", "b"]);
    expect(legibleSort(["A", "b"])).to.deep.equal(["A", "b"]);
    expect(legibleSort(["B", "a"])).to.deep.equal(["a", "B"]);
    expect(legibleSort(["a", "B"])).to.deep.equal(["a", "B"]);
    expect(legibleSort(["b", "a"])).to.deep.equal(["a", "b"]);
    expect(legibleSort(["a", "b"])).to.deep.equal(["a", "b"]);
    expect(legibleSort(["Ab", "ab"])).to.deep.equal(["Ab", "ab"]);
    expect(legibleSort(["ab", "Ab"])).to.deep.equal(["Ab", "ab"]);
    expect(legibleSort(["a", "b", "c"])).to.deep.equal(["a", "b", "c"]);
    expect(legibleSort(["c", "b", "a"])).to.deep.equal(["a", "b", "c"]);
    expect(legibleSort(["b", "a", "c"])).to.deep.equal(["a", "b", "c"]);
    expect(legibleSort([" c", " b", " a"])).to.deep.equal([" a", " b", " c"]);
    expect(legibleSort([" abc", " ab", " a"])).to.deep.equal([" a", " ab", " abc"]);
    expect(legibleSort([" AaA", " AAA", " AAa"])).to.deep.equal([" AAA", " AAa", " AaA"]);
    expect(legibleSort([" ABA", " AaA", " aBA"])).to.deep.equal([" AaA", " ABA", " aBA"]);

    expect(legibleSort(["a", "A", "0"])).to.deep.equal(["0", "A", "a"]);
    expect(legibleSort(["A", "0", "a"])).to.deep.equal(["0", "A", "a"]);
    expect(legibleSort(["a", "0", "A"])).to.deep.equal(["0", "A", "a"]);
    expect(legibleSort(["A", "a", "0"])).to.deep.equal(["0", "A", "a"]);
    expect(legibleSort(["abc", "ab0", "0abc"])).to.deep.equal(["0abc", "ab0", "abc"]);

    expect(legibleSort(["a1", "a2"])).to.deep.equal(["a1", "a2"]);
    expect(legibleSort(["a2", "a1"])).to.deep.equal(["a1", "a2"]);
    expect(legibleSort(["1a", "2a"])).to.deep.equal(["1a", "2a"]);
    expect(legibleSort(["2a", "1a"])).to.deep.equal(["1a", "2a"]);
    expect(legibleSort(["a11", "a12"])).to.deep.equal(["a11", "a12"]);
    expect(legibleSort(["a12", "a11"])).to.deep.equal(["a11", "a12"]);
    expect(legibleSort(["a11 13", "a11 12"])).to.deep.equal(["a11 12", "a11 13"]);
    expect(legibleSort(["a11.11", "a11.13"])).to.deep.equal(["a11.11", "a11.13"]);
    expect(legibleSort(["a11.13", "a11.11"])).to.deep.equal(["a11.11", "a11.13"]);
    expect(legibleSort(["a11 12", "a12 11"])).to.deep.equal(["a11 12", "a12 11"]);
    expect(legibleSort(["a12 11", "a11 12"])).to.deep.equal(["a11 12", "a12 11"]);

    expect(legibleSort(["", ""])).to.deep.equal(["", ""]);
    expect(legibleSort(["", "s"])).to.deep.equal(["", "s"]);
    expect(legibleSort(["s", ""])).to.deep.equal(["", "s"]);
    expect(legibleSort([" ", "s"])).to.deep.equal([" ", "s"]);
    expect(legibleSort(["s", " "])).to.deep.equal([" ", "s"]);
  });

  it("uppercase letter", function() {
    const str = "ABCDEFGHIJKLMN";
    const list = [];
    function callback(letter) {
      for (let i = 0, len = list.length; i < len; i++) {
        list.push(list[i] + letter);
      }
      list.push(letter);
    }
    for (let i of str) {
      callback(i);
    }
    const compare = [...list].sort();
    legibleSort(list);
    expect(list).to.deep.equal(compare);
  });

  it("lowercase letter", function() {
    const str = "abcdefghijklmn";
    const list = [];
    function callback(letter) {
      for (let i = 0, len = list.length; i < len; i++) {
        list.push(list[i] + letter);
      }
      list.push(letter);
    }
    for (let i of str) {
      callback(i);
    }
    const compare = [...list].sort();
    legibleSort(list);
    expect(list).to.deep.equal(compare);
  });

  it("number", function() {
    const list = [];
    for (let i = 0; i < 100000; i++) {
      list.push(String(parseInt(Math.random() * 100)));
    }
    const compare = [...list].sort((a, b) => Number(a) - Number(b));
    legibleSort(list);
    expect(list).to.deep.equal(compare);
  });

  it("string order", function() {
    const key = " 0123456789AaBbCcDdEeFfGgHhIiJjKkLMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
    const list = key.split("");
    list.unshift("");
    const compare = [...list];

    shuffleArray(list);
    legibleSort(list);
    expect(list).to.deep.equal(compare);
  });

  it("random", function() {
    const list = [];
    for (let i = 0; i < 10000; i++) {
      list.push(randomStr());
    }
    const compare = [...list];

    for (let i = 0; i < 5; i++) {
      shuffleArray(compare);
      shuffleArray(list);
      legibleSort(list);
      legibleSort(compare);
      expect(list).to.deep.equal(compare);
    }
  });
});
