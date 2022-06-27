import {
  StyleSheet,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../config/colors';
import JText from './JText';

import Feather from 'react-native-vector-icons/Feather';

export default function JProfileContent({src, name, email, jd}) {
  return (
    <React.Fragment>
      <ImageBackground
        source={src}
        style={{
          height: RFPercentage(20),
          width: RFPercentage(20),
          resizeMode: 'contain',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: RFPercentage(-10),
        }}
        imageStyle={{
          borderRadius: RFPercentage(10),
          borderWidth: RFPercentage(0.5),
          borderColor: colors.white[0],
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute', //Here is the trick
            bottom: 0,
            alignSelf: 'flex-end',
          }}>
          <Feather
            name="upload"
            size={RFPercentage(3.5)}
            color={colors.purple[0]}
          />
        </TouchableOpacity>
      </ImageBackground>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: RFPercentage(1),
        }}>
        <JText fontSize={RFPercentage(3)}>{name}</JText>
        <JText style={styles.text}>{email}</JText>
        <JText style={styles.text}>{jd}</JText>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({});
