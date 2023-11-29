import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import JRow from './JRow';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JIcon from './JIcon';
import JText from './JText';
import {StoreContext} from '../mobx/store';
import {useContext} from 'react';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

const JNotification = ({item,allData}) => {
  const navigation = useNavigation();
  const store = useContext(StoreContext);
console.log('allData',allData.notificationTypeEnglish[item.type])
  let data;
  try {
    data = JSON.parse(item?.text);
  } catch (error) {
    // Handle the JSON parsing error here
    console.error('Error parsing JSON:', error);
  }
  // console.log('notii',data)
  // console.log('notii',data?.candidate_id)
  // console.log(data?.job_id);
  return (
    <JRow
      disabled={false}
      onPress={() => {
        if (data?.type == 'candidate-details') {
          navigation.navigate('ProfileApplication', {
            id: data?.id,
            job_id: data?.job_id,
            candidate_id: data?.candidate_id,
          });
        } else if (data?.type == 'applied-jobs') {
          navigation.navigate('AppliedJobs');
        } else if (data?.type == 'job-application') {
          navigation.navigate('JobApplication', {id: data?.job_id});
        } else {
          navigation.navigate('CJobDetails', {
            id: data?.job_id,
          });
        }
      }}
      style={{
        marginVertical: RFPercentage(1),
        backgroundColor: '#F8FAFC',
        paddingHorizontal: RFPercentage(2),
        // shadowColor: '#000',
        // shadowOffset: {
        //   width: 0,
        //   height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,

        // elevation: 1,
      }}>
      <View
        style={{
          backgroundColor: '#F2F2F7',
          // height: RFPercentage(8),
          paddingVertical: RFPercentage(1.5),
          width: '20%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <JIcon icon="ma" name={'bell-outline'} size={RFPercentage(5)} />
      </View>
      <View
        style={{
          width: '78%',
          // height:RFPercentage(8),
          // justifyContent: 'center',
          // paddingVertical: RFPercentage(1),
          marginHorizontal: RFPercentage(1),
          // backgroundColor:'red',
        }}>
          <JRow style={{width: '100%',justifyContent:'space-between',}}>

        <JText style={{fontSize:RFPercentage(1.8),color:"#3C3C43" }}>
          {`${store.lang.id==0?allData.notificationTypeEnglish[item.type]:allData.notificationTypeArabic[item.type]}`}
        </JText>
        <JText style={[styles.txt]}>
        {moment(item.created_at).fromNow()}
      </JText>
        </JRow>
        <JText style={{ marginTop: RFPercentage(0.8),}}>
        
          {`${allData.notificationTypeEnglish[item.meta] ? store.lang.id==0?allData.notificationTypeEnglish[item.meta]:allData.notificationTypeArabic[item.meta]:''} ${item.title}`}
        </JText>
        {/* {item.text !== null && <JText style={{marginTop:RFPercentage(1),backgroundColor:'red'}}>{(item.text)}</JText>} */}
      </View>
    
    </JRow>
  );
};

export default JNotification;

const styles = StyleSheet.create({txt: {
  // position: 'absolute',
  //  top: -1,
  color:"#3C3C43",
   fontSize:RFPercentage(1.7)
  }
});
