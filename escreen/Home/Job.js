import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import JText from '../../customComponents/JText';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JScreen from '../../customComponents/JScreen';
import colors from '../../config/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useContext } from 'react';
import { StoreContext } from '../../mobx/store';
import { useState } from 'react';
import JSearchInput from '../../customComponents/JSearchInput';
import JRecentJobTile from '../../customComponents/JRecentJobTile';
import JScrollView from '../../customComponents/JScrollView';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import JButton from '../../customComponents/JButton';
import { observer } from 'mobx-react';
import url from '../../config/url';
import JNotfoundData from '../../customComponents/JNotfoundData';
import JApiError from '../../customComponents/JApiError';
import { useCallback } from 'react';
import JEmpty from '../../customComponents/JEmpty';

const Job = () => {
  const navigation = useNavigation();
  const store = useContext(StoreContext);
  const isFoucs = useIsFocused();
  const [jobData, setJobData] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
  const [update, setUpdate] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(jobData);
  console.log('loader', loader)
  const handleSearch = (text) => {
    setSearchQuery(text);

    const filtered = store.jobEmployerData.filter((item) => {
      return item?.job_title.toLowerCase().includes(text.toLowerCase());
    });
    setFilteredData(filtered);
  };
  const _getjobs = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization', `Bearer ${store.token?.token}`,
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json'});
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
  const onRefresh = useCallback(() => {
    setLoader(true);
    setTimeout(() => {
      _getjobs();
      setSearchQuery('');
      setLoader(false);
    }, 2000);
  }, []);

  useEffect(() => {
    _getjobs()
  }, []);

  return (

    <JScreen
      style={{ paddingHorizontal: RFPercentage(2) }}

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
        error ?
          <JApiError
            onTryAgainPress={() => {
              _getjobs(),
                setError(false)
            }}
          /> :
          <>
            {store?.jobEmployerData?.length > 0 ?
              (<>
                <JSearchInput
                  length={1}
                  onChangeText={handleSearch}
                  value={searchQuery}
                  onPressIcon={() => alert('Icon Pressed')}
                />
                <JScrollView
                  refreshing={loader}
                  onRefresh={onRefresh}>
                  {(searchQuery?.length > 0 ? filteredData : store?.jobEmployerData).map((item, index) => (
                    <>
                      <JRecentJobTile
                        star={false}
                        option={true}
                        update={update}
                        setUpdate={setUpdate}
                        onSelect={() => setModalVisible(true)}
                        onPress={() => {
                          navigation.navigate('JobDetails', { id: item.job_id, jid: item.id })
                        }}
                        image={false}
                        item={item}
                        key={index}
                      />
                    </>
                  ))}
                </JScrollView></>) :
              <JEmpty />}
            <View
              style={{
                height: heightPercentageToDP(6),
                paddingTop: RFPercentage(0.3),
                backgroundColor: 'transparent',
              }}>
              <JButton
                style={{ paddingHorizontal: RFPercentage(5) }}
                onPress={() => {
                  navigation.navigate('AddNew_Job');
                }}
                children={store.lang.add_new_job}
              />
            </View>

          </>
      )}
    </JScreen>
  );
};

export default observer(Job);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
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
  msg: { fontSize: RFPercentage(2), textAlign: 'center' },
});
