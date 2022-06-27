import React from 'react';
import {StoreProvider} from './mobx/store';
import {NavigationContainer} from '@react-navigation/native';
import MyDrawer from './drawer/MyDrawer';
import {MenuProvider} from 'react-native-popup-menu';
import Login from './screens/Login/Login';
import Toast from 'react-native-toast-message';
import Home from './screens/Home/Home';
export default function App() {
  return (
    <StoreProvider>
      <NavigationContainer>
        <MenuProvider>
          <MyDrawer />

          {/* <Login /> */}
          <Toast />
        </MenuProvider>
      </NavigationContainer>
    </StoreProvider>
  );
}
