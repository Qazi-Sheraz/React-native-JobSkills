import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React ,{useEffect,useContext,useState}from 'react';
import JRow from './JRow';
import JIcon from './JIcon';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../config/colors';
import JText from './JText';
import { StoreContext } from '../mobx/store';
import { useRoute } from '@react-navigation/native';
import url from '../config/url';
import { observer } from 'mobx-react';


const JStatusbar = ({item}) => {
  const [index, setIndex] = useState(item);
  const [loader, setLoader] = useState(true);
  const {params}= useRoute()
  const store = useContext(StoreContext);
  console.log(item)
  const _getStatusbar=()=> {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${store.token?.token}`,{
      // 'Accept': 'application/json',
      // 'Content-Type': 'application/json'
    });
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(
      `${url.baseUrl}/candidate/job-application/${params?.job_id}/status/${params.candidate_id}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result.jobApplicationStatus)
        setIndex(result.jobApplicationStatus);
      })
      .catch(error => {})
      .finally(() => {
        setLoader(false);
      });
  };
  // useEffect(() => {
  // _getStatusbar();
  // }, [loader])

  return (
    // loader?<ActivityIndicator/>:
    // (
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
      <JText>{store.lang.shortlisteds}</JText>
      <JText>{store.lang.Interview}{'\n'}{store.lang.scheduled}</JText>
      <JText>{store.lang.Interview}{'\n'}{store.lang.completed}</JText>
      </JRow>
    </>
  );
};

export default observer(JStatusbar);

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
