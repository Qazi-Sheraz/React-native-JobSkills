import { StatusBar, StyleSheet, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import colors from '../../config/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';
import JButton from '../../customComponents/JButton';
import JDivider from '../../customComponents/JDivider';
import * as Animatable from 'react-native-animatable';
import { StoreContext } from '../../mobx/store';
import { observer } from 'mobx-react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectionSheet = ({ navigation }) => {
  const store = useContext(StoreContext);

  // AsyncStorage.removeItem('splashShown')
  const navigateToLoginOrBounding = async () => {
    // Check the value of 'splashShown' in AsyncStorage
    try {
      const splashShown = await AsyncStorage.getItem('splashShown');
      console.log(splashShown)
      if (splashShown === 'true') {
        // 'splashShown' is true, navigate to 'CLogin' with type 1
        navigation.navigate('CLogin', { type: 1 });
      } else {
        // 'splashShown' is false or not set, navigate to 'BoundingScreenStart'
        navigation.navigate('FirstScreen', { type: 1 });
      }

    } catch (error) {
      // Handle error if AsyncStorage retrieval fails
      console.error('Error retrieving splashShown from AsyncStorage: ', error);
      // You may choose a default navigation action here
    }
  };
  const getEmployerSplashValue = async () => {
    try {
      const employerSplashValue = await AsyncStorage.getItem('employerSplash');

      if (employerSplashValue === 'true') {
        // 'employerSplash' is true, take some action
        // For example, you can navigate to 'CLogin' here
        navigation.navigate('CLogin', { type: 2 });
      } else {
        // 'employerSplash' is false or not set, take another action
        // For example, you can navigate to 'FirstScreen' here
        navigation.navigate('EFirstScreen', { type: 2 });
      }
    } catch (error) {
      console.error('Error retrieving employerSplash value from AsyncStorage: ', error);
      // You may choose to handle the error here or return a default value.
      return null; // Return a default value or handle the error as needed
    }
  };

  useEffect(() => {
    AsyncStorage.removeItem('employerSplash')
  }, [])

  return (
    <Animatable.View style={styles.sheetContainer} animation="slideInUp">

      <View style={styles.sheetItemContainer}>

        <JButton
          fontStyle={styles.buttonStyle}
          // onPress={() => store.setLang('ar')}
          onPress={() => { getEmployerSplashValue() }}
        >
          {store.lang.employer}
        </JButton>
        <JDivider
          containerStyle={{ marginVertical: RFPercentage(2) }}
          children={store.lang.or}
        />
        <JButton
          fontStyle={styles.buttonStyle}
          onPress={() => { navigateToLoginOrBounding() }}
          borderColor={colors.black[0]}
          backgroundColor={colors.white[0]}>
          {store.lang.jobseeker}
        </JButton>
      </View>
    </Animatable.View>
  );
}
export default observer(SelectionSheet)
const styles = StyleSheet.create({
  buttonStyle: {
    fontWeight: '600',
    paddingHorizontal: RFPercentage(2),
  },

  sheetContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  sheetItemContainer: {
    backgroundColor: colors.white[0],
    height: heightPercentageToDP(30),
    width: '100%',
    borderTopEndRadius: RFPercentage(2),
    borderTopStartRadius: RFPercentage(2),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: RFPercentage(2),
  },
});
