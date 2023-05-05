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

const Followers = () => {
  const store = useContext(StoreContext);
  const navigation = useNavigation();
  const [followerdata, setFollowersData] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);

  const _followers = () => {
    
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDQyOTYxYTYzYTU0NmZjNjNhZGY4MWFiNmI0N2I4MDNhNzMwMmMxZWRhNDMyMDk5ZGM1ZmNlMjNiZDUyYzY4ODBlN2I4ZDdlZDQ5MWI2YzMiLCJpYXQiOjE2ODAyMTI2NzQuOTE2NzE5LCJuYmYiOjE2ODAyMTI2NzQuOTE2NzIzLCJleHAiOjE3MTE4MzUwNzQuOTA5NzQxLCJzdWIiOiI4NCIsInNjb3BlcyI6W119.aay7JchvkClUeAV79bQQ4fgTa8gRkgoM01y82G7eC1-JrtLnZTbnhQX4q0FJ_OhhDDxcoK00IMTpwmE1mKHNyVxwrw8yrAM8fRoXk0nRJOtVfNBVZ8R88uv8MBqHcREPjPRV3b-UmlaiC8Yv-2tOk4Kd4E79JfAkdyHaaFVmL8YHayifKmKBkECTY8SyaehOlFSn2cvw951aq2T0m_U1xcZsm2IL0gAOdVO_rdB4Ch0AOcEOpCyoCv8QZH7ZKrB26gSVv6IBtbLc_e_dYtV1OJCok-W8JFGiGafhQhc5RRFqTdot6R5WwfiwkqOf2tVNoLNNE06G7lPRzfpNhx7k6qV9OTYl2otef_yBhKr95gO9nr_L5WbjuazUHwYEBEqb53LwVu4-F0ncsr7epuL9oeL_XHa2t71hBqJRXuxS2djKwlKe9dkq6yPBNJQH7SNjAFlF4oDNqH-fqzmu41iKnmRBCxMGycwRUAqXbXoo6v3YJWqtTe6v6tHgTH4UdhQ6h3NrIwzozvNMLK6tMlHEunlZcMuPEUhvQRaGRu2ZQN54KowDDLEV9XmMbbXH2TkTA1LSEKQp-gA1D9w1s7-JHNHs2-rBi7-Vj_TLx5Yzoa-5ry55QIejufts2R48a4ino_lOgeG9a7W4dpPns69cUCL79g6ffe1cJyUYk2sr3mc',
    );

    fetch(`${baseUrl}/employerFollowers`, {
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
      ) : (
        <>
          <JSearchInput
            length={1}
            onChangeText={e => {
              store.setAllFeatureCompanyInput(e);
            }}
            onPressIcon={() => alert('Icon Pressed')}
          />
          <View
            style={{
              marginVertical: RFPercentage(1),
              borderBottomWidth: RFPercentage(0.1),
              borderBottomColor: colors.border[0],
            }}>
            {followerdata.map((item, index) => (
              <JRow key={index} style={{marginVertical: RFPercentage(1)}}>
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
                        <JText fontColor="red"> Not Immediate Available</JText>
                      )}
                    </JText>
                  </JRow>
                </View>
              </JRow>
            ))}
          </View>
        </>
      )}
    </JScreen>
  );
};

export default Followers;

const styles = StyleSheet.create({
  mainView: {marginHorizontal: RFPercentage(1), flex: 1},
});
