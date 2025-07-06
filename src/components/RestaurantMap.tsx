
import React from 'react';
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
  // 지도 중심점 (잠실역)
  const centerLat = 37.5142;
  const centerLng = 127.1031;
  
  // 좌표를 픽셀 위치로 변환하는 간단한 함수
  const coordsToPixels = (lat: number, lng: number) => {
    const scale = 8000; // 확대 비율
    const x = (lng - centerLng) * scale + 200; // 지도 중심을 (200, 200)으로
    const y = (centerLat - lat) * scale + 200;
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
        className="absolute w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
        style={{ left: '200px', top: '200px' }}
      >
        <span className="text-white text-xs font-bold">역</span>
      </div>
      <div 
        className="absolute text-xs font-bold text-blue-800 transform -translate-x-1/2"
        style={{ left: '200px', top: '230px' }}
      >
        잠실역
      </div>
      
      {/* 식당 마커들 */}
      {restaurants.map((restaurant) => {
        const { x, y } = coordsToPixels(restaurant.position.lat, restaurant.position.lng);
        const isSelected = selectedRestaurant === restaurant.id;
        const isFiltered = restaurant.isFiltered;
        
        return (
          <div key={restaurant.id}>
            {/* 마커 */}
            <button
              onClick={() => !isFiltered && onMarkerClick(restaurant.id)}
              className={`absolute w-8 h-8 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all flex items-center justify-center text-lg ${
                isFiltered 
                  ? 'bg-gray-400 cursor-not-allowed opacity-50' 
                  : isSelected
                    ? 'bg-yellow-400 scale-125 z-10'
                    : 'bg-green-500 hover:scale-110 cursor-pointer'
              }`}
              style={{ left: `${x}px`, top: `${y}px` }}
              disabled={isFiltered}
            >
              {isFiltered ? '❌' : isSelected ? '⭐' : '🍽️'}
            </button>
            
            {/* 식당명 라벨 */}
            <div 
              className={`absolute text-xs font-medium transform -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded-md ${
                isFiltered 
                  ? 'text-gray-500 bg-gray-100 opacity-50' 
                  : isSelected
                    ? 'text-yellow-800 bg-yellow-100 font-bold'
                    : 'text-green-800 bg-green-100'
              }`}
              style={{ left: `${x}px`, top: `${y + 20}px` }}
            >
              {restaurant.name}
            </div>
          </div>
        );
      })}
      
      {/* 범례 */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg">
        <div className="text-xs font-bold text-gray-800 mb-2">범례</div>
        <div className="flex flex-col gap-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">🍽️</div>
            <span className="text-gray-700">선택 가능</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-white text-xs">⭐</div>
            <span className="text-gray-700">선택됨</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs">❌</div>
            <span className="text-gray-700">필터링됨</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMap;
