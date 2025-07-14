import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { Restaurant } from '@/types';

const VoteResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedRestaurant: Restaurant | undefined = location.state?.selectedRestaurant;
  const roomId: string | undefined = location.state?.roomId;

  return (
    <div className="min-h-screen bg-primary-foreground flex flex-col items-center justify-center p-4">
      <div className="bg-card p-8 rounded-2xl shadow-xl text-center border border-secondary max-w-md w-full">
        <h1 className="text-4xl font-bold text-primary mb-4">🎉 투표 결과 🎉</h1>
        {selectedRestaurant ? (
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground">최종 선택된 식당은 바로!</p>
            <h2 className="text-5xl font-extrabold text-secondary animate-bounce">{selectedRestaurant.name}</h2>
            <p className="text-primary text-xl mt-2">모두의 선택을 축하합니다!</p>
            <Button onClick={() => navigate(`/room/${roomId}/map`)} className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground w-full">
              지도로 돌아가기
            </Button>
            <a href="https://map.naver.com/p/directions/14149036.8634414,4511194.0130168,%ED%95%9C%EA%B5%AD%EB%A3%A8%ED%84%B0%ED%9A%8C%EA%B4%80,18849796,PLACE_POI/14148634.1540515,4511134.2686962,%EB%A7%A5%EB%8F%84%EB%82%A0%EB%93%9C%20%EC%9E%A0%EC%8B%A4%EC%97%AD%EC%A0%90,33352248,PLACE_POI/-/walk?c=17.00,0,0,0,dh" target="_blank" rel="noopener noreferrer">
              <Button className="mt-2 bg-green-500 hover:bg-green-600 text-white w-full flex items-center justify-center gap-2 transform transition-transform duration-200 hover:scale-105 shadow-lg">
                <MapPin className="w-5 h-5" /> 길찾기
              </Button>
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground">선택된 식당 정보가 없습니다.</p>
            <Button onClick={() => navigate(`/room/${roomId}/map`)} className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground w-full">
              지도로 돌아가기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoteResultPage;
