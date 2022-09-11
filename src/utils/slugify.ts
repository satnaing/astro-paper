const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

export const slufigyAll = (arr: string[]) => arr.map((str) => slugify(str));

export default slugify;
