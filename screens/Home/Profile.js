import {Linking, StyleSheet, View} from 'react-native';
import React, {
  useContext,
  useCallback,
  useState,
  useRef,
  useEffect,
} from 'react';
import JScreen from '../../customComponents/JScreen';
import JText from '../../customComponents/JText';
import JGradientHeader from '../../customComponents/JGradientHeader';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../config/colors';
import JProfileContent from '../../customComponents/JProfileContent';
import JProfileSections from '../../customComponents/JProfileSections';
import JScrollView from '../../customComponents/JScrollView';
import {observer} from 'mobx-react';
import {StoreContext} from '../../mobx/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import RBSheet from 'react-native-raw-bottom-sheet';
import Feather from 'react-native-vector-icons/Feather';

import CContactInformation from './ProfileScreen/CContactInformation';
import CGeneralInformation from './ProfileScreen/CGeneralInformation';
import CExperienceInformation from './ProfileScreen/CExperienceInformation';
import CSkills from './ProfileScreen/CSkills';
import CSocialMediaLink from './ProfileScreen/CSocialMediaLink';
import JProfileInfo from '../../customComponents/JProfileInfo';
import JRow from '../../customComponents/JRow';
import moment from 'moment';
import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5';
import {_getProfile} from '../../functions/Candidate/MyProfile';

