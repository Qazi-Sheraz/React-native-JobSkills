import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import JText from './JText';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JRow from './JRow';

const JSkills = ({title,JobTitle,date,txt,txt2,source,JobTitle1,txt3,txt4,date1,source1}) => {
  
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: '#ffff',
        paddingHorizontal: RFPercentage(3),
        paddingVertical: RFPercentage(2),
        marginBottom:RFPercentage(1)
      }}>
        {title&&
      <JText style={styles.title}>{title}</JText>}
     <View>
       <JRow style={{borderBottomWidth:RFPercentage(0.1),borderColor:'grey', paddingVertical:RFPercentage(1)}}>
        <Image style={styles.img}  source={source}/>
        <View style={{width: '60%',paddingHorizontal: RFPercentage(1),}}>
          <JRow
            style={{
              justifyContent: 'space-between',
              
              marginVertical: RFPercentage(0.5),
            }}>
            <JText style={styles.Jtitle}>{JobTitle}</JText>
            <JText>{date}</JText>
          </JRow>
          <JText style={{fontSize:RFPercentage(1.7),marginVertical: RFPercentage(0.5)}}>{txt}</JText>
          <JText style={{fontSize:RFPercentage(1.5),marginVertical: RFPercentage(0.5)}}>{txt2}</JText>
        </View>
      </JRow>
      </View>
     
     
     
    </View>
  );
};

export default JSkills;

const styles = StyleSheet.create({
  img: {
    height: RFPercentage(10),
    width: RFPercentage(10),
    backgroundColor: 'gray',
    
  },
  title: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    marginVertical: RFPercentage(1),
  },
  Jtitle: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    // marginVertical: RFPercentage(0.5),
  },
});
