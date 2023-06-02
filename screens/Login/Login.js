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
import AsyncStorage from '@react-native-async-storage/async-storage';
import JRow from '../../customComponents/JRow';
import { observer } from 'mobx-react';


const Login = ({navigation, route}) => {
  const store = useContext(StoreContext);
  const [loader, setLoader] = useState(false);
  console.log(route?.params?.type);
  const type = route?.params?.type;


  
  
  const _storeToken = (token, remember) => {
    if (remember === true) {
      AsyncStorage.setItem('@login', JSON.stringify(token))
        .then(res => {
          store.setToken(token);
          // console.log('res', token);
          navigation.navigate('CHome');
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
    var formdata = new FormData();
    formdata.append('email', values.email);
    formdata.append('password', values.password);
console.log(formdata)
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    setLoader(true);

    fetch(type == 1 ? 'https://dev.jobskills.digital/api/users/login':'https://dev.jobskills.digital/api/employer/login', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('Result===>',result);

        if (result.token) {
          _storeToken(result, values.remember);
          
          Toast.show({
            type: 'success',
            text1: 'Login Successfully',
            text2: 'Welcome',
          });
        } else {
          if (result == "Error Incorrect Password!" || result== "Incorrect Password!") {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: result,
            });
          } else if (result == 'Error Incorrect Email!' || result =="Incorrect Email") {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: result,
            });
          } else if  (result == 'Please verify your Email!') {
            _verifyEmail(values.email);
          }
        }
        setLoader(false);
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Cannot proceed your request at this moment.Try Again!',
        });
        setLoader(false);
      });
  };

  const _verifyEmail = email => {
    var formdata = new FormData();
    formdata.append('email', email);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch(`${url.baseUrl}/users/verifyEmail`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result === 'No Email Found') {
          Toast.show({
            type: 'error',
            text1: 'No Email Found',
            text2: 'Kindly register with that email address',
          });
        } else {
          Toast.show({
            type: 'success',
            text1: 'Verify Email Send',
            text2:
              'Kindly check your email address and verify your email address',
          });
        }
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Cannot proceed your request at this moment.Try Again!',
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
          children={store.lang.welcome}
          style={{marginTop: RFPercentage(2)}}
        />
      </View>
      <Formik
        initialValues={{
          email: route.params?.email,
          password: route.params?.password,
          hide: true,
          remember: true,
        }}
        onSubmit={values => {
          _login(values);
        }}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .min(0, 'Email address cannot be empty')

            // .email('Must be a valid email')
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
              style={{textAlign: store.lang.id === 0 ? 'left' : 'right'}}
              value={values.email}
              heading={store.lang.email}
              error={touched.email && errors.email && true}
              icon={
                <Feather
                  name="mail"
                  style={{
                    marginRight:
                      store.lang.id == 0 ? RFPercentage(1.6) : RFPercentage(0),
                    marginLeft:
                      store.lang.id == 0 ? RFPercentage(0) : RFPercentage(1.6),
                  }}
                  size={RFPercentage(2.8)}
                  color={colors.purple[0]}
                />
              }
              placeholder={store.lang.email}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
            />
            {touched.email && errors.email && (
              <JErrorText>{errors.email}</JErrorText>
            )}
            <JInput
              style={{textAlign: store.lang.id === 0 ? 'left' : 'right'}}
              forPassword={true}
              eye={values.hide}
              error={touched.password && errors.password && true}
              onPressEye={() => setFieldValue('hide', !values.hide)}
              value={values.password}
              heading={store.lang.password}
              icon={
                <MaterialCommunityIcons
                  name="shield-key-outline"
                  shield-key-outline
                  style={{
                    marginRight:
                      store.lang.id == 0 ? RFPercentage(1.5) : RFPercentage(0),
                    marginLeft:
                      store.lang.id == 0 ? RFPercentage(0) : RFPercentage(1.5),
                  }}
                  size={RFPercentage(3)}
                  color={colors.purple[0]}
                />
              }
              placeholder={store.lang.password}
              onChangeText={handleChange('password')}
              containerStyle={{marginTop: RFPercentage(3)}}
              onBlur={() => setFieldTouched('password')}
            />
            {touched.password && errors.password && (
              <JErrorText>{errors.password}</JErrorText>
            )}

            <JRow
              style={{
                justifyContent: 'space-between',
                marginTop: RFPercentage(2),
              }}>
              <JRow>
                <CheckBox
                  tintColors={{true: colors.purple[0], false: 'black'}}
                  boxType="square"
                  value={values.remember}
                  onValueChange={value => setFieldValue('remember', value)}
                />

                <JText style={{marginLeft: RFPercentage(1)}}>
                  {store.lang.remember}
                </JText>
              </JRow>
                <JText onPress={() => alert('Forgot')}>
                  {store.lang.forgot_password}
                </JText>
            </JRow>

            <JButton
              isValid={isValid}
              style={{marginTop: RFPercentage(3)}}
              onPress={() => handleSubmit()}
              children={
                loader
                  ? 'Loading...'
                  : type === 1
                  ? store.lang.login_as_candidate
                  : store.lang.login_as_employee
              }
            />
          </View>
        )}
      </Formik>
      <View style={{flex: 0.15, alignItems: 'center'}}>
        <JDivider children={store.lang.login_with} />
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
        onPress={() => navigation.navigate('CRegister', {type: type})}
        children={store.lang.register_Btn}
      />
    </JScreen>
  );
}
export default observer(Login)
const styles = StyleSheet.create({});


