import Toast from 'react-native-toast-message';
import React from 'react';
import colors from '../config/colors';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";

export const JToast = ({
  type = 'success',
  text1,
  text2,
  animationDuration=100,
 
}) => {
  // Toast.show({
  //   type: type,
  //   text1: text1,
  //   text2: text2,
  //   visibilityTime: visibilityTime,
  // });
 
  showMessage({
    animationDuration:animationDuration,
    message: text1,
    description: text2,
    // autoHide:autoHide,
    // backgroundColor:'white',
    // icon: props => <Image source={require("../assets/images/gradient/bg_splash.jpeg")} {...props} />,
    type: type,
});



};
