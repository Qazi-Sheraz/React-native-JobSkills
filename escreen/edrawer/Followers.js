import {ActivityIndicator, StyleSheet, RefreshControl, View} from 'react-native';
import React, { useCallback } from 'react';
import JScreen from '../../customComponents/JScreen';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JText from '../../customComponents/JText';
import JSearchInput from '../../customComponents/JSearchInput';
import JIcon from '../../customComponents/JIcon';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../../config/colors';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import JRow from '../../customComponents/JRow';
import JChevronIcon from '../../customComponents/JChevronIcon';
import {StoreContext} from '../../mobx/store';
import {useContext} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Image} from 'react-native';
import {baseUrl} from '../../ApiUrls';
import { FlatList } from 'react-native';
import url from '../../config/url';
import JNotfoundData from '../../customComponents/JNotfoundData';
import { observer } from 'mobx-react';
import JEmpty from '../../customComponents/JEmpty';
import { JToast } from '../../functions/Toast';
import CLFavouriteJob from '../../loaders/Candidate/FavouriteJob/CLFavouriteJob';

const Followers = () => {
  const store = useContext(StoreContext);
  const navigation = useNavigation();
  const [followerdata, setFollowersData] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(followerdata);
  const isFoucs = useIsFocused();
  const handleSearch = (text) => {
    setSearchQuery(text);
    
    const filtered = followerdata.filter((item) => {
      return item.candidate_name.toLowerCase().includes(text.toLowerCase());
    });
    setFilteredData(filtered);
  };

  const _followers = () => {
    
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${store.token.token}`,
    );

    fetch(`${url.baseUrl}/employerFollowers`, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    })
      .then(response => response.json())
      .then(result => {
        setFollowersData(result.followers);
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

  useEffect(() => {
    _followers();
  }, [isFoucs,loader]);
  const onRefresh = useCallback(() => {
    store.setIsRefreshing(true);
  
    setTimeout(() => {
      _followers();
      store.setIsRefreshing(false);
    }, 2000);
  }, []);
  return (
    <JScreen
      onTryAgainPress={() => _followers()}
      isError={error}
      style={{paddingHorizontal: RFPercentage(2)}}
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {store.lang.followers}
            </JText>
          }
          left={JChevronIcon}
        />
      }>

      {loader ? (
        <CLFavouriteJob />
      ) 
      : (followerdata?.length > 0 ? (
        <>
          <JSearchInput
            length={1}
            onChangeText={handleSearch}
            value={searchQuery}
          />
          <View
            style={{
              flex:1,
              // marginVertical: RFPercentage(1),
            }}>
            <FlatList
            refreshControl={
              <RefreshControl
                refreshing={store.isRefreshing}
                onRefresh={onRefresh}
              />
            }
              data={searchQuery?.length > 0 ? filteredData : followerdata}
              renderItem={({item, index}) => (
                <JRow
                  key={index}
                  style={{
                    marginVertical: RFPercentage(1),
                    borderBottomWidth: RFPercentage(0.1),
                    borderBottomColor: colors.border[0],
                  }}>
                  <Image
                    style={{
                      width: RFPercentage(6),
                      height: RFPercentage(6),
                      borderRadius: RFPercentage(3),
                    }}
                    source={{uri: item.avatar}}
                  />

                  <View style={styles.mainView}>
                    <JText
                      style={{
                        fontWeight: 'bold',
                        marginVertical: RFPercentage(0.5),
                      }}>
                      {item?.candidate_name}
                    </JText>
                    <JText>{item?.candidate_email}</JText>
                    <JRow
                      style={{
                        justifyContent: 'space-between',
                        marginVertical: RFPercentage(0.5),
                      }}>
                      <JText>
                        {item?.regional_code}-{item?.phone_number}
                      </JText>
                      {item?.immediate_available == 0 ? 
                      <JText>{store.lang.immediate_available}</JText>
                      : <JText fontColor="red">{store.lang.not_immediate_available}</JText>
                        }
                     
                    </JRow>
                  </View>
                </JRow>
              )}
            />
          </View>
        </>
        ): <JEmpty/>)}
    </JScreen>
  );
};

export default observer(Followers);

const styles = StyleSheet.create({
  mainView: {marginHorizontal: RFPercentage(1), flex: 1},
});
