import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import React, {memo, useContext} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import colors from '../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JText from './JText';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import JStatusChecker from './JStatusChecker';
import {useState} from 'react';
import {StoreContext} from '../mobx/store';
import {_saveToFavoriteList} from '../functions/Candidate/BottomTab.js';
import {observer} from 'mobx-react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
function JJobTile({
  isempty = false,
  img,
  title,
  location,
  category,
  type = 'job',
  onPress,
  containerStyle,
  bookmarked,
  onIconPress,
  status,
  favouriteData = [],
  jobId,
}) {
  const [loader, setLoader] = useState();
  const store = useContext(StoreContext);

  return isempty === true ? (
    <View
      style={{
        height: heightPercentageToDP(14),
        backgroundColor: colors.tileColor[0],
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{width: RFPercentage(6), height: RFPercentage(6)}}
        source={require('../assets/images/empty/empty.png')}
      />
      <JText style={{marginTop: RFPercentage(1)}}>Not Found !</JText>
    </View>
  ) : (
    <View
      style={[
        {
          height: heightPercentageToDP(14),
          backgroundColor: colors.tileColor[0],
          flexDirection: 'row',
        },
        containerStyle,
      ]}>
      <View
        style={{
          width: '28%',
          justifyContent: 'center',
          paddingHorizontal: RFPercentage(1),
        }}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            height: RFPercentage(12),
            width: RFPercentage(12),
            borderWidth: RFPercentage(0.1),
            borderColor: colors.inputBorder[0],
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: RFPercentage(10),
              width: RFPercentage(10),
            }}
            resizeMode="contain"
            source={{uri: img}}
          />
        </TouchableOpacity>
      </View>
      {type === 'job' ? (
        <View
          style={{
            width: '72%',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '90%',
              justifyContent: 'center',
              paddingLeft: RFPercentage(1),
            }}>
            <JText>{title}</JText>
            <JText style={{marginVertical: RFPercentage(0.5)}}>
              {location}
            </JText>

            <JText style={{marginVertical: RFPercentage(0.5)}}>
              {category}
            </JText>
          </View>

          {loader ? (
            <ActivityIndicator
              style={{
                fontSize: RFPercentage(3.5),
                alignSelf: 'flex-start',
                paddingTop: RFPercentage(2),
                zIndex: 9999,
                width: '10%',
              }}
              color={colors.purple[0]}
            />
          ) : (
            <MaterialCommunityIcons
              onPress={() => {
                _saveToFavoriteList(store, setLoader, jobId);
              }}
              style={{
                alignSelf: 'flex-start',
                paddingTop: RFPercentage(2),
                zIndex: 9999,
                width: '10%',
              }}
              name={
                favouriteData.some(item => item.job_id === jobId)
                  ? 'star'
                  : 'star-outline'
              }
              size={RFPercentage(3.5)}
              color={colors.purple[0]}
            />
          )}
        </View>
      ) : type === 'company' ? (
        <View
          style={{
            width: '72%',
            justifyContent: 'center',
            paddingLeft: RFPercentage(1),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <JText>{title}</JText>

            <FontAwesome
              onPress={onIconPress}
              style={{
                alignSelf: 'flex-start',
                zIndex: 1,
                width: '10%',
              }}
              name={bookmarked ? 'heart' : 'heart-o'}
              size={RFPercentage(3)}
              color={colors.purple[0]}
            />
          </View>
          <JText style={{marginVertical: RFPercentage(0.5)}}>{location}</JText>

          <JText
            style={{
              alignSelf: 'flex-end',
              marginVertical: RFPercentage(0),
              marginRight: RFPercentage(1),
              padding: RFPercentage(0.5),

              backgroundColor: colors.openJob[0],
              textAlign: 'center',
            }}>
            Open Job
          </JText>
        </View>
      ) : (
        <View
          style={{
            width: '72%',
            justifyContent: 'center',
            paddingLeft: RFPercentage(1),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <JText>{title}</JText>
          </View>
          <JText style={{marginVertical: RFPercentage(0.5)}}>{location}</JText>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingRight: RFPercentage(1),
            }}>
            <JText
              style={{
                textAlign: 'center',
              }}>
              {category}
            </JText>
            <JStatusChecker status={status} />
          </View>
        </View>
      )}
    </View>
  );
}
export default memo(observer(JJobTile));
const styles = StyleSheet.create({});
