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
import { useContext } from 'react';
import { StoreContext } from '../../../mobx/store';


const EFirstScreen = () => {
  const navigation = useNavigation();
  const [splashSlid, setSplashSlid] = useState(1);
  console.log(splashSlid)
const store=useContext(StoreContext)
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
        splashSlid == 1 ? store.lang.Adding_New_Candidates
          : splashSlid == 2 ?store.lang.Resume_Parsing
            : splashSlid == 3 ?store.lang.Predefined_Assessments 
              : splashSlid == 4 ?store.lang.Candidate_Application_Tracking 
                : splashSlid == 5 ?store.lang.Job_Posting_with_Assessments 
                  : store.lang.Automated_Interview_Scheduling
      }

      detail={
        splashSlid == 1 ?store.lang.Normally_candidates_provide_their_resumes 
          : splashSlid == 2 ?store.lang.Resume_CV_parsing_software_feature
            : splashSlid == 3 ?store.lang.Employers_have_the_option_to_onfigure_predefined_assessments 
              : splashSlid == 4 ? store.lang.How_it_works_that_if_an_applicant
                : splashSlid == 5 ?store.lang.Performance_Assessment_in_Strength_and_Conditioning 
                  :store.lang.Deliver_the_Best_Candidate_Experience_by_Scheduling_your_Interviews_with_JobSkills 
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