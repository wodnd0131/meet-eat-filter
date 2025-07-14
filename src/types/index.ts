
export interface Restaurant {
  id: number;
  name: string;
  category: string;
  position: {
    lat: number;
    lng: number;
  };
  rating: number;
  priceRange: number;
  walkTime: number;
  isFiltered: boolean;
  isLiked: boolean;
  filteredReason?: string;
  filteredBy?: string[];
  tags: string[];
  distance: number;
  isOpen: '영업 중' | '영업 종료' | '브레이크 타임';
}

export interface Participant {
  id: string;
  name: string;
  status: '대기중' | '선택완료';
}

export interface Room {
  id: string;
  name: string;
  location: string;
  radius: number;
  participants: Participant[];
  restaurants: Restaurant[];
  status: 'waiting' | 'filtering' | 'finished';
}
