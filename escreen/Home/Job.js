import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  StyleSheet,
  Image,
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
import {useIsFocused, useNavigation} from '@react-navigation/native';
import JButton from '../../customComponents/JButton';
import {observer} from 'mobx-react';
import url from '../../config/url';

const Job = () => {

  const navigation = useNavigation();
  const store = useContext(StoreContext);
  // const [modalVisible, setModalVisible] = useState(false);
  const [jobData, setJobData] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(jobData);

  const isFoucs = useIsFocused()

  const handleSearch = (text) => {
    setSearchQuery(text);
    
    const filtered = jobData.filter((item) => {
      return item?.job_title.toLowerCase().includes(text.toLowerCase());
    });
    setFilteredData(filtered);
  };
  const _getjobs = () => {
    
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${store.token.token}`,
    );
    
    console.log(myHeaders)
    fetch(`${url.baseUrl}/employer/jobs`, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    })
      .then(response => response.json())
      .then(result => {
        // console.log(result.jobs);
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
  }, [loader, isFoucs]);

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
      }
      >
        
 {loader ? (
        <ActivityIndicator />
      ) : (
        <>
        {jobData.length>0 ? 
      (<><JSearchInput
        length={1}
        onChangeText={handleSearch}
        value={searchQuery}
        onPressIcon={() => alert('Icon Pressed')}
      />
      <JScrollView>
        {(searchQuery.length > 0 ?filteredData :jobData).map((item, index) => (
          <>
            <JRecentJobTile
            star={false}
            option={true}
              onSelect={() => setModalVisible(true)}
              onPress={() => navigation.navigate('JobDetails',{id:item.job_id,jid:item.id})}
              image={false}
              item={item}
              key={index}
            />
          </>
        ))}
      </JScrollView></>):(  <View
      style={{
        flex:1,
        // height: heightPercentageToDP(12),
        // backgroundColor: colors.tileColor[0],
        justifyContent: 'center',
        alignItems: 'center',
       
      }}>
      <Image
        style={{width: RFPercentage(6), height: RFPercentage(6)}}
        source={require('../../assets/images/empty/empty.png')}
      />
      <JText style={{marginTop: RFPercentage(1)}}>{store.lang.not_found}</JText>
    </View>)}
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
      {/* <Modal animationType="fade" transparent={true} visible={modalVisible}>
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
      </Modal> */}
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
