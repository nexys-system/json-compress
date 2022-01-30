import * as U from "./utils";

test("encode and decode base64", () => {
  const msg = "Hello World!";
  expect(U.fromBase64(U.toBase64(msg))).toEqual(msg);
});

const myObject = {
  a: 1,
  b: 2,
  c: 3,
  d: { d1: 11, d2: 12, d3: { d31: 311, d32: 312 } },
};
const out = [
  ["a", 1],
  ["b", 2],
  ["c", 3],
  ["d.d1", 11],
  ["d.d2", 12],
  ["d.d3.d31", 311],
  ["d.d3.d32", 312],
];

test("linearize", () => {
  expect(U.linearize(myObject)).toEqual(out);
});

test("nest", () => {
  expect(U.nest(out as any)).toEqual(myObject);
});
