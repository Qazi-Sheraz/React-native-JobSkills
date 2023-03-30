import {StyleSheet, Linking, View} from 'react-native';
import React, {useContext} from 'react';
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
import { useEffect } from 'react';

const Profile = () => {
  const navigation = useNavigation();
  const store = useContext(StoreContext);
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
  useEffect(() => {
    return () => {};
  }, [store.myProfileApiLoader]);

  
  return (
    <JScreen
      header={
        <JGradientHeader
          height={heightPercentageToDP(22)}
          // alignItems={'flex-start'}
          justifyContent={'flex-start'}
          paddingTop={RFPercentage(2)}
          left={
            <Feather
              onPress={() => navigation.goBack()}
              name="chevron-left"
              size={RFPercentage(3.5)}
              color={colors.white[0]}
            />
          }
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
      <JProfileContent name={'Employer'} email={'sheraz.qazi@bftech.io'}
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
            navigation.navigate('CEditProfile', {selected: 0});
          }}
          isEmpty={false}
          heading={'Contact Information'}
          icon="pencil"
          emptyMsg={'Contact Information Not Available'}
          children={
            // store.myProfileApiLoader === false && (
              <BorderView>
                <JProfileInfo
                  title="Email Address:"
                  text={
                   "sheraz.qazi@bftech.io"
                  }
                />
                <JText fontColor={colors.shortlisted[0]}>Confirmed</JText>
                <JProfileInfo
                  title="Phone Number:"
                  text={
                   '+923876545679'
                  }
                />
                <JText onPress={()=> navigation.navigate('VerifiedEmail')} fontColor={colors.redish[0]}>Confirm Your Number</JText>
              </BorderView>
            // )
          }
        />

        <JProfileSections
          // loader={store.myProfileApiLoader}
          onIconPress={() => {
            navigation.navigate('CEditProfile', {selected: 4});

            // refRBSheet.current.open();
          }}
          isEmpty={false}
          icon='1'
          heading={'Company Information'}
          emptyMsg={'Company Information Not Available'}
          children={
          <BorderView>
                <JProfileInfo
                  title="CEO Name :"
                  text={''
                    // store.myProfile?.user[0].general_information?.father_name
                  }
                />
                <JProfileInfo
                  title="Ownership Type :"
                  text={''
                    // store.myProfileApiLoader === false &&
                    // moment(
                    //   store.myProfile?.user[0].general_information
                    //     ?.date_of_birth,
                    // ).format('MMM,DD YYYY')
                  }
                />
                <JProfileInfo
                  title="Industry :"
                  text={''
                    // store.myProfile?.user[0].general_information?.gender == '1'
                    //   ? 'Female'
                    //   : 'Male'
                  }
                />

                

                <JProfileInfo
                  title="Size : "
                  text={''
                    // store.myProfile?.user[0].general_information?.city_name &&
                    // store.myProfile?.user[0].general_information?.country_name
                    //   ? `${store.myProfile?.user[0].general_information?.city_name.name} | ${store.myProfile?.user[0].general_information?.country_name.name}`
                    //   : 'N/A'
                  }
                />

                <JProfileInfo
                  title="Location :"
                  text={''
                    // store.myProfile?.user[0].general_information?.language[0]
                    //   ?.language
                  }
                />
                <JProfileInfo
                  title="No of Office :"
                  text={''
                    // store.myProfile?.user[0].general_information?.language[0]
                    //   ?.language
                  }
                />

                
              </BorderView>}
        />
        <JProfileSections
          // loader={store.myProfileApiLoader}
          onIconPress={() => {
            navigation.navigate('CEditProfile', {selected: 4});

            refRBSheet.current.open();
          }}
          isEmpty={false}
          icon='1'
          heading={'Social Media Liks'}
          emptyMsg={'Social Media Liks Not Available'}
          children={
           
              <View
                style={{
                  marginVertical: RFPercentage(2),
                  padding: RFPercentage(1),
                }}>
                  {['facebook_url','twitter_url','linkedin-in'].map(
                  (item, index) =>
                    
                
                      <View style={{marginBottom: RFPercentage(2)}} 
                      key={index}
                      >
                        <JRow>
                          <FontAwesome5Brands
                            onPress={() =>''
                              // console.log(store.myProfile?.user[0].social_links)
                            }
                            size={RFPercentage(3)}
                            name={
                              item == 'facebook_url'
                                ? 'facebook-f'
                                : item == 'twitter_url'
                                ? 'twitter'
                                : 'linkedin-in'
                            }
                            color={colors.purple[0]}
                            style={{marginRight: RFPercentage(2)}}
                          />
                          <JText fontWeight="600" fontSize={RFPercentage(2)}>
                            {item == 'facebook_url'
                              ? 'Facebook'
                              : item == 'twitter_url'
                              ? 'Twitter'
                              : 'LinkedIn'}
                           
                          </JText>
                        </JRow>
                        <JText
                          onPress={() =>
                            Linking.openURL(
                              // store.myProfile?.user[0].social_links[item],
                            ).catch(err => {
                              alert(err);
                            })
                          }
                          fontWeight="600"
                          fontColor={'grey'}
                          style={{textDecorationLine: 'underline'}}
                          fontSize={RFPercentage(2)}>
                            www. {item == 'facebook_url'
                              ? 'Facebook'
                              : item == 'twitter_url'
                              ? 'Twitter'
                              : 'LinkedIn'} .com
                          {/* {store.myProfile?.user[0].social_links[item]} */}
                        </JText>
                      </View>
                    )}
              </View>
            // )
          }
        />
      </JScrollView>
    </JScreen>
  );
};

export default Profile;

const styles = StyleSheet.create({});
