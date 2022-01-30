// base64 encoding/decoding is different depending on whether running on node or browser
const isNode = typeof window === "undefined";

export const toBase64 = (str: string) => {
  if (isNode) {
    return Buffer.from(str).toString("base64");
  }
  return window.btoa(str);
};

export const fromBase64 = (b64: string) => {
  if (isNode) {
    return Buffer.from(b64, "base64").toString("utf-8");
  }

  return window.atob(b64);
};

type LinearizedObjectUnit = [string, any];

type LinearizedObject = LinearizedObjectUnit[];

export const linearize = (
  v: { [k: string]: any },
  prefixes: string[] = []
): LinearizedObject => {
  let r: LinearizedObject = [];

  Object.entries(v).map(([k, value]) => {
    if (typeof value === "object") {
      r = r.concat(linearize(value, [...prefixes, k]));
    } else {
      const key = [...prefixes, k].join(".");

      r.push([key, value]);
    }
  });

  return r;
};

export const LinearizedObjectTostring = (
  lArray: LinearizedObject,
  separators: { vertical: string; horizontal: string } = {
    vertical: "\n",
    horizontal: "\t",
  }
): string =>
  lArray
    .map(([k, v]) => [k, v].join(separators.horizontal))
    .join(separators.vertical);

export const toLinearizedObject = (
  s: string,
  separators: { vertical: string; horizontal: string } = {
    vertical: "\n",
    horizontal: "\t",
  }
) =>
  s.split(separators.vertical).map((x) => {
    const [k, v] = x.split(separators.horizontal);

    return [k, v] as LinearizedObjectUnit;
  });

export const nest = (l: LinearizedObject): { [k: string]: any } => {
  const r: { [k: string]: any } = {};

  l.forEach(([key, value]) => {
    const keyArray: string[] = key.split(".");
    const kLength: number = keyArray.length;

    let ref = r;

    keyArray.forEach((k, i) => {
      if (i === kLength - 1) {
        ref[k] = value;
      }

      if (!ref[k]) {
        ref[k] = {};
      }

      ref = ref[k];
    });
  });

  return r;
};
