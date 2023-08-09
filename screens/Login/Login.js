import {StyleSheet, Pressable, View, TouchableOpacity, Platform} from 'react-native';
import React, { useEffect,useState,useContext } from 'react';
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
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';

const Login = ({navigation, route}) => {
  const store = useContext(StoreContext);
  const [loader, setLoader] = useState(false);
  // console.log(route?.params?.type);
  const type = route?.params?.type;

  const _storeToken = (token, remember) => {
    if (remember === true) {
      AsyncStorage.setItem('@login', JSON.stringify(token))
        .then(res => {
          store.setToken(token);
          console.log('res', token);
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
  const requestUserPermission = async () => {
    /**
     * On iOS, messaging permission must be requested by
     * the current application before messages can be
     * received or sent
     */
    const authStatus = await messaging().requestPermission();
    //console.log('Authorization status(authStatus):', authStatus);
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  };
  const [deviceName, setDeviceName] = useState('');
  useEffect(() => {
    const fetchDeviceName = async () => {

      try {
        const name = await DeviceInfo.getDeviceName();
        store.setDeviceName(name);
      } catch (error) {
        console.log('Error fetching device name:', error);
      }
    };

    fetchDeviceName();
  }, []);

  // console.log('DeviceInfo', deviceName)

  
  const updateUserDeviceToken = (messagingInstance, userId, deviceName) => {
    return new Promise((resolve, reject) => {
      if (requestUserPermission()) {
        messagingInstance
          .getToken()
          .then((fcmToken) => {
            console.log('FCM Token -> ', fcmToken);
            var formdata = new FormData();
            formdata.append("user_id", userId);
            formdata.append("token", fcmToken);
            formdata.append("name", deviceName);
            formdata.append("os", Platform.OS);
            formdata.append("version", Platform.Version);
            // console.log(formdata);
            var requestOptions = {
              method: 'POST',
              body: formdata,
              redirect: 'follow'
            };
            fetch("https://dev.jobskills.digital/api/device-token-update", requestOptions)
              .then(response => response.json())
              .then(result => {
                // console.log('result', result);
                resolve(result); // Resolve the promise with the result
              })
              .catch(error => {
                console.log('error', error);
                reject(error); // Reject the promise with the error
              });
  
            messagingInstance
              .onTokenRefresh((newToken) => {
                console.log('Updated FCM Token -> ', newToken);
                // Optionally, you can do something with the newToken here
              });
          })
          .catch(error => {
            console.log('Error while getting FCM token', error);
            reject(error); // Reject the promise if there's an error
          });
      } else {
        reject(new Error('User permission not granted'));
      }
    });
  };
  
  // Usage example:
  // updateUserDeviceToken(messaging(), store.userInfo?.id, store.deviceName)
  //   .then((result) => {
  //     // Do something with the result if needed
  //   })
  //   .catch((error) => {
  //     // Handle errors here
  //   });
 

  const _login = values => {
    var formdata = new FormData();
    formdata.append('email', values.email);
    formdata.append('password', values.password);
// console.log(formdata)
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    setLoader(true);

    fetch(type == 1 ?`${url.baseUrl}/users/login`:`${url.baseUrl}/employer/login`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log('Result===>',result);

        if (result.token) {
          _storeToken(result, values.remember);
          updateUserDeviceToken();
          Toast.show({
            type: 'success',
            text1: store.lang.login_successfully,
            text2: store.lang.welcome,
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
        // console.log(result);
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
            .max(100, 'Email address must be at most 100 characters long')
            .required('Email is a required field'),
          password: yup
            .string()
            .min(6, 'Password Must be at least 6 characters')
            .max(16, 'Password must be at most 15 characters')
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
              maxLength={100}
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

                <JText style={{marginHorizontal: RFPercentage(1)}}>
                  {store.lang.remember}
                </JText>
              </JRow>
                <JText onPress={() => navigation.navigate('ForgetPassword',{type: type, email: values.email })}>
                  {store.lang.forgot_password}
                </JText>
            </JRow>

            <JButton
              isValid={isValid}
              style={{marginTop: RFPercentage(3)}}
              onPress={() => handleSubmit()}
              children={
                loader
                  ? store.lang.loading
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


