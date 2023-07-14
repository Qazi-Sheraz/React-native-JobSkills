import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import JRow from '../../../../customComponents/JRow';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JText from '../../../../customComponents/JText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../../../config/colors';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Observer} from 'mobx-react';
import {useContext} from 'react';
import {StoreContext} from '../../../../mobx/store';
import { types } from 'react-native-document-picker';

export default function Experience({

  setSelected,
  refRBSheet,
  experience,
  loader,
  _deleteExperience,
  selectedExperience,
  setSelectedExperience,
 
}) {
  // console.log(store?.myProfile?.data?.countries[experience?.country_id])
  const store =useContext(StoreContext);
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
                setSelected(0);
                setSelectedExperience(null);
                refRBSheet?.current?.open();
              }}
              color={colors.black[0]}
              name="pluscircleo"
              size={RFPercentage(3)}
            />
          </JRow>
          {loader ? (
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
          ) : experience?.length > 0 ? (
            experience?.map((item, index) => (
              <View
                key={index}
                style={{
                  borderColor: colors.border[0],
                  borderWidth: RFPercentage(0.2),

                  marginVertical: RFPercentage(1),
                  padding: RFPercentage(2),
                }}>
                <JRow style={{justifyContent: 'space-between'}}>
                  <JText fontWeight='bold'>{item?.experience_title}</JText>
                  
                  <TouchableOpacity
                    onPress={() => {
                      setSelected(0);
                      
                      setSelectedExperience({title:item?.experience_title,company:item?.company,start:moment(item?.start_date).format('DD MMM, YYYY'),end:moment(item?.end_date).format('DD MMM, YYYY'),description:item?.description, country_id:item?.country_id,state_id:item?.state_id, 
                      city_id:item?.city_id, })
                      refRBSheet?.current?.open({type:1});
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
                <JText style={{marginTop: RFPercentage(0.5),color:colors.searchPlaceholder[0],fontWeight:'bold'}}>
                  {item?.company}
                </JText> 
                <JText style={{marginTop: RFPercentage(0.5),color:colors.searchPlaceholder[0]}}>
                  {moment(item?.start_date).format('DD')}th{' '}
                  {moment(item?.start_date).format('MMM, YYYY')} -{' '}
                  {moment(item?.end_date).format('DD')}th{' '}
                  {moment(item?.end_date).format('MMM, YYYY')} | {store.lang.id==0?store?.myProfile?.dataEnglish?.countries[item?.country_id]:store?.myProfile?.dataArabic?.countries[item?.country_id]}
                </JText>
                <JText style={{marginTop: RFPercentage(0.5)}}>
                  {item?.description}
                </JText>
               
                <JRow style={{justifyContent: 'space-between'}}>
                  <JText fontColor={colors.placeHolderColor[0]}>{store.lang.complete}</JText>
                  <TouchableOpacity
                    onPress={() => _deleteExperience(item?.id)}
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
