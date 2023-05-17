import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import JScreen from '../../customComponents/JScreen';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JText from '../../customComponents/JText';
import JSearchInput from '../../customComponents/JSearchInput';
import JIcon from '../../customComponents/JIcon';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../../config/colors';
import {useNavigation} from '@react-navigation/native';
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

const Followers = () => {
  const store = useContext(StoreContext);
  const navigation = useNavigation();
  const [followerdata, setFollowersData] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(followerdata);

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
        console.log('error', error);
        setError(true);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    _followers();
  }, [loader]);

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

      {loader === true ? (
        <ActivityIndicator />
      ) 
      : (followerdata.length > 0 ? (
        <>
          <JSearchInput
            length={1}
            onChangeText={handleSearch}
            value={searchQuery}
            onPressIcon={() => alert('Icon Pressed')}
          />
          <View
            style={{
              marginVertical: RFPercentage(1),
            }}>
            <FlatList
              data={searchQuery.length > 0 ? filteredData : followerdata}
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
                      {item.candidate_name}
                    </JText>
                    <JText>{item.candidate_email}</JText>
                    <JRow
                      style={{
                        justifyContent: 'space-between',
                        marginVertical: RFPercentage(0.5),
                      }}>
                      <JText>
                        {item.regional_code}-{item.phone_number}
                      </JText>
                      <JText>
                        {item.immediate_available === 0 ? (
                          'Immediate Available'
                        ) : (
                          <JText fontColor="red">
                            {' '}
                            Not Immediate Available
                          </JText>
                        )}
                      </JText>
                    </JRow>
                  </View>
                </JRow>
              )}
            />
          </View>
        </>
        ): <JNotfoundData/>)}
    </JScreen>
  );
};

export default Followers;

const styles = StyleSheet.create({
  mainView: {marginHorizontal: RFPercentage(1), flex: 1},
});
