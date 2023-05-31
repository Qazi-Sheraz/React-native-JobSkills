import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import JText from './JText'
import { observer } from 'mobx-react';
import { StoreContext } from '../mobx/store';
import { useContext } from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import JButton from './JButton';

const JApiError = ({isError,style,onTryAgainPress}) => {
    const store = useContext(StoreContext);
  return (

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
              children={store.lang.try_again}
              onPress={onTryAgainPress}
              style={{height: RFPercentage(5), width: RFPercentage(40)}}
            />
          </View>
        </View>
  )
}

export default observer(JApiError);

const styles = StyleSheet.create({})