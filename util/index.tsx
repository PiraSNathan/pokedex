export const getPokemonIndex = (url: string) => {
  const number = url.split("/");
  return number[6].toString();
};

export const getFormattedIndexNumber = (index: string, url: boolean) => {
  if (url) return getPokemonIndex(index).padStart(3, "0");
  const pokeIndex = index;
  return pokeIndex.padStart(3, "0");
};
