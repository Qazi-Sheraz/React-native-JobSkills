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
import { StoreContext } from '../mobx/store';
import { useContext } from 'react';
import { observer } from 'mobx-react';

const JEmployeUser = ({item,update}) => {
  const store=useContext(StoreContext);
  const {navigate} = useNavigation();
  return (
    <Pressable
      style={{
        
        marginVertical: RFPercentage(1),
        borderBottomWidth: RFPercentage(0.1),
        borderBottomColor: colors.border[0],
        // marginBottom: RFPercentage(1),
      }}>
<JRow>
        <JText style={styles.Hname}>{item.name}</JText>
</JRow>
      <JRow
        style={{
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          paddingVertical: RFPercentage(0.8),
        }}>
        {/* <Menu>
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
          </Menu> */}
        <View>
          <JText style={styles.txt}>{item.email}</JText>
          <JText style={styles.txt}>{item.role}</JText>
        </View>
        <JText
   style={{
     paddingHorizontal: RFPercentage(1.5),
     paddingVertical: RFPercentage(1),
     backgroundColor:
       (item.status==='Active' && item.status_arabic==='نشيط')
         ? colors.success[0]
         :(item.status==='Pending' && item.status_arabic==='قيد الانتظار')
         && colors.primary[0],
     color: colors.white[0],
     textAlign: 'center',
   }}>
  {store.lang.id===0?item.status:store.lang.id===1?item.status:item.status_arabic}
 </JText>
        {/* <JStatus status={store.lang.id===0?item.status:item.status_arabic} /> */}
      </JRow>
    </Pressable>
  );
};

export default observer(JEmployeUser);

const styles = StyleSheet.create({
   Hname: {
    fontSize: RFPercentage(2.3),
    fontWeight: 'bold',
    width:'75%'
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
