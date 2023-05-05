import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import JText from './JText';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JRow from './JRow';
import colors from '../config/colors';

const JSkills = ({JobTitle,date,Locate,txt}) => {
  
  return (
    
      <View
        style={{
          width: '100%',
          paddingHorizontal: RFPercentage(1),
          borderBottomWidth: RFPercentage(0.1),
          marginBottom: RFPercentage(1),
          borderBottomColor: colors.border[0],
          paddingVertical: RFPercentage(1),
        }}>
        <JRow
          style={{
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginVertical: RFPercentage(0.5),
          }}>
          <JText style={styles.Jtitle}>{JobTitle}</JText>
          <JText>{date}</JText>
        </JRow>
        <JText
          style={{
            fontSize: RFPercentage(1.7),
            marginVertical: RFPercentage(0.5),
          }}>
          {Locate}
        </JText>
        <JText
          style={{
            fontSize: RFPercentage(1.5),
            marginVertical: RFPercentage(0.5),
          }}>
          {txt}
        </JText>
      </View>
  );
};

export default JSkills;

const styles = StyleSheet.create({
 
 
  Jtitle:{
    width:RFPercentage(30),
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
  },
});
