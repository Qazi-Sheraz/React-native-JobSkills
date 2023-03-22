import { StyleSheet, Text, View } from 'react-native'
import React ,{useContext} from 'react'
import JScreen from '../../customComponents/JScreen'
import JGradientHeader from '../../customComponents/JGradientHeader'
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RFPercentage } from 'react-native-responsive-fontsize';
import JProfileContent from '../../customComponents/JProfileContent';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import colors from '../../config/colors';
import { StoreContext } from '../../mobx/store';
const Profile = () => {
  const store = useContext(StoreContext);

  return (
    <JScreen
       header={
        <JGradientHeader
          height={heightPercentageToDP(22)}
          alignItems={'flex-start'}
          paddingTop={RFPercentage(3)}
          left={
            <Feather
              onPress={() => navigation.goBack()}
              name="chevron-left"
              size={RFPercentage(3.5)}
              color={colors.white[0]}
            />
          }
          right={
            <AntDesign
              name="poweroff"
              // onPress={() => _removeToken()}
              color={colors.white[0]}
              size={RFPercentage(3)}
            />
          }
        />
      }>
      <JProfileContent
        />
    </JScreen>
  )
}

export default Profile

const styles = StyleSheet.create({})