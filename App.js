import React, {useEffect} from 'react';
import {StoreProvider} from './mobx/store';
import {NavigationContainer} from '@react-navigation/native';
import MyDrawer from './drawer/MyDrawer';
import {MenuProvider} from 'react-native-popup-menu';
import { ActivityIndicator, Alert, LogBox } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {linking} from './linking';
import FlashMessage from 'react-native-flash-message';
import { RFPercentage } from 'react-native-responsive-fontsize';
import JScreen from './customComponents/JScreen';
import JGradientScreen from './customComponents/JGradientScreen';
import colors from './config/colors';
import { Linking } from 'react-native';
import { LoginManager } from 'react-native-fbsdk-next';

// Set login behavior (optional)
// LoginManager.setLoginBehavior('native_only');
export default function App() {

  // Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();
  return (
    <StoreProvider>
      <NavigationContainer
        linking={linking}
        fallback={<ActivityIndicator color={colors.primary[0]} size="small" />}
      >
        <MenuProvider>
          <MyDrawer />
          <FlashMessage position="top"  statusBarHeight={RFPercentage(3.5)} />
        </MenuProvider>
      </NavigationContainer>
    </StoreProvider>
  );
}

