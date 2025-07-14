import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Copy, Settings, Home, ArrowRight } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const RoomLobby = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  // Mock data for demonstration
  const roomDetails = {
    name: '점심모임',
    location: '강남역 2번 출구',
    radius: '500m',
    restaurantCount: 23,
    totalParticipants: 4,
    currentParticipants: 1,
    completedParticipants: 0,
    participants: [
      { id: '123', name: 'User1', status: '대기중' },
    ],
  };

  const handleStartFiltering = () => {
    navigate(`/room/${roomId}/filter`);
  };

  return (
    <div className="min-h-screen bg-primary-foreground flex items-center justify-center p-4">
      <div className="container mx-auto max-w-md">
        <header className="text-center my-8">
          <h1 className="text-3xl font-semibold text-primary">📍 {roomDetails.name}</h1>
          <p className="text-muted-foreground mt-2">친구들에게 방 코드를 공유해보세요!</p>
        </header>

        <div className="space-y-6">
          {/* 방 코드 공유 */}
          <div className="p-6 bg-card border-2 border-dashed border-secondary rounded-lg text-center shadow-lg">
            <p className="text-sm text-primary">방 코드</p>
            <div className="flex items-center justify-center gap-4 my-2">
              <span className="text-4xl font-bold tracking-widest text-primary">{roomId?.toUpperCase()}</span>
              <Button variant="outline" size="icon" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <Share2 className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <Copy className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* 위치 및 범위 정보 */}
          <div className="p-4 bg-card border border-secondary rounded-lg space-y-2 shadow-lg text-primary">
            <p><strong>설정된 위치:</strong> {roomDetails.location}</p>
            <p><strong>검색 범위:</strong> 반경 {roomDetails.radius} 내 식당들</p>
            <p><strong>발견된 식당:</strong> 총 {roomDetails.restaurantCount}개 식당</p>
          </div>

          {/* 실시간 참가자 현황 */}
          <div className="p-4 bg-card border border-secondary rounded-lg shadow-lg text-primary">
            <h3 className="font-semibold mb-2">방 정보</h3>
            <div className="space-y-1 text-sm">
              <p>방 이름: {roomDetails.name}</p>
              <p>참가자: {roomDetails.currentParticipants} / {roomDetails.totalParticipants}명</p>
              <p>완료: {roomDetails.completedParticipants} / {roomDetails.totalParticipants}명</p>
            </div>
            <h3 className="font-semibold mt-4 mb-2">참가자 목록</h3>
            <ul className="space-y-1 text-sm">
              {roomDetails.participants.map(p => (
                <li key={p.id} className="flex justify-between">
                  <span>{p.name}</span>
                  <span className={p.status === '대기중' ? 'text-muted-foreground' : 'text-green-500'}>
                    {p.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* 방장 권한 */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full bg-primary-foreground hover:bg-secondary/20 text-primary">
              <Settings className="w-4 h-4 mr-2" />
              위치 수정
            </Button>
            <div className="flex gap-2">
              <Button variant="secondary" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground" onClick={() => navigate('/')}>
                <Home className="w-4 h-4 mr-2" />
                메인으로
              </Button>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleStartFiltering}>
                선택 시작 <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomLobby;