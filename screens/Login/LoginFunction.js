import {
  AppleButton,
  appleAuth,
  appleAuthAndroid,
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {v4 as uuid} from 'uuid';
import 'react-native-get-random-values';
import url from '../../config/url';
import {JToast} from '../../functions/Toast';

import RNRestart from 'react-native-restart';

export async function _appleAndroidAuth({store, _appleAccess}) {
  // Generate secure, random values for state and nonce
  // Generate secure, random values for state and nonce
  const rawNonce = uuid();
  const state = uuid();

  try {
    // Initialize the module
    appleAuthAndroid.configure({
      // The Service ID you registered with Apple
      clientId: 'digital.jobskills.dev',

      // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
      // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
      redirectUri:
        'https://dev.jobskills.digital/login/sign-in-with-apple/callback',

      // [OPTIONAL]
      // Scope.ALL (DEFAULT) = 'email name'
      // Scope.Email = 'email';
      // Scope.Name = 'name';
      scope: appleAuthAndroid.Scope.ALL,

      // [OPTIONAL]
      // ResponseType.ALL (DEFAULT) = 'code id_token';
      // ResponseType.CODE = 'code';
      // ResponseType.ID_TOKEN = 'id_token';
      responseType: appleAuthAndroid.ResponseType.ALL,

      // [OPTIONAL]
      // A String value used to associate a client session with an ID token and mitigate replay attacks.
      // This value will be SHA256 hashed by the library before being sent to Apple.
      // This is required if you intend to use Firebase to sign in with this credential.
      // Supply the response.id_token and rawNonce to Firebase OAuthProvider
      nonce: rawNonce,

      // [OPTIONAL]
      // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
      state,
    });

    const response = await appleAuthAndroid.signIn();
    if (response) {
      const code = response.code; // Present if selected ResponseType.ALL / ResponseType.CODE
      const id_token = response.id_token; // Present if selected ResponseType.ALL / ResponseType.ID_TOKEN
      const user = response.user; // Present when user first logs in using appleId
      const state = response.state; // A copy of the state value that was passed to the initial request.
      console.log('Got auth code', code);
      console.log('Got id_token', id_token);
      console.log('Got user', user);
      console.log('Got state', state);
    }
  } catch (error) {
    if (error && error.message) {
      switch (error.message) {
        case appleAuthAndroid.Error.NOT_CONFIGURED:
          console.log('appleAuthAndroid not configured yet.');
          break;
        case appleAuthAndroid.Error.SIGNIN_FAILED:
          console.log('Apple signin failed.');
          break;
        case appleAuthAndroid.Error.SIGNIN_CANCELLED:
          console.log('User cancelled Apple signin.');
          break;
        default:
          break;
      }
    }
  }
}

export async function _onAppleAuth({store, _appleAccess}) {
  // performs login request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });
  // get current authentication state for user
  // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
  const credentialState = await appleAuth.getCredentialStateForUser(
    appleAuthRequestResponse.user,
  );

  // use credentialState response to ensure the user is authenticated
  if (credentialState === appleAuth.State.AUTHORIZED) {
    console.log('code auth apple', appleAuthRequestResponse);
    console.log('auth Token========>', appleAuthRequestResponse.identityToken);
    console.log('auth Email========>', appleAuthRequestResponse.email);
    console.log('auth fullName=======>', appleAuthRequestResponse.fullName);
    console.log(
      'auth givenName======>',
      appleAuthRequestResponse.fullName.givenName,
    );
    // console.log("auth user========>",appleAuthRequestResponse)
    _appleAccess(appleAuthRequestResponse);
    // user is authenticated
    // _storeToken(result, true),
  }
}

export const _googleLogin = async ({store, _googleAccess}) => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    store.setGoogleUserInfo(userInfo); // You might need to replace this with your actual storage implementation.
    const getToken = await GoogleSignin.getTokens();
    store.setGoogleToken(getToken.accessToken);
    _googleAccess(); // You might need to define this function.
    console.log('getToken=====>', getToken.accessToken);
  } catch (error) {
    console.log(error);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('user cancelled the login flow', error);
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('operation (e.g. sign in) is in progress already', error);
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('play services not available or outdated', error);
      // play services not available or outdated
    } else {
      console.log('some other error happened', error);
      // some other error happened
    }
  }
};

export const _googleSignOut = async store => {
  try {
    await GoogleSignin.revokeAccess(); // Revoke access to the app
    await GoogleSignin.signOut(); // Sign out from the Google account
    // Now, the user can sign in with a different Google account next time.
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

export const _changeLanguage = ({store, selectedLanguage, token, src}) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);

  var formdata = new FormData();
  formdata.append('languageName', selectedLanguage);
  // console.log(formdata);
  fetch(`${url.baseUrl}/change-language`, {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  })
    .then(response => response.json())
    .then(result => {
      if (result.success == true && src == 1) { 
          JToast({
            type: 'success',
            // text1: store.lang.success,
            text1: result.message,
          });
        RNRestart.restart();
      } else if(!result.success){
        JToast({
          type: 'danger',
          text1: store.lang.error,
          text2: result.message,
        });
      }
    })
    .catch(error => console.log('error', error));
};
