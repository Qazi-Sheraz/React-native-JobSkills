import {
  View,
  Image,
  StyleSheet,
} from 'react-native';
import React, {
  useState,
  useEffect,
  useContext
} from 'react';
import { observer } from 'mobx-react';
import colors from '../../config/colors';
import JRow from '../../customComponents/JRow';
import { StoreContext } from '../../mobx/store';
import JText from '../../customComponents/JText';
import JButton from '../../customComponents/JButton';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import {
  heightPercentageToDP,
  widthPercentageToDP
} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JGradientScreen from '../../customComponents/JGradientScreen';

const LngTranslation = () => {
  const store = useContext(StoreContext);
  const navigation = useNavigation();
  const [btn, setBtn] = useState(false);
  const [btn2, setBtn2] = useState(false);




  const handleSave = async lang => {
    // Switch to the selected language
    try {
      await AsyncStorage.setItem('selectedLanguage', lang);
      // await AsyncStorage.setItem('splash', 'true');
      store.setLang(lang);
      // navigation.navigate('BoundingScreenStart')
      getpermission()
      // store.setLangType('true');

      // console.log(lang)
    } catch (error) {
      // console.log('Error storing language:', error);
    }
  };
  const getpermission = async () => {
    try {
      const permissionValue = await AsyncStorage.getItem('permission');

      if (permissionValue === 'true') {
        // 'employerSplash' is true, take some action
        // For example, you can navigate to 'CLogin' here
        navigation.navigate('BoundingScreenStart')
      } else {
        // 'employerSplash' is false or not set, take another action
        // For example, you can navigate to 'FirstScreen' here
        navigation.navigate('PermissionScreen')
      }
    } catch (error) {
      console.error('Error retrieving Permission value from AsyncStorage: ', error);
      // You may choose to handle the error here or return a default value.
      return null; // Return a default value or handle the error as needed
    }
  };

  useEffect(() => {
    // AsyncStorage.removeItem('permission');
  }, [])
  return (

    <JGradientScreen style={{ justifyContent: 'space-between' }}>
      {/* <StatusBar backgroundColor={'transparent'} translucent/> */}
      <View style={styles.logo}>
        <Image
          source={require('../../assets/images/logo/logo.png')}
          style={{
            height: heightPercentageToDP(40),
            width: widthPercentageToDP(40),
            tintColor: colors.white[0],
            resizeMode: 'contain',
          }}
        />

      </View>
      <Animatable.View style={styles.sheetContainer} animation="slideInUp">
        <View
          style={styles.view}>
          <View>
            <JText
              style={{
                fontWeight: 'bold',
                fontSize: RFPercentage(2.5),
                textAlign: 'center',

              }}>
              {store.lang.Choose_language}
            </JText>
            <JText style={{ fontSize: RFPercentage(2), textAlign: 'center', marginVertical: RFPercentage(1.5), }}>
              {store.lang.langButtons}
            </JText>
          </View>
          <JRow style={{ borderWidth: RFPercentage(0.1) }}>
            <JButton onPress={() => {
              setBtn(true)
              setBtn2(false)
              handleSave('en');
            }}
              style={{ paddingHorizontal: RFPercentage(6), backgroundColor: colors.primary[0], borderColor: colors.primary[0] }} >English</JButton>
            {/* style={{ paddingHorizontal: RFPercentage(6), backgroundColor: btn === false ? colors.primary[0] : '#fff', borderColor: btn === false ? colors.primary[0] : colors.border[0] }} */}
            {/* <JButton onPress={()=>{handleSave('ur')}} style={{paddingHorizontal:RFPercentage(4),backgroundColor:store.lang === 'ur'?'#fff':colors.primary[0]}}>اردو</JButton> */}
            <JButton onPress={() => {
              setBtn2(true)
              setBtn(false)
              handleSave('ar');
            }}
              // style={{ paddingHorizontal: RFPercentage(6), backgroundColor: btn2 === true ? colors.primary[0] : '#fff', borderColor: btn === true ? colors.primary[0] : colors.border[0] }}
              style={{ paddingHorizontal: RFPercentage(6), backgroundColor: '#fff', borderColor: colors.border[0] }}>العربية</JButton>
          </JRow>
        </View>
      </Animatable.View>
    </JGradientScreen>
  );
};

export default observer(LngTranslation);

const styles = StyleSheet.create({
  logo: {
    height: RFPercentage(100),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RFPercentage(-20),
  },
  view: {
    bottom: 0,
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: RFPercentage(35),
    padding: RFPercentage(2),
    justifyContent: 'space-evenly',
    borderTopLeftRadius: RFPercentage(3),
    borderTopRightRadius: RFPercentage(3),
  },
  btn: { paddingHorizontal: RFPercentage(4) },
  sheetContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
