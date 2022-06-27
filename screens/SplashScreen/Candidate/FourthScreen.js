import JSplashScreen from '../../../customComponents/JSplashScreen';
import React from 'react';

export default function FourthScreen() {
  return (
    <JSplashScreen
      heading={'Resume Parsing'}
      detail={
        'Resume/CV parsing software feature is designed to automate collecting, analysing, and sorting resumes.'
      }
      slide={4}
      img={require('../../../assets/images/splash/s_fourth.png')}
      onSkipPress={() => alert('onSkipPress')}
      onNextPress={() => alert('onNextPress')}
      onPreviousPress={() => alert('onPreviousPress')}
    />
  );
}
