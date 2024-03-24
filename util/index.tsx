export const getPokemonIndex = (url: string) => {
  const number = url.split("/");
  return number[6].toString();
};