function Profile({navigation}) {

  const store = useContext(StoreContext);
  console.log(store.myProfile?.user[0]);
  const [update, setUpdate] = useState(false);

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

  const _removeToken = () => {
    AsyncStorage.removeItem('@login')
      .then(res => {
        store.setToken({
          token: null,
        });

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

  useEffect(() => {
    return () => {};
  }, [store.myProfileApiLoader]);

  const onRefresh = useCallback(() => {
    _getProfile(store);
  }, []);
  return (
    <JScreen
      header={
        <JGradientHeader
          height={heightPercentageToDP(22)}
          alignItems={'flex-start'}
          paddingTop={RFPercentage(3)}
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
              onPress={() => _removeToken()}
              color={colors.white[0]}
              size={RFPercentage(3)}
            />
          }
        />
      }>
      <JProfileContent
        name={
          store.myProfileApiLoader === false &&
          store.myProfile?.user[0].general_information?.first_name +
            ' ' +
            store.myProfile?.user[0].general_information?.last_name
        }
        // email={store.token.user.email}
        src={
          store.myProfile?.user[0]
            ? store.myProfile?.user[0].profile_picture.avatar
            : store.token.user.avatar
        }
      />

      <JScrollView
        refreshing={store.myProfileApiLoader}
        onRefresh={onRefresh}
        style={{
          paddingHorizontal: RFPercentage(2),
          marginTop: RFPercentage(2),
        }}>
        <JProfileSections
          loader={store.myProfileApiLoader}
          onIconPress={() => {
            navigation.navigate('CEditProfile', {selected: 0});
          }}
          isEmpty={false}
          heading={'Contact Information'}
          icon="pencil"
          emptyMsg={'Contact Information Not Available'}
          children={
            store.myProfileApiLoader === false && (
              <BorderView>
                <JProfileInfo
                  title="Email Address"
                  text={
                    store.myProfile?.user[0].contact_information?.email_address
                  }
                />
                <JProfileInfo
                  title="Phone Number"
                  text={
                    store.myProfile?.user[0].contact_information?.mobile_number
                  }
                />
              </BorderView>
            )
          }
        />
        <JProfileSections
          loader={store.myProfileApiLoader}
          heading={'General Information'}
          onIconPress={() => {
            navigation.navigate('CEditProfile', {selected: 1});
          }}
          icon="pencil"
          isEmpty={false}
          emptyMsg={'General Information Not Available'}
          children={
            store.myProfileApiLoader === false && (
              <BorderView>
                <JProfileInfo
                  title="Father Name"
                  text={
                    store.myProfile?.user[0].general_information?.father_name
                  }
                />
                <JProfileInfo
                  title="Date of Birth"
                  text={
                    store.myProfileApiLoader === false &&
                    moment(
                      store.myProfile?.user[0].general_information
                        ?.date_of_birth,
                    ).format('MMM,DD YYYY')
                  }
                />
                <JProfileInfo
                  title="Gender"
                  text={
                    store.myProfile?.user[0].general_information?.gender == '1'
                      ? 'Female'
                      : 'Male'
                  }
                />

                <JProfileInfo
                  title="Martial Status"
                  text={
                    store.myProfile?.user[0].general_information?.marital_status
                      .name
                  }
                />

                <JProfileInfo
                  title="Location"
                  text={
                    store.myProfile?.user[0].general_information?.city_name &&
                    store.myProfile?.user[0].general_information?.country_name
                      ? `${store.myProfile?.user[0].general_information?.city_name.name} | ${store.myProfile?.user[0].general_information?.country_name.name}`
                      : 'N/A'
                  }
                />

                <JProfileInfo
                  title="Language"
                  text={
                    store.myProfile?.user[0].general_information?.language[0]
                      ?.language
                  }
                />

                <JProfileInfo
                  title="Immediate Available"
                  text={
                    store.myProfile?.user[0].general_information
                      ?.immediate_available
                      ? 'Yes'
                      : 'No'
                  }
                />
              </BorderView>
            )
          }
        />
        <JProfileSections
          loader={store.myProfileApiLoader}
          onIconPress={() => {
            navigation.navigate('CEditProfile', {selected: 2});
          }}
          isEmpty={false}
          children={
            store.myProfileApiLoader === false && (
              <BorderView>
                <JProfileInfo
                  title="Experience"
                  text={
                    store.myProfile?.user[0].experience_information
                      ?.experience + ' Years'
                  }
                />

                <JProfileInfo
                  title="Career Level"
                  text={
                    store.myProfile?.user[0].experience_information
                      ?.career_level.name
                  }
                />

                <JProfileInfo
                  title="Industry"
                  text={
                    store.myProfile?.user[0].experience_information?.industry
                      .name
                  }
                />

                <JProfileInfo
                  title="Functional Area"
                  text={
                    store.myProfile?.user[0].experience_information
                      ?.functional_area.name
                  }
                />

                <JProfileInfo
                  title="Current Salary"
                  text={
                    'SAR ' +
                    store.myProfile?.user[0].experience_information
                      ?.current_salary
                  }
                />

                <JProfileInfo
                  title="Expected Salary"
                  text={
                    'SAR ' +
                    store.myProfile?.user[0].experience_information
                      ?.expected_salary
                  }
                />
              </BorderView>
            )
          }
          heading={'Experience Information'}
          icon="add"
          emptyMsg={'Experience Information Not Available'}
        />

        <JProfileSections
          loader={store.myProfileApiLoader}
          onIconPress={() => {
            navigation.navigate('CEditProfile', {selected: 3});
          }}
          heading={'Skills'}
          icon="add"
          emptyMsg={'Skills Not Available'}
          isEmpty={false}
          children={
            store.myProfileApiLoader === false && (
              <View
                style={{
                  marginVertical: RFPercentage(2),
                  padding: RFPercentage(1),
                }}>
                {store.myProfile?.user[0].skills.skills_name.id &&
                  store.myProfile?.user[0].skills.skills_name.id.map(
                    (item, index) => (
                      <JRow
                        key={index}
                        
                        style={{
                          borderBottomColor: colors.border[0],
                          borderBottomWidth: RFPercentage(0.1),
                          paddingBottom: RFPercentage(1),
                          marginBottom: RFPercentage(1),
                        }}>
                        <View
                          style={{
                            height: RFPercentage(2),
                            width: RFPercentage(2),
                            borderRadius: RFPercentage(2),
                            backgroundColor: colors.purple[0],
                            marginRight: RFPercentage(1),
                          }}
                        />
                        <JText fontSize={RFPercentage(1.8)}>{item.name}</JText>
                      </JRow>
                    ),
                  )}
              </View>
            )
          }
        />

        <JProfileSections
          loader={store.myProfileApiLoader}
          onIconPress={() => {
            navigation.navigate('CEditProfile', {selected: 4});

            // refRBSheet.current.open();
          }}
          isEmpty={false}
          heading={'Social Media Liks'}
          icon="add"
          emptyMsg={'Social Media Liks Not Available'}
          children={
            store.myProfileApiLoader === false && (
              <View
                style={{
                  marginVertical: RFPercentage(2),
                  padding: RFPercentage(1),
                }}>
                {Object.keys(store.myProfile?.user[0].social_links).map(
                  (item, index) =>
                    store.myProfile?.user[0].social_links[item] != 'null' && (
                      <View style={{marginBottom: RFPercentage(2)}} key={index}>
                        <JRow>
                          <FontAwesome5Brands
                            onPress={() =>
                              console.log(store.myProfile?.user[0].social_links)
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
                              store.myProfile?.user[0].social_links[item],
                            ).catch(err => {
                              alert(err);
                            })
                          }
                          fontWeight="600"
                          fontColor={'grey'}
                          style={{textDecorationLine: 'underline'}}
                          fontSize={RFPercentage(2)}>
                          {store.myProfile?.user[0].social_links[item]}
                        </JText>
                      </View>
                    ),
                )}
              </View>
            )
          }
        />
      </JScrollView>
    </JScreen>
  );
}
export default observer(Profile);

const styles = StyleSheet.create({
  text: {
    marginTop: RFPercentage(0.5),
  },
});
