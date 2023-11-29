import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import JRow from './JRow';
import JText from './JText';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useContext} from 'react';
import {StoreContext} from '../mobx/store';

const JProfileInfo = ({title, text, style, titleStyle, textStyle}) => {
  const store = useContext(StoreContext);
  return (
    <JRow
      style={[
        {justifyContent: 'space-between', marginVertical: RFPercentage(0.5)},
        style,
      ]}>
      <JText
        fontWeight={Platform.OS == 'ios' ? '500' : 'bold'}
        fontSize={RFPercentage(1.7)}
        style={[titleStyle]}>
        {title}
      </JText>
      <JText
        fontSize={RFPercentage(1.8)}
        style={[
          {
            width: '62%',
            textAlign: store.lang.id == 0 ? 'left' : 'right',
            paddingHorizontal: RFPercentage(0.3),
          },
          textStyle,
        ]}>
        {text}
      </JText>
    </JRow>
  );
};

export default JProfileInfo;

const styles = StyleSheet.create({});
