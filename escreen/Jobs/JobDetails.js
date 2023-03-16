import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import JScreen from '../../customComponents/JScreen'
import JHeader from '../../customComponents/JHeader'
import JGradientHeader from '../../customComponents/JGradientHeader'
import JText from '../../customComponents/JText'
import colors from '../../config/colors'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { StoreContext } from '../../mobx/store'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import JIcon from '../../customComponents/JIcon'
import JRow from '../../customComponents/JRow'

const JobDetails = () => {
  return (
   <JScreen header={
    <JGradientHeader 
   
    height={heightPercentageToDP(25)}
    alignItems={'flex-start'}
    paddingTop={RFPercentage(2)}
    left={
      <JIcon icon={'fe'} name="chevron-left"/>
      
    }
    right={
      <JIcon icon={'an'}  name="poweroff"/>
     
    } 
    children={
      <View style={{marginTop:RFPercentage(1)}}>
        <JRow >
        <JText style={styles.headertxt}>Project Manager</JText>
        <JText style={{fontSize:RFPercentage(1.8),color:'#ffff',marginLeft:RFPercentage(5)}}>Date posted: 09 Sep 2021</JText>
        </JRow>
        <JRow>
        <JIcon icon={'fe'} name={'chevron-left'}/>
        <JText style={styles.txt}>
         Devoteam
        </JText>
        </JRow>
        <JRow>
        <JIcon icon={'fe'} name={'chevron-left'}/>
        <JText style={styles.txt}>
        Ar-Riyad, Ar-Riyad, Saudi Arabia
        </JText>
        </JRow>
        <JRow>
        <JIcon icon={'fe'} name={'chevron-left'}/>
        <JText style={styles.txt}>
        Expires On: 09 Dec 2021
        </JText>
        <JText style={styles.txt}>
        5 open jobs
        </JText>
        </JRow>

      </View>
    }
    />
   }> 
   <JText> nsjndfjn</JText></JScreen>
  )
}

export default JobDetails

const styles = StyleSheet.create({
  headertxt:{fontSize:RFPercentage(2.5),fontWeight:'bold',color:'#ffff'},
  txt:{fontSize:RFPercentage(1.8),color:'#ffff'},
})