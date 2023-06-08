import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
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
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import JChevronIcon from '../../customComponents/JChevronIcon';
import { StoreContext } from '../../mobx/store'
import { observer } from 'mobx-react'
const EAccountSetting = () => {
    const navigation=useNavigation();
    const store = useContext(StoreContext);
    const{params}=useRoute();
    const isFoucs = useIsFocused();
   

  useEffect(() => {
  
  }, [])
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
            {store.lang.account_settings}
          </JText>
        }
        left={
          <JChevronIcon/>
        }
      />
    }>
    <View style={{flex:1,}}>
      <JPasswordSetting
      onPress={()=>navigation.navigate('ChangePassword')}
        Svg={<Password />}
        Header={store.lang.change_password}
        txt={'********'}
      />
      <JPasswordSetting
      onPress={()=> navigation.navigate('ChangeLanguage')}
        Svg={<Network />}
        Header={store.lang.change_language}
        txt={store.lang.id===0?'English (United Kingdom)':store.lang.id===1?'اردو':store.lang.id===2&&'العربية'}
      />
      {/* <JPasswordSetting
        Svg={<Notification />}
        Header="Notifications"
        txt={'Job Alerts'}
       Sw='1'
      /> */}
    </View>
  </JScreen>
  )
}

export default observer(EAccountSetting);

const styles = StyleSheet.create({})