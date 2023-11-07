import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {heightPercentageToDP} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';

import Ionicons from 'react-native-vector-icons/Ionicons';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../config/colors';
import JText from '../customComponents/JText';
import JRow from '../customComponents/JRow';
import { StoreContext } from '../mobx/store';
import { useContext } from 'react';

export default function CustomCandidateBottomTab({
  state,
  descriptors,
  navigation,
  fontSize,
}) {
  const store =useContext(StoreContext)
  return (
    <JRow
      style={{
        height:heightPercentageToDP(8),
        alignItems:'flex-start',
        padding: RFPercentage(0.5),
        // height:heightPercentageToDP(store.lang.id==0? 10:9),
        backgroundColor: colors.white[0],
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
        elevation: 3,
        borderTopLeftRadius: RFPercentage(2),
        borderTopRightRadius: RFPercentage(2),
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',

              // marginBottom:store.lang.id==0? RFPercentage(0):RFPercentage(0.5)
            }}>
            {index === 0 ? (
              <Ionicons
                color={isFocused ? colors.purple[0] : colors.inputBorder[0]}
                name={isFocused ? 'md-home-sharp' : 'md-home-outline'}
                size={RFPercentage(3.5)}
              />
            ) : index === 1 ? (
              <FontAwesome
                color={isFocused ? colors.purple[0] : colors.inputBorder[0]}
                name={isFocused ? 'heart' : 'heart-o'}
                size={RFPercentage(3.5)}
              />
            ) : index === 2 ? (
              <Ionicons
                color={isFocused ? colors.purple[0] : colors.inputBorder[0]}
                name={isFocused ? 'briefcase' : 'ios-briefcase-outline'}
                size={RFPercentage(3.3)}
              />
            ) : (
              <FontAwesome
                color={isFocused ? colors.purple[0] : colors.inputBorder[0]}
                name={isFocused ? 'user' : 'user-o'}
                size={RFPercentage(3.5)}
              />
            )}
            <JText
            fontSize={fontSize}
              fontColor={isFocused ? colors.purple[0] : colors.inputBorder[0]}
              fontWeight={Platform.OS=='android'&&isFocused?'bold':'normal'}>
              {label}
            </JText>
          </TouchableOpacity>
        );
      })}
    </JRow>
  );
}

const styles = StyleSheet.create({});
