import {StyleSheet, Image, View, TextInput, Keyboard} from 'react-native';
import React, {useRef, useState} from 'react';
import JScreen from '../../customComponents/JScreen';
import JText from '../../customComponents/JText';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../../config/colors';

import JButton from '../../customComponents/JButton';

import JReload from '../../customComponents/JReload';
import Toast from 'react-native-toast-message';
export default function VerifiedEmail({route, navigation}) {
  const [value, setValue] = useState({
    d1: '',
    d2: '',
    d3: '',
    d4: '',
  });

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

  return (
    <JScreen>
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
          children="Verify your Email"
          style={{marginTop: RFPercentage(2)}}
        />
        <JText
          fontWeight={'500'}
          fontAlign="center"
          children={`Enter 4 digit code that you received on this email ${_hideEmail(
            route.params.email,
          )}`}
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
            Toast.show({
              type: 'success',
              text1: 'Verified Successfully',
              text2: `${value.d1
                .concat(value.d2)
                .concat(value.d3)
                .concat(value.d4)}`,
            });

            navigation.navigate('CLogin', {
              email: route.params.email,
              password: route.params.password,
              type: route.params.type,
            });
            // setValue({...value, d1: '', d2: '', d3: '', d4: ''});
          }}
          children={'Continue'}
        />
        <View
          style={{
            marginTop: RFPercentage(2),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <JText style={{marginRight: RFPercentage(0.8)}}>Resend Code</JText>
          <JReload
            onPress={() => {
              Toast.show({
                type: 'success',
                text1: 'Send Code Successfully',
                text2: 'Check your Email',
              });
            }}
          />
        </View>
      </View>
    </JScreen>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    height: RFPercentage(6),
    width: RFPercentage(6),
    backgroundColor: colors.footer[0],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: RFPercentage(2),
  },
  input: {
    width: RFPercentage(4),
    height: RFPercentage(5),
    borderBottomWidth: RFPercentage(0.2),
    fontSize: RFPercentage(2.5),

    textAlign: 'center',
  },
});
