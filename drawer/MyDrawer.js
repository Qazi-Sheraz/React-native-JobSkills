import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CHomeStack from '../stacks/Candidate/CHomeStack';
import CustomDrawerContent from './CustomDrawerContent';
export default function MyDrawer() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'CHomeStack'}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="CHomeStack" component={CHomeStack} />
    </Drawer.Navigator>
  );
}
