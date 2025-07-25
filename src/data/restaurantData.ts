
import { Restaurant } from '../types';

export const mockRestaurants: Restaurant[] = [
  // 한식
  {
    id: 1,
    name: "백종원의 본가",
    category: "한식",
    position: { lat: 37.4979, lng: 127.0276 },
    rating: 4.5,
    priceRange: 2,
    walkTime: 5,
    isFiltered: false,
    tags: ["고기", "회식"],
    distance: 400,
    isOpen: '영업 중',
  },
  {
    id: 2,
    name: "한솥도시락 강남역점",
    category: "한식",
    position: { lat: 37.4985, lng: 127.0288 },
    rating: 4.1,
    priceRange: 1,
    walkTime: 3,
    isFiltered: false,
    tags: ["도시락", "간편식"],
    distance: 250,
    isOpen: '영업 중',
  },
  {
    id: 3,
    name: "설렁탕집 본점",
    category: "한식",
    position: { lat: 37.4971, lng: 127.0271 },
    rating: 4.3,
    priceRange: 2,
    walkTime: 7,
    isFiltered: false,
    tags: ["국밥", "해장"],
    distance: 600,
    isOpen: '영업 종료',
  },

  // 중식
  {
    id: 4,
    name: "홍콩반점0410 강남역점",
    category: "중식",
    position: { lat: 37.4982, lng: 127.0270 },
    rating: 4.0,
    priceRange: 1,
    walkTime: 4,
    isFiltered: false,
    tags: ["짜장면", "짬뽕"],
    distance: 350,
    isOpen: '영업 중',
  },
  {
    id: 5,
    name: "딘타이펑 강남점",
    category: "중식",
    position: { lat: 37.4999, lng: 127.0289 },
    rating: 4.6,
    priceRange: 3,
    walkTime: 8,
    isFiltered: false,
    tags: ["딤섬", "우육면"],
    distance: 750,
    isOpen: '브레이크 타임',
  },

  // 일식
  {
    id: 6,
    name: "스시마이우 강남점",
    category: "일식",
    position: { lat: 37.4975, lng: 127.0265 },
    rating: 4.4,
    priceRange: 2,
    walkTime: 6,
    isFiltered: false,
    tags: ["초밥", "회전초밥"],
    distance: 550,
    isOpen: '영업 중',
  },
  {
    id: 7,
    name: "아비꼬 강남역점",
    category: "일식",
    position: { lat: 37.4988, lng: 127.0295 },
    rating: 4.2,
    priceRange: 2,
    walkTime: 2,
    isFiltered: false,
    tags: ["카레", "돈까스"],
    distance: 150,
    isOpen: '영업 중',
  },

  // 양식
  {
    id: 8,
    name: "쉐이크쉑 강남점",
    category: "양식",
    position: { lat: 37.4990, lng: 127.0278 },
    rating: 4.3,
    priceRange: 2,
    walkTime: 5,
    isFiltered: false,
    tags: ["햄버거", "수제버거"],
    distance: 450,
    isOpen: '영업 중',
  },
  {
    id: 9,
    name: "어글리스토브 강남역점",
    category: "양식",
    position: { lat: 37.4970, lng: 127.0280 },
    rating: 4.5,
    priceRange: 3,
    walkTime: 8,
    isFiltered: false,
    tags: ["파스타", "스테이크"],
    distance: 700,
    isOpen: '영업 중',
  },

  // 기타
  {
    id: 10,
    name: "샐러디 강남역점",
    category: "기타",
    position: { lat: 37.4981, lng: 127.0291 },
    rating: 4.7,
    priceRange: 1,
    walkTime: 1,
    isFiltered: false,
    tags: ["샐러드", "건강식"],
    distance: 100,
    isOpen: '영업 중',
  },
  {
    id: 11,
    name: "타코벨 강남역점",
    category: "기타",
    position: { lat: 37.4977, lng: 127.0269 },
    rating: 4.0,
    priceRange: 1,
    walkTime: 5,
    isFiltered: false,
    tags: ["타코", "멕시칸"],
    distance: 500,
    isOpen: '영업 종료',
  },
];
