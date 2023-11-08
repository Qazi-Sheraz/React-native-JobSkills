import {StyleSheet, View, Platform} from 'react-native';
import React, {useEffect, useState, useContext, useRef} from 'react';
import url from '../../config/url';
import {observer} from 'mobx-react';
import colors from '../../config/colors';
import {StoreContext} from '../../mobx/store';
import JText from '../../customComponents/JText';
import JRow from '../../customComponents/JRow';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import {JToast} from '../../functions/Toast';
import * as yup from 'yup';
import {Formik} from 'formik';
import JInput from '../../customComponents/JInput';
import JButton from '../../customComponents/JButton';
import JScreen from '../../customComponents/JScreen';
import JFooter from '../../customComponents/JFooter';
import JDivider from '../../customComponents/JDivider';
import Feather from 'react-native-vector-icons/Feather';
import JErrorText from '../../customComponents/JErrorText';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import JCircularLogo from '../../customComponents/JCircularLogo';
import CheckBox from '@react-native-community/checkbox';
import {RFPercentage} from 'react-native-responsive-fontsize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  LoginManager,
  AccessToken,
  AuthenticationToken,
} from 'react-native-fbsdk-next';
import LinkedInModal from '@smuxx/react-native-linkedin';
import { AppleButton,
  appleAuth,
  appleAuthAndroid,
  AppleAuthRequestOperation,
  AppleAuthRequestScope
} from '@invertase/react-native-apple-authentication';
import { _appleAndroidAuth, _googleLogin, _googleSignOut, _onAppleAuth } from './LoginFunction';
import JModal from '../../customComponents/JModal';

