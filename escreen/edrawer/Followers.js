import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import JScreen from '../../customComponents/JScreen';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JText from '../../customComponents/JText';
import JSearchInput from '../../customComponents/JSearchInput';
import JIcon from '../../customComponents/JIcon';
import { RFPercentage } from 'react-native-responsive-fontsize';
import colors from '../../config/colors';
import JGradientProfileHeader from '../../customComponents/JGradientProfileHeader';
import { useNavigation } from '@react-navigation/native';

const Followers = () => {
  const navigation=useNavigation();
  return (
    <JScreen style={{paddingHorizontal: RFPercentage(2),}}
      header={
        
        <JGradientHeader
          center={
          <JText  fontColor={colors.white[0]}
          fontWeight="bold"
          fontSize={RFPercentage(2.5)}>Followers</JText>
        }
          left={
            <JIcon
              icon="fe"
              onPress={() => navigation.goBack()}
              name="chevron-left"
              size={RFPercentage(3.5)}
              color={colors.white[0]}
            />
          }
        />
      }>
       <JSearchInput
        length={1}
        onChangeText={e => {
          store.setAllFeatureCompanyInput(e);
        }}
        onPressIcon={() => alert('Icon Pressed')}
      />
    </JScreen>
  );
};

export default Followers;

const styles = StyleSheet.create({});
