const getPageNumbers = (numberOfPosts: number) => {
  const numberOfPages =
    numberOfPosts / Number(import.meta.env.PUBLIC_POST_PER_PAGE);

  let pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(numberOfPages); i++) {
    pageNumbers = [...pageNumbers, i];
  }

  return pageNumbers;
};

export default getPageNumbers;
