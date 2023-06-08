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
import JNotfoundData from '../../customComponents/JNotfoundData';
import JApiError from '../../customComponents/JApiError';

const Job = () => {

  const navigation = useNavigation();
  const store = useContext(StoreContext);
  // const [modalVisible, setModalVisible] = useState(false);
  const [jobData, setJobData] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
  const [update, setUpdate] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(jobData);

  const isFoucs = useIsFocused();
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
      // `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNzQwYTNkNmY1NWEzZDYzYjM0ODI5ODdmNWZlMzM1N2Y0MTBhZjYxZmJiMTUyNjgxYjhjMjY0OWJmYzMyZTZmMjRhNjBlZTNjMDFkOWM3NGMiLCJpYXQiOjE2ODYwMzcxMDQuMTE5MzA5LCJuYmYiOjE2ODYwMzcxMDQuMTE5MzEzLCJleHAiOjE3MTc2NTk1MDQuMTEyNzcsInN1YiI6Ijg0Iiwic2NvcGVzIjpbXX0.WqyC9fdDZEEUNwcXjEvm_uCgILD2bDOlYKt2SrdUnTN2KGJitVg3bGvpUnKN7Iaa8C6fAo3qUOoDp_2oAeIJLbpvkAMAbB9oV3r5bMXpgABt3p_1ckkekQFkHjbqwL1qNk6YeAtuw8pQKEZwo8hKRr1zh8Nw1CR8NwsKxmmPNB-Uy1FG3gVzZeahmQzB4COicMQlKpXBK4Fx_fMoKZ1FqtVPASck9ZsBie4ETGk9EnBqEou7wpym6X9t0ckQARvIUU5EF8XPd_Z-ZCtvPwoQQCRjbVc1ALCrYPJfRnIS7ysEn9G_wrwpY5Q3_O1tyZ7HEl3zhL2sChHyKokNAhXES3Nhwrka85P08y_ETLcbiLxUBb7A7GY5YPopbtK21QZ9Ay39hgpr8G2RFVr91mEy1dq2DjtAigQNvP2DRDoQpVWm2fod797mu6za85GX5OgFh6QXiQ6Rlp13BFLNBCVVM62U67N6zWs5a5YGFtZIMrE63HXdvFgaYv8pfcAu5Yr5u0jzo_Cz1LKAGUC2iaw1yDfnsIO-xYCzYD27o1GsSHAdcdMd0DiMmy0C23gxjhNwl9u9ZO0P4-59svkV1gMp9JlNW03u3MNfKeQTTE0MdQdupczgUYi2mplRIgTFzasir7_YtKf_N7pT-EKwCklQsY9X7GSz_eLXOCKaytoD7uo`,
      `Bearer ${store.token?.token}`,
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json'

      }
    );
    
    // console.log(fetch(`${url.baseUrl}/employer/jobs`, {
    //   method: 'GET',
    //   headers: myHeaders,
    //   redirect: 'follow',
    // }))
    fetch(`${url.baseUrl}/employer/jobs`, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    })
      .then(response => response.json())
      .then(result => {
        // console.log(result)
        store.setJobEmployerData(result.jobs);
      })
      .catch(error => {
        // console.log('job===error', error);
        setError(true);
      })
      .finally(() => {
        setLoader(false);
      });
  };


  useEffect(() => {
    
     _getjobs();
    
  }, [isFoucs]);

  return (

    <JScreen
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
        error == true ? 
          <JApiError
          onTryAgainPress={() => {
            _getjobs(),
          setError(false)}}
          />:
        <>
        {store?.jobEmployerData?.length>0 ? 
      (<><JSearchInput
        length={1}
        onChangeText={handleSearch}
        value={searchQuery}
        onPressIcon={() => alert('Icon Pressed')}
      />
      <JScrollView>
        {(searchQuery?.length > 0 ?filteredData :store?.jobEmployerData).map((item, index) => (
          <>
            <JRecentJobTile
            star={false}
            option={true}
            update={update}
            setUpdate={setUpdate}
              onSelect={() => setModalVisible(true)}
              onPress={() => {
                navigation.navigate('JobDetails',{id:item.job_id,jid:item.id}) 
              console.log(item)}}
              image={false}
              item={item}
              key={index}
            />
          </>
        ))}
      </JScrollView></>):  
     <JNotfoundData/>}
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
