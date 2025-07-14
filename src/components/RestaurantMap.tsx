import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Restaurant } from '../types';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

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
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mock user location for demonstration
    setUserLocation({ lat: 37.4979, lng: 127.0276 }); // Default to Gangnam Station
  }, []);

  const centerLat = userLocation ? userLocation.lat : 37.4979;
  const centerLng = userLocation ? userLocation.lng : 127.0276;

  const categoryStyles: { [key: string]: { color: string; emoji: string } } = {
    '한식': { color: 'bg-red-500', emoji: '🍚' },
    '양식': { color: 'bg-yellow-500', emoji: '🍝' },
    '중식': { color: 'bg-orange-500', emoji: '🥢' },
    '일식': { color: 'bg-pink-500', emoji: '🍣' },
    '분식': { color: 'bg-purple-500', emoji: '🥟' },
    '패스트푸드': { color: 'bg-blue-500', emoji: '🍔' },
    '치킨': { color: 'bg-amber-500', emoji: '🍗' }
  };

  const coordsToPixelOffset = (lat: number, lng: number, index: number) => {
    const scale = 50000; // Increased scale for better marker spread
    const baseDx = (lng - centerLng) * scale;
    const baseDy = (centerLat - lat) * scale * 0.6; // Adjusted for aspect ratio

    // Add a small, unique offset based on index to spread markers
    const offsetMagnitude = 120; // Adjust this value to control spread distance
    const offsetX = offsetMagnitude * Math.cos(index * 0.5); // Use index for unique angle
    const offsetY = offsetMagnitude * Math.sin(index * 0.5); // Use index for unique angle

    return { dx: baseDx + offsetX, dy: baseDy + offsetY };
  };

  if (!userLocation) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-2xl">
        <p className="text-lg text-gray-600 animate-pulse">사용자 위치를 가져오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className="relative w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl overflow-hidden"
    >
      {/* 지도 배경 (단순화된 스케치 스타일) */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%">
          {/* Roads/Paths */}
          <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="20%" y1="0" x2="20%" y2="100%" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="80%" y1="0" x2="80%" y2="100%" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2 2" />

          {/* Simple Buildings with color */}
          <rect x="10%" y="10%" width="15%" height="20%" fill="#a0aec0" stroke="#94a3b8" strokeWidth="1" />
          <rect x="70%" y="5%" width="20%" height="25%" fill="#b0c4de" stroke="#94a3b8" strokeWidth="1" />
          <rect x="5%" y="70%" width="10%" height="20%" fill="#c0d9e7" stroke="#94a3b8" strokeWidth="1" />
          <rect x="80%" y="75%" width="12%" height="15%" fill="#d0e0f0" stroke="#94a3b8" strokeWidth="1" />

          {/* Trees/Greenery */}
          <circle cx="30%" cy="40%" r="8" fill="#6b9a75" stroke="#94a3b8" strokeWidth="1" />
          <circle cx="60%" cy="70%" r="10" fill="#8bc34a" stroke="#94a3b8" strokeWidth="1" />

          {/* Central Crosshair/Target */}
          <circle cx="50%" cy="50%" r="10" fill="none" stroke="#94a3b8" strokeWidth="1" />
          <line x1="45%" y1="50%" x2="55%" y2="50%" stroke="#94a3b8" strokeWidth="1" />
          <line x1="50%" y1="45%" x2="50%" y2="55%" stroke="#94a3b8" strokeWidth="1" />
        </svg>
      </div>

      <div
        className="absolute w-full h-full"
      >
        {/* 내 위치 마커 */}
        <div
          className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: '50%', top: '50%' }}
        >
          <div className="w-5 h-5 bg-blue-500 rounded-full border-2 border-white shadow-md animate-ping-slow"></div>
          <div className="absolute top-0 left-0 w-5 h-5 bg-blue-500 rounded-full border-2 border-white shadow-md"></div>
        </div>
        <div
          className="absolute text-sm font-bold text-blue-800 transform -translate-x-1/2"
          style={{ left: '50%', top: 'calc(50% + 20px)' }}
        >
          내 위치
        </div>

        {/* 선택된 식당으로의 경로 선 */}
        {selectedRestaurant && userLocation && (() => {
          const selectedRest = restaurants.find(r => r.id === selectedRestaurant);
          const selectedRestIndex = restaurants.findIndex(r => r.id === selectedRestaurant);
          if (selectedRest && selectedRestIndex !== -1) {
            const { dx, dy } = coordsToPixelOffset(selectedRest.position.lat, selectedRest.position.lng, selectedRestIndex);
            const userX = mapRef.current ? mapRef.current.offsetWidth / 2 : 0;
            const userY = mapRef.current ? mapRef.current.offsetHeight / 2 : 0;

            return (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line
                  x1={userX}
                  y1={userY}
                  x2={userX + dx}
                  y2={userY + dy}
                  stroke="blue"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                />
              </svg>
            );
          }
          return null;
        })()}

        {/* 식당 마커들 */}
        {restaurants.map((restaurant, index) => {
          const { dx, dy } = coordsToPixelOffset(restaurant.position.lat, restaurant.position.lng, index);
          const isSelected = selectedRestaurant === restaurant.id;
          const isHovered = hoveredRestaurant === restaurant.id;
          const isFiltered = restaurant.isFiltered;
          const categoryStyle = categoryStyles[restaurant.category] || categoryStyles['한식'];
          const showBubble = isHovered || isSelected;

          return (
            <div
              key={restaurant.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `calc(50% + ${dx}px)`,
                top: `calc(50% + ${dy}px)`,
                zIndex: isSelected || isHovered ? 30 : 20,
              }}
            >
              {showBubble && (
                <div
                  className="absolute z-20 bg-white rounded-lg shadow-lg border border-gray-200 p-3 min-w-48 transform -translate-x-1/2 -translate-y-full -mt-4"
                >
                  <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
                  <div className="absolute bottom-[-9px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-9 border-r-9 border-t-9 border-l-transparent border-r-transparent border-t-gray-200 -z-10"></div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2"><span className="text-lg">{categoryStyle.emoji}</span><span className="font-bold text-gray-900">{restaurant.name}</span></div>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <div className="flex items-center gap-1"><span>⭐</span><span>{restaurant.rating}</span></div>
                      <div className="flex items-center gap-1"><span>💰</span><span>{restaurant.priceRange}</span></div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <div className="flex items-center gap-1"><span>🚶</span><span>도보 {restaurant.walkTime}분</span></div>
                      <div className="flex items-center gap-1"><span>🚗</span><span>{restaurant.driveTime}분</span></div>
                    </div>
                    {isFiltered ? (
                      <div className="text-xs text-red-600 font-medium">
                        🚫 선택: 머핀
                      </div>
                    ) : (
                      <div className="text-xs text-green-600 font-medium">✅ 모든 팀원 OK!</div>
                    )}
                  </div>
                </div>
              )}

              <button
                onClick={() => onMarkerClick(restaurant.id)}
                onMouseEnter={() => setHoveredRestaurant(restaurant.id)}
                onMouseLeave={() => setHoveredRestaurant(null)}
                className={`w-10 h-10 rounded-full border-3 border-white shadow-lg transition-all duration-300 flex items-center justify-center text-xl z-10 ${
                  isFiltered
                    ? `bg-gray-400 ${isSelected || isHovered ? 'opacity-100' : 'opacity-40'} ${isSelected ? 'animate-reveal' : ''} transition-colors duration-500`
                    : isSelected || isHovered
                      ? `${categoryStyle.color} scale-125 ring-4 ring-yellow-300`
                      : `${categoryStyle.color} hover:scale-110 cursor-pointer hover:shadow-xl`
                }`}
              >
                {isFiltered ? (isSelected ? categoryStyle.emoji : '❌') : categoryStyle.emoji}
              </button>

              <div
                className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-medium whitespace-nowrap px-2 py-1 rounded-md shadow-sm ${
                  isFiltered
                    ? 'text-gray-500 bg-gray-100'
                    : isSelected
                      ? 'text-yellow-800 bg-yellow-100 font-bold border border-yellow-300'
                      : 'text-white bg-black/70'
                }`}
              >
                {restaurant.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* 범례 (Collapsible) */}
      <Collapsible className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg max-w-xs z-40">
        <CollapsibleTrigger className="flex items-center justify-between w-full text-xs font-bold text-gray-800 mb-2">
          <span>카테고리별 마커</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {Object.entries(categoryStyles).map(([category, style]) => (
              <div key={category} className="flex items-center gap-2">
                <div className={`w-5 h-5 ${style.color} rounded-full flex items-center justify-center text-sm`}>
                  {style.emoji}
                </div>
                <span className="text-gray-700">{category}</span>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default RestaurantMap;