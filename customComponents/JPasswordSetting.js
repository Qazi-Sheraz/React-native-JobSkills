import {StyleSheet, Image, View, Pressable, Switch} from 'react-native';
import React from 'react';
import JRow from './JRow';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JText from './JText';
import { useState } from 'react';
import colors from '../config/colors';

const JPasswordSetting = ({Svg, Header, txt, onPress ,Sw='0'}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: '100%',
        height: RFPercentage(6),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        marginTop: RFPercentage(3),
      }}>
      <JRow>
        <View
          style={{
            width: RFPercentage(6),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {Svg}
        </View>
        <View style={{marginHorizontal: RFPercentage(1), justifyContent: 'center'}}>
          <JText style={{fontSize: RFPercentage(2.3), fontWeight: 'bold'}}>
            {Header}
          </JText>
          {txt && (
            <JText
              style={{
                fontSize: RFPercentage(2),
                marginTop: RFPercentage(0.5),
              }}>
              {txt}
            </JText>
          )}
        </View>
      </JRow>
      {Sw==='1'? 
      <Switch 
      trackColor={{false: '#767577', true: colors.purple[0]}}
      thumbColor= '#f4f3f4'
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={isEnabled}
/>:null}
    </Pressable>
  );
};

export default JPasswordSetting;

const styles = StyleSheet.create({});
