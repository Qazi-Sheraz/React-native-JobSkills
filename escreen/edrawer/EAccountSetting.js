import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import JScreen from '../../customComponents/JScreen'
import JGradientHeader from '../../customComponents/JGradientHeader'
import JText from '../../customComponents/JText'
import JIcon from '../../customComponents/JIcon'
import JPasswordSetting from '../../customComponents/JPasswordSetting'
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../../config/colors';
import Transactions from '../../assets/svg/Icon/Transactions.svg';
import Network from '../../assets/svg/Icon/Network.svg/';
import Notification from '../../assets/svg/Icon/Notification.svg';
import Password from '../../assets/svg/Icon/Password.svg';
import { useNavigation } from '@react-navigation/native';

const EAccountSetting = () => {
    const navigation=useNavigation();
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
            Account Setting
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
      onPress={()=>navigation.navigate('ChangePassword')}
        Svg={<Password />}
        Header="Change Password"
        txt={'********'}
      />
      <JPasswordSetting
      onPress={()=> navigation.navigate('ChangeLanguage')}
        Svg={<Network />}
        Header="Change Language"
        txt={'English'}
      />
      <JPasswordSetting onPress={()=>navigation.navigate('Transaction')} Svg={<Transactions />} Header="Transactions" />
      <JPasswordSetting
        Svg={<Notification />}
        Header="Notifications"
        txt={'Job Alerts'}
       Sw='1'
      />
    </View>
  </JScreen>
  )
}

export default EAccountSetting

const styles = StyleSheet.create({})