import React, { useState, useContext } from 'react';
import JSplashScreen from '../../../customComponents/JSplashScreen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { StoreContext } from '../../../mobx/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationActions } from '@react-navigation/core';
import FirstSplash from '../../../assets/svg/jobSeekerSplash/CFirstSplash.svg'
import SecondSplash from '../../../assets/svg/jobSeekerSplash/C2ndSplash.svg'
import ThirdSplash from '../../../assets/svg/jobSeekerSplash/C3rdSplash.svg'
import FourthSplash from '../../../assets/svg/jobSeekerSplash/C4thSplash.svg'
export default function FirstScreen() {
  const store = useContext(StoreContext);
  const navigation = useNavigation();
  const [splashSlid, setSplashSlid] = useState(1);
  console.log(splashSlid)

  const _setSplashShown = async () => {
    try {
      // Set 'splashShown' to 'true' in AsyncStorage
      await AsyncStorage.setItem('splashShown', 'true');
      navigation.replace('CLogin', { type: 1 })

    } catch (error) {
      console.error('Error setting splashShown to true in AsyncStorage: ', error);
    }
  };

  return (
    <JSplashScreen
      containerStyle={{ marginHorizontal: RFPercentage(2), }}
      heading={
        splashSlid == 1 ? 'Automated personalised communication'
          : splashSlid == 2 ? 'The ability to build detailed candidate profiles'
            : splashSlid == 3 ? 'Automated Interview Scheduling'
              : 'Resume Parsing'
      }
      detail={
        splashSlid == 1 ? 'Automation makes life easier. This feature helps keep the candidate informed of where their application is heading.'
          : splashSlid == 2 ? 'JobSkills Engine will capture all relevant information about a candidate when they apply.'
            : splashSlid == 3 ? 'Deliver the Best Candidate Experience by Scheduling your Interviews with JobSkills.'
              : 'Resume/CV parsing software feature is designed to automate collecting, analysing, and sorting resumes.'
      }

      count={4}

      slide={
        splashSlid == 1 ? 1
          : splashSlid == 2 ? 2
            : splashSlid == 3 ? 3
              : 4}

      svg={
        splashSlid == 1 ? <FirstSplash />
          : splashSlid == 2 ? <SecondSplash />
            : splashSlid == 3 ? <ThirdSplash />
              : <FourthSplash />
      }
      onSkipPress={() => { _setSplashShown(); }}
      onNextPress={() => {
        splashSlid == 1 ? setSplashSlid(2)
          : splashSlid == 2 ? setSplashSlid(3)
            : splashSlid == 3 ? setSplashSlid(4)
              : splashSlid == 4 && _setSplashShown();
      }}
      onPreviousPress={() => {
        splashSlid == 4 ? setSplashSlid(3)
          : splashSlid == 3 ? setSplashSlid(2)
            : splashSlid == 2 ? setSplashSlid(1)
              : alert('')
      }}
    />

  );
}
