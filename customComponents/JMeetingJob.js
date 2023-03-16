import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import colors from '../config/colors'
import JText from './JText'
import moment from 'moment'
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
const JMeetingJob = ({HeadingName,name2,onPress}) => {
  return (
    <Pressable
    onPress={onPress}
      style={{
        flexDirection: 'row',
        justifyContent:'space-between',
        marginTop: RFPercentage(2),
        marginHorizontal: RFPercentage(2),
        paddingBottom:RFPercentage(2),
        borderBottomWidth: RFPercentage(0.1),
        borderColor: '#969696',
      }}>
     
      <View >
        <JText fontWeight="bold" fontSize={RFPercentage(2.2)}>
         {HeadingName}
        </JText>
        <JText
            style={{
              fontSize: RFPercentage(1.9),marginVertical:RFPercentage(0.5)
            }}>
            {name2}
          </JText>
        <View
            style={{
              flexDirection:'row',
              marginVertical: RFPercentage(1),
            }}>
                <EvilIcons name="calendar" size={RFPercentage(2.5)} />

             <JText style={{marginRight:RFPercentage(1)}}>
             {moment().format('DD MMM,YYYY')}
        </JText>
             <JText >
            
          {moment().format('HH:MM A')}
        </JText>
          </View>
        
      </View> 
      <View
          style={styles.startBtn}>
          <JText
            style={{marginRight: RFPercentage(0.5), color:colors.white[0] }}
            fontWeight="bold">
            Start
          </JText>
          <Entypo name="controller-play" size={RFPercentage(2)} color={colors.white[0]}/>
        </View>
    </Pressable>
  )
}

export default JMeetingJob

const styles = StyleSheet.create({
    startBtn:{
        flexDirection:'row',
        alignSelf:'center',
        borderRadius:RFPercentage(1),
        padding:RFPercentage(1),
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: colors.purple[0],
      },
})