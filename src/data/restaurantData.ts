
import { Restaurant } from '../types';

export const mockRestaurants: Restaurant[] = [
  // 필터링 후 추천될 식당들 (4개)
  {
    id: 1,
    name: "본죽&비빔밥",
    category: "한식",
    position: { lat: 37.5145, lng: 127.1025 },
    rating: 4.1,
    priceRange: "6,000~9,000원",
    walkTime: 2,
    driveTime: 1,
    isFiltered: false,
    tags: ["가벼운식사", "건강한"]
  },
  {
    id: 2, 
    name: "서브웨이 잠실점",
    category: "양식",
    position: { lat: 37.5140, lng: 127.1035 },
    rating: 4.0,
    priceRange: "7,000~12,000원", 
    walkTime: 3,
    driveTime: 1,
    isFiltered: false,
    tags: ["샐러드", "샌드위치"]
  },
  {
    id: 3,
    name: "김치찌개집",
    category: "한식", 
    position: { lat: 37.5138, lng: 127.1028 },
    rating: 4.3,
    priceRange: "8,000~13,000원",
    walkTime: 4,
    driveTime: 2,
    isFiltered: false,
    tags: ["한식", "찌개"]
  },
  {
    id: 4,
    name: "파스타 하우스",
    category: "양식",
    position: { lat: 37.5147, lng: 127.1032 },
    rating: 4.2,
    priceRange: "12,000~18,000원",
    walkTime: 3,
    driveTime: 1,
    isFiltered: false,
    tags: ["파스타", "이탈리안"]
  },
  
  // 필터링된 식당들 (6개)
  {
    id: 5,
    name: "매운닭갈비",
    category: "한식",
    position: { lat: 37.5143, lng: 127.1030 },
    rating: 4.4,
    priceRange: "15,000~20,000원",
    walkTime: 3,
    driveTime: 1,
    isFiltered: true,
    filteredReason: "매운음식 제외됨",
    tags: ["매운음식", "닭갈비"]
  },
  {
    id: 6,
    name: "초밥나라",
    category: "일식",
    position: { lat: 37.5141, lng: 127.1027 },
    rating: 4.5,
    priceRange: "20,000~30,000원",
    walkTime: 4,
    driveTime: 2,
    isFiltered: true,
    filteredReason: "해산물 제외됨",
    tags: ["회", "초밥"]
  },
  {
    id: 7,
    name: "홍콩반점",
    category: "중식",
    position: { lat: 37.5144, lng: 127.1026 },
    rating: 3.9,
    priceRange: "10,000~15,000원",
    walkTime: 2,
    driveTime: 1,
    isFiltered: true,
    filteredReason: "중식 제외됨",
    tags: ["짜장면", "짬뽕"]
  },
  {
    id: 8,
    name: "맥도날드 잠실점",
    category: "패스트푸드",
    position: { lat: 37.5139, lng: 127.1033 },
    rating: 3.8,
    priceRange: "5,000~8,000원",
    walkTime: 3,
    driveTime: 1,
    isFiltered: true,
    filteredReason: "패스트푸드 제외됨",
    tags: ["햄버거", "패스트푸드"]
  },
  {
    id: 9,
    name: "BBQ치킨",
    category: "치킨",
    position: { lat: 37.5142, lng: 127.1029 },
    rating: 4.0,
    priceRange: "18,000~25,000원",
    walkTime: 3,
    driveTime: 1,
    isFiltered: true,
    filteredReason: "기름진음식 제외됨",
    tags: ["치킨", "기름진"]
  },
  {
    id: 10,
    name: "국수나무",
    category: "분식",
    position: { lat: 37.5146, lng: 127.1031 },
    rating: 4.1,
    priceRange: "7,000~11,000원",
    walkTime: 2,
    driveTime: 1,
    isFiltered: true,
    filteredReason: "분식 제외됨",
    tags: ["국수", "분식"]
  }
];

export const foodCategories = [
  { key: 'spicy', label: '매운음식', emoji: '🌶️' },
  { key: 'seafood', label: '해산물', emoji: '🦐' },
  { key: 'meat', label: '육류', emoji: '🥩' },
  { key: 'dairy', label: '유제품', emoji: '🥛' },
  { key: 'nuts', label: '견과류', emoji: '🥜' },
  { key: 'gluten', label: '글루텐', emoji: '🌾' }
];

export const cuisineTypes = [
  { key: 'chinese', label: '중식', emoji: '🥢' },
  { key: 'japanese', label: '일식', emoji: '🍣' },
  { key: 'western', label: '양식', emoji: '🍝' },
  { key: 'korean', label: '한식', emoji: '🍚' },
  { key: 'snack', label: '분식', emoji: '🥟' },
  { key: 'fastfood', label: '패스트푸드', emoji: '🍔' }
];