const Login = ({navigation, route}) => {
 
  GoogleSignin.configure({
    // webClientId: '505367788352-ad42uav54vqdr5ronovee2k66qtvpl5q.apps.googleusercontent.com',
    // offlineAccess: true,
  });

  const store = useContext(StoreContext);
  const [loader, setLoader] = useState(false);
  const [loader1, setLoader1] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [socialLoader, setSocialLoader] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [edit, setEdit] = useState();

  // console.log('edit', edit);
  const type = route?.params?.type;
  console.log('type', type);

  const _storeToken = (token, remember) => {
    if (remember === true) {
      // alert('remember')
      AsyncStorage.setItem('@login', JSON.stringify(token))
        .then(res => {
          store.setToken(token);
          console.log('res', token);
        })
        .catch(error => {
          JToast({
            type: 'danger',
            text1: store.lang.eror,
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
  useEffect(() => {
    getStoredLanguage();
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

  const updateUserDeviceToken = (messagingInstance, userId, deviceName) => {
    return new Promise((resolve, reject) => {
      if (requestUserPermission()) {
        messagingInstance
          ?.getToken()
          .then(fcmToken => {
            console.log('FCM Token -> ', fcmToken);
            var formdata = new FormData();
            formdata.append('user_id', userId);
            formdata.append('token', fcmToken);
            formdata.append('name', deviceName);
            formdata.append('os', Platform.OS);
            formdata.append('version', Platform.Version);
            // console.log(formdata);
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
                console.log('error', error);
                reject(error); // Reject the promise with the error
              });

            messagingInstance.onTokenRefresh(newToken => {
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

    fetch(
      type == 1
        ? `${url.baseUrl}/users/login`
        : `${url.baseUrl}/employer/login`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        // console.log('Result===>',result);

        if (result.token) {
          _storeToken(result, values.remember);
          updateUserDeviceToken();
          JToast({
            type: 'success',
            text1: store.lang.login_successfully,
            text2: store.lang.welcome,
          });

          var myHeaders = new Headers();
          myHeaders.append('Authorization', `Bearer ${result.token}`);
          var formdata = new FormData();
          formdata.append('languageName', selectedLanguage);
          console.log(formdata);
          fetch(`${url.baseUrl}/change-language`, {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow',
          })
            .then(response => response.json())
            .then(result => {
              if (result.success) {
                console.log(result.message);
                // RNRestart.restart()
              } else {
                console.log(result.message);
              }
            })
            .catch(error => console.log('error', error));
        } else {
          if (result == 'Incorrect Password!') {
            JToast({
              type: 'danger',
              // text1: store.lang.eror,
              text1: store.lang.incorrect_password,
            });
          } else if (result == 'Incorrect Email') {
            JToast({
              type: 'danger',
              // text1: store.lang.eror,
              text1: store.lang.incorrect_email,
            });
          } else if (result == 'Please verify your Email!') {
            _verifyEmail(values.email);
          }
        }
        setLoader(false);
      })
      .catch(error => {
        JToast({
          type: 'danger',
          text1: store.lang.eror,
          text2: store.lang.cannot_proceed_your_request,
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
          JToast({
            type: 'danger',
            text1: store.lang.no_email_found,
            text2: store.lang.kindly_register_with_that_email_address,
          });
        } else {
          JToast({
            type: 'success',
            // text: result,
            text1: store.lang.kindly_check_your_email_address,
          });
        }
      })
      .catch(error => {
        JToast({
          type: 'danger',
          text1: store.lang.eror,
          text2: store.lang.cannot_proceed_your_request,
        });
      });
  };

  const getStoredLanguage = async () => {
    try {
      const storedLanguage = await AsyncStorage.getItem('selectedLanguage');
      if (storedLanguage) {
        setSelectedLanguage(storedLanguage);
      }
    } catch (error) {
      console.log('Error retrieving stored language:', error);
    }
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
        console.log('Result===>', result);

        if (result.token) {
          _storeToken(result, true),
            updateUserDeviceToken(),
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
        console.log('Result__Linkdin===>', result);

        if (result) {
          _storeToken(result, true),
            updateUserDeviceToken(),
            JToast({
              type: 'success',
              text1: store.lang.login_successfully,
              text2: store.lang.welcome,
            });
          setSocialLoader(false);
        }
      })
      .catch(error => {
        // logoutFromLinkedIn
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
    
      console.log(formdata)
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };
      fetch(`${url.baseUrl}/login-with-apple`, requestOptions)

        .then(response => response.json())
        .then(result => {
          console.log('Result__Apple===>', result);

          if (result.token) {
            _storeToken(result, true),
              updateUserDeviceToken(),
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
          console.log("error",error)
          JToast({
            type: 'danger',
            text1: store.lang.eror,
            text2: store.lang.cannot_proceed_your_request,
          });
          setSocialLoader(false)
        });
    };

  

  // const facebookLogin = async () => {
  //   try {
  //     const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  //     console.log('result', result)
  //     if (result.isCancelled) {
  //       console.log('Login cancelled');
  //     } else {
  //       const data = await AccessToken.getCurrentAccessToken();
  //       console.log('dataaaa------>', data)
  //       if (data) {
  //         console.log('Logged in with Facebook!');
  //         console.log('User ID:', data.userID);
  //         console.log('Access Token:', data.accessToken);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Facebook login error:', error);
  //   }
  // };

  const facebookLogin = async () => {
    try {
      const loginResult = await LoginManager.logInWithPermissions(
        ['public_profile', 'email'],
        'limited',
        'my_nonce'
      );
      console.log(loginResult);
  
      if (Platform.OS === 'ios') {
        const authResult = await AuthenticationToken.getAuthenticationTokenIOS();
        console.log(authResult?.authenticationToken);
      } else {
        const accessTokenResult = await AccessToken.getCurrentAccessToken();
        console.log(accessTokenResult?.accessToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const _responseInfoCallback = (error, result) => {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      alert('Result Name: ' + result.name);
      console.log('result===================', result.name);
      setEdit(result);
    }
  };

  const linkedRef = useRef(null);

  const handleLinkedInLogin = () => {
    // Open the LinkedIn login modal
    linkedRef.current.open();
  };

  const renderCustomButton = () => (
    <FontAwesome
      disabled={loader ? true : socialLoader ? true : false}
      onPress={() => {
        handleLinkedInLogin();
      }}
      name={'linkedin'}
      size={RFPercentage(3.5)}
      color={colors.purple[0]}
    />
  );
  // const logoutFromLinkedIn = async () => {
  //   try {
  //     // Revoke the LinkedIn access token using the library's method
  //     // Note: The method to revoke the token may vary based on the library's API.
  //     // Replace 'revokeAccessToken' with the actual method if provided.
  //     await linkedRef.current.revokeAccessToken();

  //     // Clear local session data, e.g., user credentials
  //     // (You'll need to implement this part based on your app's structure)

  //     // Update the UI to reflect the user's logout
  //     // (Update your components or navigate to a logout screen)
  //   } catch (error) {
  //     // Handle any errors that may occur during the logout process
  //     console.error('LinkedIn logout error:', error);
  //   }
  // };
  async function performAppleSignIn() {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation?.LOGIN,
        requestedScopes: [AppleAuthRequestScope?.FULL_NAME, AppleAuthRequestScope?.EMAIL],
      });
  
      // Handle the response here (e.g., send it to your server for authentication).
      console.log('Apple Sign-In Response:', appleAuthRequestResponse);
  
      // You can access user information using appleAuthRequestResponse.user
    } catch (error) {
      console.error('Apple Sign-In Error:', error);
      // Handle the error appropriately
    }
  }
  useEffect(() => {
    performAppleSignIn();
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    // return appleAuth.onCredentialRevoked(async () => {
    //   console.warn('If this function executes, User Credentials have been Revoked');
    // });
  }, []); // passing in an empty array as the second argument ensures this is only ran once when component mounts initially.
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
            .min(0, store.lang.Email_address_cannot_be_empty)
            .max(
              100,
              store.lang.Email_address_must_be_at_most_100_characters_long,
            )
            .required(store.lang.Email_is_a_required_field),
          password: yup
            .string()
            .min(6, store.lang.Password_Must_be_at_least_6_characters)
            .max(16, store.lang.Password_must_be_at_most_15_characters)
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
                  tintColor={'gray'}
                  onCheckColor={colors.purple[0]}
                  onFillColor={colors.white[0]}
                  onTintColor={colors.purple[0]}
                  tintColors={{true: colors.purple[0], false: 'black'}}
                  boxType="square"
                  value={values.remember}
                  onValueChange={value => setFieldValue('remember', value)}
                />

                <JText style={{marginHorizontal: RFPercentage(1)}}>
                  {store.lang.remember}
                </JText>
              </JRow>
              <JText
                onPress={() =>
                  navigation.navigate('ForgetPassword', {
                    type: type,
                    email: values.email,
                  })
                }>
                {store.lang.forgot_password}
              </JText>
            </JRow>

            <JButton
              disabled={loader ? true : socialLoader ? true : false}
              isValid={isValid}
              style={{marginTop: RFPercentage(3)}}
              onPress={() => handleSubmit()}
              children={
                loader
                  ? store.lang.loading
                  : type === 1
                  ? store.lang.login_as_jobseeker
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
            alignItems: 'center',
            width: '80%',
          }}>
          
          {['google', 'facebook'].map((item, index) => (
            <FontAwesome
              disabled={loader ? true : socialLoader ? true : false}
              onPress={() => {
                if (item == 'google') {
                  _googleLogin({store,_googleAccess});
                } else {
                  console.log('else');
                  // facebookLogin();
                  alert('facebook')
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
              console.log(token);
              store.setLinkdinToken(token);
              _linkdinAccess();
            }}
          />
        </View>
      </View>

      <JFooter
        disabled={socialLoader ? true : false}
        onPress={() => navigation.navigate('CRegister', {type: type})}
        children={store.lang.register_Btn}
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
export default observer(Login);
const styles = StyleSheet.create({});
