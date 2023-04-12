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
import { StoreContext } from '../mobx/store';
import { useContext } from 'react';
import moment from 'moment';

export default function JApplication({
  Hname,
  status,
  ApplyDate,
  onSelect,
  onPress,
  item,
}) {
  const store = useContext(StoreContext);
  const navigation=useNavigation();
  return (
    <Pressable onPress={()=> navigation.navigate('ProfileApplication')}
      style={{
        backgroundColor: colors.tileColor[0],
        marginVertical: RFPercentage(0.2),
        paddingHorizontal:RFPercentage(1),
        
      }}>

        <JRow style={{
          justifyContent: 'space-between',
        }}>
        <JText style={styles.Hname}>{item.candidate_name}</JText>
        <Menu >
            <MenuTrigger
              style={{width:RFPercentage(3),height:RFPercentage(4),alignItems: 'center', justifyContent: 'center'}}>
              <JIcon icon={'sm'} name={'options-vertical'} size={20} />
            </MenuTrigger>

            <MenuOptions>
              <MenuOption onSelect={onSelect}>
                <JText style={styles.menutxt}>{store.lang.drafted}</JText>
              </MenuOption>
              <MenuOption onSelect={onSelect}>
                <JText style={styles.menutxt}>{store.lang.applied}</JText>
              </MenuOption>
              <MenuOption onSelect={onSelect}>
                <JText style={styles.menutxt}>{store.lang.rejected}</JText>
              </MenuOption>
              <MenuOption onSelect={onSelect}>
                <JText style={styles.menutxt}>{store.lang.selected}</JText>
              </MenuOption>
              <MenuOption onSelect={onSelect}>
                <JText style={styles.menutxt}>{store.lang.shortlisted}</JText>
              </MenuOption>
              <MenuOption onSelect={onSelect}>
                <JText style={styles.menutxt}>{store.lang.interview_scheduled}</JText>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </JRow>
      <JRow
        style={{
          justifyContent: 'space-between',
          paddingVertical:RFPercentage(1)
        }}>
          <View>
          <JText style={styles.txt}>{store.lang.apply_date} {moment(item.apply_date, 'DD-MM-YYYY').format('DD MMM,YYYY')}</JText>
          <JRow >
            <JText style={styles.txt}>{store.lang.fit_score} {item.fit_scores==null?'N/A':item.fit_scores} </JText>
              <JIcon onPress={onPress} style={styles.info} icon="fe" name={'info'} />
             </JRow></View>
          <View
          style={{
            marginTop: RFPercentage(2),
            alignItems: store.lang.id == 0 ? 'flex-end': null,
            justifyContent: 'flex-end',
          }}>
          <JStatusChecker status={item.status} />
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
    width:'80%'
  },
  info: {
    height: RFPercentage(3),
    width: RFPercentage(4),
    alignItems:'center',
    margin:RFPercentage(1)
    
  },
  txt: {fontSize: RFPercentage(2), marginVertical: RFPercentage(0.3)},
  menutxt: {
    fontSize: RFPercentage(2),
    marginVertical: RFPercentage(0.5),
    paddingHorizontal: RFPercentage(1),
  },
});
