import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React ,{useEffect}from 'react';
import JRow from './JRow';
import JIcon from './JIcon';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../config/colors';
import JText from './JText';
import {useState} from 'react';
import { baseUrl } from '../ApiUrls';
import { useContext } from 'react';
import { StoreContext } from '../mobx/store';
import { useRoute } from '@react-navigation/native';

const JStatusbar = ({item}) => {
  const [index, setIndex] = useState();
  const [loader, setLoader] = useState(true);
  const {params}= useRoute()
  const _getStatusbar=()=> {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDZjZDg5MzZkNmQ0ZWE3NTQ5N2RlZDZhMDgwNjliNzM1NmRmYmQ5YzZlODRmZmFiZTE2NjQ4N2VkN2ExMWFkMzk1YzgyZjZkNGRkNWZkMGUiLCJpYXQiOjE2ODAyNTA2NDYuNzg0NjAxLCJuYmYiOjE2ODAyNTA2NDYuNzg0NjA0LCJleHAiOjE3MTE4NzMwNDYuNzc3NzY2LCJzdWIiOiI4NCIsInNjb3BlcyI6W119.XQA1UjOHQZkuqkLbAY0V8quXIn6dBY_ZIl8Igkko0Kv1ODdOrVXmUsnbUu59jeIg_I8mVgcnH3XGRSoEDAXb5YSocyD1POwDo7_ED1dc4TYeniS7RrBwoJ4ZTyLFdc0rWo7inelD9n2HoLHquTsh6_tz4QAyc8xaB4_58H3LvKo86FEWoBTY4NsP3CAGzylD-8-SEIHze-HfeYjaaRoVlDeQpY6d3mfqzmBummF7nKHtkLSgTCEEaEsIx2yhZTrapWL-5GKdx-aj1qmKbTE5WYGUgMVu-39Mz7GCvYMryN5HF-9Y4guufDMT0atrXnc7BkyRe0lIVfNE3ga9GcSePLDkzMrCbBjmfTmvKuxoT-sXyXFb7_vu8FogA6Pc7v77LTciuuc9duwRSpK3_fxMy4dZucnFTGx7tTWSwlipQWthwa3wd0gVs5F9cXpgVxLk4Pndxuq-PF8_DvpbWNOCXsm0KWO59zbPgSVyil18KUv4F9NduT49z3MQgzfY9yjE1rkSgRW5Va4PGQhVEle5f2Dce-bysgPhWWK0wrQtLd1AVpbhLIIqI4obDo-2OFdK62GwLor1RfKU0Qc_WiP-8UOljUnVBskGVRVlqvDL8yblrM7ro73JbgpJPlV4Uz67FaC22iyhLbJsRnbQpJVKWgfcw6jyGqjKPaspsFYpPoM");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(`${baseUrl}/candidate/job-application/${params?.job_id}/status/${params.candidate_id}`, requestOptions)

      .then(response => response.json())
      .then(result => {
        console.log(result.jobApplicationStatus)
        setIndex(result.jobApplicationStatus)})
      .catch(error => console.log('error', error))
      .finally(() => {
        setLoader(false);
      });
  };
  useEffect(() => {
  _getStatusbar();
  }, [loader])

  return (
    loader?<ActivityIndicator/>:
    (
    <>
      <JRow
        style={{

          // marginVertical: RFPercentage(2),
          justifyContent: 'center',
          // backgroundColor:'red',
          // marginHorizontal: RFPercentage(2),
        }}>
        <JIcon
       
          style={{
            marginRight: 0,
          }}
          icon="io"
          name={index === 0 ?  'checkmark-circle-outline':'checkmark-circle'}
          color={colors.purple[0]}
          size={30}
        />

        <View
          style={[
            styles.line,
            {backgroundColor: index > 0 ? colors.purple[0] : 'transparent' },
          ]}
        />

        <JIcon
          
          style={{
            marginHorizental: RFPercentage(-1),
            // marginLeft: RFPercentage(-0.8),
          }}
          icon="io"
          name={index >  2 ?  'checkmark-circle':'checkmark-circle-outline' }
          color={colors.purple[0]}
          size={30}
        />

        <View
          style={[
            styles.line,
            {
              backgroundColor:
               
                  index > 4 || index === 3   ? colors.purple[0]
                  :  'transparent',
            },
          ]}
        />
        <JIcon
          
          style={{
            marginHorizental: RFPercentage(-1),
            // marginLeft: RFPercentage(-0.8),
          }}
          icon="io"
          name={index > 5 || index ===3  ? 'checkmark-circle':'checkmark-circle-outline' }
          color={colors.purple[0]}
          size={30}
        />
        <View
          style={[
            styles.line,
            {
              backgroundColor:
                index > 6 || index === 3 
                  ? colors.purple[0]
                  :  'transparent',
            },
          ]}
        />
        <JIcon
         
          style={{
            marginHorizental: RFPercentage(-0.5),
            // marginLeft: RFPercentage(-0.8),
          }}
          icon="io"
          name={index === 3 || index >  8 ? 'checkmark-circle' : 'checkmark-circle-outline'}
          color={colors.purple[0]}
          size={30}
        />
        <View
          style={[
            styles.line,
            {
              backgroundColor:
                index === 3
                  ? colors.purple[0] :'transparent',
            },
          ]}
        />
        <JIcon
          
          style={{marginHorizental: RFPercentage(-0.5)}}
          icon="ma"
          name={index === 3  ? 'star-circle' : 'star-circle-outline'}
          color={colors.purple[0]}
          size={30}
        />
      </JRow>
      <JRow style={{justifyContent:'space-evenly',width:'70%'}}>
      <JText>Shortlisted</JText>
      <JText>Interview{'\n'}Scheduled</JText>
      <JText>Interview{'\n'}Completed</JText>
      </JRow>
    </>)
  );
};

export default JStatusbar;

const styles = StyleSheet.create({
  line: {
    borderTopWidth: RFPercentage(0.1),
    borderBottomWidth: RFPercentage(0.1),
    borderColor: colors.purple[0],
    // width: RFPercentage(8),
    paddingHorizontal:RFPercentage(4),
    height: RFPercentage(1.5),
    marginRight: RFPercentage(-0.5),
    marginLeft: RFPercentage(-0.7),
    
  },
});
