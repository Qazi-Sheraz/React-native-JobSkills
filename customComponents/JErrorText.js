import {Text} from 'react-native';
import React from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../config/colors';
import { StoreContext } from '../mobx/store';
import { useContext } from 'react';

export default function JErrorText({
  children,
  style,
  fontSize = RFPercentage(1.5),
  fontColor = colors.danger[0],
  textDecorationLine = 'none',
  fontWeight = 'normal',
  onPress,
}) {
  const store = useContext(StoreContext);
  return (
    <Text
      onPress={onPress}
      style={[
        {
          textAlign: store.lang.id == 0 ? 'left' : 'right',
          fontFamily: 'Nunito Sans',
          fontSize: fontSize,
          color: fontColor,
          textDecorationLine: textDecorationLine,
          fontWeight: fontWeight,
        },
        style,
      ]}>
      {children}
    </Text>
  );
}
