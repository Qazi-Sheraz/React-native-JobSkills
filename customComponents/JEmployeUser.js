import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import JRow from './JRow';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../config/colors';
import {useNavigation} from '@react-navigation/native';
import JText from './JText';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import JIcon from './JIcon';
import Edit from '../assets/svg/Icon/Edit.svg';
import Delete from '../assets/svg/Icon/Delete.svg';
import JStatus from './JStatus';

const JEmployeUser = ({name,email,text,status}) => {
  const {navigate} = useNavigation();
  return (
    <Pressable
      
      style={{
        backgroundColor: colors.tileColor[0],
        marginVertical: RFPercentage(0.2),
      }}>
      <JRow
        style={{
          justifyContent: 'space-between',
          
        }}>
        <View >
          <JText style={styles.Hname}>{name}</JText>
          <JText style={styles.txt}>{email}</JText>
          <JText style={styles.txt}>{text}</JText>
        </View>
        <View
          style={{
            paddingVertical: RFPercentage(1),
            flexDirection: 'column',
            height: RFPercentage(13),
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}>
          <Menu >
            <MenuTrigger
              style={{
                width: RFPercentage(3),
                height: RFPercentage(4),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <JIcon icon={'sm'} name={'options-vertical'} size={20} />
            </MenuTrigger>

            <MenuOptions style={{width:RFPercentage(10),}}>
              <MenuOption style={{flexDirection:'row',alignItems:'center',}}>
                <Edit/>
                <JText style={styles.menutxt}>Edit</JText>
              </MenuOption>
              <MenuOption style={{flexDirection:'row',alignItems:'center'}}>
                <Delete/>
                <JText style={styles.menutxt}>Delete</JText>
              </MenuOption>
            </MenuOptions>
          </Menu>

          <JStatus status={status} />
        </View>
      </JRow>
    </Pressable>
  );
};

export default JEmployeUser;

const styles = StyleSheet.create({ Hname: {
    fontSize: RFPercentage(2.3),
    fontWeight: 'bold',
    // marginVertical: RFPercentage(0.5),
  },
  info: {
    height: RFPercentage(3),
    width: RFPercentage(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {fontSize: RFPercentage(1.9), marginVertical: RFPercentage(0.3)},
  menutxt: {
    fontSize: RFPercentage(2),
    marginVertical: RFPercentage(0.5),
    paddingHorizontal: RFPercentage(1),
  },});
