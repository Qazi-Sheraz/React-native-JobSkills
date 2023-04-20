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

const JEmployeUser = ({item}) => {
  const {navigate} = useNavigation();
  return (
    <Pressable
      style={{
        backgroundColor: colors.tileColor[0],
        marginBottom: RFPercentage(0.5),
        paddingHorizontal:RFPercentage(1),
      }}>
      <JRow
        style={{
          justifyContent: 'space-between',
        }}>
        <View>
          <JText style={styles.Hname}>{item.name}</JText>
          <JText style={styles.txt}>{item.email}</JText>
          <JText style={styles.txt}>{item.role}</JText>
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
            <MenuTrigger
              style={{
                width: RFPercentage(3),
                height: RFPercentage(4),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <JIcon icon={'sm'} name={'options-vertical'} size={20} />
            </MenuTrigger>

            <MenuOptions>
              <MenuOption>
                <JRow>
                  <Edit />
                  <JText style={styles.menutxt}>Edit</JText>
                </JRow>
              </MenuOption>
              <MenuOption>
                <JRow>
                  <Delete />
                  <JText style={styles.menutxt}>Delete</JText>
                </JRow>
              </MenuOption>
            </MenuOptions>
          </Menu>

          <JStatus status={item.status} />
        </View>
      </JRow>
    </Pressable>
  );
};

export default JEmployeUser;

const styles = StyleSheet.create({ Hname: {
    fontSize: RFPercentage(2.3),
    fontWeight: 'bold',
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
    paddingHorizontal: RFPercentage(2),
  },});
