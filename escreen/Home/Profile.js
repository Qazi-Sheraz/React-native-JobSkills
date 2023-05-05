import {StyleSheet, Linking, View, ActivityIndicator} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import JScreen from '../../customComponents/JScreen';
import JGradientHeader from '../../customComponents/JGradientHeader';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JProfileContent from '../../customComponents/JProfileContent';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import colors from '../../config/colors';
import {StoreContext} from '../../mobx/store';
import JScrollView from '../../customComponents/JScrollView';
import {useCallback} from 'react';
import JProfileSections from '../../customComponents/JProfileSections';
import JProfileInfo from '../../customComponents/JProfileInfo';
import {useNavigation} from '@react-navigation/native';
import JText from '../../customComponents/JText';
import JRow from '../../customComponents/JRow';
import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5';
import {_getProfile} from '../../functions/Candidate/MyProfile';
import {observer} from 'mobx-react';
import JIcon from '../../customComponents/JIcon';
import { baseUrl } from '../../ApiUrls';

const Profile = () => {
  const navigation = useNavigation();
  const store = useContext(StoreContext);
  const [profile, setProfile] = useState();
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
  const onRefresh = useCallback(() => {
    _getProfile(store);
  }, []);

  const BorderView = ({children}) => {
    return (
      <View
        style={{
          borderColor: colors.border[0],
          borderWidth: RFPercentage(0.2),
          padding: RFPercentage(1),
          marginVertical: RFPercentage(2),
        }}>
        {children}
      </View>
    );
  };

  const _jobProfile = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDQyOTYxYTYzYTU0NmZjNjNhZGY4MWFiNmI0N2I4MDNhNzMwMmMxZWRhNDMyMDk5ZGM1ZmNlMjNiZDUyYzY4ODBlN2I4ZDdlZDQ5MWI2YzMiLCJpYXQiOjE2ODAyMTI2NzQuOTE2NzE5LCJuYmYiOjE2ODAyMTI2NzQuOTE2NzIzLCJleHAiOjE3MTE4MzUwNzQuOTA5NzQxLCJzdWIiOiI4NCIsInNjb3BlcyI6W119.aay7JchvkClUeAV79bQQ4fgTa8gRkgoM01y82G7eC1-JrtLnZTbnhQX4q0FJ_OhhDDxcoK00IMTpwmE1mKHNyVxwrw8yrAM8fRoXk0nRJOtVfNBVZ8R88uv8MBqHcREPjPRV3b-UmlaiC8Yv-2tOk4Kd4E79JfAkdyHaaFVmL8YHayifKmKBkECTY8SyaehOlFSn2cvw951aq2T0m_U1xcZsm2IL0gAOdVO_rdB4Ch0AOcEOpCyoCv8QZH7ZKrB26gSVv6IBtbLc_e_dYtV1OJCok-W8JFGiGafhQhc5RRFqTdot6R5WwfiwkqOf2tVNoLNNE06G7lPRzfpNhx7k6qV9OTYl2otef_yBhKr95gO9nr_L5WbjuazUHwYEBEqb53LwVu4-F0ncsr7epuL9oeL_XHa2t71hBqJRXuxS2djKwlKe9dkq6yPBNJQH7SNjAFlF4oDNqH-fqzmu41iKnmRBCxMGycwRUAqXbXoo6v3YJWqtTe6v6tHgTH4UdhQ6h3NrIwzozvNMLK6tMlHEunlZcMuPEUhvQRaGRu2ZQN54KowDDLEV9XmMbbXH2TkTA1LSEKQp-gA1D9w1s7-JHNHs2-rBi7-Vj_TLx5Yzoa-5ry55QIejufts2R48a4ino_lOgeG9a7W4dpPns69cUCL79g6ffe1cJyUYk2sr3mc',
    );

    fetch(`${baseUrl}/company/1/editEmployer`, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    })
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        setProfile(result);
      })
      .catch(error => console.log('error', error))

      .finally (() => {
        setLoader(false);
      })
  };

  useEffect(() => {
    _jobProfile();
  }, [loader]);

  return (
    loader?(<ActivityIndicator/>):(
    <JScreen
      header={
        <JGradientHeader
          height={heightPercentageToDP(22)}
          // alignItems={'flex-start'}
          justifyContent={'flex-start'}
          paddingTop={RFPercentage(2)}
         
          right={
            <AntDesign
              name="poweroff"
              // onPress={() => _removeToken()}
              color={colors.white[0]}
              size={RFPercentage(3)}
            />
          }
        />
      }>
      <JProfileContent
      src={profile?.company[0]?.profile_picture?.profile_picture}
        name={profile?.company[0]?.name}
        email={profile?.company[0]?.contact_information?.email}
      />
      <JScrollView
        // refreshing={store.myProfileApiLoader}
        onRefresh={onRefresh}
        style={{
          paddingHorizontal: RFPercentage(2),
          marginTop: RFPercentage(2),
        }}>
        <JProfileSections
          // loader={store.myProfileApiLoader}

          onIconPress={() => {
            navigation.navigate('EContactInformation',);
          }}
          isEmpty={false}
          heading={store.lang.contact_info}
          icon="pencil"
          emptyMsg={store.lang.contact_Info_not_available}
          children={
            // store.myProfileApiLoader === false && (
            <BorderView>
              <JProfileInfo
                title={store.lang.email_address}
                text={profile?.company[0]?.contact_information?.email}
              />
              <JText fontColor={colors.shortlisted[0]}>
                {store.lang.confirmed}
              </JText>
              <JProfileInfo
                title={store.lang.phone_number}
                text={
                  profile?.company[0]?.contact_information?.regional_code !== null
                    ? `${profile?.company[0]?.contact_information?.regional_code}${profile?.company[0]?.contact_information?.phone_number}`
                    : profile?.company[0]?.contact_information?.phone_number
                }
              />
              <JText
                onPress={() => navigation.navigate('VerifiedPhone')}
                fontColor={colors.redish[0]}>
                {store.lang.confirm_your_num}
              </JText>
            </BorderView>
            // )
          }
        />

        <JProfileSections
         onIconPress={() => {
          navigation.navigate('ECompanyInformation',);
        }}
          isEmpty={false}
          icon="1"
          heading={store.lang.company_info}
          emptyMsg={store.lang.company_info_not_available}
          children={
            <BorderView>
              <JProfileInfo
                title={store.lang.CEO_name}
                text={profile?.company[0]?.company_information?.ceo}
              />
              <JProfileInfo
                title={store.lang.ownership_type}
                text={profile?.company[0]?.company_information?.ownership_type}
              />
              <JProfileInfo
                title={store.lang.Industry}
                text={profile?.company[0]?.company_information?.industry}
              />

              <JProfileInfo
                title={store.lang.size}
                text={profile?.company[0]?.company_information?.company_size}
              />

              <JProfileInfo
                title={store.lang.location}
                text={profile?.company[0]?.company_information?.location}
              />
              {/* <JProfileInfo
                title={store.lang.no_of_office}
                text={profile?.company[0]?.company_information?.}
              /> */}
            </BorderView>
          }
        />
        <JProfileSections
          // loader={store.myProfileApiLoader}
          onIconPress={() => {
            navigation.navigate('ESocialLink');

            // refRBSheet.current.open();
          }}
          IconPress2={() => {
            navigation.navigate('ESocialLink');

            // refRBSheet.current.open();
          }}
          isEmpty={false}
          icon="1"
          heading={store.lang.social_media_links}
          emptyMsg={store.lang.social_links_not_available}
          children={
            <View
              style={{
                marginVertical: RFPercentage(2),
                padding: RFPercentage(1),
              }}>
              
              {/* // ['facebook_url', 'twitter_url', 'linkedin-in'] */}
           {profile?.company?.map(
                (item, index) => (
                  <View style={{marginBottom: RFPercentage(2)}} key={index}>
                    <JRow>
                      <FontAwesome5Brands
                        // onPress={() =>''
                        //   // console.log(store.myProfile?.user[0].social_links)
                        // }
                        size={RFPercentage(3)}
                        name={
                          
                          item.profile?.company[0]?.social_media_link?.facebook_url ==null 
                            ? 'facebook-f'
                            : item.profile?.company?.social_media_link?.twitter_url
                            ? 'twitter'
                            : 'linkedin-in'
                        }
                        color={colors.purple[0]}
                        style={{marginRight: RFPercentage(2)}}
                      />
                      <JText fontWeight="600" fontSize={RFPercentage(2)}>
                       { item.profile?.company[0]?.social_media_link?.facebook_url == null ? 'N/A':'Facebook'
                      
                          && item.profile?.company[0]?.social_media_link?.twitter_url == null? 'N/A': 'Twitter'
                          
                          && item.profile?.company[0]?.social_media_link?.linkedin_url==null? 'N/A':'LinkedIn'}
                         
                      </JText>
                    </JRow>
                    <JText
                      // onPress={() =>
                      //   Linking.openURL(
                      //     // store.myProfile?.user[0].social_links[item],
                      //   ).catch(err => {
                      //     alert(err);
                      //   })
                      // }
                      fontWeight="600"
                      fontColor={'grey'}
                      style={{textDecorationLine: 'underline'}}
                      fontSize={RFPercentage(2)}>
                      www.{' '}
                      {item == 'facebook_url'
                        ? 'Facebook'
                        : item == 'twitter_url'
                        ? 'Twitter'
                        : 'LinkedIn'}{' '}
                      .com
                      {/* {store.myProfile?.user[0].social_links[item]} */}
                    </JText>
                  </View>
                ),
              )}
            </View>
            // )
          }
        />
      </JScrollView>
    </JScreen>)
  );
};

export default observer(Profile);

const styles = StyleSheet.create({});
