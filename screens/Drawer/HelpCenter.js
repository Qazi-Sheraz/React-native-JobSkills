import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {observer} from 'mobx-react';
import JScreen from '../../customComponents/JScreen';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JText from '../../customComponents/JText';
import colors from '../../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
const HelpCenter = ({navigation}) => {
  return (
    <JScreen
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {'Help Center'}
            </JText>
          }
          left={
            <Feather
              onPress={() => navigation.goBack()}
              name="chevron-left"
              size={RFPercentage(3.5)}
              color={colors.white[0]}
            />
          }
        />
      }>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <JText style={{fontSize: RFPercentage(4)}}>Will Come Soon</JText>
      </View>
    </JScreen>
  );
};

export default observer(HelpCenter);

const styles = StyleSheet.create({});
