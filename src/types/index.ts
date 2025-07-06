
export interface Restaurant {
  id: number;
  name: string;
  category: string;
  position: {
    lat: number;
    lng: number;
  };
  rating: number;
  priceRange: string;
  walkTime: number;
  driveTime: number;
  isFiltered: boolean;
  filteredReason?: string;
  tags: string[];
}

export interface UserPreferences {
  cannotEat: string[];
  dislike: string[];
}

export interface TeamStatus {
  totalMembers: number;
  respondedMembers: number;
  location: string;
}
