import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
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
import JButton from '../../customComponents/JButton';
import {useState} from 'react';
import {baseUrl} from '../../ApiUrls';

const Meeting = () => {
  const store = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);

  const _getmeeting = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDQyOTYxYTYzYTU0NmZjNjNhZGY4MWFiNmI0N2I4MDNhNzMwMmMxZWRhNDMyMDk5ZGM1ZmNlMjNiZDUyYzY4ODBlN2I4ZDdlZDQ5MWI2YzMiLCJpYXQiOjE2ODAyMTI2NzQuOTE2NzE5LCJuYmYiOjE2ODAyMTI2NzQuOTE2NzIzLCJleHAiOjE3MTE4MzUwNzQuOTA5NzQxLCJzdWIiOiI4NCIsInNjb3BlcyI6W119.aay7JchvkClUeAV79bQQ4fgTa8gRkgoM01y82G7eC1-JrtLnZTbnhQX4q0FJ_OhhDDxcoK00IMTpwmE1mKHNyVxwrw8yrAM8fRoXk0nRJOtVfNBVZ8R88uv8MBqHcREPjPRV3b-UmlaiC8Yv-2tOk4Kd4E79JfAkdyHaaFVmL8YHayifKmKBkECTY8SyaehOlFSn2cvw951aq2T0m_U1xcZsm2IL0gAOdVO_rdB4Ch0AOcEOpCyoCv8QZH7ZKrB26gSVv6IBtbLc_e_dYtV1OJCok-W8JFGiGafhQhc5RRFqTdot6R5WwfiwkqOf2tVNoLNNE06G7lPRzfpNhx7k6qV9OTYl2otef_yBhKr95gO9nr_L5WbjuazUHwYEBEqb53LwVu4-F0ncsr7epuL9oeL_XHa2t71hBqJRXuxS2djKwlKe9dkq6yPBNJQH7SNjAFlF4oDNqH-fqzmu41iKnmRBCxMGycwRUAqXbXoo6v3YJWqtTe6v6tHgTH4UdhQ6h3NrIwzozvNMLK6tMlHEunlZcMuPEUhvQRaGRu2ZQN54KowDDLEV9XmMbbXH2TkTA1LSEKQp-gA1D9w1s7-JHNHs2-rBi7-Vj_TLx5Yzoa-5ry55QIejufts2R48a4ino_lOgeG9a7W4dpPns69cUCL79g6ffe1cJyUYk2sr3mc',
    );

    fetch(`${baseUrl}/meetings`, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    })
      .then(response => response.json())
      .then(result => {
        console.log(result.Meetings);
        setData(result.Meetings);
      })

      .catch(error => {
        console.log('error', error);
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
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDQyOTYxYTYzYTU0NmZjNjNhZGY4MWFiNmI0N2I4MDNhNzMwMmMxZWRhNDMyMDk5ZGM1ZmNlMjNiZDUyYzY4ODBlN2I4ZDdlZDQ5MWI2YzMiLCJpYXQiOjE2ODAyMTI2NzQuOTE2NzE5LCJuYmYiOjE2ODAyMTI2NzQuOTE2NzIzLCJleHAiOjE3MTE4MzUwNzQuOTA5NzQxLCJzdWIiOiI4NCIsInNjb3BlcyI6W119.aay7JchvkClUeAV79bQQ4fgTa8gRkgoM01y82G7eC1-JrtLnZTbnhQX4q0FJ_OhhDDxcoK00IMTpwmE1mKHNyVxwrw8yrAM8fRoXk0nRJOtVfNBVZ8R88uv8MBqHcREPjPRV3b-UmlaiC8Yv-2tOk4Kd4E79JfAkdyHaaFVmL8YHayifKmKBkECTY8SyaehOlFSn2cvw951aq2T0m_U1xcZsm2IL0gAOdVO_rdB4Ch0AOcEOpCyoCv8QZH7ZKrB26gSVv6IBtbLc_e_dYtV1OJCok-W8JFGiGafhQhc5RRFqTdot6R5WwfiwkqOf2tVNoLNNE06G7lPRzfpNhx7k6qV9OTYl2otef_yBhKr95gO9nr_L5WbjuazUHwYEBEqb53LwVu4-F0ncsr7epuL9oeL_XHa2t71hBqJRXuxS2djKwlKe9dkq6yPBNJQH7SNjAFlF4oDNqH-fqzmu41iKnmRBCxMGycwRUAqXbXoo6v3YJWqtTe6v6tHgTH4UdhQ6h3NrIwzozvNMLK6tMlHEunlZcMuPEUhvQRaGRu2ZQN54KowDDLEV9XmMbbXH2TkTA1LSEKQp-gA1D9w1s7-JHNHs2-rBi7-Vj_TLx5Yzoa-5ry55QIejufts2R48a4ino_lOgeG9a7W4dpPns69cUCL79g6ffe1cJyUYk2sr3mc',
    );

    fetch(`${baseUrl}/employer/meetingInfo/${id}`, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    })
      .then(response => response.json())
      .then(result => {
        console.log(result.meeting_info);
        setData1(result.meeting_info[0]);
        refRBSheet.current.open();
      })

      .catch(error => {
        console.log('error', error);
        setError(true);
      })

      .finally(() => {
        setLoader(false);
      });
  };
  useEffect(() => {
    _getmeeting();
    
  }, [loader]);

  const refRBSheet = useRef();
  return (
    <JScreen
      isError={error}
      onTryAgainPress={() => {_getmeeting()}}
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {store.lang.meeting}
            </JText>
          }
        />
      }>
      {loader ? (
        <ActivityIndicator />
      ) : (
        // <JText>Loading</JText>
        <>
         
            <FlatList
              data={data}
              renderItem={({item, index}) => (
                <JMeetingJob
                key={index}
                  onPress={() => _getmeetingInfo(item.id)}
                  item={item}
                  
                />
              )}
            />
           
           
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
            </View>
          </RBSheet>
        </>
      )}
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
  },
});
