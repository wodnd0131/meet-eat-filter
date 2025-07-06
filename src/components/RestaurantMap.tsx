
import React, { useState } from 'react';
import { Restaurant } from '../types';

interface RestaurantMapProps {
  restaurants: Restaurant[];
  selectedRestaurant: number | null;
  onMarkerClick: (restaurantId: number) => void;
}

const RestaurantMap: React.FC<RestaurantMapProps> = ({ 
  restaurants, 
  selectedRestaurant, 
  onMarkerClick 
}) => {
  const [hoveredRestaurant, setHoveredRestaurant] = useState<number | null>(null);
  
  // 지도 중심점 (잠실역)
  const centerLat = 37.5142;
  const centerLng = 127.1031;
  
  // 카테고리별 색상과 이모지 정의
  const categoryStyles: { [key: string]: { color: string; emoji: string } } = {
    '한식': { color: 'bg-red-500', emoji: '🍚' },
    '양식': { color: 'bg-yellow-500', emoji: '🍝' },
    '중식': { color: 'bg-orange-500', emoji: '🥢' },
    '일식': { color: 'bg-pink-500', emoji: '🍣' },
    '분식': { color: 'bg-purple-500', emoji: '🥟' },
    '패스트푸드': { color: 'bg-blue-500', emoji: '🍔' },
    '치킨': { color: 'bg-amber-500', emoji: '🍗' }
  };
  
  // 좌표를 픽셀 위치로 변환하는 함수 (마커 간격 2.1배 증가)
  const coordsToPixels = (lat: number, lng: number, index: number) => {
    const scale = 25200; // 12000 * 2.1
    let x = (lng - centerLng) * scale + 200;
    let y = (centerLat - lat) * scale + 200;
    
    // 마커가 겹치지 않도록 간격 조정 (2.1배 증가)
    const gridSize = 52; // 25 * 2.1
    const offsetX = (index % 5) * gridSize;
    const offsetY = Math.floor(index / 5) * gridSize;
    
    x += offsetX - 105; // 중심 조정 (50 * 2.1)
    y += offsetY - 105;
    
    return { x, y };
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl overflow-hidden">
      {/* 지도 배경 패턴 */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* 잠실역 표시 */}
      <div 
        className="absolute w-8 h-8 bg-blue-600 rounded-full border-3 border-white shadow-lg flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
        style={{ left: '200px', top: '200px' }}
      >
        <span className="text-white text-sm font-bold">역</span>
      </div>
      <div 
        className="absolute text-sm font-bold text-blue-800 transform -translate-x-1/2"
        style={{ left: '200px', top: '240px' }}
      >
        잠실역
      </div>
      
      {/* 식당 마커들 */}
      {restaurants.map((restaurant, index) => {
        const { x, y } = coordsToPixels(restaurant.position.lat, restaurant.position.lng, index);
        const isSelected = selectedRestaurant === restaurant.id;
        const isHovered = hoveredRestaurant === restaurant.id;
        const isFiltered = restaurant.isFiltered;
        const categoryStyle = categoryStyles[restaurant.category] || categoryStyles['한식'];
        const showBubble = isHovered || isSelected;
        
        return (
          <div key={restaurant.id}>
            {/* 말풍선 */}
            {showBubble && !isFiltered && (
              <div 
                className="absolute z-20 bg-white rounded-lg shadow-lg border border-gray-200 p-3 min-w-48 transform -translate-x-1/2"
                style={{ left: `${x}px`, top: `${y - 80}px` }}
              >
                {/* 말풍선 화살표 */}
                <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
                <div className="absolute bottom-[-9px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-9 border-r-9 border-t-9 border-l-transparent border-r-transparent border-t-gray-200"></div>
                
                {/* 말풍선 내용 */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{categoryStyle.emoji}</span>
                    <span className="font-bold text-gray-900">{restaurant.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <span>⭐</span>
                      <span>{restaurant.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>💰</span>
                      <span>{restaurant.priceRange}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <span>🚶</span>
                      <span>도보 {restaurant.walkTime}분</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>🚗</span>
                      <span>{restaurant.driveTime}분</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-green-600 font-medium">
                    ✅ 모든 팀원 OK!
                  </div>
                </div>
              </div>
            )}
            
            {/* 마커 */}
            <button
              onClick={() => !isFiltered && onMarkerClick(restaurant.id)}
              onMouseEnter={() => !isFiltered && setHoveredRestaurant(restaurant.id)}
              onMouseLeave={() => setHoveredRestaurant(null)}
              className={`absolute w-10 h-10 rounded-full border-3 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all flex items-center justify-center text-xl z-10 ${
                isFiltered 
                  ? 'bg-gray-400 cursor-not-allowed opacity-50' 
                  : isSelected || isHovered
                    ? `${categoryStyle.color} scale-125 ring-4 ring-yellow-300`
                    : `${categoryStyle.color} hover:scale-110 cursor-pointer hover:shadow-xl`
              }`}
              style={{ left: `${x}px`, top: `${y}px` }}
              disabled={isFiltered}
            >
              {isFiltered ? '❌' : categoryStyle.emoji}
            </button>
            
            {/* 식당명 라벨 */}
            <div 
              className={`absolute text-xs font-medium transform -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded-md shadow-sm ${
                isFiltered 
                  ? 'text-gray-500 bg-gray-100 opacity-50' 
                  : isSelected
                    ? 'text-yellow-800 bg-yellow-100 font-bold border border-yellow-300'
                    : 'text-white bg-black/70'
              }`}
              style={{ left: `${x}px`, top: `${y + 25}px` }}
            >
              {restaurant.name}
            </div>
          </div>
        );
      })}
      
      {/* 범례 */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg max-w-xs">
        <div className="text-xs font-bold text-gray-800 mb-2">카테고리별 마커</div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {Object.entries(categoryStyles).map(([category, style]) => (
            <div key={category} className="flex items-center gap-2">
              <div className={`w-5 h-5 ${style.color} rounded-full flex items-center justify-center text-white text-xs`}>
                {style.emoji}
              </div>
              <span className="text-gray-700">{category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMap;
