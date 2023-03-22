import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import JText from './JText';
import colors from '../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import JRow from './JRow';
export default function JProfileSections({
  heading,
  icon = 'pencil',
  isEmpty = true,
  children,
  onIconPress,
  emptyMsg,
  loader,
}) {
  return (
    <React.Fragment>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: RFPercentage(1),
          alignItems: 'center',
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
        <JText fontSize={RFPercentage(2.5)}>{heading}</JText>

        {icon === 'pencil' 
        ? (
          <SimpleLineIcons
            onPress={onIconPress}
            name="pencil"
            color={colors.black[0]}
            size={RFPercentage(3)}
          />
        ) : icon === 'add' ? (
          <Ionicons
            onPress={onIconPress}
            name="add-circle-outline"
            color={colors.black[0]}
            size={RFPercentage(3.2)}
          />
        ) :
         icon === '1' ? (
          <JRow>
            <SimpleLineIcons
            style={{marginRight:RFPercentage(1)}}
              onPress={onIconPress}
              name="pencil"
              color={colors.black[0]}
              size={RFPercentage(3)}
            />
            <Ionicons
              onPress={onIconPress}
              name="add-circle-outline"
              color={colors.black[0]}
              size={RFPercentage(3.2)}
            />
          </JRow>
        ) : null}
      </View>

      {loader === true ? (
        <View
          style={{
            borderColor: colors.border[0],
            borderWidth: RFPercentage(0.2),
            height: RFPercentage(20),
            marginVertical: RFPercentage(2),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={RFPercentage(2)} color={colors.black[0]} />
        </View>
      ) : isEmpty === true ? (
        <View
          style={{
            borderColor: colors.border[0],
            borderWidth: RFPercentage(0.2),
            height: RFPercentage(20),
            marginVertical: RFPercentage(2),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <JText fontSize={RFPercentage(2)}>{emptyMsg}</JText>
        </View>
      ) : (
        children
      )}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({});
