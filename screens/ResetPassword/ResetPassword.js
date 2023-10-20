import {StyleSheet, Pressable, View, TouchableOpacity} from 'react-native';
import React from 'react';
import JScreen from '../../customComponents/JScreen';
import JCircularLogo from '../../customComponents/JCircularLogo';
import JText from '../../customComponents/JText';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';

import colors from '../../config/colors';

import JInput from '../../customComponents/JInput';
import JButton from '../../customComponents/JButton';

import * as yup from 'yup';
import {Formik} from 'formik';
import JErrorText from '../../customComponents/JErrorText';
import JFooter from '../../customComponents/JFooter';
export default function ResetPassword() {
  return (
    <JScreen>
      <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
        <JCircularLogo multiple={1.4} />
        <JText
          fontSize={RFPercentage(2.8)}
          fontWeight={'bold'}
          children="Reset Password"
          style={{marginTop: RFPercentage(2)}}
        />
        <JText
          fontWeight={'500'}
          children="An email with the reset link will be sent to you"
          style={{marginTop: RFPercentage(0.5)}}
        />
      </View>
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={values => {
          // console.log(values);
        }}
        validationSchema={yup.object().shape({
        
            email: yup
            .string()
            .max(100, store.lang.Email_address_must_be_at_most_100_characters_long)
            .email(store.lang.Must_be_a_valid_email)
            .required(store.lang.Email_is_a_required_field),
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
            }}>
            <JInput
              value={values.email}
              error={touched.email && errors.email && true}
              maxLength={100}
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
              containerStyle={{marginTop: RFPercentage(3)}}
            />
            {touched.email && errors.email && (
              <JErrorText>{errors.email}</JErrorText>
            )}

            <JButton
              isValid={isValid}
              style={{marginTop: RFPercentage(3)}}
              onPress={() => handleSubmit()}
              children={'Reset'}
            />
          </View>
        )}
      </Formik>
      <View style={{flex: 0.15, alignItems: 'center'}}></View>

      <JFooter
        onPress={() => alert('Footer')}
        children={store.lang.already_Login}
      />
    </JScreen>
  );
}

const styles = StyleSheet.create({});
