import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {
  useContext,
  useState
} from 'react';
import {
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import JRow from './JRow';
import JText from './JText';
import colors from '../config/colors';
import { observer } from 'mobx-react';
import JChevronIcon from './JChevronIcon';
import { StoreContext } from '../mobx/store';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { _saveToFollowing } from '../functions/Candidate/DFollowing';
import { _saveToFavoriteList } from '../functions/Candidate/BottomTab.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
function JCompanyTile({
  img,
  title,
  onPress,
  OpenJob,
  location,
  companyId,
  containerStyle,
  isempty = false,
  followingList = [],
}) {
  const [loader, setLoader] = useState();
  const store = useContext(StoreContext);
  return isempty === true ? (
    <JChevronIcon />
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
          // width: '26%',
          justifyContent: 'center',
          // paddingHorizontal: RFPercentage(1),
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
            source={{ uri: img }}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: '75%',
          justifyContent: 'center',
          paddingHorizontal: RFPercentage(1),
        }}>
        <JRow
          style={{
            justifyContent: 'space-between',

          }}>
          <JText style={{ width: '85%' }}>{title?.length > 50 ? title?.slice(0, 50) + " . . . ." : title}</JText>

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
        </JRow>
        <JText style={{ marginVertical: RFPercentage(0.5), }}>{location}</JText>

        <JText
          style={{
            alignSelf: store.lang.id == 0 ? 'flex-end' : 'flex-start',
            marginVertical: RFPercentage(0),
            marginRight: RFPercentage(1),
            padding: RFPercentage(0.5),

            backgroundColor: colors.openJob[0],
            textAlign: 'center',
          }}>
          {OpenJob}
        </JText>
      </View>
    </JRow>
  );
}
export default observer(JCompanyTile);
const styles = StyleSheet.create({});
