import {StyleSheet, TextInput, View, Pressable} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import colors from '../config/colors';
import JShadowView from './JShadowView';

export default function JSearchInput({
  onChangeText,
  containerStyle,
  inputStyle,
  placeholderTextColor = colors.placeHolderColor[0],
  placeholder = 'Search',
  iconContainerStyle,
  onPressIcon,
  autoFocus = false,
  length,
}) {
  return length > 0 ? (
    <JShadowView
      shadowColor={colors.purple[0]}
      containerStyle={[
        {
          height: heightPercentageToDP(6),
          marginVertical: RFPercentage(3),
          backgroundColor: colors.white[0],
          borderWidth: RFPercentage(0.1),
          borderColor: `${colors.purple[0]}50`,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: RFPercentage(2),
        },
        containerStyle,
      ]}>
      <AntDesign
        style={{marginRight: RFPercentage(1)}}
        name="search1"
        color={colors.placeHolderColor[0]}
        size={RFPercentage(2.5)}
      />

      <TextInput
        autoFocus={autoFocus}
        style={[{width: '100%'}, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        onChangeText={onChangeText}
      />
    </JShadowView>
  ) : (
    <View style={{marginTop: RFPercentage(2)}} />
  );
}

const styles = StyleSheet.create({});
