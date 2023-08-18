import React, {useEffect} from 'react';
import {StoreProvider} from './mobx/store';
import {NavigationContainer} from '@react-navigation/native';
import MyDrawer from './drawer/MyDrawer';
import {MenuProvider} from 'react-native-popup-menu';
import { Alert, LogBox } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {linking} from './linking';
import FlashMessage from 'react-native-flash-message';

export default function App() {

 
        
  // Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();
  return (
    <StoreProvider>
      <NavigationContainer
        linking={linking}
        //fallback={<ActivityIndicator color={colors.primary[0]} size="small" />}
      >
        <MenuProvider>
          <MyDrawer />
          {/* <Toast/> */}
          <FlashMessage position="top" />
        </MenuProvider>
      </NavigationContainer>
    </StoreProvider>
  );
}

