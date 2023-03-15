import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../config/colors';
import JText from './JText';
import {RFPercentage} from 'react-native-responsive-fontsize';

import JButton from './JButton';
import JErrorText from './JErrorText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NetInfo from '@react-native-community/netinfo';
export default function JScreen({
  children,
  style,
  left,
  center,
  right,
  headerShown = true,
  header,
  isError = false,
  onReloadPress,
  errorText,
  onTryAgainPress,
  internet = true,
}) {
  const [netInfo, setNetInfo] = useState('');
  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetInfo(state);
    });

    return () => {
      // Unsubscribe to network state updates
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
      }}>
      {headerShown && header}

      {internet === true && netInfo.isConnected === false ? (
        <View style={[{flex: 9}, style]}>
          <View
            style={{
              height: '70%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                height: RFPercentage(30),
                width: RFPercentage(30),
              }}
              source={require('../assets/images/errors/internet.png')}
            />
            <JText
              fontSize={RFPercentage(4)}
              style={{marginTop: RFPercentage(5)}}>
              Ops
            </JText>
            <JText
              fontAlign="center"
              fontSize={RFPercentage(2)}
              style={{marginTop: RFPercentage(1), width: '70%'}}>
              Look like you are lost! May be you are not connected to the
              internet.
            </JText>
          </View>
          <View
            style={{
              height: '30%',
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingBottom: RFPercentage(3),
            }}>
            <JButton
              children={'Try Again'}
              onPress={onTryAgainPress}
              style={{height: RFPercentage(5), width: RFPercentage(40)}}
            />
          </View>
        </View>
      ) : isError === true ? (
        <View style={[{flex: 9}, style]}>
          <View
            style={{
              height: '70%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                height: RFPercentage(30),
                width: RFPercentage(30),
              }}
              source={require('../assets/images/errors/error.png')}
            />
            <JText
              fontSize={RFPercentage(4)}
              style={{marginTop: RFPercentage(5)}}>
              Error
            </JText>
            <JText
              fontAlign="center"
              fontSize={RFPercentage(2)}
              style={{marginTop: RFPercentage(1), width: '70%'}}>
              we are sorry, we weren’t able to complete your request.
            </JText>
          </View>
          <View
            style={{
              height: '30%',
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingBottom: RFPercentage(3),
            }}>
            <JButton
              children={'Try Again'}
              onPress={onTryAgainPress}
              style={{height: RFPercentage(5), width: RFPercentage(40)}}
            />
          </View>
        </View>
      ) : (
        <View style={[styles.container, style]}>{children}</View>
      )}

      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'}
        hidden={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 9,
  },
  views: {justifyContent: 'center', alignItems: 'center'},
});
