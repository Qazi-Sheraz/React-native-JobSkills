import React, {useContext, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../screens/Login/Login';
import Registration from '../../screens/Registration/Registration';
import SelectionScreen from '../../screens/SplashScreen/SelectionScreen';
import {StoreContext} from '../../mobx/store';
import {observer} from 'mobx-react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoScreen from '../../screens/SplashScreen/LogoScreen';


const Stack = createStackNavigator();

function AuthStack({navigation}) {
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
        }, 2000);
      })
      .catch(error => {
        // console.log('Error in CHomeStack', error);

        setLoader(false);
      });
  };
  useEffect(() => {
    _getoken('@login');

    return () => {};
  }, []);

  return loader === true ? (
    <LogoScreen />
  ) : (
    <React.Fragment>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          // gestureEnabled: false,
        }}
        initialRouteName={'SelectionScreen'}>
        <Stack.Screen name="SelectionScreen" component={SelectionScreen} />
        <Stack.Screen name="CLogin" component={Login} />
        <Stack.Screen name="CRegister" component={Registration} />
      </Stack.Navigator>
    </React.Fragment>
  );
}
export default observer(AuthStack);
