import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import JText from './JText';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JRow from './JRow';
import colors from '../config/colors';
import JIcon from './JIcon';
import JStatusChecker from './JStatusChecker';
import moment from 'moment';
import { date } from 'yup';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { useState } from 'react';

export default function JApplication({Hname,status,ApplyDate,onSelect,value}) {
  
 
  return (
    <View style={{backgroundColor: colors.tileColor[0],marginVertical: RFPercentage(0.2),}}>
      <JRow
        style={{
          justifyContent: 'space-between',
          marginHorizontal: RFPercentage(3),
          
        }}>
        <View>
          <JText style={styles.Hname}>{Hname}</JText>
          <JText style={styles.txt}>
            Apply Date : {ApplyDate}
          </JText>
          <JRow>
            <JText style={styles.txt}>Fit Score : 90% </JText>
            <JIcon icon="fe" name={'info'} />
          </JRow>
        </View>
        <View
          style={{
            paddingVertical: RFPercentage(1),
            flexDirection: 'column',
            height: RFPercentage(13),
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}>
           <Menu>

      <MenuTrigger style={{alignItems: 'center',justifyContent:'center'}}>
      <JIcon icon={'sm'} name={'options-vertical'} size={20} />
        </MenuTrigger>


      <MenuOptions>
        <MenuOption 
        onSelect={onSelect}
        
        >
          <JText style={styles.menutxt}>Drafted</JText>
        </MenuOption>
        <MenuOption 
       onSelect={onSelect}
       
        >
          <JText style={styles.menutxt}>Applied</JText>
        </MenuOption>
        <MenuOption onSelect={onSelect}
       >
          <JText style={styles.menutxt}>Rejected</JText>
        </MenuOption>
        <MenuOption  onSelect={onSelect}
       >
          <JText style={styles.menutxt}>Selected</JText>
        </MenuOption>
        <MenuOption  onSelect={onSelect}
       >
          <JText style={styles.menutxt}>Shortlisted</JText>
        </MenuOption>
        <MenuOption onSelect={onSelect}
       >
          <JText style={styles.menutxt}>Interview Scheduled</JText>
        </MenuOption>
       
      </MenuOptions>
    </Menu>

          <JStatusChecker status={status} />
        </View>
      </JRow>
    </View>
  );
}

const styles = StyleSheet.create({
  Hname: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    marginVertical: RFPercentage(0.5),
  },
  txt: {fontSize: RFPercentage(2), marginVertical: RFPercentage(0.3)},
  menutxt:{fontSize:RFPercentage(2),marginVertical:RFPercentage(0.5),paddingHorizontal:RFPercentage(1)},
});
