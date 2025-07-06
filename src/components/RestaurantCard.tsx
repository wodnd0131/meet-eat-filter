
import React from 'react';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  isSelected: boolean;
  onClick: () => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, isSelected, onClick }) => {
  if (restaurant.isFiltered) return null;

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-4 shadow-sm border-2 transition-all cursor-pointer ${
        isSelected 
          ? 'border-yellow-400 bg-yellow-50' 
          : 'border-gray-100 hover:border-gray-200 hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">
              {restaurant.category === '한식' ? '🍚' :
               restaurant.category === '양식' ? '🍝' :
               restaurant.category === '중식' ? '🥢' :
               restaurant.category === '일식' ? '🍣' :
               restaurant.category === '분식' ? '🥟' : '🍽️'}
            </span>
            <h3 className="font-bold text-lg text-gray-900">{restaurant.name}</h3>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
            <div className="flex items-center gap-1">
              <span>⭐</span>
              <span className="font-medium">{restaurant.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>💰</span>
              <span>{restaurant.priceRange}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <span>🚶</span>
              <span>도보 {restaurant.walkTime}분</span>
            </div>
            <div className="flex items-center gap-1">
              <span>🚗</span>
              <span>{restaurant.driveTime}분</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold text-sm">✅ 모든 팀원 OK!</span>
          </div>
        </div>
      </div>
      
      {/* 태그 */}
      <div className="flex flex-wrap gap-2">
        {restaurant.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RestaurantCard;
