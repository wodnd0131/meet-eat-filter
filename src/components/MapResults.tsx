
import React, { useState } from 'react';
import { Restaurant } from '../types';
import RestaurantCard from './RestaurantCard';
import RestaurantMap from './RestaurantMap';
import { getAvailableRestaurantsCount } from '../utils/filterUtils';

interface MapResultsProps {
  restaurants: Restaurant[];
  onBack: () => void;
}

const MapResults: React.FC<MapResultsProps> = ({ restaurants, onBack }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null);
  const availableCount = getAvailableRestaurantsCount(restaurants);
  const availableRestaurants = restaurants.filter(r => !r.isFiltered);

  const handleMarkerClick = (restaurantId: number) => {
    setSelectedRestaurant(restaurantId);
  };

  const handleCardClick = (restaurantId: number) => {
    setSelectedRestaurant(restaurantId);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 헤더 */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              <span>←</span>
              <span>다시 설정하기</span>
            </button>
            <div className="text-center">
              <div className="flex items-center gap-2 text-green-600 font-bold">
                <span>✅</span>
                <span>모든 팀원 응답 완료!</span>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                🎯 추천 가능한 식당: <span className="font-bold text-blue-600">{availableCount}곳</span>
              </div>
            </div>
            <div className="w-20"></div> {/* 균형을 위한 spacer */}
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-6xl mx-auto w-full p-4 gap-6">
        {/* 지도 섹션 */}
        <div className="lg:w-3/5 h-96 lg:h-auto">
          <div className="bg-white rounded-2xl p-4 shadow-sm h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">📍 잠실역 근처 맛집</h2>
              <div className="text-sm text-gray-600">
                반경 500m 내 검색결과
              </div>
            </div>
            <div className="relative h-80 lg:h-full">
              <RestaurantMap
                restaurants={restaurants}
                selectedRestaurant={selectedRestaurant}
                onMarkerClick={handleMarkerClick}
              />
            </div>
          </div>
        </div>

        {/* 리스트 섹션 */}
        <div className="lg:w-2/5">
          <div className="sticky top-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">🍽️ 추천 식당 목록</h2>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {availableCount}곳 발견
              </div>
            </div>
            
            <div className="space-y-4 max-h-96 lg:max-h-screen overflow-y-auto">
              {availableRestaurants.length > 0 ? (
                availableRestaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    isSelected={selectedRestaurant === restaurant.id}
                    onClick={() => handleCardClick(restaurant.id)}
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">😅</div>
                  <h3 className="text-lg font-bold text-gray-700 mb-2">
                    조건에 맞는 식당이 없어요
                  </h3>
                  <p className="text-gray-500 text-sm">
                    제외 조건을 다시 설정해보시는 건 어떨까요?
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 선택된 식당 정보 */}
      {selectedRestaurant && (
        <div className="bg-yellow-50 border-t-2 border-yellow-200 p-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⭐</span>
                <div>
                  <div className="font-bold text-gray-900">
                    {restaurants.find(r => r.id === selectedRestaurant)?.name} 선택됨
                  </div>
                  <div className="text-sm text-gray-600">
                    팀원들과 공유해보세요!
                  </div>
                </div>
              </div>
              <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-xl transition-colors">
                공유하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapResults;
