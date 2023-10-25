import { StyleSheet, View, Platform, Modal, SafeAreaView } from 'react-native';
import React, { useEffect, useState, useContext, useRef } from 'react';
import JScreen from '../../customComponents/JScreen';
import JCircularLogo from '../../customComponents/JCircularLogo';
import JText from '../../customComponents/JText';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Formik } from 'formik';
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
import { StoreContext } from '../../mobx/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JRow from '../../customComponents/JRow';
import { observer } from 'mobx-react';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import { JToast } from '../../functions/Toast';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import {
  LoginManager, AccessToken, GraphRequest, GraphRequestManager,
} from 'react-native-fbsdk-next';
import LinkedInModal from '@smuxx/react-native-linkedin';


const Login = ({ navigation, route }) => {

  GoogleSignin.configure({
    // webClientId: '505367788352-ad42uav54vqdr5ronovee2k66qtvpl5q.apps.googleusercontent.com',
    // offlineAccess: true,
  })
  const store = useContext(StoreContext);
  const [loader, setLoader] = useState(false);
  const [socialLoader, setSocialLoader] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [edit, setEdit] = useState();

  console.log('edit', edit)
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

  // console.log('DeviceInfo', deviceName)


  const updateUserDeviceToken = (messagingInstance, userId, deviceName) => {
    return new Promise((resolve, reject) => {
      if (requestUserPermission()) {
        messagingInstance?.getToken()
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

    fetch(type == 1 ? `${url.baseUrl}/users/login` : `${url.baseUrl}/employer/login`, requestOptions)
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
          myHeaders.append("Authorization", `Bearer ${result.token}`);
          var formdata = new FormData();
          formdata.append("languageName", selectedLanguage);
          console.log(formdata)
          fetch(`${url.baseUrl}/change-language`, {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
          })
            .then(response => response.json())
            .then(result => {
              if (result.success) {

                console.log(result.message)
                // RNRestart.restart()
              }
              else {
                console.log(result.message)
              }
            })
            .catch(error => console.log('error', error));

        } else {
          if (result == "Incorrect Password!") {
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
      const storedLanguage = await AsyncStorage.getItem('selectedLanguage')
      if (storedLanguage) {
        setSelectedLanguage(storedLanguage)
      }
    } catch (error) {
      console.log('Error retrieving stored language:', error);
    }
  };


  const _googleAccess = () => {
    setSocialLoader(true)
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch(`${url.baseUrl}/login/google/callback?access_token=${store.googleToken}&type=${type}`, requestOptions)

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
          setSocialLoader(false)
        }
      })
      .catch(error => {
        googleSignOut();
        JToast({
          type: 'danger',
          text1: store.lang.eror,
          text2: store.lang.cannot_proceed_your_request,
        });
        setSocialLoader(false)
      });
  };
  console.log('linkdinToken', store.linkdinToken?.access_token)
  const _linkdinAccess = () => {
    setSocialLoader(true)
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch(`${url.baseUrl}/login/linkedin/callback?access_token=${store.linkdinToken?.access_token}&type=${type}`, requestOptions)

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
          setSocialLoader(false)
        }
      })
      .catch(error => {
        // logoutFromLinkedIn
        JToast({
          type: 'danger',
          text1: store.lang.eror,
          text2: store.lang.cannot_proceed_your_request,
        });
        setSocialLoader(false)
      });
  };

  const gooleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      store.setGoogleUserInfo(userInfo);
      const getToken = await GoogleSignin.getTokens()
      store.setGoogleToken(getToken.accessToken);
      _googleAccess();
      console.log('getToken=====>', getToken.accessToken)

    } catch (error) {
      console.log(error)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('user cancelled the login flow', error);
        alert('user cancelled the login flow', error)
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('operation (e.g. sign in) is in progress already', error);
        alert('operation (e.g. sign in) is in progress already', error)
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('play services not available or outdated', error);
        alert('play services not available or outdated', error)
        // play services not available or outdated
      } else {
        console.log('some other error happened', error);
        alert('some other error happened', error)
        // some other error happened
      }
    }
  };

  const googleSignOut = async () => {
    try {
      await GoogleSignin.revokeAccess(); // Revoke access to the app
      await GoogleSignin.signOut(); // Sign out from the Google account
      // Now, the user can sign in with a different Google account next time.
    } catch (error) {
      console.error('Error signing out:', error);
    }
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

  const facebookLogin = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      // LoginManager.setLoginBehavior('web_only'),
      function (result, error) {
        if (error) {
          alert('login has error: ' + result.error);
        } else if (result.isCancelled) {
          alert('login is cancelled.');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const infoRequest = new GraphRequest(
              '/me?fields=name,picture',
              null,
              _responseInfoCallback,
            );
            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
            console.log('result', data);
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
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
  return (
    <JScreen>
      <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
        <JCircularLogo multiple={1.4} />
        <JText
          fontSize={RFPercentage(2.8)}
          fontWeight={'bold'}
          children={store.lang.welcome}
          style={{ marginTop: RFPercentage(2) }}
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
            .max(100,store.lang.Email_address_must_be_at_most_100_characters_long )
            .required(store.lang.Email_is_a_required_field),
          password: yup
            .string()
            .min(6, store.lang.Password_Must_be_at_least_6_characters)
            .max(16,store.lang.Password_must_be_at_most_15_characters )
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
              style={{ textAlign: store.lang.id === 0 ? 'left' : 'right' }}
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
              style={{ textAlign: store.lang.id === 0 ? 'left' : 'right' }}
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
              containerStyle={{ marginTop: RFPercentage(3) }}
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
                  tintColors={{ true: colors.purple[0], false: 'black' }}
                  boxType="square"
                  value={values.remember}
                  onValueChange={value => setFieldValue('remember', value)}
                />

                <JText style={{ marginHorizontal: RFPercentage(1) }}>
                  {store.lang.remember}
                </JText>
              </JRow>
              <JText onPress={() => navigation.navigate('ForgetPassword', { type: type, email: values.email })}>
                {store.lang.forgot_password}
              </JText>
            </JRow>

            <JButton
              disabled={loader ? true : socialLoader ? true : false}
              isValid={isValid}
              style={{ marginTop: RFPercentage(3) }}
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
      <View style={{ flex: 0.15, alignItems: 'center' }}>
        <JDivider children={store.lang.login_with} />
        <View
          style={{
            flexDirection: 'row',
            marginTop: RFPercentage(3),
            justifyContent: 'space-evenly',
            width: '80%',
          }}>
          {/* {['google', 'facebook', 'linkedin', 'twitter'].map((item, index) => (
            <FontAwesome
              onPress={() => {
                if (item == 'google') {
                  // gooleLogin()
                  alert('google')
                }
                else if (item == 'facebook') {
                  facebookLogin()
                  // alert('facebook')
                }
                else if (item == 'linkedin') {
                  handleLinkedInLogin()
                  // alert('linkedin')
                }
                else {
                  alert('twitter')
                }
              }}
              key={index}
              name={item}
              size={RFPercentage(3.5)}
              color={colors.purple[0]}
            />
          ))} */}
          {['google', 'facebook'].map((item, index) => (
            <FontAwesome
              disabled={loader ? true : socialLoader ? true : false}
              onPress={() => {
                if (item == 'google') {
                  gooleLogin()
                }
                else {
                  console.log("else")
                  // facebookLogin()
                }
              }}
              key={index}
              name={item}
              size={RFPercentage(3.5)}
              color={colors.purple[0]}
            />
          ))}
          <LinkedInModal
            ref={linkedRef}
            permissions={['openid', 'profile', 'email']}
            areaTouchText={0}
            renderButton={renderCustomButton}
            clientID="77cqmetnwrry8n"
            clientSecret="N0UciK26PIVoDqa1"
            redirectUri={"https://dev.jobskills.digital/login/linkedin-openid/callback"}
            onSuccess={(token) => {
              console.log(token)
              store.setLinkdinToken(token)
              _linkdinAccess()
            }}
          />

        </View>
      </View>

      <JFooter
        disabled={socialLoader ? true : false}
        onPress={() => navigation.navigate('CRegister', { type: type })}
        children={store.lang.register_Btn}
      />

    </JScreen>

  );
}
export default observer(Login)
const styles = StyleSheet.create({});


