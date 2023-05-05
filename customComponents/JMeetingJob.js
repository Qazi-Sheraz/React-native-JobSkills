import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import colors from '../config/colors'
import JText from './JText'
import moment from 'moment'
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import JRow from './JRow'
import { useContext } from 'react'
import { StoreContext } from '../mobx/store'
import { observer } from 'mobx-react-lite'
const JMeetingJob = ({item,startonPress,onPress}) => {
  const store = useContext(StoreContext);
  return (
    <Pressable
      // disabled={false}
      onPress={onPress}
      style={{
        // justifyContent: 'space-between',
        marginBottom: RFPercentage(1),
        paddingVertical: RFPercentage(1),
        borderBottomWidth: RFPercentage(0.1),
        borderBottomColor: colors.border[0],  }}>
      
        <JText fontWeight="bold" fontSize={RFPercentage(2.2)}>
          {item.job_title}
        </JText>
          <JRow style={{justifyContent: 'space-between',paddingVertical: RFPercentage(0.5),alignItems: 'flex-end',}}>
        <View>
         <JText
          style={{
            fontSize: RFPercentage(1.9),
          }}>
          {item.candidate_name}
        </JText>

        <JRow style={{marginTop: RFPercentage(0.5),}}>

            
          <EvilIcons name="calendar" size={RFPercentage(2.5)} />

          <JText style={{marginHorizontal: RFPercentage(0.5)}}>
            {moment(item.start_date_and_time).format('DD MMM,YYYY')}
          </JText>
          <JText>
            {moment(item.start_date_and_time).format('HH:MM')}
            {'\r'}
            {item.meridiem}
          </JText>
        </JRow>

        </View>
      <JRow onPress={startonPress} style={styles.startBtn}>
          <JText
            style={{
              marginHorizontal: RFPercentage(0.5),
              color: colors.white[0],
            }}
            fontWeight="bold">
            {store.lang.start}
          </JText>
          <Entypo
            name="controller-play"
            size={RFPercentage(2)}
            color={colors.white[0]}
          />
        </JRow>
        </JRow>  
    </Pressable>
  );
}

export default observer(JMeetingJob)

const styles = StyleSheet.create({
  startBtn: {
    
    borderRadius: RFPercentage(1),
    padding: RFPercentage(1),
    backgroundColor: colors.purple[0],
  },
});