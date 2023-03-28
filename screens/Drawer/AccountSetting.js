import {StyleSheet, Switch, Text, View} from 'react-native';
import React from 'react';
import JPasswordSetting from '../../customComponents/JPasswordSetting';
import {useNavigation} from '@react-navigation/native';
import JScreen from '../../customComponents/JScreen';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JText from '../../customComponents/JText';
import JIcon from '../../customComponents/JIcon';
import JSearchInput from '../../customComponents/JSearchInput';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../../config/colors';
import Network from '../../assets/svg/Icon/Network.svg';
import Password from '../../assets/svg/Icon/Password.svg';
const AccountSetting = () => {
  const navigation = useNavigation();
  return (
    <JScreen
      style={{paddingHorizontal: RFPercentage(2)}}
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              Account Setting{' '}
            </JText>
          }
          left={
            <JIcon
              icon="fe"
              onPress={() => navigation.goBack()}
              name="chevron-left"
              size={RFPercentage(3.5)}
              color={colors.white[0]}
            />
          }
        />
      }>
      <View style={{flex:1,marginTop:RFPercentage(4)}}>
        <JPasswordSetting
        // onPress={navigation.navigate('ChangePassword')}
          Svg={<Password />}
          Header="Change Password"
          txt={'********'}
        />
        <JPasswordSetting
          Svg={<Network />}
          Header="Change Language"
          txt={'English'}
        />
       
      </View>
    </JScreen>
  );
};

export default AccountSetting;

const styles = StyleSheet.create({});
