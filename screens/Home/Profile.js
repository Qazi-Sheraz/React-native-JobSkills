import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import React, {useContext, useCallback} from 'react';
import JScreen from '../../customComponents/JScreen';
import JText from '../../customComponents/JText';
import JGradientHeader from '../../customComponents/JGradientHeader';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../config/colors';
import JProfileContent from '../../customComponents/JProfileContent';
import JProfileSections from '../../customComponents/JProfileSections';
import JScrollView from '../../customComponents/JScrollView';
import {observer} from 'mobx-react';
import {StoreContext} from '../../mobx/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
function Profile({navigation}) {
  const store = useContext(StoreContext);

  const _removeToken = () => {
    AsyncStorage.removeItem('@login')
      .then(res => {
        store.setToken('');
        Toast.show({
          type: 'success',
          text1: 'Logout Successfully',
        });
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Error while removing token',
        });
      });
  };

  const onRefresh = useCallback(() => {
    store.setIsRefreshing(true);
    alert('Referesh');
    store.setIsRefreshing(false);
  }, []);
  return (
    <JScreen
      header={
        <JGradientHeader
          height={heightPercentageToDP(22)}
          alignItems={'flex-start'}
          paddingTop={RFPercentage(3)}
          left={
            <Ionicons
              name="settings-outline"
              color={colors.white[0]}
              size={RFPercentage(3.5)}
            />
          }
          right={
            <AntDesign
              name="poweroff"
              onPress={() => _removeToken()}
              color={colors.white[0]}
              size={RFPercentage(3)}
            />
          }
        />
      }>
      <JProfileContent
        jd={'Software Developer'}
        name={'Muhammad Usama'}
        email={'umunir871@gmail.com'}
        src={require('../../assets/images/logo/logo.png')}
      />

      <JScrollView
        refreshing={store.isRefreshing}
        onRefresh={onRefresh}
        style={{
          paddingHorizontal: RFPercentage(2),
          marginTop: RFPercentage(2),
        }}>
        <JProfileSections
          onIconPress={() => navigation.navigate('CContacttInformation')}
          isEmpty={true}
          heading={'Contact Information'}
          icon="pencil"
        />
        <JProfileSections
          onIconPress={() => navigation.navigate('CGeneralInformation')}
          heading={'General Information'}
          icon="pencil"
        />
        <JProfileSections
          onIconPress={() => navigation.navigate('CExperienceInformation')}
          heading={'Experience Information'}
          icon="add"
        />
      </JScrollView>
    </JScreen>
  );
}
export default observer(Profile);

const styles = StyleSheet.create({
  text: {
    marginTop: RFPercentage(0.5),
  },
});
