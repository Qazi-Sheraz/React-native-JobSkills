import {StyleSheet, Pressable, View, ScrollView} from 'react-native';
import React from 'react';
import JScreen from './JScreen';
import JCircularLogo from './JCircularLogo';
import JText from './JText';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import JInput from './JInput';
import JButton from './JButton';
import JDivider from './JDivider';

import * as yup from 'yup';
import {Formik} from 'formik';
import JErrorText from './JErrorText';
import colors from '../config/colors';
export default function JLoginRegisterView() {
  const social = ['google', 'facebook', 'linkedin', 'twitter'];
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
        }}
        onSubmit={values => {
        }}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email('Must be a valid email')
            .required('Email is a required field'),
          password: yup
            .string()
            .min(6, 'Password Must be at least 6 characters')
            .max(10, 'Password must be at most 10 characters')
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
              eye={true}
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
                marginTop: RFPercentage(0.5),
              }}>
              <JText>Remember</JText>
              <JText>Forgot Password?</JText>
            </View>
            <JButton
              isValid={isValid}
              style={{marginTop: RFPercentage(3)}}
              onPress={() => handleSubmit()}
              children={'Login as Canidate'}
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
          {social.socialIcons.map((item, index) => (
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
      <Pressable
        onPress={() => alert('Register')}
        style={{
          flex: 0.1,
          backgroundColor: '#D6D5D5',
          borderTopEndRadius: RFPercentage(3),
          borderTopStartRadius: RFPercentage(3),
          shadowColor: colors.black[0],
          elevation: 5,
          shadowOpacity: 0.6,
          shadowRadius: 1,
          shadowOffset: {
            height: -1,
            width: 0,
          },
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <JText fontColor={colors.placeHolderColor[0]}>
          Don’t have an account? Register{' '}
        </JText>
      </Pressable>
    </JScreen>
  );
}

const styles = StyleSheet.create({});
