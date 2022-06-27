import {StyleSheet, Image, View} from 'react-native';
import React from 'react';
import JScreen from '../../customComponents/JScreen';
import JText from '../../customComponents/JText';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../../config/colors';

export default function Verified() {
  return (
    <JScreen>
      <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{
            alignSelf: 'center',
            paddingTop: RFPercentage(2),
            height: RFPercentage(27),
            width: RFPercentage(27),
          }}
          resizeMode="contain"
          source={require('../../assets/images/verifyEmail/verified.png')}
        />
        <JText
          fontSize={RFPercentage(2.8)}
          fontWeight={'bold'}
          children="Verified!"
          style={{marginTop: RFPercentage(2)}}
        />
        <JText
          fontWeight={'500'}
          fontAlign="center"
          children="Yahoo, You have successfully verified the account"
          style={{marginTop: RFPercentage(2)}}
        />
      </View>
    </JScreen>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    height: RFPercentage(6),
    width: RFPercentage(6),
    backgroundColor: colors.footer[0],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: RFPercentage(2),
  },
  input: {
    width: RFPercentage(4),
    height: RFPercentage(5),
    borderBottomWidth: RFPercentage(0.2),
    fontSize: RFPercentage(2.5),

    textAlign: 'center',
  },
});
