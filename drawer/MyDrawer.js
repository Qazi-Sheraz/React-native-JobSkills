import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CHomeStack from '../stacks/Candidate/CHomeStack';
import CustomDrawerContent from './CustomDrawerContent';
import EDrawerContent from './EDrawerContent';
import EmployeStack from '../stacks/Employee/EmployeStack';
import {StoreContext} from '../mobx/store';
import {useContext} from 'react';
import AuthStack from '../stacks/Auth/AuthStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Observer } from 'mobx-react';

export default function MyDrawer() {

  const store = useContext(StoreContext);
  const Drawer = createDrawerNavigator();
 


  return (
    <Observer>
    {() => (

    !store.token ?
    
    <AuthStack/>
    :

    
    store.token?.user?.owner_type.includes('Candidate') ?

    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: store.lang.id == 0 ? 'left' : 'right',
      }}
      initialRouteName={'CHome'}
      drawerContent={props => (
         <CustomDrawerContent {...props} />
        // <EDrawerContent {...props} />
      )}>
      <Drawer.Screen name="CHomeStack" component={CHomeStack} />
     
    </Drawer.Navigator>
    :
    <Drawer.Navigator
    screenOptions={{
      headerShown: false,
      drawerPosition: store.lang.id == 0 ? 'left' : 'right',
    }}
    initialRouteName={'CHome'}
    drawerContent={props => (
      //  <CustomDrawerContent {...props} />
      <EDrawerContent {...props} />
    )}>
    {/* <Drawer.Screen name="CHomeStack" component={CHomeStack} /> */}
    <Drawer.Screen name="EHomeStack" component={EmployeStack} />
  </Drawer.Navigator>
    )}
  </Observer>
  );
}
