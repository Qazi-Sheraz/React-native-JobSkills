import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import JText from './JText';
import colors from '../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function JProfileSections({
  heading,
  icon = 'pencil',
  isEmpty = true,
  children,
  onIconPress,
}) {
  return (
    <React.Fragment>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: RFPercentage(1),
          alignItems: 'center',
        }}>
        <JText fontSize={RFPercentage(2.5)}>{heading}</JText>
        {icon === 'pencil' ? (
          <SimpleLineIcons
            onPress={onIconPress}
            name="pencil"
            color={colors.black[0]}
            size={RFPercentage(3.5)}
          />
        ) : icon === 'add' ? (
          <Ionicons
            onPress={onIconPress}
            name="add-circle-outline"
            color={colors.black[0]}
            size={RFPercentage(4.4)}
          />
        ) : null}
      </View>
      {isEmpty === true ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: heightPercentageToDP(15),
          }}>
          <JText>Content Not Available</JText>
        </View>
      ) : (
        children
      )}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({});
