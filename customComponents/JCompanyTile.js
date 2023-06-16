import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useContext} from 'react';
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
import {_saveToFollowing} from '../functions/Candidate/DFollowing';
import JRow from './JRow';
function JCompanyTile({
  isempty = false,
  img,
  title,
  location,
  onPress,
  containerStyle,
  companyId,
  followingList = [],
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
    <JRow
      style={[
        {
          height: heightPercentageToDP(14),
          backgroundColor: colors.tileColor[0],
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

          {loader ? (
            <ActivityIndicator
              style={{
                alignSelf: 'flex-start',
                zIndex: 1,
                width: '10%',
              }}
              color={colors.purple[0]}
            />
          ) : (
            <MaterialCommunityIcons
              onPress={() => {
                _saveToFollowing(store, setLoader, companyId);
              }}
              style={{
                alignSelf: 'flex-start',
                zIndex: 1,
                width: '10%',
              }}
              name={
                followingList.some(item => item.company_id === companyId)
                  ? 'thumb-up'
                  : 'thumb-up-outline'
              }
              size={RFPercentage(3)}
              color={colors.purple[0]}
            />
          )}
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
    </JRow>
  );
}
export default observer(JCompanyTile);
const styles = StyleSheet.create({});
