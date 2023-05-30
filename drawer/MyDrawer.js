import React, { useEffect, useState } from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CHomeStack from '../stacks/Candidate/CHomeStack';
import CustomDrawerContent from './CustomDrawerContent';
import EDrawerContent from './EDrawerContent';
import EmployeStack from '../stacks/Employee/EmployeStack';
import {StoreContext} from '../mobx/store';
import {useContext} from 'react';
import AuthStack from '../stacks/Auth/AuthStack';
import { Observer } from 'mobx-react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyDrawer() {

  const store = useContext(StoreContext);
  const Drawer = createDrawerNavigator();
  const[loader,setLoader]=useState(true);

    const _getLang = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('selectedLanguage');
        if (storedLanguage) {
          // Set the stored language in the store or wherever you need to use it
          if (storedLanguage === 'English (United Kingdom)') {
            store.setLang('en');
          } else if (storedLanguage === 'اردو') {
            store.setLang('ur');
          } else if (storedLanguage === 'العربية') {
            store.setLang('ar');
          }
        }
      } catch (error) {
        console.log('Error retrieving stored language:', error);
      } finally {
        setLoader(false);
  };};
  useEffect(() => {
    _getLang('@lang');
    return () => {};
  }, []);
 

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
