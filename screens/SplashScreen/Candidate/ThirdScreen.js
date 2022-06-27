import JSplashScreen from '../../../customComponents/JSplashScreen';
import React from 'react';

export default function ThirdScreen() {
  return (
    <JSplashScreen
      heading={'Automated Interview Scheduling'}
      detail={
        'Deliver the Best Candidate Experience by Scheduling your Interviews with JobSkills.'
      }
      slide={3}
      img={require('../../../assets/images/splash/s_third.png')}
      onSkipPress={() => alert('onSkipPress')}
      onNextPress={() => alert('onNextPress')}
      onPreviousPress={() => alert('onPreviousPress')}
    />
  );
}
