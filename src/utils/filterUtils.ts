
import { Restaurant, UserPreferences } from '../types';

const categoryMapping: { [key: string]: string[] } = {
  'spicy': ['매운음식'],
  'seafood': ['해산물'],
  'meat': ['육류'],
  'dairy': ['유제품'],
  'nuts': ['견과류'],
  'gluten': ['글루텐'],
  'chinese': ['중식'],
  'japanese': ['일식'],
  'western': ['양식'],
  'korean': ['한식'],
  'snack': ['분식'],
  'fastfood': ['패스트푸드', '치킨']
};

export const filterRestaurants = (restaurants: Restaurant[], preferences: UserPreferences): Restaurant[] => {
  return restaurants.map(restaurant => {
    let isFiltered = false;
    let filteredReason = '';

    // 못 먹는 음식 체크
    for (const cannotEat of preferences.cannotEat) {
      const categories = categoryMapping[cannotEat] || [];
      if (categories.some(cat => 
        restaurant.category.includes(cat) || 
        restaurant.tags.some(tag => tag.includes(cat))
      )) {
        isFiltered = true;
        filteredReason = `${cannotEat === 'spicy' ? '매운음식' : 
                         cannotEat === 'seafood' ? '해산물' :
                         cannotEat === 'meat' ? '육류' :
                         cannotEat === 'dairy' ? '유제품' :
                         cannotEat === 'nuts' ? '견과류' :
                         cannotEat === 'gluten' ? '글루텐' : cannotEat} 제외됨`;
        break;
      }
    }

    // 싫어하는 음식 체크
    if (!isFiltered) {
      for (const dislike of preferences.dislike) {
        const categories = categoryMapping[dislike] || [];
        if (categories.some(cat => restaurant.category.includes(cat))) {
          isFiltered = true;
          filteredReason = `${dislike === 'chinese' ? '중식' :
                           dislike === 'japanese' ? '일식' :
                           dislike === 'western' ? '양식' :
                           dislike === 'korean' ? '한식' :
                           dislike === 'snack' ? '분식' :
                           dislike === 'fastfood' ? '패스트푸드' : dislike} 제외됨`;
          break;
        }
      }
    }

    return {
      ...restaurant,
      isFiltered,
      filteredReason: isFiltered ? filteredReason : undefined
    };
  });
};

export const getAvailableRestaurantsCount = (restaurants: Restaurant[]): number => {
  return restaurants.filter(r => !r.isFiltered).length;
};
