import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Image,
  View,
  Linking,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import JScreen from '../../customComponents/JScreen';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../../config/colors';
import JText from '../../customComponents/JText';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JMeetingJob from '../../customComponents/JMeetingJob';
import RBSheet from 'react-native-raw-bottom-sheet';
import {observer} from 'mobx-react';
import {StoreContext} from '../../mobx/store';
import {useContext} from 'react';
import {useState} from 'react';
import url from '../../config/url';
import { useIsFocused } from '@react-navigation/native';
import JNotfoundData from '../../customComponents/JNotfoundData';
import JApiError from '../../customComponents/JApiError';
import JEmpty from '../../customComponents/JEmpty';
import { JToast } from '../../functions/Toast';
import CLNotification from '../../loaders/Candidate/Notification/CLNotification';

const Meeting = ({isempty=false,}) => {
  const store = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState();
  // console.log(data1.join_url)
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const isFoucs = useIsFocused();
  const _getmeeting = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${store.token?.token}`,
    );

    fetch(`${url.baseUrl}/meetings`, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    })
      .then(response => response.json())
      .then(result => {
        // console.log(result.Meetings);
        setData(result.Meetings)
        
      })

      .catch(error => {
        // console.log('error', error);
        JToast({
          type: 'danger',
          text1: store.lang.eror,
          text2: store.lang.error_while_getting_data,
        });
        setError(true);
      })

      .finally(() => {
        setLoader(false);
      });
  };
  const _getmeetingInfo = (id) => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${store.token?.token}`,{
        'Accept': 'application/json',
        'Content-Type': 'application/json'

      }
    );

    fetch(`${url.baseUrl}/employer/meetingInfo/${id}`, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    })
      .then(response => response.json())
      .then(result => {
        // console.log(result.meeting_info);
        setData1(result.meeting_info[0]);
        refRBSheet.current.open();
      })

      .catch(error => {
        // console.log('error===meeting', error);
   
      })

      .finally(() => {
        setLoader(false);
      });
  };
  useEffect(() => {
    _getmeeting();
  }, [isFoucs]);

  const refRBSheet = useRef();
  return (
    <JScreen
    isError={error}
    onTryAgainPress={()=> {
      _getmeeting(), setError(false)}}
      style={{marginHorizontal: RFPercentage(2)}}
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {store.lang.meetings}
            </JText>
          }
        />
      }>
        
      {loader ? (
        // <ActivityIndicator />
        <CLNotification/>
      ) : data?.length > 0 ? (
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <JMeetingJob
              key={index}
              startonPress={() => {
                setData1(item), refRBSheet.current.open();
              }}
              item={item}
            />
          )}
        />
      ) : (
        <JEmpty />
      )}

      <RBSheet
        ref={refRBSheet}
        // closeOnDragDown={true}
        closeOnPressMask={true}
        height={heightPercentageToDP(23)}
        customStyles={{
          container: {
            borderTopLeftRadius: RFPercentage(2.5),
            borderTopRightRadius: RFPercentage(2.5),
          },
          wrapper: {
            backgroundColor: '#00000080',
          },
          draggableIcon: {
            backgroundColor: colors.black[0],
            display: 'none',
          },
        }}>
        <View
          style={{
            paddingHorizontal: RFPercentage(3),
            paddingTop: RFPercentage(1),
          }}>
          <JText
            style={{
              marginVertical: RFPercentage(3),
              fontSize: RFPercentage(2.5),
              fontWeight: 'bold',
            }}>
            {store.lang.meeting_Info}
          </JText>
          {data1?.office_location !== null ? (
            <>
              <JText style={styles.rbtxt}>{store.lang.office_base}</JText>
              <JText
                style={styles.rbtxt2}
                onPress={() => {
                  Linking.openURL(data1?.office_location);
                }}>
                {data1?.office_location == null
                  ? 'N/A'
                  : data1?.office_location}
              </JText>
            </>
          ) : data1?.join_url !== null ? (
            <>
              <JText style={styles.rbtxt}>{store.lang.meeting_link}</JText>
              <JText
                style={styles.rbtxt2}
                onPress={() => {
                  Linking.openURL(data1?.join_url);
                }}>
                {data1?.join_url == null ? 'N/A' : data1?.join_url}
              </JText>
            </>
          ) : (
            <JNotfoundData />
          )}
        </View>
        {/* <View
              style={{
                paddingHorizontal: RFPercentage(3),
                paddingTop: RFPercentage(1),
              }}>
              <JText
                style={{
                  marginVertical: RFPercentage(1),
                  fontSize: RFPercentage(2.5),
                  fontWeight: 'bold',
                }}>
                {store.lang.meeting_Info}
              </JText>
              <JText style={styles.rbtxt}>{store.lang.meeting_ID}</JText>
              <JText style={styles.rbtxt2}>{ data1 && data1.meeting_id ? data1.meeting_id:'No meeting ID available'}</JText>
              <JText style={styles.rbtxt}>{store.lang.password}</JText>
              <JText style={styles.rbtxt2}>{ data1 && data1.pasword ? data1.pasword:'No pasword available'}</JText>
            </View> */}
      </RBSheet>
    </JScreen>
  );
};

export default observer(Meeting);

const styles = StyleSheet.create({
  rbtxt: {
    marginVertical: RFPercentage(0.5),
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
  },
  rbtxt2: {
    marginVertical: RFPercentage(0.5),
    fontSize: RFPercentage(2),
    color:'#008AD8',
  },
});
