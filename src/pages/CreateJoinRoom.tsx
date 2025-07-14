import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Users, ChevronsRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateJoinRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [participants, setParticipants] = useState('');
  const [memberCount, setMemberCount] = useState('2');
  const [joinCode, setJoinCode] = useState('');
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    // For now, we'll navigate to a fixed room ID.
    // In a real app, you'd generate a unique ID.
    navigate('/room/gangnam123');
  };

  const handleJoinRoom = () => {
    if (joinCode) {
      navigate(`/room/${joinCode}`);
    }
  };

  return (
    <div className="min-h-screen bg-primary-foreground flex items-center justify-center p-4">
      <div className="container mx-auto max-w-md">
        <header className="text-center my-8">
          <h1 className="text-5xl font-bold text-secondary">🍔</h1>
          <h2 className="text-3xl font-semibold mt-2 text-primary">음식 고민 해결사</h2>
          <p className="text-muted-foreground mt-2">주변 맛집에서 함께 먹을 음식을 정해보세요</p>
        </header>

        <div className="space-y-8">
          {/* 방 생성 섹션 */}
          <div className="p-6 bg-card border border-secondary rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-primary">새로운 밥 만들기</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-primary">어디서 먹을까요?</label>
                <div className="flex items-center gap-2 mt-1">
                  <Button variant="outline" className="flex-grow bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    현재 위치
                  </Button>
                  <Input type="search" placeholder="직접 검색" className="bg-primary-foreground" />
                </div>
                <div className="mt-2">
                  <Select defaultValue="500">
                    <SelectTrigger className="bg-primary-foreground">
                      <SelectValue placeholder="범위 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="300">반경 300m</SelectItem>
                      <SelectItem value="500">반경 500m</SelectItem>
                      <SelectItem value="1000">반경 1km</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Input 
                placeholder="방 이름 (예: 점심모임, 회식 등)" 
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="bg-primary-foreground"
              />
              <Input 
                placeholder="함께하는 사람들 (예: 회사 동료들)"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
                className="bg-primary-foreground"
              />
              <Select value={memberCount} onValueChange={setMemberCount}>
                <SelectTrigger className="bg-primary-foreground">
                  <SelectValue placeholder="인원수" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(9)].map((_, i) => (
                    <SelectItem key={i + 2} value={String(i + 2)}>
                      {i + 2}명
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleCreateRoom}>
                밥 만들기 <ChevronsRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* 방 참가 섹션 */}
          <div className="p-6 bg-card border border-secondary rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-primary">밥 참가하기</h3>
            <div className="flex items-center gap-2">
              <Input 
                placeholder="방 코드 입력 (6자리)" 
                maxLength={6}
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                className="bg-primary-foreground"
              />
              <Button onClick={handleJoinRoom} className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                참가하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateJoinRoom;