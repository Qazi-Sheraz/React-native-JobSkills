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
import colors from '../../config/colors';
import JProfileContent from '../../customComponents/JProfileContent';
import JProfileSections from '../../customComponents/JProfileSections';
import JScrollView from '../../customComponents/JScrollView';
import {observer} from 'mobx-react';
import {StoreContext} from '../../mobx/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Feather from 'react-native-vector-icons/Feather';
import JProfileInfo from '../../customComponents/JProfileInfo';
import JRow from '../../customComponents/JRow';
import moment from 'moment';
import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5';
import {_getProfile} from '../../functions/Candidate/MyProfile';
import JChevronIcon from '../../customComponents/JChevronIcon';
import { ActivityIndicator } from 'react-native';

function Profile({navigation}) {

  const store = useContext(StoreContext);
  // console.log(store.myProfile?.user[0]);
  const [update, setUpdate] = useState(false);

  const BorderView = ({children}) => {
    return (
      <View
        style={{
          borderColor: colors.border[0],
          borderWidth: RFPercentage(0.2),
          padding: RFPercentage(1),
          marginVertical: RFPercentage(1),
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
        justifyContent='flex-start'
          height={heightPercentageToDP(22)}
          alignItems={'flex-start'}
          paddingTop={RFPercentage(2)}
          left={<JChevronIcon />}
          // right={
          //   <AntDesign
          //     name="poweroff"
          //     onPress={() => _removeToken()}
          //     color={colors.white[0]}
          //     size={RFPercentage(3)}
          //   />
          // }
        />
      }>
        {store.myProfileApiLoader?<ActivityIndicator/>
        :(<>
      <JProfileContent
        name={
          store.myProfileApiLoader === false &&
          store.myProfile?.user[0].general_information?.first_name +
            ' ' +
            (store.myProfile?.user[0]?.general_information?.last_name !==
            null
            ? store.myProfile?.user[0]?.general_information?.last_name
            : '')
        }
        // email={store.token.user.email}
        src={
          store.myProfile?.user[0]
            ? store.myProfile?.user[0]?.profile_picture.avatar
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
            navigation.navigate('CEditProfile', {selected: 0,
              phone: store.myProfile?.user[0]?.contact_information?.mobile_number?.replace(/\+/g,'',),});
          }}
          isEmpty={false}
          heading={store.lang.contact_info}
          icon="pencil"
          emptyMsg={store.lang.contact_Info_not_available}
          children={
            store.myProfileApiLoader === false && (
              <BorderView>
                <JProfileInfo
                  title={store.lang.email_address}
                  text={
                    store.myProfile?.user[0]?.contact_information?.email_address==null?'':store.myProfile?.user[0]?.contact_information?.email_address
                  }
                />
                <JProfileInfo
                    title={store.lang.phone_number}
                    text={
                      store.myProfile?.user[0]?.contact_information?.mobile_number
                        ? store.myProfile?.user[0]?.contact_information?.regional_code !== null && undefined
                          ? `${store.myProfile?.user[0]?.contact_information?.regional_code?.replace(
                              /\+/g,
                              '',
                            )}${store.myProfile?.user[0]?.contact_information?.mobile_number?.replace(
                              /\+/g,
                              '',
                            )}`
                          : store.myProfile?.user[0]?.contact_information?.mobile_number?.replace(
                              /\+/g,
                              '',
                            )
                        : 'N/A'
                    }
                  />
              
              </BorderView>
            )
          }
        />
        <JProfileSections
          loader={store.myProfileApiLoader}
          heading={store.lang.general_info}
          onIconPress={() => {
            navigation.navigate('CEditProfile', {selected: 1});
          }}
          icon="pencil"
          isEmpty={false}
          emptyMsg={store.lang.general_Info_not_available}
          children={
            store.myProfileApiLoader === false && (
              <BorderView>
                <JProfileInfo
                  title={store.lang.father_name}
                  text={
                    store.myProfile?.user[0]?.general_information?.father_name
                  }
                />
                <JProfileInfo
                  title={store.lang.date_of_birth}
                  text={
                    store.myProfileApiLoader === false &&
                    moment(
                      store.myProfile?.user[0]?.general_information?.date_of_birth,
                    ).format('MMM,DD YYYY')
                  }
                />
                <JProfileInfo
                  title={store.lang.gender}
                  text={
                    store.myProfile?.user[0]?.general_information?.gender == '1'
                      ? store.lang.female
                      : store.lang.male
                  }
                />

                <JProfileInfo
                  title={store.lang.marital_status}
                 
                  text={store.lang.id==0?store.myProfile?.dataEnglish?.maritalStatus[store.myProfile?.user[0]?.general_information?.marital_status.id]:store.myProfile?.dataArabic?.maritalStatus[store.myProfile?.user[0]?.general_information?.marital_status.id] }
                />

                <JProfileInfo
                  title={store.lang.location}
                  text={
                    store.myProfile?.user[0]?.general_information?.city_name &&
                    store.myProfile?.user[0]?.general_information?.country_name
                      ? `${store.myProfile?.user[0]?.general_information?.city_name?.name} | ${store.myProfile?.user[0]?.general_information?.state_name?.name} | ${store.lang.id==0?store.myProfile?.dataEnglish?.countries[store.myProfile?.user[0]?.general_information?.country_name.id]:store.myProfile?.dataArabic?.countries[store.myProfile?.user[0]?.general_information?.country_name.id]}`
                      : 'N/A'
                  }
                />

                <JProfileInfo
                  title={store.lang.language}
                  text={
                    store.myProfile?.user[0]?.general_information?.language.map((l,index)=>(store.lang.id==0?store.myProfile?.dataEnglish?.language[l.id]:store.myProfile?.dataArabic?.language[l.id])).join(', ')
                  }
                />

                <JProfileInfo
                  title={store.lang.immediate_available}
                  text={
                    store.myProfile?.user[0]?.general_information?.immediate_available
                      ?store.lang.yes
                      :store.lang.no
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
                  title={store.lang.experience}
                  text={
                    store.myProfile?.user[0]?.experience_information?.experience + store.lang.year
                  }
                />

                <JProfileInfo
                  title={store.lang.career_level}
                  text={store.lang.id==0?store.myProfile?.dataEnglish?.careerLevel[store.myProfile?.user[0]?.experience_information?.career_level.id]:store.myProfile?.dataArabic?.careerLevel[store.myProfile?.user[0]?.experience_information?.career_level.id]}
                />

                <JProfileInfo
                  title={store.lang.Industry}
                
                  text={
                    store.lang.id==0?store.myProfile?.dataEnglish?.industry[store.myProfile?.user[0]?.experience_information?.industry?.id]:store.myProfile?.dataArabic?.industry[store.myProfile?.user[0]?.experience_information?.industry?.id]
                  }
                />

                <JProfileInfo
                  title={store.lang.functional_Area}
                  
                  text={
                    store.lang.id==0?store.myProfile?.dataEnglish?.functionalArea[store.myProfile?.user[0]?.experience_information?.functional_area.id]:store.myProfile?.dataArabic?.functionalArea[store.myProfile?.user[0]?.experience_information?.functional_area.id]
                  }
                />

                <JProfileInfo
                  title={store.lang.current_salary}
                 
                  text={
                    store.lang.id==0?store.myProfile?.dataEnglish?.currency[store.myProfile?.user[0]?.experience_information?.salary_currency.id]:store.myProfile?.dataArabic?.currency[store.myProfile?.user[0]?.experience_information?.salary_currency.id] +
                    store.myProfile?.user[0]?.experience_information?.current_salary
                  }
                />

                <JProfileInfo
                  title={store.lang.expected_salary}
                  text={
                    store.lang.id==0?store.myProfile?.dataEnglish?.currency[store.myProfile?.user[0]?.experience_information?.salary_currency.id]:store.myProfile?.dataArabic?.currency[store.myProfile?.user[0]?.experience_information?.salary_currency.id] +
                    store.myProfile?.user[0]?.experience_information?.expected_salary
                  }
                
                />
              </BorderView>
            )
          }
          heading={store.lang.experience_information}
          icon="add"
          emptyMsg={store.lang.experience_information_not_available}
        />

        <JProfileSections
          loader={store.myProfileApiLoader}
          // onIconPress={() => {
          //   navigation.navigate('CEditProfile', {selected: 3});
          // }}
          heading={store.lang.skills}
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
                            marginHorizontal: RFPercentage(1),
                          }}
                        />
                        <JText fontSize={RFPercentage(1.8)}>{store.lang.id==0?item?.name:item?.arabic_title}</JText>
                      </JRow>
                    ),
                  )}
              </View>
            )
          }
        />

        <JProfileSections
          loader={store.myProfileApiLoader}
          // onIconPress={() => {
          //   navigation.navigate('CEditProfile', {selected: 4});

          //   // refRBSheet.current.open();
          // }}
          isEmpty={false}
          heading={store.lang.social_media_links}
          icon="add"
          emptyMsg={store.lang.social_links_not_available}
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
                            onPress={
                              () => {
                                '';
                              }
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
                            style={{marginHorizontal: RFPercentage(1)}}
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
      </>)}
    </JScreen>
  );
}
export default observer(Profile);

const styles = StyleSheet.create({
  text: {
    marginTop: RFPercentage(0.5),
  },
});
