import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import JText from './JText';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../config/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useContext } from 'react';
import { StoreContext } from '../mobx/store';
import JRow from './JRow';
export default function JInput({
  containerStyle,
  heading,
  icon,
  Icon1,
  onChangeText,
  placeholder,
  placeHolderColor = colors.placeHolderColor[0],
  headingWeight = '500',
  autoFocus = false,
  value,
  autoCapitalize = 'none',
  onBlur,
  onFocus,
  forPassword = false,
  onPressEye,
  eye = false,
  error,
  defaultValue,
  isRequired = false,
  numberOfLines=1,
  multiline=false,
}) {
  const store = useContext(StoreContext);
  return (
    <View style={[{flexDirection: 'column'}, containerStyle]}>
      <View style={{flexDirection: store.lang.id == 0 ?'row':'row-reverse', alignItems: 'center'}}>
        {icon}
        <JText fontWeight={headingWeight} fontSize={RFPercentage(2.5)}>
          {heading}
        </JText>
        {isRequired && (
          <JText
            style={{marginLeft: RFPercentage(0.5)}}
            fontColor={colors.danger[0]}
            fontWeight={headingWeight}
            fontSize={RFPercentage(2.5)}>
            *
          </JText>
        )}
      </View>
      <JRow>
    
      <View
        style={{
          // width:Icon1?'80%':'100%',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: RFPercentage(0.3),
          marginBottom: RFPercentage(0.5),
          borderBottomWidth: RFPercentage(0.2),
          borderBottomColor: error ? colors.danger[0] : colors.inputBorder[0],
        }}>
           { Icon1 &&
        <View >{Icon1}</View>}
        <TextInput

          autoFocus={autoFocus}
          onChangeText={onChangeText}
          defaultValue={defaultValue}
          style={{
            paddingBottom: RFPercentage(0.5),
            fontSize: RFPercentage(2.3),
            width: forPassword ? '90%' : '100%',
            color: colors.black[0],
          }}
          placeholder={placeholder}
          placeholderTextColor={placeHolderColor}
          value={value}
          autoCapitalize={autoCapitalize}
          onBlur={onBlur}
          onFocus={onFocus}
          numberOfLines={numberOfLines}
          multiline={multiline}
          secureTextEntry={eye ? true : false}
        />
        {forPassword && (
          <FontAwesome
            onPress={onPressEye}
            style={{width: '10%', paddingBottom: RFPercentage(0.5)}}
            name={eye ? 'eye' : 'eye-slash'}
            size={RFPercentage(3.0)}
            color={colors.purple[0]}
          />
        )}
      </View></JRow>
    </View>
  );
}

const styles = StyleSheet.create({});
