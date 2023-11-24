import {StyleSheet, View, ScrollView, Platform} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
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
import * as yup from 'yup';
import {Formik} from 'formik';
import JErrorText from '../../customComponents/JErrorText';
import JFooter from '../../customComponents/JFooter';
import CheckBox from '@react-native-community/checkbox';
import JIcon from '../../customComponents/JIcon';
import {StoreContext} from '../../mobx/store';
import {observer} from 'mobx-react';
import JRow from '../../customComponents/JRow';
import {JToast} from '../../functions/Toast';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import LinkedInModal from '@smuxx/react-native-linkedin';
import {
  LoginManager,
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import url from '../../config/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { _appleAndroidAuth, _changeLanguage, _googleLogin, _googleSignOut, _onAppleAuth } from '../Login/LoginFunction';
import JModal from '../../customComponents/JModal';


const Registration = ({navigation, route}) => {
  GoogleSignin.configure({
    // webClientId: '505367788352-ad42uav54vqdr5ronovee2k66qtvpl5q.apps.googleusercontent.com',
    // offlineAccess: true,
  });
  const [loader, setLoader] = useState(false);
  const [socialLoader, setSocialLoader] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const store = useContext(StoreContext);
  const type = route?.params?.type;
  // console.log('type', type);

  const _storeToken = (token, remember) => {
    if (remember === true) {
      // alert('remember')
      AsyncStorage.setItem('@login', JSON.stringify(token))
        .then(res => {
          store.setToken(token);
          // console.log('res', token);
        })
        .catch(error => {
          JToast({
            type: 'danger',
            text1: store.lang.eror,
            text2: error,
          });
        });
    } else {
      // alert('not remember')
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
  const _register = values => {
    setLoader(true);
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    var formdata = new FormData();
    formdata.append('type', route.params?.type == 1 ? '1' : '0');
    formdata.append('email', values.email);
    formdata.append('password', values.password);
    formdata.append('first_name', values.first_name);
    formdata.append('password_confirmation', values.confirmPassword);
    formdata.append('privacyPolicy', values.policy ? '1' : '0');
    route.params?.type == 1 && formdata.append('last_name', values.last_name);
    route.params?.type !== 1 && formdata.append('company_name', values.company_name);
    // console.log(formdata);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch('https://dev.jobskills.digital/api/users/register', requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        // console.log('Response', JSON.stringify(response.token));
        if (result.success == false) {
          JToast({
            type: 'danger',
            text1: store.lang.register_error,
            text2: result.message,
          });
        } else {
          JToast({
            type: 'success',
            text1: store.lang.user_signup_successfully,
            text2: store.lang.kindly_check_your_email,
          });
          navigation.navigate('CLogin', {
            type: route.params?.type,
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
        // console.log('Error', error);
        JToast({
          type: 'danger',
          text1: store.lang.eror,
          text2: error.response && error.response.data,
        });
        setLoader(false);
      });
  };

  const updateUserDeviceToken = ({userId}) => {
   
    return new Promise((resolve, reject) => {
      if (requestUserPermission()) {
        messaging()?.getToken().then((fcmToken) => {
            console.log('FCM Token -> ', fcmToken);
            console.log('user_id -> ', userId);
            console.log('name -> ', store.deviceName);
            console.log('os -> ', Platform.OS);
            console.log('version -> ', Platform.Version);
            var formdata = new FormData();
            formdata.append('user_id', userId);
            formdata.append('token', fcmToken);
            formdata.append('name', store.deviceName);
            formdata.append('os', Platform.OS);
            formdata.append('version', Platform.Version);
            console.log(formdata);
            var requestOptions = {
              method: 'POST',
              body: formdata,
              redirect: 'follow',
            };
            fetch(
              'https://dev.jobskills.digital/api/device-token-update',
              requestOptions,
            )
              .then(response => response.json())
              .then(result => {
                // console.log('result', result);
                resolve(result); // Resolve the promise with the result
              })
              .catch(error => {
                // console.log('error', error);
                reject(error); // Reject the promise with the error
              });

              messaging()?.onTokenRefresh(newToken => {
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
  const _googleAccess = () => {
    setSocialLoader(true);
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    fetch(
      `${url.baseUrl}/login/google/callback?access_token=${store.googleToken}&type=${type}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        // console.log('Result===>', result);

        if (result.token) {
          _storeToken(result, true),
          _changeLanguage({selectedLanguage ,token:result.token})
          updateUserDeviceToken({userId:result.user?.id});
            JToast({
              type: 'success',
              text1: store.lang.login_successfully,
              text2: store.lang.welcome,
            });
          setSocialLoader(false);
        }
      })
      .catch(error => {
        _googleSignOut();
        JToast({
          type: 'danger',
          text1: store.lang.eror,
          text2: store.lang.cannot_proceed_your_request,
        });
        setSocialLoader(false);
      });
  };
  // console.log('linkdinToken', store.linkdinToken?.access_token);

  const _linkdinAccess = () => {
    setSocialLoader(true);
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    fetch(
      `${url.baseUrl}/login/linkedin-openid/callback?access_token=${store.linkdinToken?.access_token}&type=${type}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        // console.log('Result__Linkdin===>', result);


        if (result) {
          _storeToken(result, true),
          _changeLanguage({selectedLanguage ,token:result.token})
          updateUserDeviceToken({userId:result.user?.id});
            JToast({
              type: 'success',
              text1: store.lang.login_successfully,
              text2: store.lang.welcome,
            });
          setSocialLoader(false);
        }
      })
      .catch(error => {
        logoutFromLinkedIn;
        JToast({
          type: 'danger',
          text1: store.lang.eror,
          text2: store.lang.cannot_proceed_your_request,
        });
        setSocialLoader(false);
      });
  };

  const _appleAccess = (token) => {
    setSocialLoader(true)
    var formdata = new FormData();
   
      formdata.append('first_name', token.fullName?.givenName?token.fullName?.givenName:'');
      formdata.append('last_name', token.fullName?.familyName?token.fullName?.familyName:'');
      formdata.append('email', token?.email?token?.email:'');
      formdata.append('type', type);
      formdata.append('provider_id', token?.user);
  
    // console.log(formdata)
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };
    fetch(`${url.baseUrl}/login-with-apple`, requestOptions)

      .then(response => response.json())
      .then(result => {
        // console.log('Result__Apple===>', result);

        if (result.token) {
          _storeToken(result, true),
          _changeLanguage({selectedLanguage ,token:result.token})
          updateUserDeviceToken({userId:result.user?.id});
            JToast({
              type: 'success',
              text1: store.lang.login_successfully,
              text2: store.lang.welcome,
            });
          setSocialLoader(false)
        }
        else if(result=="Go to the setting and stop using apple id for Jobskills App")
        {
          setModalVisible(true)
        }
       
      })
      .catch(error => {
        // console.log("error",error)
        JToast({
          type: 'danger',
          text1: store.lang.eror,
          text2: store.lang.cannot_proceed_your_request,
        });
        setSocialLoader(false)
      });
  };

  const facebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (result.isCancelled) {
        // console.log('Login cancelled');
      } else {
        const data = await AccessToken.getCurrentAccessToken();
        if (data) {
          // console.log('Logged in with Facebook!');
          // console.log('User ID:', data.userID);
          // console.log('Access Token:', data.accessToken);
        }
      }
    } catch (error) {
      console.error('Facebook login error:', error);
    }
  };



  const linkedRef = useRef(null);

  const handleLinkedInLogin = () => {
    // Open the LinkedIn login modal
    linkedRef.current.open();
  };

  const renderCustomButton = () => (
    <FontAwesome
      onPress={() => {
        handleLinkedInLogin();
      }}
      name={'linkedin'}
      size={RFPercentage(3.5)}
      color={colors.purple[0]}
    />
  );

  const logoutFromLinkedIn = async () => {
    try {
      // Revoke the LinkedIn access token using the library's method
      // Note: The method to revoke the token may vary based on the library's API.
      // Replace 'revokeAccessToken' with the actual method if provided.
      await linkedRef.current.revokeAccessToken();

      // Clear local session data, e.g., user credentials
      // (You'll need to implement this part based on your app's structure)

      // Update the UI to reflect the user's logout
      // (Update your components or navigate to a logout screen)
    } catch (error) {
      // Handle any errors that may occur during the logout process
      console.error('LinkedIn logout error:', error);
    }
  };
  const getStoredLanguage = async () => {
    try {
      const storedLanguage = await AsyncStorage.getItem('selectedLanguage');
      if (storedLanguage) {
        setSelectedLanguage(storedLanguage);
      }
    } catch (error) {
      // console.log('Error retrieving stored language:', error);
    }
  };
 
  useEffect(() => {
    requestUserPermission();
    getStoredLanguage();
    const fetchDeviceName = async () => {
      try {
        const name = await DeviceInfo.getDeviceName();
        store.setDeviceName(name);
      } catch (error) {
        // console.log('Error fetching device name:', error);
      }
    };

    fetchDeviceName();
  }, []);
  // console.log('GoogleData========>', store.googleUserInfo?.user?.email);

  return (
    <JScreen>
      <View style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
        <JCircularLogo multiple={1.2} />
        <JText
          fontSize={RFPercentage(2.8)}
          fontWeight={'bold'}
          children={store.lang.create_account}
          style={{marginTop: RFPercentage(2)}}
        />
      </View>
      <Formik
        initialValues={
          route.params?.type == 1
            ? {
                email: '',
                password: '',
                first_name: '',
                last_name: '',
                // company_name: '',
                confirmPassword: '',
                hide: true,
                chide: true,
                policy: false,
              }
            : {
                email: '',
                password: '',
                first_name: '',
                company_name: '',
                confirmPassword: '',
                hide: true,
                chide: true,
                policy: false,
              }
        }
        onSubmit={values => {
          // console.log(values);
          _register(values);
        }}
        validationSchema={yup.object().shape(
          route.params?.type == 1
            ? {
                first_name: yup
                  .string()
                  .min(3, store.lang.First_Name_Must_be_at_least_3_characters)
                  .max(100, store.lang.Name_must_be_at_most_100_characters_long)
                  .transform(value => value.trim())
                  .matches(
                    /^[A-Za-z\u0600-\u06FF\s]+$/,
                    store.lang.Name_must_contains_only_alphabets,
                  )
                  .matches(
                    /^[^!@#$%^&*()_+={}|[\]\\:';"<>?,./0-9]+$/,
                    store.lang.Symbols_are_not_allowed_in_the_First_Name,
                  )
                  .required(store.lang.First_Name_is_a_required_field),
                last_name: yup
                  .string()
                  .min(3, store.lang.Last_Name_Must_be_at_least_3_characters)
                  .max(100, store.lang.Name_must_be_at_most_100_characters_long)
                  .transform(value => value.trim())
                  .matches(
                    /^[A-Za-z\u0600-\u06FF\s]+$/,
                    store.lang.Name_must_contains_only_alphabets,
                  )
                  .matches(
                    /^[^!@#$%^&*()_+={}|[\]\\:';"<>?,./0-9]+$/,
                    store.lang.Symbols_are_not_allowed_in_the_Last_Name,
                  )
                  .required(store.lang.Last_Name_is_a_required_field),

                email: yup
                  .string()
                  .min(0, store.lang.Email_address_cannot_be_empty)
                  .max(
                    100,
                    store.lang
                      .Email_address_must_be_at_most_100_characters_long,
                  )
                  .email(store.lang.Must_be_a_valid_email)
                  .required(store.lang.Email_is_a_required_field),
                password: yup
                  .string()
                  .min(8, store.lang.Password_Must_be_at_least_8_characters)
                  .max(16, store.lang.Password_must_be_at_most_16_characters)
                  .required(store.lang.Password_is_a_required_field),
                confirmPassword: yup
                  .string()
                  .required(store.lang.Confirm_Password_is_a_required_field)
                  .oneOf(
                    [yup.ref('password'), null],
                    store.lang.Password_must_match,
                  ),
                policy: yup
                  .boolean()
                  .required(store.lang.Policy_is_a_required_field)
                  .test('is boolean', 'Must be true', value => value === true),
              }
            : {
                first_name: yup
                  .string()
                  .min(3, store.lang.Name_Must_be_at_least_3_characters)
                  .max(
                    100,
                    store.lang.Name_must_be_at_most_100_characters_long,
                  )
                  .transform(value => value.trim())
                  .matches(
                    /^[A-Za-z\u0600-\u06FF\s]+$/,
                    store.lang.Name_must_contains_only_alphabets,
                  )
                  .matches(
                    /^[^!@#$%^&*()_+={}|[\]\\:';"<>?,./0-9]+$/,
                    store.lang.Symbols_are_not_allowed_in_the_First_Name,
                  )
                  .required(store.lang.Name_is_a_required_field),
                // last_name: yup
                //   .string()
                //   .min(3, store.lang.Last_Name_Must_be_at_least_3_characters)
                //   .max(100, store.lang.Name_must_be_at_most_100_characters_long)
                //   .transform(value => value.trim())
                //   .matches(
                //     /^[A-Za-z\u0600-\u06FF\s]+$/,
                //     store.lang.Name_must_contains_only_alphabets,
                //   )
                //   .matches(
                //     /^[^!@#$%^&*()_+={}|[\]\\:';"<>?,./0-9]+$/,
                //     store.lang.Symbols_are_not_allowed_in_the_Last_Name,
                //   )
                //   .required(store.lang.Last_Name_is_a_required_field),
                company_name: yup
                  .string()
                  .min(3, store.lang.Company_Name_Must_be_at_least_3_characters)
                  .max(
                    100,
                    store.lang.Company_Name_must_be_at_most_100_characters_long,
                  )
                  .transform(value => value.trim())
                  .matches(
                    /^[a-zA-Z\u0600-\u06FF\0-9_].*$/,
                    store.lang
                      .Company_Name_must_only_contain_alphabetic_characters,
                  )
                  .required(store.lang.Company_Name_is_a_required_field),

                email: yup
                  .string()
                  .min(0, store.lang.Email_address_cannot_be_empty)
                  .max(
                    100,
                    store.lang
                      .Email_address_must_be_at_most_100_characters_long,
                  )
                  .email(store.lang.Must_be_a_valid_email)
                  .required(store.lang.Email_is_a_required_field),
                password: yup
                  .string()
                  .min(8, store.lang.Password_Must_be_at_east_8_characters)
                  .max(16, store.lang.Password_must_be_at_most_15_characters)
                  .required(store.lang.Password_is_a_required_field),
                confirmPassword: yup
                  .string()
                  .required(store.lang.Confirm_Password_is_a_required_field)
                  .oneOf(
                    [yup.ref('password'), null],
                    store.lang.Passwords_must_match,
                  ),
                policy: yup
                  .boolean()
                  .required(store.lang.Policy_is_a_required_field)
                  .test('is boolean', 'Must be true', value => value === true),
              },
        )}>
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
            <ScrollView
              style={{marginBottom: RFPercentage(2)}}
              showsVerticalScrollIndicator={false}>
              <JInput
                maxLength={100}
                style={{textAlign: store.lang.id === 0 ? 'left' : 'right'}}
                value={values.first_name}
                heading={route.params?.type == 1?store.lang.first_name:store.lang.name}
                error={touched.first_name && errors.first_name && true}
                icon={
                  <Feather
                    name="user"
                    style={{
                      marginRight:
                        store.lang.id == 0
                          ? RFPercentage(1.5)
                          : RFPercentage(0),
                      marginLeft:
                        store.lang.id == 0
                          ? RFPercentage(0)
                          : RFPercentage(1.5),
                    }}
                    size={RFPercentage(2.8)}
                    color={colors.purple[0]}
                  />
                }
                placeholder={route.params?.type == 1?store.lang.first_name:store.lang.name}
                onChangeText={handleChange('first_name')}
                onBlur={() => setFieldTouched('first_name')}
              />
              {touched.first_name && errors.first_name && (
                <JErrorText>{errors.first_name}</JErrorText>
              )}
               {route.params?.type == 1 && (
              <JInput
                maxLength={100}
                style={{textAlign: store.lang.id === 0 ? 'left' : 'right'}}
                value={values.last_name}
                heading={store.lang.last_name}
                error={touched.last_name && errors.last_name && true}
                icon={
                  <Feather
                    name="user"
                    style={{
                      marginRight:
                        store.lang.id == 0
                          ? RFPercentage(1.5)
                          : RFPercentage(0),
                      marginLeft:
                        store.lang.id == 0
                          ? RFPercentage(0)
                          : RFPercentage(1.5),
                    }}
                    size={RFPercentage(2.8)}
                    color={colors.purple[0]}
                  />
                }
                placeholder={store.lang.last_name}
                onChangeText={handleChange('last_name')}
                onBlur={() => setFieldTouched('last_name')}
                containerStyle={{marginTop: RFPercentage(3)}}
              />)}
              {touched.last_name && errors.last_name && (
                <JErrorText>{errors.last_name}</JErrorText>
              )}
              <JInput
                style={{textAlign: store.lang.id === 0 ? 'left' : 'right'}}
                maxLength={100}
                value={values.email}
                error={touched.email && errors.email && true}
                heading={store.lang.email}
                icon={
                  <Feather
                    name="mail"
                    style={{
                      marginRight:
                        store.lang.id == 0
                          ? RFPercentage(1.5)
                          : RFPercentage(0),
                      marginLeft:
                        store.lang.id == 0
                          ? RFPercentage(0)
                          : RFPercentage(1.5),
                    }}
                    size={RFPercentage(2.7)}
                    color={colors.purple[0]}
                  />
                }
                placeholder={store.lang.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                containerStyle={{marginTop: RFPercentage(3)}}
              />
              {touched.email && errors.email && (
                <JErrorText>{errors.email}</JErrorText>
              )}
              {route.params?.type !== 1 && (
                <JInput
                  style={{textAlign: store.lang.id === 0 ? 'left' : 'right'}}
                  value={values.company_name}
                  error={touched.company_name && errors.company_name && true}
                  heading={store.lang.company_name}
                  icon={
                    <JIcon
                      icon={'an'}
                      name="home"
                      style={{
                        marginRight:
                          store.lang.id == 0
                            ? RFPercentage(1.3)
                            : RFPercentage(0),
                        marginLeft:
                          store.lang.id == 0
                            ? RFPercentage(0)
                            : RFPercentage(1.3),
                      }}
                      size={RFPercentage(3)}
                      color={colors.purple[0]}
                    />
                  }
                  placeholder={store.lang.company_name}
                  onChangeText={handleChange('company_name')}
                  onBlur={() => setFieldTouched('company_name')}
                  containerStyle={{marginTop: RFPercentage(3)}}
                />
              )}
              {touched.company_name && errors.company_name && (
                <JErrorText>{errors.company_name}</JErrorText>
              )}

              <JInput
                style={{textAlign: store.lang.id === 0 ? 'left' : 'right'}}
                forPassword={true}
                eye={values.hide}
                maxLength={30}
                onPressEye={() => setFieldValue('hide', !values.hide)}
                error={touched.password && errors.password && true}
                value={values.password}
                heading={store.lang.password}
                icon={
                  <MaterialCommunityIcons
                    name="shield-key-outline"
                    shield-key-outline
                    style={{
                      marginRight:
                        store.lang.id == 0
                          ? RFPercentage(1.3)
                          : RFPercentage(0),
                      marginLeft:
                        store.lang.id == 0
                          ? RFPercentage(0)
                          : RFPercentage(1.3),
                    }}
                    size={RFPercentage(3.2)}
                    color={colors.purple[0]}
                  />
                }
                placeholder={store.lang.password}
                onChangeText={handleChange('password')}
                containerStyle={{marginTop: RFPercentage(2)}}
                onBlur={() => setFieldTouched('password')}
              />
              {touched.password && errors.password && (
                <JErrorText>{errors.password}</JErrorText>
              )}

              <JInput
                style={{textAlign: store.lang.id === 0 ? 'left' : 'right'}}
                forPassword={true}
                eye={values.chide}
                maxLength={30}
                onPressEye={() => setFieldValue('chide', !values.chide)}
                error={
                  touched.confirmPassword && errors.confirmPassword && true
                }
                value={values.confirmPassword}
                heading={store.lang.confirm_password}
                icon={
                  <MaterialCommunityIcons
                    name="shield-key-outline"
                    shield-key-outline
                    style={{
                      marginRight:
                        store.lang.id == 0
                          ? RFPercentage(1.3)
                          : RFPercentage(0),
                      marginLeft:
                        store.lang.id == 0
                          ? RFPercentage(0)
                          : RFPercentage(1.3),
                    }}
                    size={RFPercentage(3.2)}
                    color={colors.purple[0]}
                  />
                }
                placeholder={store.lang.confirm_password}
                onChangeText={handleChange('confirmPassword')}
                containerStyle={{marginTop: RFPercentage(3)}}
                onBlur={() => setFieldTouched('confirmPassword')}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <JErrorText>{errors.confirmPassword}</JErrorText>
              )}

              <JRow
                style={{
                  marginTop: RFPercentage(3),
                  paddingLeft: RFPercentage(1),
                }}>
                <CheckBox
                style={{ width: RFPercentage(Platform.OS=='ios'?2.5:4.5), height: RFPercentage(Platform.OS=='ios'?2.5:4.5) }}
                  tintColor={'gray'}
                  onCheckColor={colors.purple[0]}
                  onFillColor={colors.white[0]}
                  onTintColor={colors.purple[0]}
                  tintColors={{true: colors.purple[0], false: 'black'}}
                  boxType="square"
                  value={values.policy}
                  onValueChange={value => setFieldValue('policy', value)}
                />

                <JText style={{marginHorizontal: RFPercentage(2)}}>
                  {store.lang.you_agree_to_the_JobSkills}
                  {'\n'}
                  <JText
                    fontWeight="bold"
                    style={{marginHorizontal: RFPercentage(2)}}>
                    {store.lang.terms_and_conditions}
                  </JText>
                </JText>
              </JRow>
              {touched.policy && errors.policy && (
                <JErrorText>{errors.policy}</JErrorText>
              )}

              <JButton
                disabled={loader ? true : socialLoader ? true : false}
                isValid={isValid}
                style={{marginTop: RFPercentage(3)}}
                onPress={() => handleSubmit()}
                children={
                  loader
                    ? store.lang.loading
                    : route.params?.type === 1
                    ? store.lang.register_as_jobseeker
                    : store.lang.register_as_employee
                }
              />
            </ScrollView>
          </View>
        )}
      </Formik>
      <View style={{flex: 0.1, alignItems: 'center'}}>
        <JDivider children={store.lang.or_register_with} />
        <View
          style={{
            flexDirection: 'row',
            marginTop: RFPercentage(3),
            justifyContent: 'space-evenly',
            width: '80%',
          }}>
         {['google', 'facebook'].map((item, index) => (
            <FontAwesome
              disabled={loader ? true : socialLoader ? true : false}
              onPress={() => {
                if (item == 'google') {
                  _googleLogin({store,_googleAccess});
                } else {
                  // console.log('else');
                  // facebookLogin();
                  alert('Facebook is currently not available')
                }
              }}
              key={index}
              name={item}
              size={RFPercentage(3.5)}
              color={colors.purple[0]}
            />
          ))}

         { Platform.OS == 'ios' && 
         <FontAwesome
       onPress={() => _onAppleAuth({store,_appleAccess})}
                  name="apple"
                  shield-key-outline
                  style={{
                    marginRight:
                      store.lang.id == 0 ? RFPercentage(1.5) : RFPercentage(0),
                    marginLeft:
                      store.lang.id == 0 ? RFPercentage(0) : RFPercentage(1.5),
                  }}
                  size={RFPercentage(3.7)}
                  color={colors.purple[0]}
                />}
          <LinkedInModal
            ref={linkedRef}
            permissions={['openid', 'profile', 'email']}
            areaTouchText={0}
            renderButton={renderCustomButton}
            clientID="77cqmetnwrry8n"
            clientSecret="N0UciK26PIVoDqa1"
            redirectUri={
              'https://dev.jobskills.digital/login/linkedin-openid/callback'
            }
            onSuccess={token => {
              // console.log(token);
              store.setLinkdinToken(token);
              _linkdinAccess();
            }}
          />
        </View>
      </View>

      <JFooter
        disabled={socialLoader ? true : false}
        onPress={() =>
          navigation.navigate('CLogin', {type: route.params?.type})
        }
        children={store.lang.already_Login}
      />
      <JModal
      //  load={loader1}
        icon
        HW={8}
        WW={8}
        header2Style={{marginTop: RFPercentage(-2),}}
        menuStyle={{marginVertical: RFPercentage(1),}}
        name2={store.lang.close}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        alertMsg2={ `${store.lang.Please_follow_these_additional_steps}:`}
        msg2={`1: ${store.lang.Go_to_Settings_then_tap_your_name}.\n2: ${store.lang.Tap_Sign_In_Security}.\n3: ${store.lang.Tap_Sign_in_with_apple}.`}
        btn={false}
        onPressNo={() => {
          setModalVisible(false);
        }}

      />
    </JScreen>
  );
};
export default observer(Registration);
const styles = StyleSheet.create({});
