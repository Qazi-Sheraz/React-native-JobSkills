import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import JScreen from '../../customComponents/JScreen';
import {observer} from 'mobx-react';
import colors from '../../config/colors';
import {StoreContext} from '../../mobx/store';
import JText from '../../customComponents/JText';
import JModal from '../../customComponents/JModal';
import Trash from '../../assets/svg/Icon/Trash.svg';
import {useNavigation} from '@react-navigation/native';
import Network from '../../assets/svg/Icon/Network.svg';
import Password from '../../assets/svg/Icon/Password.svg';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JChevronIcon from '../../customComponents/JChevronIcon';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JPasswordSetting from '../../customComponents/JPasswordSetting';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import url from '../../config/url';
import {JToast} from '../../functions/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EAccountSetting = () => {
  const navigation = useNavigation();
  const store = useContext(StoreContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const userid = store.token?.user?.id;
  console.log('userid', userid);

  const deleteAccount = () => {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `${url.baseUrl}/delete-Account/${store.token?.user?.id}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        setLoader(true);
        if (result.success == true) {
          AsyncStorage.removeItem('@login')
          googleSignOut()
            .then(res => {
              if (res !== null) {
                JToast({
                  type: 'success',
                  text1: result.message,
                });
                store.setToken({});
              }
            })
            .catch(error => {
              JToast({
                type: 'danger',
                text1: store.lang.eror,
                text2: 'Error while removing token',
              });
            });
        } else {
          JToast({
            type: 'danger',
            text1: result.message,
          });
          setModalVisible(false);
        }

        setLoader(false);
      })
      .catch(error => console.log('error', error));
  };

  const googleSignOut = async () => {
    try {
      await GoogleSignin.revokeAccess(); // Revoke access to the app
      await GoogleSignin.signOut(); // Sign out from the Google account
      // Now, the user can sign in with a different Google account next time.
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {}, []);
  return (
    <JScreen
      style={{paddingHorizontal: RFPercentage(2)}}
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {store.lang.account_settings}
            </JText>
          }
          left={<JChevronIcon />}
        />
      }>
      <View style={{flex: 1}}>
        <JPasswordSetting
          onPress={() => navigation.navigate('ChangePassword')}
          Svg={<Password />}
          Header={store.lang.change_password}
          txt={'********'}
        />
        <JPasswordSetting
          onPress={() => navigation.navigate('ChangeLanguage')}
          Svg={<Network />}
          Header={store.lang.change_language}
          txt={
            store.lang.id === 0
              ? 'English (United Kingdom)'
              : store.lang.id === 1
              ? 'اردو'
              : store.lang.id === 2 && 'العربية'
          }
        />

        <JPasswordSetting
          onPress={() => setModalVisible(true)}
          Svg={<Trash height={RFPercentage(3.5)} width={RFPercentage(3.5)} />}
          Header={store.lang.delete_account}
          txt={store.userInfo.email}
        />
      </View>
      <JModal
        icon
        HW={8}
        WW={8}
        disabled={loader ? true : false}
        name2={store.lang.cancel}
        name1={loader ? store.lang.loading : store.lang.delete_account}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        alertMsg={store.lang.are_you_sure_want_delete_Your_account_permanently}
        msg={store.lang.Press_Delete_account_or_Canel}
        onPressYes={() => {
          deleteAccount();
        }}
        onPressNo={() => {
          setLoader(false);
          setModalVisible(false);
        }}
      />
    </JScreen>
  );
};

export default observer(EAccountSetting);

const styles = StyleSheet.create({});
//
