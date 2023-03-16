import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CHomeStack from '../stacks/Candidate/CHomeStack';
import CustomDrawerContent from './CustomDrawerContent';
import EmployeStack from '../stacks/Employee/EmployeStack';
export default function MyDrawer() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'CHomeStack'}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {/* <Drawer.Screen name="CHomeStack" component={CHomeStack} /> */}
      <Drawer.Screen name="EHomeStack" component={EmployeStack} />
    </Drawer.Navigator>
  );
}
