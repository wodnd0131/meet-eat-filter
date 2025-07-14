import { Restaurant } from "../types";

export const randomlyFilterRestaurants = (restaurants: Restaurant[]): Restaurant[] => {
  const filteredCount = Math.floor(restaurants.length / 3);
  const shuffled = [...restaurants].sort(() => 0.5 - Math.random());
  
  return shuffled.map((restaurant, index) => ({
    ...restaurant,
    isFiltered: index < filteredCount ? true : restaurant.isFiltered,
  }));
};
