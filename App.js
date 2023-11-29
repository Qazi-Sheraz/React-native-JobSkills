import {
  LogBox,
  ActivityIndicator,
} from 'react-native';
import React, { useContext } from 'react';
import { linking } from './linking';
import colors from './config/colors';
import MyDrawer from './drawer/MyDrawer';
import { StoreContext, StoreProvider } from './mobx/store';
import FlashMessage from 'react-native-flash-message';
import { MenuProvider } from 'react-native-popup-menu';
import { NavigationContainer } from '@react-navigation/native';
import { RFPercentage } from 'react-native-responsive-fontsize';


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
          <FlashMessage position="top" statusBarHeight={RFPercentage(3.5)} />
        </MenuProvider>
      </NavigationContainer>
    </StoreProvider>
  );
}

