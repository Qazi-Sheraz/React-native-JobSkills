import {Pressable, StyleSheet, View} from 'react-native';
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
import { useState } from 'react';
import {baseUrl} from '../ApiUrls';
import Toast from 'react-native-toast-message';

export default function JApplication({
  Hname,
  status,
  ApplyDate,
  onSelect,
  onPress,
  item,
  jobApplications,
}) {
  
  const store = useContext(StoreContext);
  const navigation=useNavigation();
const [stat,setStat]=useState(item.status);
  const [selectedStatus, setSelectedStatus] = useState();
  const handleStatusSelect = (status1) => {
    setSelectedStatus(status1);
    status1==store.lang.drafted
    ?_applicantsStatus(0,'Drafted')
    :  status1== store.lang.applied
    ?_applicantsStatus(1,'Applied')
    :  status1==store.lang.rejected
    ?_applicantsStatus(2,'Rejected')
    :  status1==store.lang.selected
    ?_applicantsStatus(3,'Selected')
    :  status1==store.lang.shortlisted
    ?_applicantsStatus(4,'Shortlisted')
    :  status1==store.lang.invitation_Sent
    ?_applicantsStatus(5,'Invitation Sent')
    :  status1==store.lang.interview_scheduled
    ?_applicantsStatus(6,'Interview Scheduled')
    :  status1==store.lang.interview_accepted
    ?_applicantsStatus(7,'Interview Accepted')
    :  status1==store.lang.interview_rescheduled
    ?_applicantsStatus(8,'Interview Rescheduled')
    :  status1==store.lang.interview_completed && _applicantsStatus(9,'Interview Completed')
    console.log(status1)
  };
 
  const _applicantsStatus = (id,selectedStatus) => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDZjZDg5MzZkNmQ0ZWE3NTQ5N2RlZDZhMDgwNjliNzM1NmRmYmQ5YzZlODRmZmFiZTE2NjQ4N2VkN2ExMWFkMzk1YzgyZjZkNGRkNWZkMGUiLCJpYXQiOjE2ODAyNTA2NDYuNzg0NjAxLCJuYmYiOjE2ODAyNTA2NDYuNzg0NjA0LCJleHAiOjE3MTE4NzMwNDYuNzc3NzY2LCJzdWIiOiI4NCIsInNjb3BlcyI6W119.XQA1UjOHQZkuqkLbAY0V8quXIn6dBY_ZIl8Igkko0Kv1ODdOrVXmUsnbUu59jeIg_I8mVgcnH3XGRSoEDAXb5YSocyD1POwDo7_ED1dc4TYeniS7RrBwoJ4ZTyLFdc0rWo7inelD9n2HoLHquTsh6_tz4QAyc8xaB4_58H3LvKo86FEWoBTY4NsP3CAGzylD-8-SEIHze-HfeYjaaRoVlDeQpY6d3mfqzmBummF7nKHtkLSgTCEEaEsIx2yhZTrapWL-5GKdx-aj1qmKbTE5WYGUgMVu-39Mz7GCvYMryN5HF-9Y4guufDMT0atrXnc7BkyRe0lIVfNE3ga9GcSePLDkzMrCbBjmfTmvKuxoT-sXyXFb7_vu8FogA6Pc7v77LTciuuc9duwRSpK3_fxMy4dZucnFTGx7tTWSwlipQWthwa3wd0gVs5F9cXpgVxLk4Pndxuq-PF8_DvpbWNOCXsm0KWO59zbPgSVyil18KUv4F9NduT49z3MQgzfY9yjE1rkSgRW5Va4PGQhVEle5f2Dce-bysgPhWWK0wrQtLd1AVpbhLIIqI4obDo-2OFdK62GwLor1RfKU0Qc_WiP-8UOljUnVBskGVRVlqvDL8yblrM7ro73JbgpJPlV4Uz67FaC22iyhLbJsRnbQpJVKWgfcw6jyGqjKPaspsFYpPoM',
    );


    fetch(`${baseUrl}/employer/job-applications/${item.id}/status/${id}`,{
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    }
    )  
      .then(response => response.json())
      .then(result => {
        console.log(`${baseUrl}/employer/job-applications/${item.id}/status/${id}`)
        console.log(result)
        if (result.success == true) {
          setStat(selectedStatus)
        
       }
       else{

         Toast.show({
           type: 'error',
           text1: message,
         });
       }

      })
      .catch(error => console.log('error', error));
  };

  return (
    <Pressable
     onPress={()=> navigation.navigate('ProfileApplication', {candidate_id:item.candidate_id,job_id:item.job_id})}
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
              <MenuOption onSelect={() =>handleStatusSelect(store.lang.drafted)}>
                <JText style={styles.menutxt}>{store.lang.drafted}</JText>
              </MenuOption>
              <MenuOption onSelect={() => handleStatusSelect(store.lang.applied)}>
                <JText style={styles.menutxt}>{store.lang.applied}</JText>
              </MenuOption>
              <MenuOption onSelect={() => handleStatusSelect(store.lang.rejected)}>
                <JText style={styles.menutxt}>{store.lang.rejected}</JText>
              </MenuOption>
              <MenuOption onSelect={() => handleStatusSelect(store.lang.selected)}>
                <JText style={styles.menutxt}>{store.lang.selected}</JText>
              </MenuOption>
              <MenuOption onSelect={() => handleStatusSelect(store.lang.shortlisted)}>
                <JText style={styles.menutxt}>{store.lang.shortlisted}</JText>
              </MenuOption>
              <MenuOption onSelect={() => handleStatusSelect(store.lang.invitation_Sent)}>
                <JText style={styles.menutxt}>{store.lang.invitation_Sent}</JText>
              </MenuOption>
              <MenuOption onSelect={() => handleStatusSelect(store.lang.interview_scheduled)}>
                <JText style={styles.menutxt}>{store.lang.interview_scheduled}</JText>
              </MenuOption>
              <MenuOption onSelect={() => handleStatusSelect(store.lang.interview_accepted)}>
                <JText style={styles.menutxt}>{store.lang.interview_accepted}</JText>
              </MenuOption>
              <MenuOption onSelect={() => handleStatusSelect(store.lang.interview_rescheduled)}>
                <JText style={styles.menutxt}>{store.lang.interview_rescheduled}</JText>
              </MenuOption>
              <MenuOption onSelect={() => handleStatusSelect(store.lang.interview_completed)}>
                <JText style={styles.menutxt}>{store.lang.interview_completed}</JText>
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
            
          <JStatusChecker status={stat} />
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
