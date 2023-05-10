import {StyleSheet, TouchableOpacity, View, ScrollView} from 'react-native';
import React, {useContext, useState} from 'react';
import JScreen from '../../customComponents/JScreen';
import JCircularLogo from '../../customComponents/JCircularLogo';
import JText from '../../customComponents/JText';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../config/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import JInput from '../../customComponents/JInput';
import JButton from '../../customComponents/JButton';
import JDivider from '../../customComponents/JDivider';
import axios from 'axios';
import * as yup from 'yup';
import {Formik} from 'formik';
import JErrorText from '../../customComponents/JErrorText';
import JFooter from '../../customComponents/JFooter';
import CheckBox from '@react-native-community/checkbox';
import url from '../../config/url';
import Toast from 'react-native-toast-message';
import JIcon from '../../customComponents/JIcon';
import { StoreContext } from '../../mobx/store';
export default function Registration({navigation, route}) {
  const [loader, setLoader] = useState(false);
  const store = useContext(StoreContext);
  const _register = values => {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    var formdata = new FormData();
    formdata.append('type', route.params?.type == 1 ? '1' : '0');
    formdata.append('email', values.email);
    formdata.append('password', values.password);
    formdata.append('first_name', values.first_name);
    formdata.append('last_name', values.last_name);
    formdata.append('company_name', values.company_name);
    formdata.append('password_confirmation', values.confirmPassword);
    formdata.append('privacyPolicy', values.policy ? '1' : '0');
    console.log(formdata)

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    setLoader(true);
    fetch('https://dev.jobskills.digital/api/users/register', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        // console.log('Response', JSON.stringify(response.token));
        if (result.success == false) {
          Toast.show({
            type: 'error',
            text1: 'Register Error',
            text2: result.message,
          });
        } else {
          Toast.show({
            type: 'success',
            text1: 'Register Successfully',
            text2: 'Kindly check your Email',
          });
          navigation.navigate('CLogin', {
            type: route.params,
            email: values.email,
            password: values.password,
          });
        }

        setLoader(false);
        // navigation.navigate('CVerifiedEmail', {
        //   email: values.email,
        //   password: values.password,
        //   type: route.params.type,
        // });
      })
      .catch(error => {
        console.log('Error', error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.response && error.response.data,
        });
        setLoader(false);
      });
  };
  return (
    <JScreen>
      <View style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
        <JCircularLogo multiple={1.2} />
        <JText
          fontSize={RFPercentage(2.8)}
          fontWeight={'bold'}
          children="Create Account"
          style={{marginTop: RFPercentage(2)}}
        />
      </View>
      <Formik
        initialValues={{
          // type: route.params.type.type,
          email: '',
          password: '',
          first_name: '',
          last_name: '',
          company_name: '',
          confirmPassword: '',
          hide: true,
          chide: true,
          policy: false,
        }}
        onSubmit={values => {
          console.log(values);
          _register(values);
        }}
        validationSchema={yup.object().shape({
          first_name: yup
            .string()
            .min(3, 'First Name ame Must be at least 3 characters')
            .required('First Name is a required field'),
            last_name: yup
            .string()
            .min(3, 'Last Name Must be at least 3 characters')
            .required('Last Name is a required field'),
            company_name: yup
            .string()
            .min(3, 'Company Name Must be at least 3 characters')
            .required('Company Name is a required field'),
          email: yup
            .string()
            .min(0, 'Email address cannot be empty')
            
            .email('Must be a valid email')
            .required('Email is a required field'),
          password: yup
            .string()
            .min(8, 'Password Must be at least 8 characters')
            
            .required('Password is a required field'),
          confirmPassword: yup
            .string()
            .required('Confirm Password is a required field')
            .oneOf([yup.ref('password'), null], 'Passwords must match'),
          policy: yup
            .boolean()
            .required('Policy is a required field')
            .test('is boolean', 'Must be true', value => value === true),
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
              flex: 0.6,
              marginHorizontal: RFPercentage(3),
              justifyContent: 'center',
            }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <JInput
                value={values.first_name}
                heading={'First Name'}
                error={touched.first_name && errors.first_name && true}
                icon={
                  <Feather
                    name="user"
                    style={{
                      marginRight:store.lang.id == 0 ? RFPercentage(1.5):RFPercentage(0),
                      marginLeft:store.lang.id == 0 ? RFPercentage(0):RFPercentage(1.5),
                    }}
                    size={RFPercentage(2.8)}
                    color={colors.purple[0]}
                  />
                }
                placeholder="First Name"
                onChangeText={handleChange('first_name')}
                onBlur={() => setFieldTouched('first_name')}
              />
              {touched.first_name && errors.first_name && (
                <JErrorText>{errors.first_name}</JErrorText>
              )}
              <JInput
                value={values.last_name}
                heading={'Last Name'}
                error={touched.last_name && errors.last_name && true}
                icon={
                  <Feather
                    name="user"
                    style={{
                      marginRight:store.lang.id == 0 ? RFPercentage(1.5):RFPercentage(0),
                      marginLeft:store.lang.id == 0 ? RFPercentage(0):RFPercentage(1.5),
                    }}
                    size={RFPercentage(2.8)}
                    color={colors.purple[0]}
                  />
                }
                placeholder="Last Name"
                onChangeText={handleChange('last_name')}
                onBlur={() => setFieldTouched('last_name')}
                containerStyle={{marginTop: RFPercentage(3)}}
              />
              {touched.last_name && errors.last_name && (
                <JErrorText>{errors.last_name}</JErrorText>
              )}
              <JInput
                value={values.email}
                error={touched.email && errors.email && true}
                heading={'Email'}
                icon={
                  <Feather
                    name="mail"
                    style={{
                      marginRight:store.lang.id == 0 ? RFPercentage(1.5):RFPercentage(0),
                      marginLeft:store.lang.id == 0 ? RFPercentage(0):RFPercentage(1.5),
                    }}
                    size={RFPercentage(2.7)}
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
              <JInput
                value={values.company_name}
                error={touched.company_name && errors.company_name && true}
                heading={'Company Name'}
                icon={
                  <JIcon
                  icon={'an'}
                    name="home"
                    style={{
                      marginRight:store.lang.id == 0 ? RFPercentage(1.3):RFPercentage(0),
                      marginLeft:store.lang.id == 0 ? RFPercentage(0):RFPercentage(1.3),
                    }}
                    size={RFPercentage(3)}
                    color={colors.purple[0]}
                  />
                }
                placeholder="Company Name"
                onChangeText={handleChange('company_name')}
                onBlur={() => setFieldTouched('company_name')}
                containerStyle={{marginTop: RFPercentage(3)}}
              />
              {touched.company_name && errors.company_name && (
                <JErrorText>{errors.company_name}</JErrorText>
              )}

              <JInput
                forPassword={true}
                eye={values.hide}
                onPressEye={() => setFieldValue('hide', !values.hide)}
                error={touched.password && errors.password && true}
                value={values.password}
                heading={'Password'}
                icon={
                  <MaterialCommunityIcons
                    name="shield-key-outline"
                    shield-key-outline
                    style={{
                      marginRight:store.lang.id == 0 ? RFPercentage(1.3):RFPercentage(0),
                      marginLeft:store.lang.id == 0 ? RFPercentage(0):RFPercentage(1.3),
                    }}
                    size={RFPercentage(3.2)}
                    color={colors.purple[0]}
                  />
                }
                placeholder="Password"
                onChangeText={handleChange('password')}
                containerStyle={{marginTop: RFPercentage(2)}}
                onBlur={() => setFieldTouched('password')}
              />
              {touched.password && errors.password && (
                <JErrorText>{errors.password}</JErrorText>
              )}

              <JInput
                forPassword={true}
                eye={values.chide}
                onPressEye={() => setFieldValue('chide', !values.chide)}
                error={
                  touched.confirmPassword && errors.confirmPassword && true
                } 
                value={values.confirmPassword}
                heading={'Confirm Password'}
                icon={
                  <MaterialCommunityIcons
                    name="shield-key-outline"
                    shield-key-outline
                    style={{
                      marginRight:store.lang.id == 0 ? RFPercentage(1.3):RFPercentage(0),
                      marginLeft:store.lang.id == 0 ? RFPercentage(0):RFPercentage(1.3),
                    }}
                    size={RFPercentage(3.2)}
                    color={colors.purple[0]}
                  />
                }
                placeholder="Confirm Password"
                onChangeText={handleChange('confirmPassword')}
                containerStyle={{marginTop: RFPercentage(3)}}
                onBlur={() => setFieldTouched('confirmPassword')}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <JErrorText>{errors.confirmPassword}</JErrorText>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: RFPercentage(3),
                  paddingLeft: RFPercentage(1),
                }}>
                <CheckBox
                  tintColors={{true: colors.purple[0], false: 'black'}}
                  boxType="square"
                  value={values.policy}
                  onValueChange={value => setFieldValue('policy', value)}
                />

                <JText style={{marginLeft: RFPercentage(2)}}>
                  By Signing, you agree to the JobSkills by {'\n'}
                  <JText
                    fontWeight="bold"
                    style={{marginLeft: RFPercentage(2)}}>
                    Terms and Conditions
                  </JText>
                </JText>
              </View>
              {touched.policy && errors.policy && (
                <JErrorText>{errors.policy}</JErrorText>
              )}

              <JButton
                isValid={isValid}
                style={{marginTop: RFPercentage(3)}}
                onPress={() => handleSubmit()}
                children={
                  loader
                    ? 'Loading...'
                    : `Register as ${
                        route.params?.type === 1 ? 'Candidate' : 'Employee'
                      }`
                }
              />
            </ScrollView>
          </View>
        )}
      </Formik>
      <View style={{flex: 0.1, alignItems: 'center'}}>
        <JDivider children={'or register with'} />
        <View
          style={{
            flexDirection: 'row',
            marginTop: RFPercentage(1),
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
        onPress={() =>
          navigation.navigate('CLogin', {type: route.params?.type})
        }
        children={'Already have an account? Login'}
      />
    </JScreen>
  );
}

const styles = StyleSheet.create({});
