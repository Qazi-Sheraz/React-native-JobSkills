import React from 'react';
import JSplashScreen from '../../../customComponents/JSplashScreen';

export default function FirstScreen() {
  return (
    <JSplashScreen
      heading={'Automated personalised communication'}
      detail={
        'Automation makes life easier. This feature helps keep the candidate informed of where their application is heading.'
      }
      slide={1}
      img={require('../../../assets/images/splash/s_first.png')}
      onSkipPress={() => alert('onSkipPress')}
      onNextPress={() => alert('onNextPress')}
      onPreviousPress={() => alert('onPreviousPress')}
    />
  );
}
