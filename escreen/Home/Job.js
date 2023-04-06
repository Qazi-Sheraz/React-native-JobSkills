import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import JText from '../../customComponents/JText';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JScreen from '../../customComponents/JScreen';
import colors from '../../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JShadowView from '../../customComponents/JShadowView';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useContext} from 'react';
import {StoreContext} from '../../mobx/store';
import {useState} from 'react';
import JSearchInput from '../../customComponents/JSearchInput';
import JRecentJobTile from '../../customComponents/JRecentJobTile';
import JScrollView from '../../customComponents/JScrollView';
import {useNavigation} from '@react-navigation/native';
import JButton from '../../customComponents/JButton';
import JRow from '../../customComponents/JRow';
import {observer} from 'mobx-react';
import { baseUrl } from '../../ApiUrls';

const Job = () => {

  const navigation = useNavigation();
  const store = useContext(StoreContext);
  const [modalVisible, setModalVisible] = useState(false);
const [jobData, setJobData] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);

  const _getjobs = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDQyOTYxYTYzYTU0NmZjNjNhZGY4MWFiNmI0N2I4MDNhNzMwMmMxZWRhNDMyMDk5ZGM1ZmNlMjNiZDUyYzY4ODBlN2I4ZDdlZDQ5MWI2YzMiLCJpYXQiOjE2ODAyMTI2NzQuOTE2NzE5LCJuYmYiOjE2ODAyMTI2NzQuOTE2NzIzLCJleHAiOjE3MTE4MzUwNzQuOTA5NzQxLCJzdWIiOiI4NCIsInNjb3BlcyI6W119.aay7JchvkClUeAV79bQQ4fgTa8gRkgoM01y82G7eC1-JrtLnZTbnhQX4q0FJ_OhhDDxcoK00IMTpwmE1mKHNyVxwrw8yrAM8fRoXk0nRJOtVfNBVZ8R88uv8MBqHcREPjPRV3b-UmlaiC8Yv-2tOk4Kd4E79JfAkdyHaaFVmL8YHayifKmKBkECTY8SyaehOlFSn2cvw951aq2T0m_U1xcZsm2IL0gAOdVO_rdB4Ch0AOcEOpCyoCv8QZH7ZKrB26gSVv6IBtbLc_e_dYtV1OJCok-W8JFGiGafhQhc5RRFqTdot6R5WwfiwkqOf2tVNoLNNE06G7lPRzfpNhx7k6qV9OTYl2otef_yBhKr95gO9nr_L5WbjuazUHwYEBEqb53LwVu4-F0ncsr7epuL9oeL_XHa2t71hBqJRXuxS2djKwlKe9dkq6yPBNJQH7SNjAFlF4oDNqH-fqzmu41iKnmRBCxMGycwRUAqXbXoo6v3YJWqtTe6v6tHgTH4UdhQ6h3NrIwzozvNMLK6tMlHEunlZcMuPEUhvQRaGRu2ZQN54KowDDLEV9XmMbbXH2TkTA1LSEKQp-gA1D9w1s7-JHNHs2-rBi7-Vj_TLx5Yzoa-5ry55QIejufts2R48a4ino_lOgeG9a7W4dpPns69cUCL79g6ffe1cJyUYk2sr3mc',
    );
    fetch(`${baseUrl}/employer/jobs`, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    })
      .then(response => response.json())
      .then(result => {
        console.log(result.jobs);
        setJobData(result.jobs);
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
    _getjobs();
  }, [loader]);

  return (

    <JScreen
    isError={error}
    onTryAgainPress={()=> _getjobs()}

      style={{paddingHorizontal: RFPercentage(2)}}
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {store.lang.jobs}
            </JText>
          }
        />
      }>
        
 {loader ? (
        <ActivityIndicator />
      ) : (
        <>
      <JSearchInput
        length={1}
        onChangeText={e => {
          store.setAllFeatureCompanyInput(e);
        }}
        onPressIcon={() => alert('Icon Pressed')}
      />
      <JScrollView>
        {jobData.map((item, index) => (
          <>
            <JRecentJobTile
              onSelect={() => setModalVisible(true)}
              onPress={() => navigation.navigate('JobDetails')}
              image={false}
              item={item}
              key={index}
            />
          </>
        ))}
      </JScrollView>
      <View
        style={{
          height: heightPercentageToDP(6),
          paddingTop: RFPercentage(0.3),
          backgroundColor: 'transparent',
        }}>
        <JButton
          style={{paddingHorizontal: RFPercentage(5)}}
          onPress={() => {
            navigation.navigate('AddNew_Job');
          }}
          children={store.lang.add_new_job}
        />
      </View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <SafeAreaView style={styles.container}>
          <View style={styles.modal}>
            <JText style={styles.header}>Attention!</JText>
            <JText style={styles.msg}>
              Are you sure want to change the status?
            </JText>
            <JRow style={{justifyContent: 'space-between'}}>
              <JButton
                onPress={() => setModalVisible(false)}
                style={{
                  backgroundColor: '#E5E5E5',
                  width: '50%',
                  borderWidth: RFPercentage(0),
                }}
                children={'No'}
              />
              <JButton style={{width: '50%'}} children={'Yes'} />
            </JRow>
          </View>
        </SafeAreaView>
      </Modal>
      </>
      )}
    </JScreen>
  );
};

export default observer(Job);

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  modal: {
    height: RFPercentage(25),
    width: '80%',
    backgroundColor: '#ffff',
    alignItems: 'center',
    padding: RFPercentage(2),
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  header: {
    fontSize: RFPercentage(2.3),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  msg: {fontSize: RFPercentage(2), textAlign: 'center'},
});
