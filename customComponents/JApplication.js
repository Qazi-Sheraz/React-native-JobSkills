import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import JText from './JText';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JRow from './JRow';
import colors from '../config/colors';
import JIcon from './JIcon';
import JStatusChecker from './JStatusChecker';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';

export default function JApplication({
  Hname,
  status,
  ApplyDate,
  onSelect,
  onPress,
}) {
  const navigation=useNavigation();
  return (
    <Pressable onPress={()=> navigation.navigate('ProfileApplication')}
      style={{
        backgroundColor: colors.tileColor[0],
        marginVertical: RFPercentage(0.2),
      }}>
      <JRow
        style={{
          justifyContent: 'space-between',
          marginHorizontal: RFPercentage(3),
        }}>
        <View>
          <JText style={styles.Hname}>{Hname}</JText>
          <JText style={styles.txt}>Apply Date : {ApplyDate}</JText>
          <JRow>
            <JText style={styles.txt}>Fit Score : 90% </JText>
            <Pressable onPress={onPress} style={styles.info}>
              <JIcon icon="fe" name={'info'} />
            </Pressable>
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
          <Menu >
            <MenuTrigger
              style={{width:RFPercentage(3),height:RFPercentage(4),alignItems: 'center', justifyContent: 'center'}}>
              <JIcon icon={'sm'} name={'options-vertical'} size={20} />
            </MenuTrigger>

            <MenuOptions>
              <MenuOption onSelect={onSelect}>
                <JText style={styles.menutxt}>Drafted</JText>
              </MenuOption>
              <MenuOption onSelect={onSelect}>
                <JText style={styles.menutxt}>Applied</JText>
              </MenuOption>
              <MenuOption onSelect={onSelect}>
                <JText style={styles.menutxt}>Rejected</JText>
              </MenuOption>
              <MenuOption onSelect={onSelect}>
                <JText style={styles.menutxt}>Selected</JText>
              </MenuOption>
              <MenuOption onSelect={onSelect}>
                <JText style={styles.menutxt}>Shortlisted</JText>
              </MenuOption>
              <MenuOption onSelect={onSelect}>
                <JText style={styles.menutxt}>Interview Scheduled</JText>
              </MenuOption>
            </MenuOptions>
          </Menu>

          <JStatusChecker status={status} />
        </View>
      </JRow>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  Hname: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    marginVertical: RFPercentage(0.5),
  },
  info: {
    height: RFPercentage(3),
    width: RFPercentage(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {fontSize: RFPercentage(2), marginVertical: RFPercentage(0.3)},
  menutxt: {
    fontSize: RFPercentage(2),
    marginVertical: RFPercentage(0.5),
    paddingHorizontal: RFPercentage(1),
  },
});
