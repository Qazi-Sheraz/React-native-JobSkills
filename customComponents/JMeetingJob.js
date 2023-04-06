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
    <JRow
    disabled={false}
    onPress={onPress}
      style={{
        justifyContent:'space-between',
        marginTop: RFPercentage(2),
        marginHorizontal: RFPercentage(2),
        paddingBottom:RFPercentage(2),
        borderBottomWidth: RFPercentage(0.1),
        borderColor: '#969696',
      }}>
     
      <View >
        <JText fontWeight="bold" fontSize={RFPercentage(2.2)}>
         {item.job_title}
        </JText>
        <JText
            style={{
              fontSize: RFPercentage(1.9),marginVertical:RFPercentage(0.5)
            }}>
            {item.candidate_name}
          </JText>
        <JRow
            style={{
              marginVertical: RFPercentage(1),
            }}>
                <EvilIcons name="calendar" size={RFPercentage(2.5)} />

             <JText style={{marginHorizontal:RFPercentage(1)}}>
             {moment(item.start_date_and_time).format('DD MMM,YYYY')}
        </JText>
             <JText >
            
          {moment(item.start_date_and_time).format('HH:MM' )}{'\r'}{item.meridiem}
        </JText>
          </JRow>
        
      </View> 
      <JRow
      onPress={startonPress}
          style={styles.startBtn}>
          <JText
            style={{marginHorizontal: RFPercentage(0.5), color:colors.white[0] }}
            fontWeight="bold">
            {store.lang.start}
          </JText>
          <Entypo name="controller-play" size={RFPercentage(2)} color={colors.white[0]}/>
        </JRow>
    </JRow>
  )
}

export default observer(JMeetingJob)

const styles = StyleSheet.create({
    startBtn:{
        borderRadius:RFPercentage(1),
        padding:RFPercentage(1),
        backgroundColor: colors.purple[0],
      },
})