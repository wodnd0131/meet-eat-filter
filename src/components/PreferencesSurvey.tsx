
import React, { useState } from 'react';
import { UserPreferences, TeamStatus } from '../types';
import { foodCategories, cuisineTypes } from '../data/restaurantData';

interface PreferencesSurveyProps {
  onComplete: (preferences: UserPreferences) => void;
}

const PreferencesSurvey: React.FC<PreferencesSurveyProps> = ({ onComplete }) => {
  const [cannotEat, setCannotEat] = useState<string[]>([]);
  const [dislike, setDislike] = useState<string[]>([]);
  
  const teamStatus: TeamStatus = {
    totalMembers: 5,
    respondedMembers: 3,
    location: '잠실역 근처'
  };

  const handleCannotEatToggle = (category: string) => {
    setCannotEat(prev => 
      prev.includes(category) 
        ? prev.filter(item => item !== category)
        : [...prev, category]
    );
  };

  const handleDislikeToggle = (category: string) => {
    setDislike(prev => 
      prev.includes(category) 
        ? prev.filter(item => item !== category)
        : [...prev, category]
    );
  };

  const handleComplete = () => {
    onComplete({ cannotEat, dislike });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="text-center">
            <div className="text-3xl mb-2">🍽️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">첫 미팅 맛집 찾기</h1>
            <p className="text-gray-600">"모두가 만족할 점심 메뉴를 찾아보세요!"</p>
          </div>
        </div>
      </div>

      {/* 팀 현황 */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">👥</span>
              <span className="font-medium text-gray-700">참여자:</span>
              <span className="font-bold text-blue-600">
                {teamStatus.respondedMembers}명 중 {teamStatus.totalMembers}명 응답 완료
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">📍</span>
            <span className="font-medium text-gray-700">위치:</span>
            <span className="text-gray-900 font-medium">{teamStatus.location}</span>
          </div>
        </div>

        {/* 못 먹는 음식 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">❌</span>
            <h2 className="text-lg font-bold text-gray-900">못 먹는 음식:</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {foodCategories.map((category) => (
              <button
                key={category.key}
                onClick={() => handleCannotEatToggle(category.key)}
                className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                  cannotEat.includes(category.key)
                    ? 'border-red-300 bg-red-50 text-red-700'
                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-red-200 hover:bg-red-50'
                }`}
              >
                <span className="text-lg">{category.emoji}</span>
                <span className="font-medium">{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 싫어하는 음식 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">😐</span>
            <h2 className="text-lg font-bold text-gray-900">싫어하는 음식:</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {cuisineTypes.map((cuisine) => (
              <button
                key={cuisine.key}
                onClick={() => handleDislikeToggle(cuisine.key)}
                className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                  dislike.includes(cuisine.key)
                    ? 'border-orange-300 bg-orange-50 text-orange-700'
                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-orange-200 hover:bg-orange-50'
                }`}
              >
                <span className="text-lg">{cuisine.emoji}</span>
                <span className="font-medium">{cuisine.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 완료 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleComplete}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-6 rounded-2xl transition-colors shadow-lg"
          >
            완료하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSurvey;
