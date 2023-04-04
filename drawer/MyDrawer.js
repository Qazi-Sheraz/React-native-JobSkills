import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CHomeStack from '../stacks/Candidate/CHomeStack';
import CustomDrawerContent from './CustomDrawerContent';
import EDrawerContent from './EDrawerContent';
import EmployeStack from '../stacks/Employee/EmployeStack';
export default function MyDrawer() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
    drawerPosition={'right'}
        screenOptions={{headerShown: false}}
        initialRouteName={'CHomeStack'}
        drawerContent={ (props) =>
          
//  <CustomDrawerContent {...props} />
    <EDrawerContent {...props}/>
   
      
      } 
      >
        {/* <Drawer.Screen name="CHomeStack" component={CHomeStack} /> */}
        <Drawer.Screen name="EHomeStack" component={EmployeStack} />
      </Drawer.Navigator>
  );
}
