export const formatPokemonId = (id: number): string => {
  return id.toString().padStart(3, '0');
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};