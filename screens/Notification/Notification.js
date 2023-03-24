import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import JScreen from '../../customComponents/JScreen';

import {StoreContext} from '../../mobx/store';
import {observer} from 'mobx-react';
import JText from '../../customComponents/JText';
import JGradientHeader from '../../customComponents/JGradientHeader';
import colors from '../../config/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';
import JIcon from '../../customComponents/JIcon';

function Notification ({navigation, route}) {
  const store = useContext(StoreContext);
  const params = route.params || {};
  const {id} = params;
  return (
    <JScreen  header={ 
    <JGradientHeader 
      left={
        <JIcon
        icon={'fe'}
          onPress={() => navigation.goBack()}
          name="chevron-left"
          size={RFPercentage(3.5)}
          color={colors.white[0]}
        />
      }
      center={
        <JText 
        fontColor={colors.white[0]}
        fontWeight="bold"
        fontSize={RFPercentage(2.5)}>
        Notification
        </JText>}
        />
        }>
     
      <JText>{id}</JText>
    </JScreen>
  );
}

export default observer(Notification);
const styles = StyleSheet.create({});
