import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CHomeStack from '../stacks/Candidate/CHomeStack';
import CustomDrawerContent from './CustomDrawerContent';
import EDrawerContent from './EDrawerContent';
import EmployeStack from '../stacks/Employee/EmployeStack';
import {StoreContext} from '../mobx/store';
import {useContext} from 'react';

export default function MyDrawer() {

  const store = useContext(StoreContext);
  const Drawer = createDrawerNavigator();

  return (
    
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: store.lang.id == 0 ? 'left' : 'right',
      }}
      initialRouteName={'CHomeStack'}
      drawerContent={props => (
        //  <CustomDrawerContent {...props} />
        <EDrawerContent {...props} />
      )}>
      {/* <Drawer.Screen name="CHomeStack" component={CHomeStack} /> */}
      <Drawer.Screen name="EHomeStack" component={EmployeStack} />
    </Drawer.Navigator>
  );
}
