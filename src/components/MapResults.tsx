
import React, { useState } from 'react';
import { Restaurant } from '../types';
import RestaurantCard from './RestaurantCard';
import RestaurantMap from './RestaurantMap';
import RestaurantPopup from './RestaurantPopup';
import { getAvailableRestaurantsCount } from '../utils/filterUtils';
import { Button } from './ui/button';
import { List, X } from 'lucide-react';

interface MapResultsProps {
  restaurants: Restaurant[];
  onBack: () => void;
}

const MapResults: React.FC<MapResultsProps> = ({ restaurants, onBack }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null);
  const [showList, setShowList] = useState(false);
  const [popupRestaurant, setPopupRestaurant] = useState<Restaurant | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const availableCount = getAvailableRestaurantsCount(restaurants);
  const availableRestaurants = restaurants.filter(r => !r.isFiltered);

  const handleMarkerClick = (restaurantId: number) => {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    if (restaurant && !restaurant.isFiltered) {
      setSelectedRestaurant(restaurantId);
      setPopupRestaurant(restaurant);
      setIsPopupOpen(true);
    }
  };

  const handleCardClick = (restaurantId: number) => {
    setSelectedRestaurant(restaurantId);
  };

  const handleShareRestaurant = (restaurant: Restaurant) => {
    // 공유 기능 구현
    const shareText = `${restaurant.name} - ${restaurant.category}\n평점: ${restaurant.rating}점\n가격: ${restaurant.priceRange}\n도보 ${restaurant.walkTime}분`;
    
    if (navigator.share) {
      navigator.share({
        title: `${restaurant.name} 추천`,
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('식당 정보가 클립보드에 복사되었습니다!');
    }
    setIsPopupOpen(false);
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
            <Button
              onClick={() => setShowList(!showList)}
              variant="outline"
              className="flex items-center gap-2"
            >
              {showList ? <X className="w-4 h-4" /> : <List className="w-4 h-4" />}
              {showList ? '목록 숨기기' : '목록 보기'}
            </Button>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-6xl mx-auto w-full p-4 gap-6">
        {/* 지도 섹션 */}
        <div className={`${showList ? 'lg:w-3/5' : 'w-full'} h-96 lg:h-auto transition-all duration-300`}>
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

        {/* 리스트 섹션 - 조건부 표시 */}
        {showList && (
          <div className="lg:w-2/5 transition-all duration-300">
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
        )}
      </div>

      {/* 팝업 */}
      <RestaurantPopup
        restaurant={popupRestaurant}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onShare={handleShareRestaurant}
      />

      {/* 선택된 식당 정보 (기존 하단 바) */}
      {selectedRestaurant && !isPopupOpen && (
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
                    마커를 클릭하면 상세 정보를 볼 수 있어요!
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => {
                  const restaurant = restaurants.find(r => r.id === selectedRestaurant);
                  if (restaurant) {
                    setPopupRestaurant(restaurant);
                    setIsPopupOpen(true);
                  }
                }}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold"
              >
                상세보기
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapResults;
