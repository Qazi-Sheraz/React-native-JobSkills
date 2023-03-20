import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Pressable
} from 'react-native';

import React, {memo, useContext} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import colors from '../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JText from './JText';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import JStatusChecker from './JStatusChecker';
import {useState} from 'react';
import {StoreContext} from '../mobx/store';
import {_saveToFavoriteList} from '../functions/Candidate/BottomTab.js';
import {observer} from 'mobx-react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';

function JRecentJobTile({
  isempty = false,
  img,
  image=true,
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
const navigation=useNavigation();
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
    <Pressable
    onPress={onPress}
      style={[
        {
          height: heightPercentageToDP(14),
          backgroundColor: colors.tileColor[0],
          flexDirection: 'row',
          marginBottom: RFPercentage(1),
        },
        containerStyle,
      ]}>
        {image && <View
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
      </View>}
    

      <View
        style={{
          width: image ? '72%' :'100%',
          justifyContent: 'center',
          paddingHorizontal: RFPercentage(1),
        }}>
        <JText fontWeight="bold">{title}</JText>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: RFPercentage(0.5),
          }}>
          <JText fontColor={colors.danger[0]}>Expire on</JText>
          <JText>: {moment().format('DD MMM,YYYY')}</JText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: RFPercentage(0.5),
          }}>
          <Pressable
          onPress={()=> navigation.navigate('JobApplication')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <EvilIcons name="user" size={RFPercentage(3)} />
            <JText> 2 Applicates</JText>
          </Pressable>

          {!status == 'closed' ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',

                backgroundColor: colors.danger[0],
                paddingVertical: RFPercentage(0.5),
                paddingHorizontal: RFPercentage(0.8),
              }}>
              <JText
                style={{
                  marginRight: RFPercentage(0.5),
                  color: colors.white[0],
                }}
                fontWeight="bold">
                Closed
              </JText>
            </View>
          ) : (
            <Menu>
              <MenuTrigger>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: colors.green[0],
                    paddingVertical: RFPercentage(0.5),
                    paddingHorizontal: RFPercentage(0.8),
                    shadowColor: '#000000',
                    shadowOpacity: 0.4,
                    shadowRadius: 2,
                    shadowOffset: {
                      height: 1,
                      width: 1,
                    },
                    elevation: 4,
                  }}>
                  <JText
                    style={{
                      marginRight: RFPercentage(0.5),
                      color: colors.white[0],
                    }}
                    fontWeight="bold">
                    Live
                  </JText>
                  <Entypo
                    name="chevron-small-down"
                    color={colors.white[0]}
                    size={RFPercentage(2)}
                  />
                </View>
              </MenuTrigger>

              <MenuOptions>
                {['Paused', 'Close'].map((item, index) => (
                  <MenuOption
                    style={{
                      marginLeft: RFPercentage(1),
                    }}
                    key={index}
                    onSelect={() => {
                      alert(item);
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <JText
                        style={{marginLeft: RFPercentage(2)}}
                        fontSize={RFPercentage(2)}>
                        {item}
                      </JText>
                    </View>
                  </MenuOption>
                ))}
              </MenuOptions>
            </Menu>
          )}
        </View>

        {loader ? (
          <ActivityIndicator
            style={{
              fontSize: RFPercentage(3),
              position: 'absolute',
              padding: RFPercentage(0.4),
              top: 0,
              right: 0,
            }}
            color={colors.purple[0]}
          />
        ) : (
          <MaterialCommunityIcons
            onPress={() => {
              _saveToFavoriteList(store, setLoader, jobId);
            }}
            style={{
              position: 'absolute',
              padding: RFPercentage(0.4),
              top: 0,
              right: 0,
            }}
            name={
              favouriteData.some(item => item.job_id === jobId)
                ? 'star'
                : 'star-outline'
            }
            size={RFPercentage(3)}
            color={colors.purple[0]}
          />
        )}
      </View>
    </Pressable>
  );
}
export default memo(observer(JRecentJobTile));
const styles = StyleSheet.create({});
