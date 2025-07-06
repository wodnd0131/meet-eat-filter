
import React, { useState } from 'react';
import PreferencesSurvey from '../components/PreferencesSurvey';
import MapResults from '../components/MapResults';
import { UserPreferences } from '../types';
import { mockRestaurants } from '../data/restaurantData';
import { filterRestaurants } from '../utils/filterUtils';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'survey' | 'results'>('survey');
  const [filteredRestaurants, setFilteredRestaurants] = useState(mockRestaurants);

  const handleSurveyComplete = (preferences: UserPreferences) => {
    console.log('User preferences:', preferences);
    const filtered = filterRestaurants(mockRestaurants, preferences);
    console.log('Filtered restaurants:', filtered);
    setFilteredRestaurants(filtered);
    setCurrentStep('results');
  };

  const handleBackToSurvey = () => {
    setCurrentStep('survey');
  };

  return (
    <>
      {currentStep === 'survey' ? (
        <PreferencesSurvey onComplete={handleSurveyComplete} />
      ) : (
        <MapResults 
          restaurants={filteredRestaurants} 
          onBack={handleBackToSurvey}
        />
      )}
    </>
  );
};

export default Index;
