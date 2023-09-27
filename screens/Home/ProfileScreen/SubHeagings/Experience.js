import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext } from 'react';
import JRow from '../../../../customComponents/JRow';
import { RFPercentage } from 'react-native-responsive-fontsize';
import JText from '../../../../customComponents/JText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../../../config/colors';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Observer } from 'mobx-react';
import { StoreContext } from '../../../../mobx/store';
import { useNavigation } from '@react-navigation/native';

export default function Experience({

  _deleteExperience,
}) {
  const store = useContext(StoreContext);
  const navigation = useNavigation();

  return (
    <Observer>
      {() => (
        <>
          <JRow
            style={{
              backgroundColor: '#EDF2F7',
              paddingVertical: RFPercentage(2),
              paddingHorizontal: RFPercentage(1.5),
              justifyContent: 'space-between',
              shadowColor: '#000000',
              shadowOpacity: 0.3,
              shadowRadius: 2,
              shadowOffset: {
                height: 1,
                width: 1,
              },
              elevation: 4,
            }}>
            <JText fontSize={RFPercentage(2)}>{store.lang.experience}</JText>
            <AntDesign
              onPress={() => {
                navigation.navigate('ExperienceInfo')

              }}
              color={colors.black[0]}
              name="pluscircleo"
              size={RFPercentage(3)}
            />
          </JRow>
          {store.experienceApiLoader ? (
            <View
              style={{
                borderColor: colors.border[0],
                borderWidth: RFPercentage(0.2),
                height: RFPercentage(20),
                marginVertical: RFPercentage(2),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator />
            </View>
          ) : store.experienceList?.length > 0 ? (
            store.experienceList?.map((item, index) => (
              <View
                key={index}
                style={{
                  borderColor: colors.border[0],
                  borderWidth: RFPercentage(0.2),

                  marginVertical: RFPercentage(1),
                  padding: RFPercentage(2),
                }}>
                <JRow style={{ justifyContent: 'space-between' }}>
                  <JText style={{ width: '90%' }} fontWeight='bold'>
                    {/* {item?.experience_title} */}
                    {item?.experience_title?.length > 35 ? item?.experience_title?.slice(0, 35) + " . . . " : item?.experience_title}
                  </JText>

                  <TouchableOpacity
                    onPress={() => {

                      navigation.navigate('ExperienceInfo', {
                        type: 0,
                        experienceId: item.id,
                        title: item?.experience_title,
                        company: item?.company,
                        start: moment(item?.start_date).format('MM/DD/YYYY'),
                        end: moment(item?.end_date).format('MM/DD/YYYY'),
                        description: item?.description,
                        country_id: item?.country_id,
                        country:
                          store.lang.id == 0
                            ? item?.country?.name
                            : item?.country?.arabic_title,
                        state_id: item?.state_id,
                        state: store.lang.id == 0
                          ? item?.state?.name
                          : item?.state?.arabic_title,
                        city_id: item?.city_id,
                        city: store.lang.id == 0
                          ? item?.city?.name
                          : item?.city?.arabic_title,
                        working: item?.currently_working,
                      })
                    }}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: RFPercentage(4),
                      width: RFPercentage(4),
                    }}>
                    <SimpleLineIcons
                      color={colors.black[0]}
                      name="pencil"
                      size={RFPercentage(2.5)}
                    />
                  </TouchableOpacity>
                </JRow>
                <JText style={{ marginTop: RFPercentage(0.5), color: colors.searchPlaceholder[0], fontWeight: 'bold' }}>
                  {item?.company?.length > 40 ? item?.company?.slice(0, 40) + " . . . " : item?.company}
                </JText>

                <JText style={{ marginTop: RFPercentage(0.5), color: colors.searchPlaceholder[0] }}>
                  {`${moment(item?.start_date).format('DD') + 'th ' + moment(item?.start_date).format('MMM, YYYY')} - ${item?.currently_working ? 'Prasent' : moment(item?.end_date).format('DD') + 'th ' + moment(item?.end_date).format('MMM, YYYY')} | ${store.lang.id == 0 ? store?.myProfile?.dataEnglish?.countries[item?.country_id] : store?.myProfile?.dataArabic?.countries[item?.country_id]}`} </JText>

                <JText style={{ marginTop: RFPercentage(0.5) }}>
                  {/* {item?.description} */}
                  {item?.description?.length > 100 ? item?.description?.slice(0, 100) + " . . . " : item?.description}
                </JText>

                <JRow style={{ justifyContent: 'space-between' }}>
                  <JText fontColor={colors.placeHolderColor[0]}>{store.lang.complete}</JText>
                  <TouchableOpacity
                    onPress={() => {
                      _deleteExperience(item?.id)
                    }}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: RFPercentage(4),
                      width: RFPercentage(4),
                      marginTop: RFPercentage(2),
                      backgroundColor: '#FB3449',
                    }}>
                    <FontAwesome
                      color={colors.white[0]}
                      name="trash-o"
                      size={RFPercentage(2.5)}
                    />
                  </TouchableOpacity>
                </JRow>
              </View>
            ))
          ) : (
            <View
              style={{
                borderColor: colors.border[0],
                borderWidth: RFPercentage(0.2),
                height: RFPercentage(20),
                marginVertical: RFPercentage(2),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <JText fontSize={RFPercentage(2)}>{store.lang.experience_not_available}</JText>
            </View>
          )}
        </>
      )}
    </Observer>
  );
}

const styles = StyleSheet.create({});
