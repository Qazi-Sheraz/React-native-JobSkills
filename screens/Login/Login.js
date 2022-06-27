import {StyleSheet, Pressable, View, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import JScreen from '../../customComponents/JScreen';
import JCircularLogo from '../../customComponents/JCircularLogo';
import JText from '../../customComponents/JText';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Formik} from 'formik';
import * as yup from 'yup';
import JDivider from '../../customComponents/JDivider';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../config/colors';
import JFooter from '../../customComponents/JFooter';
import JInput from '../../customComponents/JInput';
import JButton from '../../customComponents/JButton';
import CheckBox from '@react-native-community/checkbox';
import JErrorText from '../../customComponents/JErrorText';
import url from '../../config/url';
import Toast from 'react-native-toast-message';
import {StoreContext} from '../../mobx/store';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Login({navigation, route}) {
  const store = useContext(StoreContext);
  const [loader, setLoader] = useState(false);
  console.log(route);

  const _storeToken = (token, remember) => {
    if (remember === true) {
      AsyncStorage.setItem('@login', token)
        .then(res => {
          store.setToken(token);
        })
        .catch(error => {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error,
          });
        });
    } else {
      store.setToken(token);
    }
  };

  const _login = values => {
    var FormData = require('form-data');
    var data = new FormData();
    data.append('email', values.email);
    data.append('password', values.password);

    var config = {
      method: 'post',
      url: `${url.baseUrl}/users/login`,

      data: data,
    };
    setLoader(true);
    axios(config)
      .then(function (response) {
        console.log('Response', JSON.stringify(response.data));
        _storeToken(response.data.token, values.remember);

        Toast.show({
          type: 'success',
          text1: 'Login Successfully',
          text2: 'Welcome',
        });
        setLoader(false);
      })
      .catch(function (error) {
        console.log(error.response.data);

        if (error.response.data === 'Please verify your Email!') {
          _verifyEmail(values.email);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error.response && error.response.data,
          });
        }
        setLoader(false);
        // console.log(error.response.data);
      });
  };

  const _verifyEmail = email => {
    var FormData = require('form-data');
    var data = new FormData();
    data.append('email', email);

    var config = {
      method: 'post',
      url: `${url.baseUrl}/users/verifyEmail`,
      data: data,
    };

    axios(config)
      .then(function (response) {
        Toast.show({
          type: 'success',
          text1: 'Verify Email Sent',
          text2: 'Kindly check your Email',
        });
      })
      .catch(function (error) {
        console.log(error.response.data);
        Toast.show({
          type: 'error',
          text1: error.response && error.response.data,
        });
      });
  };
  return (
    <JScreen>
      <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
        <JCircularLogo multiple={1.4} />
        <JText
          fontSize={RFPercentage(2.8)}
          fontWeight={'bold'}
          children="Welcome"
          style={{marginTop: RFPercentage(2)}}
        />
      </View>
      <Formik
        initialValues={{
          email: '',
          password: '',
          hide: true,
          remember: true,
        }}
        onSubmit={values => {
          _login(values);
        }}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email('Must be a valid email')
            .required('Email is a required field'),
          password: yup
            .string()
            .min(6, 'Password Must be at least 6 characters')
            .max(15, 'Password must be at most 15 characters')
            .required('Password is a required field'),
        })}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
          setFieldValue,
        }) => (
          <View
            style={{
              flex: 0.5,
              marginHorizontal: RFPercentage(3),
              justifyContent: 'center',
            }}>
            <JInput
              value={values.email}
              heading={'Email'}
              error={touched.email && errors.email && true}
              icon={
                <Feather
                  name="mail"
                  style={{
                    marginRight: RFPercentage(2),
                  }}
                  size={RFPercentage(2.8)}
                  color={colors.purple[0]}
                />
              }
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
            />
            {touched.email && errors.email && (
              <JErrorText>{errors.email}</JErrorText>
            )}
            <JInput
              forPassword={true}
              eye={values.hide}
              error={touched.password && errors.password && true}
              onPressEye={() => setFieldValue('hide', !values.hide)}
              value={values.password}
              heading={'Password'}
              icon={
                <MaterialCommunityIcons
                  name="shield-key-outline"
                  shield-key-outline
                  style={{
                    marginRight: RFPercentage(2),
                  }}
                  size={RFPercentage(3.2)}
                  color={colors.purple[0]}
                />
              }
              placeholder="Password"
              onChangeText={handleChange('password')}
              containerStyle={{marginTop: RFPercentage(3)}}
              onBlur={() => setFieldTouched('password')}
            />
            {touched.password && errors.password && (
              <JErrorText>{errors.password}</JErrorText>
            )}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: RFPercentage(2),
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox
                  boxType="square"
                  value={values.remember}
                  onValueChange={value => setFieldValue('remember', value)}
                />

                <JText style={{marginLeft: RFPercentage(1)}}>Remember</JText>
              </View>
              <JText onPress={() => alert('Forgot')}>Forgot Password?</JText>
            </View>

            <JButton
              isValid={isValid}
              style={{marginTop: RFPercentage(3)}}
              onPress={() => handleSubmit()}
              children={loader ? 'Loading...' : 'Login as Canidate'}
            />
          </View>
        )}
      </Formik>
      <View style={{flex: 0.15, alignItems: 'center'}}>
        <JDivider children={'or login with'} />
        <View
          style={{
            flexDirection: 'row',
            marginTop: RFPercentage(3),
            justifyContent: 'space-evenly',
            width: '80%',
          }}>
          {['google', 'facebook', 'linkedin', 'twitter'].map((item, index) => (
            <FontAwesome
              onPress={() => alert(item)}
              key={index}
              name={item}
              size={RFPercentage(3.5)}
              color={colors.purple[0]}
            />
          ))}
        </View>
      </View>

      <JFooter
        onPress={() => navigation.navigate('CRegister', {type: route.params})}
        children={' Don’t have an account? Register'}
      />
    </JScreen>
  );
}

const styles = StyleSheet.create({});
