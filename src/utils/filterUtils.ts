import { Restaurant } from "../types";

export const getAvailableRestaurantsCount = (restaurants: Restaurant[]): number => {
  return restaurants.filter(r => !r.isFiltered).length;
};