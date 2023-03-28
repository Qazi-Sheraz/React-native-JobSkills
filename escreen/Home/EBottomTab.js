import {StyleSheet} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CustomCandidateBottomTab from '../../bottomTab/CustomCandidateBottomTab';
import {StoreContext} from '../../mobx/store';
import Home from './Home';
import Meeting from './Meeting';
import Job from './Job';
import Profile from './Profile';
import CustomEmployeeBottomTab from '../../bottomTab/CustomEmployeeBottomTab';

export default function EBottomTab() {
  const Tab = createBottomTabNavigator();
  const store = useContext(StoreContext);

  useEffect(() => {
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
      initialRouteName={'Job'}
      tabBar={({state, descriptors, navigation}) => (
        <CustomEmployeeBottomTab
          state={state}
          descriptors={descriptors}
          navigation={navigation}
        />
      )}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Meeting" component={Meeting} />
      <Tab.Screen name="Job" component={Job} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
