import React from 'react';
import JSplashScreen from '../../../customComponents/JSplashScreen';

export default function SecondScreen() {
  return (
    <JSplashScreen
      heading={'The ability to build detailed candidate profiles'}
      detail={
        'JobSkills Engine will capture all relevant information about a candidate when they apply.'
      }
      slide={2}
      img={require('../../../assets/images/splash/s_second.png')}
      onSkipPress={() => alert('onSkipPress')}
      onNextPress={() => alert('onNextPress')}
      onPreviousPress={() => alert('onPreviousPress')}
    />
  );
}
