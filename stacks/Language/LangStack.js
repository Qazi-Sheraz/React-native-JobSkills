import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { StoreContext } from '../../mobx/store';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import LogoScreen from '../../screens/SplashScreen/LogoScreen';
import LngTranslation from '../../screens/LngTranslation/LngTranslation';
import { observer } from 'mobx-react';

const Stack = createStackNavigator();

const LangStack = () => {
    const store = useContext(StoreContext);
    const [loader, setLoader] = useState(true);
    const _getoken = token => {
        AsyncStorage.getItem(token)
          .then(res => {
            // console.log("resssssssss",res);
            store.setToken(JSON.parse(res));
            store.setUserInfo(store.token?.user);
    
            setTimeout(() => {
              setLoader(false);
            }, 5000);
          })
          .catch(error => {
            // console.log('Error in LangStack', error);
    
            setLoader(false);
          });
      };
      useEffect(() => {
        _getoken('@Login');
    
        return () => {};
      }, [loader]);


  return (
    loader === true ? (
        <LogoScreen/>
      ) : (
        <React.Fragment>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              // gestureEnabled: false,
            }}
            initialRouteName={'LngTranslation'}>
             <Stack.Screen name="LngTranslation" component={LngTranslation} />
          </Stack.Navigator>
        </React.Fragment>
      )
  )
}

export default observer(LangStack);

const styles = StyleSheet.create({})