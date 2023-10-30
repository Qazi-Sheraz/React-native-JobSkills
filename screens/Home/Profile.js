import {
  View,
  Linking,
  Pressable,
  StyleSheet,
} from 'react-native';
import React, {
  useEffect,
  useContext,
  useCallback,
} from 'react';
import moment from 'moment';
import { observer } from 'mobx-react';
import colors from '../../config/colors';
import { JToast } from '../../functions/Toast';
import JRow from '../../customComponents/JRow';
import { StoreContext } from '../../mobx/store';
import JText from '../../customComponents/JText';
import JScreen from '../../customComponents/JScreen';
import JScrollView from '../../customComponents/JScrollView';
import JChevronIcon from '../../customComponents/JChevronIcon';
import JProfileInfo from '../../customComponents/JProfileInfo';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CLProfile from '../../loaders/Candidate/Profile/CLProfile';
import { _getProfile } from '../../functions/Candidate/MyProfile';
import JGradientHeader from '../../customComponents/JGradientHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JProfileContent from '../../customComponents/JProfileContent';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import JProfileSections from '../../customComponents/JProfileSections';
import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5';

function Profile({ navigation }) {

  const store = useContext(StoreContext);


  const BorderView = ({ children }) => {
    return (
      <View
        style={{
          padding: RFPercentage(1),
          borderColor: colors.border[0],
          borderWidth: RFPercentage(0.2),
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

        JToast({
          type: 'success',
          text1: 'Logout Successfully',
        });
      })
      .catch(error => {
        JToast({
          type: 'danger',
          text1: 'Error',
          text2: 'Error while removing token',
        });
      });
  };

  useEffect(() => {
    _getProfile(store)
    return () => { };
  }, []);


  const onRefresh = useCallback(() => {
    store.setMyProfileApiLoader(true)
    setTimeout(() => {
      _getProfile(store);
      store.setMyProfileApiLoader(false)
    }, 1000);
  }, [store]);
  return (
    store.myProfileApiLoader ? (
      // <ActivityIndicator />
      <CLProfile />
    ) : (
      <JScreen
        header={
          <JGradientHeader
            justifyContent="flex-start"
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

        <>
          <JProfileContent
            name={
              store.myProfileApiLoader === false &&
              store.myProfile?.user[0]?.general_information?.first_name +
              '' +
              (store.myProfile?.user[0]?.general_information?.last_name !==
                null
                ? store.myProfile?.user[0]?.general_information?.last_name
                : '')
            }
            // email={store.token.user.email}
            src={
              store.myProfile?.user[0]
                ? store.myProfile?.user[0]?.profile_picture?.avatar
                : store.token?.user?.avatar
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
                navigation.navigate('CEditProfile', {
                  selected: 0,
                  phone:
                    store.myProfile?.user[0]?.contact_information?.mobile_number?.replace(
                      /\+/g,
                      '',
                    ),
                  region_code:
                    store.myProfile?.user[0]?.contact_information?.region_code,
                });
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
                        store.myProfile?.user[0]?.contact_information
                          ?.email_address == null
                          ? 'N/A'
                          : store.myProfile?.user[0]?.contact_information
                            ?.email_address
                      }
                    />
                    {/* {console.log(store.myProfile?.user[0]?.contact_information?.region_code)} */}
                    <JProfileInfo
                      title={`${store.lang.phone_number}:`}
                      text={
                        store.myProfile?.user[0]?.contact_information
                          ?.mobile_number !== null &&
                          store.myProfile?.user[0]?.contact_information
                            ?.region_code !== null
                          ? store.myProfile?.user[0]?.contact_information
                            ?.region_code +
                          store.myProfile?.user[0]?.contact_information
                            ?.mobile_number
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
                navigation.navigate('CEditProfile', {
                  selected: 1,
                  // father_name:store.myProfile?.user[0]?.general_information?.father_name,
                  // dob:store.myProfile?.user[0]?.general_information?.date_of_birth,
                  // gender:store.myProfile?.user[0]?.general_information?.gender,
                  marital_status:
                    store.myProfile?.user[0]?.general_information
                      ?.marital_status.id !== null && store.lang.id == 0
                      ? store.myProfile?.dataEnglish?.maritalStatus[
                      store.myProfile?.user[0]?.general_information
                        ?.marital_status.id
                      ]
                      : store.myProfile?.dataArabic?.maritalStatus[
                      store.myProfile?.user[0]?.general_information
                        ?.marital_status.id
                      ],
                  marital_id:
                    store.myProfile?.user[0]?.general_information
                      ?.marital_status.id,
                  country_name: store.lang.id == 0
                    ? store.myProfile?.dataEnglish?.countries[
                    store.myProfile?.user[0]
                      ?.general_information?.country_name.id
                    ]
                    : store.myProfile?.dataArabic?.countries[
                    store.myProfile?.user[0]
                      ?.general_information?.country_name.id
                    ],
                  country_id: store.myProfile?.user[0]?.general_information?.country_name.id,
                  // immediate_available:store.myProfile?.user[0]?.general_information?.immediate_available,
                });
              }}
              icon="pencil"
              isEmpty={false}
              emptyMsg={store.lang.general_Info_not_available}
              children={
                store.myProfileApiLoader === false && (
                  <BorderView>
                    <JProfileInfo
                      title={`${store.lang.father_name}:`}
                      text={
                        store.myProfile?.user[0]?.general_information
                          ?.father_name == null
                          ? 'N/A'
                          : store.myProfile?.user[0]?.general_information?.father_name?.length > 50 ? store.myProfile?.user[0]?.general_information?.father_name?.substring(0, 50) + " . . . ." : store.myProfile?.user[0]?.general_information?.father_name
                      }
                    />
                    <JProfileInfo
                      title={`${store.lang.date_of_birth}:`}
                      text={
                        store.myProfileApiLoader === false &&
                        (store.myProfile?.user[0]?.general_information
                          ?.date_of_birth == null
                          ? 'N/A'
                          : moment(
                            store.myProfile?.user[0]?.general_information
                              ?.date_of_birth,
                          ).format('MMM,DD YYYY'))
                      }
                    />
                    <JProfileInfo
                      title={`${store.lang.gender}:`}
                      text={
                        store.myProfile?.user[0]?.general_information?.gender ==
                          null
                          ? 'N/A'
                          : store.myProfile?.user[0]?.general_information
                            ?.gender == '1'
                            ? store.lang.female
                            : store.lang.male
                      }
                    />

                    <JProfileInfo
                      title={`${store.lang.marital_status}:`}
                      text={
                        store.myProfile?.user[0]?.general_information
                          ?.marital_status.id == null
                          ? 'N/A'
                          : store.lang.id == 0
                            ? store.myProfile?.dataEnglish?.maritalStatus[
                            store.myProfile?.user[0]?.general_information
                              ?.marital_status.id
                            ]
                            : store.myProfile?.dataArabic?.maritalStatus[
                            store.myProfile?.user[0]?.general_information
                              ?.marital_status.id
                            ]
                      }
                    />

                    <JProfileInfo
                      title={`${store.lang.location}:`}
                      text={
                        store.myProfile?.user[0]?.general_information
                          ?.country_name.id !== null
                          ? `${store.myProfile?.user[0]?.general_information
                            ?.city_name?.name
                          } | ${store.myProfile?.user[0]?.general_information
                            ?.state_name?.name
                          } | ${store.lang.id == 0
                            ? store.myProfile?.dataEnglish?.countries[
                            store.myProfile?.user[0]
                              ?.general_information?.country_name.id
                            ]
                            : store.myProfile?.dataArabic?.countries[
                            store.myProfile?.user[0]
                              ?.general_information?.country_name.id
                            ]
                          }`
                          : 'N/A'
                      }
                    />

                    <JProfileInfo
                      title={`${store.lang.language}:`}
                      text={store.myProfile?.user[0]?.general_information?.language
                        .map((l, index) =>
                          store.lang.id == 0
                            ? store.myProfile?.dataEnglish?.language[l.id]
                            : store.myProfile?.dataArabic?.language[l.id],
                        )
                        .join(', ')}
                    />

                    <JProfileInfo
                      title={`${store.lang.immediate_available}:`}
                      text={
                        store.myProfile?.user[0]?.general_information
                          ?.immediate_available == null
                          ? 'N/A'
                          : store.myProfile?.user[0]?.general_information
                            ?.immediate_available == '1'
                            ? store.lang.yes
                            : store.lang.no
                      }
                    />
                  </BorderView>
                )
              }
            />
            <JProfileSections
              loader={store.myProfileApiLoader}
              IconPress2={() => {
                navigation.navigate('CEditProfile', {
                  selected: 2,
                  career_level:
                    store.myProfile?.user[0]?.experience_information
                      ?.career_level.id !== null && store.lang.id == 0
                      ? store.myProfile?.dataEnglish?.careerLevel[
                      store.myProfile?.user[0]?.experience_information
                        ?.career_level.id
                      ]
                      : store.myProfile?.dataArabic?.careerLevel[
                      store.myProfile?.user[0]?.experience_information
                        ?.career_level.id
                      ],
                  career_id:
                    store.myProfile?.user[0]?.experience_information
                      ?.career_level.id,
                  industry:
                    store.myProfile?.user[0]?.experience_information?.industry
                      ?.id !== null && store.lang.id == 0
                      ? store.myProfile?.dataEnglish?.industry[
                      store.myProfile?.user[0]?.experience_information
                        ?.industry?.id
                      ]
                      : store.myProfile?.dataArabic?.industry[
                      store.myProfile?.user[0]?.experience_information
                        ?.industry?.id
                      ],
                  industry_id:
                    store.myProfile?.user[0]?.experience_information?.industry
                      ?.id,
                  functional_area:
                    store.myProfile?.user[0]?.experience_information
                      ?.functional_area.id !== null && store.lang.id == 0
                      ? store.myProfile?.dataEnglish?.functionalArea[
                      store.myProfile?.user[0]?.experience_information
                        ?.functional_area.id
                      ]
                      : store.myProfile?.dataArabic?.functionalArea[
                      store.myProfile?.user[0]?.experience_information
                        ?.functional_area.id
                      ],
                  functional_area_id:
                    store.myProfile?.user[0]?.experience_information
                      ?.functional_area.id,
                  salary_currency:
                    store.myProfile?.user[0]?.experience_information
                      ?.salary_currency.id !== null && store.lang.id == 0
                      ? store.myProfile?.dataEnglish?.currency[
                      store.myProfile?.user[0]?.experience_information
                        ?.salary_currency.id
                      ]
                      : store.myProfile?.dataArabic?.currency[
                      store.myProfile?.user[0]?.experience_information
                        ?.salary_currency.id
                      ],
                  salary_currency_id:
                    store.myProfile?.user[0]?.experience_information
                      ?.salary_currency.id,
                });
              }}
              isEmpty={false}
              children={
                store.myProfileApiLoader === false && (
                  <BorderView>
                    <JProfileInfo
                      title={`${store.lang.experience}:`}
                      text={
                        store.myProfile?.user[0]?.experience_information
                          ?.experience == null
                          ? 'N/A'
                          : store.myProfile?.user[0]?.experience_information
                              ?.experience +  ` ${  store.myProfile?.user[0]?.experience_information
                                ?.experience==1?store.lang.year:store.lang.years}`
                      }
                    />

                    <JProfileInfo
                      title={`${store.lang.career_level}:`}
                      text={
                        store.myProfile?.user[0]?.experience_information
                          ?.career_level.id == null
                          ? 'N/A'
                          : store.lang.id == 0
                            ? store.myProfile?.dataEnglish?.careerLevel[
                            store.myProfile?.user[0]?.experience_information
                              ?.career_level.id
                            ]
                            : store.myProfile?.dataArabic?.careerLevel[
                            store.myProfile?.user[0]?.experience_information
                              ?.career_level.id
                            ]
                      }
                    />

                    <JProfileInfo
                      title={`${store.lang.Industry}:`}
                      text={
                        store.myProfile?.user[0]?.experience_information
                          ?.industry?.id == null
                          ? 'N/A'
                          : store.lang.id == 0
                            ? store.myProfile?.dataEnglish?.industry[
                            store.myProfile?.user[0]?.experience_information
                              ?.industry?.id
                            ]
                            : store.myProfile?.dataArabic?.industry[
                            store.myProfile?.user[0]?.experience_information
                              ?.industry?.id
                            ]
                      }
                    />

                    <JProfileInfo
                      title={`${store.lang.functional_Area}:`}
                      text={
                        store.myProfile?.user[0]?.experience_information
                          ?.functional_area.id == null
                          ? 'N/A'
                          : store.lang.id == 0
                            ? store.myProfile?.dataEnglish?.functionalArea[
                            store.myProfile?.user[0]?.experience_information
                              ?.functional_area.id
                            ]
                            : store.myProfile?.dataArabic?.functionalArea[
                            store.myProfile?.user[0]?.experience_information
                              ?.functional_area.id
                            ]
                      }
                    />

                    <JProfileInfo
                      title={`${store.lang.current_salary}:`}
                      text={
                        store.myProfile?.user[0]?.experience_information
                          ?.current_salary == null
                          ? 'N/A'
                          : store.lang.id == 0
                            ? `${store.myProfile?.user[0]?.experience_information?.current_salary}-` +
                            store.myProfile?.dataEnglish?.currency[
                            store.myProfile?.user[0]?.experience_information
                              ?.salary_currency.id
                            ]
                            : `${store.myProfile?.user[0]?.experience_information?.current_salary}-` +
                            store.myProfile?.dataArabic?.currency[
                            store.myProfile?.user[0]?.experience_information
                              ?.salary_currency.id
                            ]
                      }
                    />

                    <JProfileInfo
                      title={`${store.lang.expected_salary}:`}
                      text={
                        store.myProfile?.user[0]?.experience_information
                          ?.expected_salary == null
                          ? 'N/A'
                          : store.lang.id == 0
                            ? `${store.myProfile?.user[0]?.experience_information?.expected_salary}-` +
                            store.myProfile?.dataEnglish?.currency[
                            store.myProfile?.user[0]?.experience_information
                              ?.salary_currency.id
                            ]
                            : `${store.myProfile?.user[0]?.experience_information?.expected_salary}-` +
                            store.myProfile?.dataArabic?.currency[
                            store.myProfile?.user[0]?.experience_information
                              ?.salary_currency.id
                            ]
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
              IconPress2={() => {
                navigation.navigate('CEditProfile', { selected: 3 });
              }}
              heading={store.lang.skills}
              icon="add"
              emptyMsg={store.lang.skills_not_available}
              isEmpty={
                store?.myProfile?.user[0]?.skills !== null ? false : true
              }
              children={
                store.myProfileApiLoader === false && (
                  <View
                    style={{
                      marginVertical: RFPercentage(2),
                      padding: RFPercentage(1),
                    }}>
                    {store.myProfile?.user[0]?.skills !== null &&
                      store.myProfile?.user[0]?.skills.map((item, index) => (
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
                          <JText fontSize={RFPercentage(1.8)}>
                            {store.lang.id == 0
                              ? item?.name
                              : item?.arabic_title}
                          </JText>
                        </JRow>
                      ))}
                  </View>
                )
              }
            />

            <JProfileSections
              loader={store.myProfileApiLoader}
              IconPress2={() => {
                navigation.navigate('CSocialMediaLink', {
                  selected: 4,
                  fb: store.myProfile?.user[0]?.social_links?.facebook_url,
                  ln: store.myProfile?.user[0]?.social_links?.linkedin_url,
                  tw: store.myProfile?.user[0]?.social_links?.twitter_url,
                });

                // refRBSheet.current.open();
              }}
              isEmpty={
                store.myProfile?.user[0]?.social_links?.facebook_url == null &&
                  store.myProfile?.user[0]?.social_links?.twitter_url == null &&
                  store.myProfile?.user[0]?.social_links?.linkedin_url == null
                  ? true
                  : false
              }
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
                    {/* ['facebook_url', 'twitter_url', 'linkedin-in'] */}

                    {store.myProfile?.user?.map((item, index) => (
                      <View key={index}>
                        {item.social_links?.facebook_url !== null &&
                          item.social_links?.facebook_url !== 'null' && (
                            <Pressable
                              onPress={() => {
                                Linking.openURL(
                                  item.social_links?.facebook_url,
                                ).catch(error =>
                                  console.error('Error opening URL:', error),
                                );
                              }}
                              style={{ marginBottom: RFPercentage(2) }}>
                              <JRow>
                                <FontAwesome5Brands
                                  size={RFPercentage(3)}
                                  name="facebook-f"
                                  color={colors.purple[0]}
                                  style={{ marginHorizontal: RFPercentage(1) }}
                                />

                                <JText
                                  fontWeight="600"
                                  fontSize={RFPercentage(2)}>
                                  {store.lang.facebook}
                                </JText>
                              </JRow>
                              <JText
                                fontWeight="600"
                                fontColor={'grey'}
                                style={{ textDecorationLine: 'underline' }}
                                fontSize={RFPercentage(2)}>
                                {item.social_links?.facebook_url === null ||
                                  item.social_links?.facebook_url === undefined ||
                                  item.social_links?.facebook_url == 'null'
                                  ? 'N/A'
                                  : item.social_links?.facebook_url}
                              </JText>
                            </Pressable>
                          )}

                        {item.social_links?.twitter_url !== null &&
                          item.social_links?.twitter_url !== 'null' && (
                            <Pressable
                              onPress={() => {
                                Linking.openURL(
                                  item.social_links?.twitter_url,
                                ).catch(error =>
                                  console.error('Error opening URL:', error),
                                );
                              }}
                              style={{ marginBottom: RFPercentage(2) }}>
                              <JRow>
                                <FontAwesome5Brands
                                  size={RFPercentage(3)}
                                  name="twitter"
                                  color={colors.purple[0]}
                                  style={{ marginHorizontal: RFPercentage(1) }}
                                />

                                <JText
                                  fontWeight="600"
                                  fontSize={RFPercentage(2)}>
                                  {store.lang.twitter}
                                </JText>
                              </JRow>
                              <JText
                                fontWeight="600"
                                fontColor={'grey'}
                                style={{ textDecorationLine: 'underline' }}
                                fontSize={RFPercentage(2)}>
                                {item.social_links.twitter_url === null ||
                                  item.social_links?.twitter_url === undefined ||
                                  item.social_links?.twitter_url == 'null'
                                  ? 'N/A'
                                  : item.social_links.twitter_url}
                              </JText>
                            </Pressable>
                          )}

                        {item.social_links?.linkedin_url !== null &&
                          item.social_links?.linkedin_url !== 'null' && (
                            <Pressable
                              onPress={() => {
                                Linking.openURL(
                                  item.social_links?.linkedin_url,
                                ).catch(error =>
                                  console.error('Error opening URL:', error),
                                );
                              }}
                              style={{ marginBottom: RFPercentage(2) }}>
                              <JRow>
                                <FontAwesome5Brands
                                  size={RFPercentage(3)}
                                  name="linkedin-in"
                                  color={colors.purple[0]}
                                  style={{ marginHorizontal: RFPercentage(1) }}
                                />

                                <JText
                                  fontWeight="600"
                                  fontSize={RFPercentage(2)}>
                                  {store.lang.linkedIn}
                                </JText>
                              </JRow>
                              <JText
                                fontWeight="600"
                                fontColor={'grey'}
                                style={{ textDecorationLine: 'underline' }}
                                fontSize={RFPercentage(2)}>
                                {item.social_links?.linkedin_url === null ||
                                  item.social_links?.linkedin_url === undefined ||
                                  item.social_links?.linkedin_url == 'null'
                                  ? 'N/A'
                                  : item.social_links?.linkedin_url}
                              </JText>
                            </Pressable>
                          )}
                      </View>
                    ))}
                  </View>
                )
              }
            />
            {/* <JProfileSections
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
                        store.myProfile?.user[0].social_links[item] !=
                          'null' && (
                          <View
                            style={{marginBottom: RFPercentage(2)}}
                            key={index}>
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
                              <JText
                                fontWeight="600"
                                fontSize={RFPercentage(2)}>
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
            /> */}
          </JScrollView>
        </>

      </JScreen>)
  );
}
export default observer(Profile);

const styles = StyleSheet.create({
  text: {
    marginTop: RFPercentage(0.5),
  },
});
