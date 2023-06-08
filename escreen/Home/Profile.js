import {StyleSheet, Linking, View, ActivityIndicator} from 'react-native';
import React, { useEffect, useState} from 'react';
import JScreen from '../../customComponents/JScreen';
import JGradientHeader from '../../customComponents/JGradientHeader';
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
import {useIsFocused, useNavigation, useRoute,} from '@react-navigation/native';
import JText from '../../customComponents/JText';
import JRow from '../../customComponents/JRow';
import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5';
import {_getProfile} from '../../functions/Candidate/MyProfile';
import {observer} from 'mobx-react';
import url from '../../config/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import JNotfoundData from '../../customComponents/JNotfoundData';

import { useContext } from 'react';
import JApiError from '../../customComponents/JApiError';
// import token from '../../mobx/store';

const Profile = () => {
  const navigation = useNavigation();
  const store = useContext(StoreContext);
  const [profile, setProfile] = useState();
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
  const{params}=useRoute();
  const isFoucs = useIsFocused();
  // console.log('store====>>>' , profile?.company[0]?.contact_information?.is_phone_verified);

  const onRefresh = useCallback(() => {
    _getProfile(store);
  }, []);
  const _removeToken = () => {
    AsyncStorage.removeItem('@login')
      .then(res => {
        store.setToken({
          token: null,
        });
        navigation.replace('SelectionScreen');
        Toast.show({
          type: 'success',
          text1: 'Logout Successfully',
        });
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Error while removing token',
        });
      });
  };

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
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

    fetch(
      `${url.baseUrl}/company/${store.token?.user?.owner_id}/editEmployer`,
      {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      },
    )
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        setProfile(result);
      })
      .catch(error => {
        console.log('profile===error', error);
        setError(true);
      })

      .finally(() => {
        setLoader(false);
      });
  };
  const _otp =()=>{
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    var formdata = new FormData();
    formdata.append("phone", profile?.company[0]?.contact_information?.phone_number);
    // console.log(profile?.company[0]?.contact_information?.phone_number)
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    fetch(`${url.baseUrl}/send-code`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result)
        Toast.show({
          type: 'success',
          text1: 'OTP has been sent to your registered phone number',
        });
        

      })
      .catch(error => {
        // console.log('error', error)
      Toast.show({
        type: 'error',
        text1: 'Oops! Something went wrong',
      });});
    };
  useEffect(() => {
  
    _jobProfile();
    
  }, [isFoucs]);

  return loader ? (
    <ActivityIndicator />
  ) : (
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
              onPress={() => _removeToken()}
              color={colors.white[0]}
              size={RFPercentage(3)}
            />
          }
        />
      }>
      {loader ? (
        <ActivityIndicator />
      ) : error == true ? (
        <JApiError
          onTryAgainPress={() => {
            _jobProfile(), setError(false);
          }}
        />
      ) : (
        <>
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
                navigation.navigate('EContactInformation', {
                  user_name: profile?.company[0]?.name,
                  user_email: profile?.company[0]?.contact_information?.email,
                  country:
                    profile?.company[0]?.contact_information?.country_name,
                  country_id:
                    profile?.company[0]?.contact_information?.country_id,
                  state: profile?.company[0]?.contact_information?.state_name,
                  state_id: profile?.company[0]?.contact_information?.state_id,
                  city: profile?.company[0]?.contact_information?.city_name,
                  city_id: profile?.company[0]?.contact_information?.city_id,
                });
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
                      profile?.company[0]?.contact_information?.phone_number
                        ? profile?.company[0]?.contact_information
                            ?.regional_code !== null
                          ? `${profile?.company[0]?.contact_information?.regional_code.replace(
                              /\+/g,
                              '',
                            )}${profile?.company[0]?.contact_information?.phone_number.replace(
                              /\+/g,
                              '',
                            )}`
                          : profile?.company[0]?.contact_information?.phone_number.replace(
                              /\+/g,
                              '',
                            )
                        : 'N/A'
                    }
                  />
                  <JText
                    onPress={() => {
                      profile?.company[0]?.contact_information
                        ?.is_phone_verified == 0
                        ? (navigation.navigate('VerifiedPhone', {
                            phone:
                              profile?.company[0]?.contact_information?.phone_number.replace(
                                /\+/g,
                                '',
                              ),
                          }),
                          _otp())
                        : Toast.show({
                            type: 'success',
                            text1: 'Already confiremd',
                          });
                    }}
                    fontColor={
                      profile?.company[0]?.contact_information
                        ?.is_phone_verified == 1
                        ? colors.shortlisted[0]
                        : colors.redish[0]
                    }>
                    {profile?.company[0]?.contact_information
                      ?.is_phone_verified == 1
                      ? store.lang.confirmed
                      : store.lang.confirm_your_num}
                  </JText>
                </BorderView>
                // )
              }
            />

            <JProfileSections
              onIconPress={() => {
                navigation.navigate('ECompanyInformation', {
                  ceo_name: profile?.company[0]?.company_information?.ceo,
                  company_name:
                    profile?.company[0]?.company_information?.company_name,
                  ownership_id:
                    profile?.company[0]?.company_information?.ownership_type_id,
                  ownership:
                    profile?.company[0]?.company_information?.ownership_type,
                  industry: profile?.company[0]?.company_information?.industry,
                  industry_id:
                    profile?.company[0]?.company_information?.industry_id,
                  company_size:
                    profile?.company[0]?.company_information?.company_size,
                  company_size_id:
                    profile?.company[0]?.company_information?.company_size_id,
                  location: profile?.company[0]?.company_information?.location,
                  offices:
                    profile?.company[0]?.company_information?.no_of_offices,
                  website: profile?.company[0]?.company_information?.website,
                  fax: profile?.company[0]?.company_information?.fax,
                });
              }}
              isEmpty={false}
              // icon="1"
              heading={store.lang.company_info}
              emptyMsg={store.lang.company_info_not_available}
              children={
                <BorderView>
                  <JProfileInfo
                    title={`${store.lang.CEO_name}:`}
                    text={
                      profile?.company[0]?.company_information?.ceo
                        ? profile?.company[0]?.company_information?.ceo
                        : 'N/A'
                    }
                  />
                  <JProfileInfo
                    title={`${store.lang.company_name}:`}
                    text={
                      profile?.company[0]?.company_information?.company_name
                        ? profile?.company[0]?.company_information?.company_name
                        : 'N/A'
                    }
                  />
                  <JProfileInfo
                    title={`${store.lang.ownership_type}:`}
                    text={
                      profile?.company[0]?.company_information?.ownership_type
                        ? profile?.company[0]?.company_information
                            ?.ownership_type
                        : 'N/A'
                    }
                  />
                  <JProfileInfo
                    title={`${store.lang.Industry}:`}
                    text={
                      profile?.company[0]?.company_information?.industry
                        ? profile?.company[0]?.company_information?.industry
                        : 'N/A'
                    }
                  />

                  <JProfileInfo
                    title={`${store.lang.size}:`}
                    text={
                      profile?.company[0]?.company_information?.company_size
                        ? profile?.company[0]?.company_information?.company_size
                        : 'N/A'
                    }
                  />

                  <JProfileInfo
                    title={`${store.lang.location}:`}
                    text={
                      profile?.company[0]?.company_information?.location
                        ? profile?.company[0]?.company_information?.location
                        : 'N/A'
                    }
                  />
                  <JProfileInfo
                    title={`${store.lang.no_of_office}:`}
                    text={
                      profile?.company[0]?.company_information?.no_of_offices
                        ? profile?.company[0]?.company_information
                            ?.no_of_offices
                        : 'N/A'
                    }
                  />
                  <JProfileInfo
                    title={`${store.lang.website}:`}
                    text={
                      profile?.company[0]?.company_information?.website
                        ? profile?.company[0]?.company_information?.website
                        : 'N/A'
                    }
                  />
                  <JProfileInfo
                    title={`${store.lang.fax}:`}
                    text={
                      profile?.company[0]?.company_information?.fax
                        ? profile?.company[0]?.company_information?.fax
                        : 'N/A'
                    }
                  />
                </BorderView>
              }
            />
            <JProfileSections
              // loader={store.myProfileApiLoader}

              onIconPress={() => {
                navigation.navigate('CSocialMediaLink');
              }}
              // IconPress2={() => {
              //   navigation.navigate('ESocialLink');

              //   // refRBSheet.current.open();
              // }}
              isEmpty={false}
              // icon="1"
              heading={store.lang.social_media_links}
              emptyMsg={store.lang.social_links_not_available}
              children={
                <View
                  style={{
                    marginVertical: RFPercentage(2),
                    padding: RFPercentage(1),
                  }}>
                  {/* ['facebook_url', 'twitter_url', 'linkedin-in'] */}

                  {profile?.company?.map((item, index) => (
                    <View key={index}>
                      {item.social_media_link?.facebook_url && (
                        <View style={{marginBottom: RFPercentage(2)}}>
                          <JRow>
                            <FontAwesome5Brands
                              size={RFPercentage(3)}
                              name="facebook-f"
                              color={colors.purple[0]}
                              style={{marginRight: RFPercentage(2)}}
                            />

                            <JText fontWeight="600" fontSize={RFPercentage(2)}>
                              {'Facebook'}
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
                            {item.social_media_link.facebook_url}
                          </JText>
                        </View>
                      )}

                      {item.social_media_link?.twitter_url && (
                        <View style={{marginBottom: RFPercentage(2)}}>
                          <JRow>
                            <FontAwesome5Brands
                              size={RFPercentage(3)}
                              name="twitter"
                              color={colors.purple[0]}
                              style={{marginRight: RFPercentage(2)}}
                            />

                            <JText fontWeight="600" fontSize={RFPercentage(2)}>
                              {'Twitter'}
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
                            {item.social_media_link.twitter_url}
                          </JText>
                        </View>
                      )}

                      {item.social_media_link?.linkedin_url && (
                        <View style={{marginBottom: RFPercentage(2)}}>
                          <JRow>
                            <FontAwesome5Brands
                              size={RFPercentage(3)}
                              name="linkedin-in"
                              color={colors.purple[0]}
                              style={{marginRight: RFPercentage(2)}}
                            />

                            <JText fontWeight="600" fontSize={RFPercentage(2)}>
                              {'LinkedIn'}
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
                            {item.social_media_link.linkedin_url}
                          </JText>
                        </View>
                      )}
                    </View>
                  ))}
                </View>
                // )
              }
            />
          </JScrollView>
        </>
      )}
    </JScreen>
  );
};

export default observer(Profile);

const styles = StyleSheet.create({});
