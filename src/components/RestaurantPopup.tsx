
import React from 'react';
import { Restaurant } from '../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Share } from 'lucide-react';

interface RestaurantPopupProps {
  restaurant: Restaurant | null;
  isOpen: boolean;
  onClose: () => void;
  onShare: (restaurant: Restaurant) => void;
}

const RestaurantPopup: React.FC<RestaurantPopupProps> = ({ 
  restaurant, 
  isOpen, 
  onClose, 
  onShare 
}) => {
  if (!restaurant) return null;

  const getCategoryEmoji = (category: string) => {
    const emojiMap: { [key: string]: string } = {
      '한식': '🍚',
      '양식': '🍝',
      '중식': '🥢',
      '일식': '🍣',
      '분식': '🥟',
      '패스트푸드': '🍔',
      '치킨': '🍗'
    };
    return emojiMap[category] || '🍽️';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-2xl">{getCategoryEmoji(restaurant.category)}</span>
            {restaurant.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* 기본 정보 */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <span>⭐</span>
              <span className="font-medium">{restaurant.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>💰</span>
              <span>{restaurant.priceRange}</span>
            </div>
          </div>
          
          {/* 거리 정보 */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <span>🚶</span>
              <span>도보 {restaurant.walkTime}분</span>
            </div>
            <div className="flex items-center gap-1">
              <span>🚗</span>
              <span>{restaurant.driveTime}분</span>
            </div>
          </div>
          
          {/* 상태 */}
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold text-sm">✅ 모든 팀원 OK!</span>
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
          
          {/* 공유 버튼 */}
          <div className="pt-4 border-t">
            <Button 
              onClick={() => onShare(restaurant)}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold"
            >
              <Share className="w-4 h-4 mr-2" />
              이 식당 공유하기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RestaurantPopup;
