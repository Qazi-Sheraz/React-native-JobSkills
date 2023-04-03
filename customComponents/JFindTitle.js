import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import JText from './JText'
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from './../config/colors';
import { useNavigation,} from '@react-navigation/native';
import JRow from './JRow';
const JFindTitle = ({JobTitle}) => {
  const navigation = useNavigation();
  return (
    <JRow
    disabled={false}
          onPress={() => navigation.navigate('CSearch')}
          style={{
           paddingVertical:RFPercentage
           (1.2),
            borderColor: `${colors.searchIcon[0]}50`,
            borderWidth: RFPercentage(0.1),
            justifyContent: 'space-between',
            paddingHorizontal: RFPercentage(1),

          }}>
          <JText fontColor={colors.searchIcon[0]} fontSize={RFPercentage(2)}>
            {JobTitle}
          </JText>
          <AntDesign
            name="search1"
            color={colors.searchIcon[0]}
            size={RFPercentage(2.5)}
          />
        </JRow>
  )
}

export default JFindTitle

const styles = StyleSheet.create({})