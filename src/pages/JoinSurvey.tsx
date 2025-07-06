
import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Share, Copy } from 'lucide-react';
import QRCodeGenerator from '../components/QRCodeGenerator';
import CategorySelector from '../components/CategorySelector';

const JoinSurvey = () => {
  const [showCategorySelector, setShowCategorySelector] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const shareUrl = window.location.origin + '/join-survey';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '첫 미팅 맛집 찾기',
          text: '함께 맛집을 찾아보세요!',
          url: shareUrl
        });
      } catch (error) {
        console.log('공유 취소됨');
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('링크가 클립보드에 복사되었습니다!');
    } catch (error) {
      console.error('링크 복사 실패:', error);
    }
  };

  const handleCategoryComplete = (categories: string[]) => {
    setSelectedCategories(categories);
    // 여기서 실제로는 다음 단계로 이동하거나 데이터를 저장
    console.log('선택된 카테고리:', categories);
  };

  if (showCategorySelector) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <button
              onClick={() => setShowCategorySelector(false)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              <span>←</span>
              <span>뒤로가기</span>
            </button>
          </div>
        </div>
        <CategorySelector onComplete={handleCategoryComplete} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="text-center">
            <div className="text-4xl mb-3">👥</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">첫 미팅 맛집 찾기</h1>
            <p className="text-gray-600">팀원들과 함께 완벽한 맛집을 찾아보세요!</p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* 참여 방법 안내 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="text-center mb-6">
            <div className="text-2xl mb-2">🔗</div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">참여 방법</h2>
            <p className="text-gray-600 text-sm">
              아래 링크나 QR 코드를 공유하여<br />
              팀원들을 초대하세요
            </p>
          </div>

          {/* QR 코드 */}
          <div className="flex justify-center mb-6">
            <QRCodeGenerator value={shareUrl} size={180} />
          </div>

          {/* 공유 버튼들 */}
          <div className="space-y-3">
            <Button
              onClick={handleShare}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3"
            >
              <Share className="w-4 h-4 mr-2" />
              링크 공유하기
            </Button>
            
            <Button
              onClick={handleCopyLink}
              variant="outline"
              className="w-full py-3"
            >
              <Copy className="w-4 h-4 mr-2" />
              링크 복사하기
            </Button>
          </div>

          {/* 공유 링크 표시 */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">공유 링크:</p>
            <p className="text-sm text-gray-700 break-all font-mono">
              {shareUrl}
            </p>
          </div>
        </div>

        {/* 설문 시작 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="text-center mb-4">
            <div className="text-2xl mb-2">🍽️</div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">설문 시작하기</h2>
            <p className="text-gray-600 text-sm">
              음식 취향을 선택하고<br />
              완벽한 맛집을 찾아보세요
            </p>
          </div>

          <Button
            onClick={() => setShowCategorySelector(true)}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 text-lg"
          >
            설문 시작하기
          </Button>
        </div>

        {/* 참여 현황 (예시) */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">👥</span>
              <span className="font-medium text-gray-700">참여 현황:</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-blue-600">3명</span>
              <span className="text-gray-500 text-sm"> / 5명</span>
            </div>
          </div>
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">60% 완료</p>
        </div>
      </div>
    </div>
  );
};

export default JoinSurvey;
