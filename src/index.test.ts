import * as I from "./index";

test("compress and uncompress", () => {
  const myObject = {
    firstName: "john",
    lastName: "doe",
    address: {
      street: "my street",
      city: "San Francisco",
      zip: 94001,
      country: "UNited States",
    },
  };
  const compressed = I.compress(myObject);

  console.log(compressed);

  expect(I.uncompress(compressed)).toEqual(myObject);
});
