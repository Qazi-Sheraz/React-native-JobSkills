import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import JSplashScreen from '../../../customComponents/JSplashScreen';
import EFirstSplash from '../../../assets/svg/employeSplash/EFirstSplash.svg';
import ESecondSplash from '../../../assets/svg/employeSplash/E2ndSplash.svg';
import EThirdSplash from '../../../assets/svg/employeSplash/E3rdSplash.svg';
import EFourthSplash from '../../../assets/svg/employeSplash/E4thSplash.svg';
import EFifthSplash from '../../../assets/svg/employeSplash/E5thSpalsh.svg';
import ESixthSplash from '../../../assets/svg/employeSplash/E6thSplash.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';


const EFirstScreen = () => {
  const navigation = useNavigation();
  const [splashSlid, setSplashSlid] = useState(1);
  console.log(splashSlid)

  const _employerSplashShown = async () => {
    try {
      // Set 'splashShown' to 'true' in AsyncStorage
      await AsyncStorage.setItem('employerSplash', 'true');
      navigation.replace('CLogin', { type: 2 })

    } catch (error) {
      console.error('Error setting employerSplash to true in AsyncStorage: ', error);
    }
  };

  return (
    <JSplashScreen
      containerStyle={{ marginHorizontal: RFPercentage(2), }}
      heading={
        splashSlid == 1 ? 'Adding New Candidates'
          : splashSlid == 2 ? 'Resume Parsing'
            : splashSlid == 3 ? 'Predefined Assessments'
              : splashSlid == 4 ? 'Candidate Application Tracking'
                : splashSlid == 5 ? 'Job Posting with Assessments'
                  : 'Automated Interview Scheduling'
      }

      detail={
        splashSlid == 1 ? 'Normally, candidates provide their resumes when they apply to one of your jobs. You can upload resumes to add new candidates list for a job.'
          : splashSlid == 2 ? 'Resume/CV parsing software feature is designed to automate analyzing, and sorting resumes.'
            : splashSlid == 3 ? 'Employers have the option to configure predefined assessments. Predefined assessments provide Candidate Experience Insight.'
              : splashSlid == 4 ? 'How it works that if an applicant answers any of questions unsatisfactorily, the resume will be auto rejected by this feature.'
                : splashSlid == 5 ? 'Performance Assessment in Strength and Conditioning is the first step to clearly and coherently suggest candidate’s performance.'
                  : 'Deliver the Best Candidate Experience by Scheduling your Interviews with JobSkills.'
      }

      count={6}
      slide={
        splashSlid == 1 ? 1
          : splashSlid == 2 ? 2
            : splashSlid == 3 ? 3
              : splashSlid == 4 ? 4
                : splashSlid == 5 ? 5
                  : 6
      }


      svg={
        splashSlid == 1 ? <EFirstSplash />
          : splashSlid == 2 ? <ESecondSplash />
            : splashSlid == 3 ? <EThirdSplash />
              : splashSlid == 4 ? <EFourthSplash />
                : splashSlid == 5 ? <EFifthSplash />
                  : <ESixthSplash />
      }

      onSkipPress={() => { _employerSplashShown(); }}

      onNextPress={() => {
        splashSlid == 1 ? setSplashSlid(2)
          : splashSlid == 2 ? setSplashSlid(3)
            : splashSlid == 3 ? setSplashSlid(4)
              : splashSlid == 4 ? setSplashSlid(5)
                : splashSlid == 5 ? setSplashSlid(6)
                  : splashSlid == 6 && _employerSplashShown();
      }}

      onPreviousPress={() => {
        splashSlid == 6 ? setSplashSlid(5)
          : splashSlid == 5 ? setSplashSlid(4)
            : splashSlid == 4 ? setSplashSlid(3)
              : splashSlid == 3 ? setSplashSlid(2)
                : splashSlid == 2 && setSplashSlid(1)
      }}
    />
  )
}

export default EFirstScreen

const styles = StyleSheet.create({})