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
// import 'moment/locale/ur';
// import 'moment/locale/ar';
const JNotification = ({item}) => {
  const navigation = useNavigation();
  const store = useContext(StoreContext);
  //  moment.locale( store.lang.id === 0 ?'en': store.lang.id === 1 ? 'ur':'ar') ;

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
        marginVertical: RFPercentage(2),
        backgroundColor: '#F8FAFC',
        paddingHorizontal: RFPercentage(2),
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}>
      <View
        style={{
          backgroundColor: '#F2F2F7',
          height: RFPercentage(10),
          width: '20%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <JIcon icon="ma" name={'bell-outline'} size={RFPercentage(6)} />
      </View>
      <View
        style={{
          width: '75%',
          // height:RFPercentage(10),
          justifyContent: 'center',
          paddingVertical: RFPercentage(2),
          marginHorizontal: RFPercentage(1),
        }}>
        <JText style={{fontWeight: '700', marginTop: RFPercentage(0.5)}}>
          {item.title}
        </JText>
        {/* {item.text !== null && <JText style={{marginTop:RFPercentage(1),backgroundColor:'red'}}>{(item.text)}</JText>} */}
      </View>
      <JText
        style={[
          styles.txt,
          {right: store.lang.id === 0 ? RFPercentage(2) : RFPercentage(2)},
        ]}>
        {moment(item.created_at).fromNow()}
      </JText>
    </JRow>
  );
};

export default JNotification;

const styles = StyleSheet.create({txt: {position: 'absolute', top: 1}});
