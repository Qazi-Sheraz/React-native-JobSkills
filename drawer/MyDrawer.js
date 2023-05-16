import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CHomeStack from '../stacks/Candidate/CHomeStack';
import CustomDrawerContent from './CustomDrawerContent';
import EDrawerContent from './EDrawerContent';
import EmployeStack from '../stacks/Employee/EmployeStack';
import {StoreContext} from '../mobx/store';
import {useContext} from 'react';
import AuthStack from '../stacks/Auth/AuthStack';
import { Observer } from 'mobx-react';

export default function MyDrawer() {

  const store = useContext(StoreContext);
  const Drawer = createDrawerNavigator();
 

  return (
    <Observer>
    {() => (

    !store?.token ?
    
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
  
      <EDrawerContent {...props} />
    )}>
    
    <Drawer.Screen name="EHomeStack" component={EmployeStack} />
  </Drawer.Navigator>
    )}
  </Observer>
  );
}
