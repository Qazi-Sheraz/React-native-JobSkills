import {StyleSheet, TextInput, View, Pressable} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import colors from '../config/colors';
import JShadowView from './JShadowView';
import JRow from './JRow';
import { useContext } from 'react';
import { StoreContext } from '../mobx/store';
import { Observer, observer } from 'mobx-react';

 const JSearchInput =  ({
  onChangeText,
  containerStyle,
  inputStyle,
  placeholderTextColor = colors.placeHolderColor[0],
  placeholder ,
  iconContainerStyle,
  onPressIcon,
  autoFocus = false,
  length,
}) => {
  const store = useContext(StoreContext);
  return length > 0 ? (
    
    <JShadowView
      shadowColor={'#3C3C43'}
      containerStyle={[
        {
          height: heightPercentageToDP(6),
          marginVertical: RFPercentage(2),
          backgroundColor: colors.white[0],
          borderWidth: RFPercentage(0.1),
          borderColor: `${'#3C3C43'}50`,
          paddingHorizontal: RFPercentage(1),
          
        },
        containerStyle,
      ]}>
      <JRow>
        <AntDesign
          style={{marginHorizontal: RFPercentage(1)}}
          name="search1"
          color={colors.placeHolderColor[0]}
          size={RFPercentage(2.5)}
        />

        <TextInput
          autoFocus={autoFocus}
          style={[{color: colors.black[0],width: '90%',textAlign:store.lang.id===0?'left':'right'}, inputStyle]}
          placeholder={store.lang.search}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeText}
        />
      </JRow>
    </JShadowView>
  ) : (
    <View style={{marginTop: RFPercentage(2)}} />
  );
}
export default observer(JSearchInput);
