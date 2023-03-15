import {StyleSheet} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import Favourite from './Favourite';
import AppliedJobs from './AppliedJobs';
import Profile from './Profile';

import CustomCandidateBottomTab from '../../bottomTab/CustomCandidateBottomTab';
import {StoreContext} from '../../mobx/store';

import {
  _getAppliedJobData,
  _getFavouriteJobData,
  _getHomeData,
} from '../../functions/Candidate/BottomTab';

import ProfileScreen from './ProfileScreen';
import {_getFollowingCompanyData} from '../../functions/Candidate/DFollowing';
export default function CBottomTab() {
  const Tab = createBottomTabNavigator();
  const store = useContext(StoreContext);

  useEffect(() => {
    _getFavouriteJobData(store);
    _getHomeData(store);
    _getAppliedJobData(store);
    _getFollowingCompanyData(store);

    return () => {
      // getFavouriteJobList();
      // _getData();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Home'}
      tabBar={({state, descriptors, navigation}) => (
        <CustomCandidateBottomTab
          state={state}
          descriptors={descriptors}
          navigation={navigation}
        />
      )}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Favourite" component={Favourite} />
      <Tab.Screen name="Applied Jobs" component={AppliedJobs} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
