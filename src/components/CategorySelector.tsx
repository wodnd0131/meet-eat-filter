
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Check } from 'lucide-react';

interface CategorySelectorProps {
  onComplete: (selectedCategories: string[]) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ onComplete }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // 대분류와 소분류 카테고리 정의
  const categoryGroups = {
    '한식': {
      emoji: '🍚',
      subcategories: ['김치찌개', '불고기', '비빔밥', '갈비', '삼겹살']
    },
    '중식': {
      emoji: '🥢',
      subcategories: ['짜장면', '짬뽕', '탕수육', '마라탕', '딤섬']
    },
    '양식': {
      emoji: '🍝',
      subcategories: ['파스타', '피자', '스테이크', '샐러드', '햄버거']
    },
    '일식': {
      emoji: '🍣',
      subcategories: ['초밥', '라멘', '돈카츠', '우동', '덮밥']
    },
    '분식': {
      emoji: '🥟',
      subcategories: ['떡볶이', '김밥', '순대', '어묵', '튀김']
    },
    '패스트푸드': {
      emoji: '🍔',
      subcategories: ['햄버거', '치킨버거', '감자튀김', '너겟', '콜라']
    },
    '치킨': {
      emoji: '🍗',
      subcategories: ['후라이드', '양념치킨', '간장치킨', '마늘치킨', '허니콤보']
    }
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(item => item !== category)
        : [...prev, category]
    );
  };

  const handleSelectAll = () => {
    const allCategories = [
      ...Object.keys(categoryGroups),
      ...Object.values(categoryGroups).flatMap(group => group.subcategories)
    ];
    
    if (selectedCategories.length === allCategories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(allCategories);
    }
  };

  const isAllSelected = () => {
    const allCategories = [
      ...Object.keys(categoryGroups),
      ...Object.values(categoryGroups).flatMap(group => group.subcategories)
    ];
    return selectedCategories.length === allCategories.length;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <div className="text-3xl mb-2">🍽️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">음식 카테고리 선택</h2>
        <p className="text-gray-600">원하는 음식 종류를 선택해주세요</p>
      </div>

      {/* 전체 선택 버튼 */}
      <div className="mb-6">
        <Button
          onClick={handleSelectAll}
          variant="outline"
          className={`w-full py-3 ${
            isAllSelected() ? 'bg-blue-50 border-blue-300 text-blue-700' : ''
          }`}
        >
          <Check className={`w-4 h-4 mr-2 ${isAllSelected() ? 'text-blue-600' : 'text-gray-400'}`} />
          전체 선택 {isAllSelected() ? '해제' : ''}
        </Button>
      </div>

      {/* 카테고리 그룹들 */}
      <div className="space-y-6">
        {Object.entries(categoryGroups).map(([mainCategory, data]) => (
          <div key={mainCategory} className="bg-white rounded-2xl p-4 shadow-sm border">
            {/* 대분류 */}
            <div className="mb-4">
              <button
                onClick={() => handleCategoryToggle(mainCategory)}
                className={`flex items-center gap-3 w-full p-3 rounded-xl border-2 transition-all ${
                  selectedCategories.includes(mainCategory)
                    ? 'border-blue-300 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-200 hover:bg-blue-50'
                }`}
              >
                <span className="text-2xl">{data.emoji}</span>
                <span className="font-bold text-lg">{mainCategory}</span>
                {selectedCategories.includes(mainCategory) && (
                  <Check className="w-5 h-5 ml-auto text-blue-600" />
                )}
              </button>
            </div>

            {/* 소분류 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 ml-4">
              {data.subcategories.map((subCategory) => (
                <button
                  key={subCategory}
                  onClick={() => handleCategoryToggle(subCategory)}
                  className={`flex items-center gap-2 p-2 rounded-lg border transition-all text-sm ${
                    selectedCategories.includes(subCategory)
                      ? 'border-green-300 bg-green-50 text-green-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-green-200 hover:bg-green-50'
                  }`}
                >
                  <span className="text-sm">{data.emoji}</span>
                  <span className="font-medium">{subCategory}</span>
                  {selectedCategories.includes(subCategory) && (
                    <Check className="w-3 h-3 ml-auto text-green-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 선택 완료 버튼 */}
      <div className="mt-8">
        <Button
          onClick={() => onComplete(selectedCategories)}
          disabled={selectedCategories.length === 0}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 text-lg"
        >
          선택 완료 ({selectedCategories.length}개 선택됨)
        </Button>
      </div>
    </div>
  );
};

export default CategorySelector;
