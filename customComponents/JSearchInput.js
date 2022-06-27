import {StyleSheet, TextInput, View, Pressable} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import colors from '../config/colors';

export default function JSearchInput({
  onChangeText,
  containerStyle,
  inputStyle,
  placeholderTextColor = colors.searchPlaceholder[0],
  placeholder = 'Search',
  iconContainerStyle,
  onPressIcon,
}) {
  return (
    <View
      style={[
        {
          height: heightPercentageToDP(5),
          marginVertical: RFPercentage(3),
          backgroundColor: colors.searchBackground[0],
          borderWidth: RFPercentage(0.1),
          borderColor: colors.inputBorder[0],
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: RFPercentage(2),
        },
        containerStyle,
      ]}>
      <TextInput
        style={[{width: '90%'}, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        onChangeText={onChangeText}
      />
      <Pressable
        onPress={onPressIcon}
        style={[{alignItems: 'flex-end', width: '10%'}, iconContainerStyle]}>
        <AntDesign
          name="search1"
          color={colors.searchPlaceholder[0]}
          size={RFPercentage(3.5)}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
