import React, { useEffect, useState } from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CHomeStack from '../stacks/Candidate/CHomeStack';
import CustomDrawerContent from './CustomDrawerContent';
// import EDrawerContent from './EDrawerContent';
import EmployeStack from '../stacks/Employee/EmployeStack';
import {StoreContext} from '../mobx/store';
import {useContext} from 'react';
import AuthStack from '../stacks/Auth/AuthStack';
import { Observer } from 'mobx-react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LangStack from '../stacks/Language/LangStack';
import EAccountSetting from '../escreen/edrawer/EAccountSetting';

export default function MyDrawer() {

  const store = useContext(StoreContext);
  const Drawer = createDrawerNavigator();
  const[loader,setLoader]=useState(true);


    const _getLang = async () => {
      try {

        const _store=await AsyncStorage.multiGet(['selectedLanguage','splash'])
        // console.log(_store[0][1])
        // console.log(_store[1][1])
        _store[0][1] != null ? store?.setLang(_store[0][1]) :store?.setLang('en')
        _store[1][1] != null ? store?.setLangType(_store[1][1]) :store?.setLangType('false')
    
      } catch (error) {
        // console.log('Error retrieving stored language:', error);
      } finally {
        setLoader(false);
      }
    };
  useEffect(() => {
    _getLang('selectedLanguage');
    return () => {};
  }, []);
  
  
   
  return (
    <Observer>
      {() =>
        store.langType == 'false' && !store?.token ? (
          <LangStack />

        ) : store.langType == 'true' && !store?.token ? (
          <AuthStack />
        ) 
        : store.token?.user?.owner_type.includes('Candidate') ? (
          <Drawer.Navigator
            screenOptions={{
              headerShown: false,
              // drawerPosition: store.lang.id == 0 ? 'left' : 'right',
            }}
            initialRouteName={'CHome'}
            drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="CHomeStack" component={CHomeStack} />
            
          </Drawer.Navigator>
        ) : (
          <Drawer.Navigator
            screenOptions={{
              headerShown: false,
              // drawerPosition: store.lang.id == 0 ? 'left' : 'right',
            }}
            initialRouteName={'CHome'}
            drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="EHomeStack" component={EmployeStack} />
          </Drawer.Navigator>
        )
      }
    </Observer>
  );
}
