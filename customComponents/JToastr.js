import React, { useState, useEffect } from 'react';
import colors from '../config/colors';
import { JToast } from '../functions/Toast';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import { Button, Image, View } from 'react-native';
const JToastr = () => {
  
  return (
    <View style={{ flex: 1 }}>
          <FlashMessage position="top" />
    <Button
      onPress={() => {
        /* HERE IS WHERE WE'RE GOING TO SHOW OUR FIRST MESSAGE */
        showMessage({
            message: "Hello World",
            description: "This is our custom icon message",
            // backgroundColor:'white',
            // icon: props => <Image source={require("../assets/images/gradient/bg_splash.jpeg")} {...props} />,
            type: "success",
        });
      }}
      title="Request Details"
      color="#841584"
    />
  </View>
  );
};

export default JToastr;