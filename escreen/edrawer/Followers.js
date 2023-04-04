import {StyleSheet, Text, View} from 'react-native';
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
import { baseUrl } from '../../ApiUrls';

const Followers = () => {
  const store = useContext(StoreContext);
  const navigation = useNavigation();
  const [followerdata, setFollowersData] = useState([]);

  const _followers = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDZjZDg5MzZkNmQ0ZWE3NTQ5N2RlZDZhMDgwNjliNzM1NmRmYmQ5YzZlODRmZmFiZTE2NjQ4N2VkN2ExMWFkMzk1YzgyZjZkNGRkNWZkMGUiLCJpYXQiOjE2ODAyNTA2NDYuNzg0NjAxLCJuYmYiOjE2ODAyNTA2NDYuNzg0NjA0LCJleHAiOjE3MTE4NzMwNDYuNzc3NzY2LCJzdWIiOiI4NCIsInNjb3BlcyI6W119.XQA1UjOHQZkuqkLbAY0V8quXIn6dBY_ZIl8Igkko0Kv1ODdOrVXmUsnbUu59jeIg_I8mVgcnH3XGRSoEDAXb5YSocyD1POwDo7_ED1dc4TYeniS7RrBwoJ4ZTyLFdc0rWo7inelD9n2HoLHquTsh6_tz4QAyc8xaB4_58H3LvKo86FEWoBTY4NsP3CAGzylD-8-SEIHze-HfeYjaaRoVlDeQpY6d3mfqzmBummF7nKHtkLSgTCEEaEsIx2yhZTrapWL-5GKdx-aj1qmKbTE5WYGUgMVu-39Mz7GCvYMryN5HF-9Y4guufDMT0atrXnc7BkyRe0lIVfNE3ga9GcSePLDkzMrCbBjmfTmvKuxoT-sXyXFb7_vu8FogA6Pc7v77LTciuuc9duwRSpK3_fxMy4dZucnFTGx7tTWSwlipQWthwa3wd0gVs5F9cXpgVxLk4Pndxuq-PF8_DvpbWNOCXsm0KWO59zbPgSVyil18KUv4F9NduT49z3MQgzfY9yjE1rkSgRW5Va4PGQhVEle5f2Dce-bysgPhWWK0wrQtLd1AVpbhLIIqI4obDo-2OFdK62GwLor1RfKU0Qc_WiP-8UOljUnVBskGVRVlqvDL8yblrM7ro73JbgpJPlV4Uz67FaC22iyhLbJsRnbQpJVKWgfcw6jyGqjKPaspsFYpPoM`,
    );

    
    fetch(`${baseUrl}/employerFollowers`,
     {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setFollowersData(result.followers);
      })
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    _followers();
  }, []);

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
              {store.lang.followers}
            </JText>
          }
          left={JChevronIcon}
        />
      }>
      <JSearchInput
        length={1}
        onChangeText={e => {
          store.setAllFeatureCompanyInput(e);
        }}
        onPressIcon={() => alert('Icon Pressed')}
      />
      <View style={{marginVertical: RFPercentage(2)}}>
        {followerdata.map((item, index) => (
          <JRow key={index} style={{marginVertical: RFPercentage(1)}}>
            <Image
              style={{
                width: RFPercentage(6),
                height: RFPercentage(6),
                borderRadius: RFPercentage(3),
                backgroundColor: 'red',
              }}
              source={{uri: item.avatar}}
            />

            <View style={styles.mainView}>
              <JText style={{fontWeight: 'bold'}}>{item.candidate_name}</JText>
              <JText>{item.candidate_email}</JText>
              <JRow style={{justifyContent: 'space-between'}}>
                <JText>
                  {item.regional_code}-{item.phone_number}
                </JText>
                <JText>Immediate Available</JText>
              </JRow>
            </View>
          </JRow>
        ))}
      </View>
    </JScreen>
  );
};

export default Followers;

const styles = StyleSheet.create({
  mainView: {marginHorizontal: RFPercentage(1), flex: 1},
});
