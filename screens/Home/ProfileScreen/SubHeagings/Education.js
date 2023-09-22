import {
  ActivityIndicator,
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
import RBSheet from 'react-native-raw-bottom-sheet';

export default function Education({
  education,
  setSelected,
  refRBSheet,
  loader,
  _deleteEducation,
  selectedEdu,
  setSelectedEdu,
}) {
  const store = useContext(StoreContext);

  // {console.log(store?.myProfile?.dataEnglish?.countries[])}
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
            <JText fontSize={RFPercentage(2)}>{store.lang.education}</JText>
            <AntDesign
              onPress={() => {
                setSelected(1);
                setSelectedEdu(null);
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
          ) : education?.length > 0 ? (
            education?.map((item, index) => (
              <View
                key={index}
                style={{
                  borderColor: colors.border[0],
                  borderWidth: RFPercentage(0.2),

                  marginVertical: RFPercentage(1),
                  padding: RFPercentage(2),
                }}>{item.degree_level&&
                  <JText fontWeight='bold'>{store.lang.id==0?item.degree_level?.name:item.degree_level?.arabic_title}</JText>}
                <JRow style={{justifyContent: 'space-between', }}>
                 
                  <JText style={{width:'90%'}}fontWeight='bold'>
                    {/* {item.degree_title} */}
                    {item.degree_title?.length > 35 ? item?.degree_title?.slice(0, 35) + " . . . " :item?.degree_title}
                    </JText>
                  <TouchableOpacity
                  onPress={()=>{
                    setSelectedEdu({
                      educationId:item.id,
                      degree_level: store.lang.id==0?item?.degree_level?.name:item?.degree_level?.arabic_title,
                      degree_level_id:item?.degree_level_id,
                      title:item?.degree_title,
                      institute:item?.institute,
                      year:item?.year,
                      description:item?.description, 
                      result:item?.result, 
                      country_id: item?.country_id,
                        country:
                        store.lang.id == 0
                          ?item?.country?.name
                          :item?.country?.arabic_title,
                        state_id: item?.state_id,
                        state:store.lang.id == 0
                        ?item?.state?.name
                        :item?.state?.arabic_title,
                        city_id: item?.city_id,
                        city:store.lang.id == 0
                        ?item?.city?.name
                        :item?.city?.arabic_title,
                    })
                    setSelected(1);
                refRBSheet?.current?.open();
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
                {/* <JText style={{marginTop: RFPercentage(0.5)}}>(BAS)</JText> */}
                <JText style={{marginTop: RFPercentage(0.5)}}>
                  {item?.institute?.length > 70 ? item?.institute?.slice(0, 70) + " . . . " :item?.institute}
                  {/* {item?.institute?.length > 70 ? item?.institute?.slice(0, 70) + " . . . " :item?.institute} */}
                </JText>
                <JText style={{marginTop: RFPercentage(0.5)}}>
                  {item?.year} |{' '}
                  {store.lang.id==0?store?.myProfile?.dataEnglish?.countries[item?.country_id]:store?.myProfile?.dataArabic?.countries[item?.country_id]}
                  

                </JText>
                
                {/* <JRow style={{justifyContent: 'space-between'}}>
                  <JText fontColor={colors.black[0]}>{item.institute}</JText> */}
                  <TouchableOpacity
                    onPress={() => {_deleteEducation(item.id)
                    }}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: RFPercentage(4),
                      width: RFPercentage(4),
                      backgroundColor: '#FB3449',
                    }}>
                    <FontAwesome
                      color={colors.white[0]}
                      name="trash-o"
                      size={RFPercentage(2.5)}
                    />
                  </TouchableOpacity>
                {/* </JRow> */}
              </View>
            ))
          ) : (
            <View
              style={{
                borderColor: colors.border[0],
                borderWidth: RFPercentage(0.2),
                height: RFPercentage(20),
                marginTop: RFPercentage(2),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <JText fontSize={RFPercentage(2)}>{store.lang.education_not_available}</JText>
            </View>
          )}
        </>
      )}
    </Observer>
  );
}

const styles = StyleSheet.create({});
