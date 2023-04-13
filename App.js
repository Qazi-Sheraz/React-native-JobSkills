import React, {useEffect} from 'react';
import {StoreProvider} from './mobx/store';
import {NavigationContainer} from '@react-navigation/native';
import MyDrawer from './drawer/MyDrawer';
import {MenuProvider} from 'react-native-popup-menu';
import { LogBox } from 'react-native';



import Toast from 'react-native-toast-message';

import {linking} from './linking';
import JobDetails from './escreen/Jobs/JobDetails';

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
          {/* <Login /> */}
          <Toast />
        </MenuProvider>
      </NavigationContainer>
    </StoreProvider>
  );
}
