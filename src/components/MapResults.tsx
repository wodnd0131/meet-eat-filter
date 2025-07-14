
import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Restaurant } from '../types';
import RestaurantCard from './RestaurantCard';
import RestaurantMap from './RestaurantMap';
import { getAvailableRestaurantsCount } from '../utils/filterUtils';
import { Button } from './ui/button';
import { List, X } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

const MapResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const restaurants: Restaurant[] = useMemo(() => location.state?.restaurants || [], [location.state?.restaurants]);

  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null);
  const [showList, setShowList] = useState(false);
  const [isVotingModalOpen, setIsVotingModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10); // 10초 시간 제한
  const [hasVoted, setHasVoted] = useState(false); // 사용자의 투표 여부
  const [voteResults, setVoteResults] = useState<{ agree: number; disagree: number }>({ agree: 0, disagree: 0 });
  const { toast } = useToast();
  
  const availableCount = useMemo(() => getAvailableRestaurantsCount(restaurants), [restaurants]);
  const availableRestaurants = useMemo(() => restaurants.filter(r => !r.isFiltered), [restaurants]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isVotingModalOpen) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timer);
            // 투표 종료 처리
            const selectedRest = restaurants.find(r => r.id === selectedRestaurant);
            if (voteResults.agree > voteResults.disagree) {
              toast({
                title: "🎉 투표 성공!",
                description: `${selectedRest?.name} 이(가) 최종 선택되었습니다!`, 
              });
              navigate(`/room/${location.state?.roomId}/result`, { state: { selectedRestaurant: selectedRest, roomId: location.state?.roomId } });
            } else {
              toast({
                title: "😅 투표 실패",
                description: "아쉽지만 다른 식당을 찾아봐야겠어요.",
                variant: "destructive",
              });
              setIsVotingModalOpen(false);
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isVotingModalOpen, selectedRestaurant, restaurants, navigate, toast, location.state?.roomId, voteResults.agree, voteResults.disagree]);

  useEffect(() => {
    if (!isVotingModalOpen) {
      setTimeLeft(10);
      setHasVoted(false);
      setVoteResults({ agree: 0, disagree: 0 });
    }
  }, [isVotingModalOpen]);

  const handleMarkerClick = (restaurantId: number) => {
    if (selectedRestaurant === restaurantId) {
      setSelectedRestaurant(null);
    } else {
      const restaurant = restaurants.find(r => r.id === restaurantId);
      if (restaurant && !restaurant.isFiltered) {
        setSelectedRestaurant(restaurantId);
        toast({
          title: `${restaurant.name} 선택됨`,
          description: "마커에 마우스를 올리면 상세 정보를 볼 수 있어요!",
        });
      }
    }
  };

  const handleCardClick = (restaurantId: number) => {
    if (selectedRestaurant === restaurantId) {
      setSelectedRestaurant(null);
    } else {
      const restaurant = restaurants.find(r => r.id === restaurantId);
      if (restaurant && !restaurant.isFiltered) {
        setSelectedRestaurant(restaurantId);
        toast({
          title: `${restaurant.name} 선택됨`,
          description: "마커에 마우스를 올리면 상세 정보를 볼 수 있어요!",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 헤더 */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
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
        <div className={`${showList ? 'lg:w-3/5' : 'w-full'} h-[500px] lg:h-auto transition-all duration-300`}>
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

      
    {selectedRestaurant && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <Button onClick={() => setIsVotingModalOpen(true)} className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg">
            선택된 식당 투표 시작
          </Button>
        </div>
      )}

      <Dialog open={isVotingModalOpen} onOpenChange={setIsVotingModalOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-2xl shadow-xl bg-gradient-to-br from-yellow-100 to-orange-100 p-6 border-2 border-yellow-300">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
              <span className="text-3xl">🗳️</span>
              <span>{restaurants.find(r => r.id === selectedRestaurant)?.name} 투표</span>
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-2">
              이 식당에 대해 찬성 또는 반대 투표를 해주세요!
            </DialogDescription>
          </DialogHeader>
          
          <div className="text-center my-4">
            <img src="/meet-eat-filter/asset/image/수제버거.png" alt="수제버거" className="mx-auto mb-4 w-128 h-128 object-contain rounded-lg" />
            <div className="text-5xl font-extrabold text-primary animate-pulse">{timeLeft}</div>
            <p className="text-sm text-muted-foreground">남은 시간</p>
          </div>

          <div className="flex justify-around my-4">
            <Button 
              className="bg-green-500 hover:bg-green-600 text-white text-lg px-6 py-3 rounded-full shadow-md transition-all duration-200 transform hover:scale-105"
              onClick={() => {
                setVoteResults(prev => ({ ...prev, agree: prev.agree + 1 }));
                setHasVoted(true);
              }}
              disabled={timeLeft === 0 || hasVoted}
            >
              👍 찬성 ({voteResults.agree})
            </Button>
            <Button 
              className="bg-red-500 hover:bg-red-600 text-white text-lg px-6 py-3 rounded-full shadow-md transition-all duration-200 transform hover:scale-105"
              onClick={() => {
                setVoteResults(prev => ({ ...prev, disagree: prev.disagree + 1 }));
                setHasVoted(true);
              }}
              disabled={timeLeft === 0 || hasVoted}
            >
              👎 반대 ({voteResults.disagree})
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground mt-4">
            <p>참여자: {hasVoted ? "나" : "없음"}</p>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsVotingModalOpen(false)} className="w-full bg-white hover:bg-gray-50 text-gray-700 rounded-full">
              닫기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MapResults;
