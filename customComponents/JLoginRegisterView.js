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
import { StoreContext } from '../mobx/store';
import { useContext } from 'react';
export default function JLoginRegisterView() {
  const social = ['google', 'facebook', 'linkedin', 'twitter'];
  const store = useContext(StoreContext);
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
            .max(100, store.lang.Email_address_must_be_at_most_100_characters_long)
            .email(store.lang.Must_be_a_valid_email)
            .required(store.lang.Email_is_a_required_field),
          password: yup
            .string()
            .min(6, store.lang.Password_Must_be_at_least_6_characters)
            .max(10, store.lang.Password_must_be_at_most_10_characters)
            .required(store.lang.Password_is_a_required_field),
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
              maxLength={100}
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
              maxLength={30}
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
