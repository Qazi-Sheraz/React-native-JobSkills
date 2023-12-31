import {
  View,
  Image,
  Platform,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import JText from './JText';
import JButton from './JButton';
import colors from '../config/colors';
import NetInfo from '@react-native-community/netinfo';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {StoreContext} from '../mobx/store';
export default function JScreen({
  style,
  left,
  right,
  header,
  center,
  children,
  errorText,
  onReloadPress,
  onTryAgainPress,
  isError = false,
  internet = true,
  headerShown = true,
}) {
  const store = useContext(StoreContext);
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
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'}
       
        hidden={false}
        backgroundColor={colors.purple[0]}
        translucent={false}
      />
      
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
              Oops
            </JText>
            <JText
              fontAlign="center"
              fontSize={RFPercentage(2)}
              style={{marginTop: RFPercentage(1), width: '70%'}}>
              {store.lang.you_are_not_connected}
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
              children={store.lang.try_again}
              onPress={onTryAgainPress}
              style={{height: RFPercentage(5), width: RFPercentage(40)}}
            />
          </View>
        </View>
      ) : (
        // ) : isError === true ? (
        //   <View style={[{flex: 9}, style]}>
        //     <View
        //       style={{
        //         height: '70%',
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //       }}>
        //       <Image
        //         style={{
        //           height: RFPercentage(30),
        //           width: RFPercentage(30),
        //         }}
        //         source={require('../assets/images/errors/error.png')}
        //       />
        //       <JText
        //         fontSize={RFPercentage(4)}
        //         style={{marginTop: RFPercentage(5)}}>
        //         Error
        //       </JText>
        //       <JText
        //         fontAlign="center"
        //         fontSize={RFPercentage(2)}
        //         style={{marginTop: RFPercentage(1), width: '70%'}}>
        //         we are sorry, we weren’t able to complete your request.
        //       </JText>
        //     </View>
        //     <View
        //       style={{
        //         height: '30%',
        //         justifyContent: 'flex-end',
        //         alignItems: 'center',
        //         paddingBottom: RFPercentage(3),
        //       }}>
        //       <JButton
        //         children={'Try Again'}
        //         onPress={onTryAgainPress}
        //         style={{height: RFPercentage(5), width: RFPercentage(40)}}
        //       />
        //     </View>
        //   </View>
        // )
        <View style={[styles.container, style]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 9,
  },
  views: {justifyContent: 'center', alignItems: 'center'},
});
