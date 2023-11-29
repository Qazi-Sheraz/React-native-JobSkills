import {StyleSheet, Image, View, TextInput, Keyboard} from 'react-native';
import React, {useRef, useState} from 'react';
import JScreen from '../../customComponents/JScreen';
import JText from '../../customComponents/JText';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../../config/colors';
import JButton from '../../customComponents/JButton';
import {useContext} from 'react';
import JReload from '../../customComponents/JReload';
import Toast from 'react-native-toast-message';
import url from '../../config/url';
import {StoreContext} from '../../mobx/store';
import {useRoute} from '@react-navigation/native';
import {JToast} from '../../functions/Toast';
import JChevronIcon from '../../customComponents/JChevronIcon';
import JRow from '../../customComponents/JRow';

export default function VerifiedPhone({navigation}) {
  const store = useContext(StoreContext);
  const {params} = useRoute();
  // console.log('params',params)
  const [value, setValue] = useState({
    d1: '',
    d2: '',
    d3: '',
    d4: '',
  });
  const d1 = useRef();
  const d2 = useRef();
  const d3 = useRef();
  const d4 = useRef();
  const _verify = value => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

    var formdata = new FormData();
    formdata.append('phone', params?.phone);
    formdata.append('region_code', params?.region_code);
    formdata.append('code', `${value.d1}${value.d2}${value.d3}${value.d4}`);
    // console.log(formdata);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(`${url.baseUrl}/phone-code-verification`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result)
        if (result.success == true) {
          JToast({
            type: 'success',
            text1: store.lang.success,
            text2: result.message,
          });
          navigation.goBack();
        } else {
          JToast({
            type: 'danger',
            text1: store.lang.eror,
            text2: result.message,
          });
        }
      })
      .catch(error =>
        JToast({
          type: 'danger',
          text1: store.lang.eror,
          text2: store.lang.an_error_occurred_please_try_again_later,
        }),
      );
  };
  const _otp = () => {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    var formdata = new FormData();
    formdata.append('phone', params?.phone);
    formdata.append('region_code', params?.region_code);
    // console.log(formdata)
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch(`${url.baseUrl}/send-code`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        JToast({
          type: 'success',
          text1: store.lang.sent_to_your_phone_number,
          text2: store.lang.check_your_phone,
        });
      })
      .catch(error => {
        // console.log('error', error)
        JToast({
          type: 'danger',
          text1: store.lang.eror,
          text2: store.lang.an_error_occurred_please_try_again_later,
        });
      });
  };
  return (
    <JScreen  header={
      <JRow style={{marginHorizontal: RFPercentage(2), marginTop: RFPercentage(4)}}>
        <JChevronIcon color={colors.black[0]} />
      </JRow>
    }>
      
      <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
       
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
          children={store.lang.confirmed_number}
          style={{marginTop: RFPercentage(2)}}
        />
        <JText
          fontWeight={'500'}
          fontAlign="center"
          children={`${store.lang.enter_number} ${params?.region_code}${params?.phone}`}
          style={{marginTop: RFPercentage(0.5), width: '70%'}}
        />
      </View>

      <View
        style={{
          flex: 0.5,
          marginHorizontal: RFPercentage(3),
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.inputContainer}>
            <TextInput
              autoFocus
              style={styles.input}
              keyboardType="numeric"
              ref={d1}
              value={value.d1}
              onChangeText={e => {
                setValue({...value, d1: e});
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
              onKeyPress={({nativeEvent}) => {
                if (nativeEvent.key === 'Backspace') {
                  setValue({...value, d2: ''});
                  d1.current.focus();
                }
              }}
              keyboardType="numeric"
              style={styles.input}
              value={value.d2}
              ref={d2}
              onChangeText={e => {
                setValue({...value, d2: e});
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
              onKeyPress={({nativeEvent}) => {
                if (nativeEvent.key === 'Backspace') {
                  setValue({...value, d3: ''});
                  d2.current.focus();
                }
              }}
              keyboardType="numeric"
              ref={d3}
              value={value.d3}
              style={styles.input}
              onChangeText={e => {
                setValue({...value, d3: e});
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
              onKeyPress={({nativeEvent}) => {
                if (nativeEvent.key === 'Backspace') {
                  setValue({...value, d4: ''});
                  d3.current.focus();
                }
              }}
              keyboardType="numeric"
              style={styles.input}
              ref={d4}
              value={value.d4}
              onChangeText={e => {
                setValue({...value, d4: e});
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
          onPress={() => _verify(value)}
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
          children={store.lang.continue}
        />
        <View
          style={{
            marginTop: RFPercentage(2),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <JText style={{marginRight: RFPercentage(0.8)}}>
            {store.lang.resend_Code}
          </JText>
          <JReload
            onPress={() => {
              _otp();
            }}
          />
        </View>
      </View>
    </JScreen>
  );
}

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
    paddingVertical: RFPercentage(1),
    fontSize: RFPercentage(2.5),
    color: colors.black[0],
    textAlign: 'center',
  },
});
