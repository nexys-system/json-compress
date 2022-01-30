import * as U from "./utils";

// note: not a great improvement compared to JSON.stringify and JSON.parse

export const compress = (a: { [k: string]: any }) => {
  // const l = U.linearize(a);
  // const s = U.LinearizedObjectTostring(l);
  const s = JSON.stringify(a);
  return U.toBase64(s);
};

export const uncompress = (c: string) => {
  const s = U.fromBase64(c);

  return JSON.parse(s);
  // const l = U.toLinearizedObject(s);
  // return U.nest(l);
};
