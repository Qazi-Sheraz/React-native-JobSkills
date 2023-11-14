import { StyleSheet, Image, View, TextInput, Keyboard } from 'react-native';
import React, { useRef, useState } from 'react';
import JScreen from '../../customComponents/JScreen';
import JText from '../../customComponents/JText';
import { RFPercentage } from 'react-native-responsive-fontsize';
import colors from '../../config/colors';

import JButton from '../../customComponents/JButton';

import JReload from '../../customComponents/JReload';
import Toast from 'react-native-toast-message';
import { observer } from 'mobx-react';
import { useContext } from 'react';
import { StoreContext } from '../../mobx/store';
import { useRoute } from '@react-navigation/native';
import url from '../../config/url';
import { JToast } from '../../functions/Toast';
import JChevronIcon from '../../customComponents/JChevronIcon';
import JHeader from '../../customComponents/JHeader';
import JRow from '../../customComponents/JRow';



const VerifiedEmail = ({ route, navigation }) => {
  const store = useContext(StoreContext);
  const [loader, setLoader] = useState();
  const [value, setValue] = useState({
    d1: '',
    d2: '',
    d3: '',
    d4: '',
  });
  const { params } = useRoute();
  const type = params?.type;
  let _hideEmail = function (email) {
    return email.replace(/(.{2})(.*)(?=@)/, function (gp1, gp2, gp3) {
      for (let i = 0; i < gp3.length; i++) {
        gp2 += '*';
      }
      return gp2;
    });
  };
  const d1 = useRef();
  const d2 = useRef();
  const d3 = useRef();
  const d4 = useRef();


  const _varifyEmail = values => {
    var formdata = new FormData();
    formdata.append('email', params?.email);
    formdata.append("code", `${value.d1}${value.d2}${value.d3}${value.d4}`);
    // console.log(formdata);
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    setLoader(true);

    fetch(`${url.baseUrl}/forget-password-verification`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log('Result===>', result);

        if (result.success == true) {
          JToast({
            type: 'success',
            text1: store.lang.success,
            text2: store.lang.code_is_verified,
            
          });
          navigation.navigate('LoginPassword', { email: params?.email, type: type })
        } else {
          JToast({
            type: 'danger',
            text1: store.lang.eror,
            text2: store.lang.your_OTP_is_wrong,
          });

        }
      })
      .catch(error => {
        JToast({
          type: 'danger',
          text1: store.lang.eror,
          text2: error.message,
        });

      })
      .finally(() => {
        setLoader(false);
      });
  };
  const _forgetPassword = values => {
    var formdata = new FormData();
    formdata.append('email', params?.email);
    // console.log(formdata);
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    setLoader(true);

    fetch(`${url.baseUrl}/forget-password`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log('Result===>', result);

        if (result.success == true) {
          JToast({
            type: 'success',
            text1: store.lang.success,
            text2: store.lang.kindly_check_your_email_address,
          });
        } else {
          JToast({
            type: 'danger',
            text1: store.lang.eror,
            text2: result.message,
          });

        }
      })
      .catch(error => {
        JToast({
          type: 'danger',
          text1: store.lang.eror,
          text2: error.message,
        });

      })
      .finally(() => {
        setLoader(false);
      });
  };
  return (
    <JScreen  header={
      <JRow style={{marginHorizontal: RFPercentage(2), marginTop: RFPercentage(4)}}>
        <JChevronIcon color={colors.black[0]} />
      </JRow>
    }>
      <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{
            alignSelf: 'center',
            paddingTop: RFPercentage(2),
            height: RFPercentage(27),
            width: RFPercentage(27),
          }}
          resizeMode="contain"
          source={require('../../assets/images/verifyEmail/verify_email.png')}
        />
        <JText
          fontSize={RFPercentage(2.8)}
          fontWeight={'bold'}
          children={store.lang.verify_your_email}
          style={{ marginTop: RFPercentage(2) }}
        />
        <JText
          fontWeight={'500'}
          fontAlign="center"
          children={`${store.lang.enter_4_digit_code}
          ${_hideEmail(route.params.email)}`}
          style={{ marginTop: RFPercentage(0.5), width: '70%' }}
        />
      </View>

      <View
        style={{
          flex: 0.5,
          marginHorizontal: RFPercentage(3),
          alignItems: 'center',
        }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.inputContainer}>
            <TextInput
              autoFocus
              style={styles.input}
              keyboardType="numeric"
              ref={d1}
              value={value.d1}
              onChangeText={e => {
                setValue({ ...value, d1: e });
                if (e) {
                  d2.current.focus();
                }
              }}
              maxLength={1}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  setValue({ ...value, d2: '' });
                  d1.current.focus();
                }
              }}
              keyboardType="numeric"
              style={styles.input}
              value={value.d2}
              ref={d2}
              onChangeText={e => {
                setValue({ ...value, d2: e });
                if (e) {
                  d3.current.focus();
                }
              }}
              maxLength={1}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  setValue({ ...value, d3: '' });
                  d2.current.focus();
                }
              }}
              keyboardType="numeric"
              ref={d3}
              value={value.d3}
              style={styles.input}
              onChangeText={e => {
                setValue({ ...value, d3: e });
                if (e) {
                  d4.current.focus();
                }
              }}
              maxLength={1}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  setValue({ ...value, d4: '' });
                  d3.current.focus();
                }
              }}
              keyboardType="numeric"
              style={styles.input}
              ref={d4}
              value={value.d4}
              onChangeText={e => {
                setValue({ ...value, d4: e });
                if (e.length > 0) {
                  Keyboard.dismiss();
                }
              }}
              maxLength={1}
              blurOnSubmit={false}
            />
          </View>
        </View>
  
        <JButton
          isValid={
            value.d1.concat(value.d2).concat(value.d3).concat(value.d4)
              .length === 4
              ? true
              : false
          }
          style={{
            marginTop: RFPercentage(6),
            height: RFPercentage(6),
            paddingHorizontal: RFPercentage(8),
          }}
          onPress={() => {
            _varifyEmail(value);
            // Toast.show({
            //   type: 'success',
            //   text1: 'Verified Successfully',
            //   text2: `${value.d1
            //     .concat(value.d2)
            //     .concat(value.d3)
            //     .concat(value.d4)}`,
            // });
            // navigation.navigate('LoginPassword',{type: type})
            // navigation.navigate('CLogin', {
            //   email: route.params.email,
            //   password: route.params.password,
            //   type: route.params.type,
            // });
            // setValue({...value, d1: '', d2: '', d3: '', d4: ''});
          }}
          children={loader ? store.lang.loading : store.lang.continue}
        />
        <View
          style={{
            marginTop: RFPercentage(2),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <JText style={{ marginRight: RFPercentage(0.8) }}>{store.lang.resend_Code}</JText>
          <JReload
            onPress={() => {
              _forgetPassword();
            }}
          />
        </View>
      </View>
    </JScreen>
  );
};




export default observer(VerifiedEmail)

const styles = StyleSheet.create({
  inputContainer: {
    // height: RFPercentage(6),
    // width: RFPercentage(6),
    backgroundColor: colors.footer[0],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: RFPercentage(2),
  },
  input: {
    width: RFPercentage(6),
    borderBottomWidth: RFPercentage(0.2),
    fontSize: RFPercentage(2.5),
    paddingVertical:RFPercentage(1),
    color:colors.black[0],
    textAlign: 'center',
  },
});
