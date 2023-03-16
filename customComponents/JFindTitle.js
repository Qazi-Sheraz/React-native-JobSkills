import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import JText from './JText'
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from './../config/colors';
import { useNavigation,} from '@react-navigation/native';
const JFindTitle = ({JobTitle}) => {
  const navigation = useNavigation();
  return (
    <Pressable
          onPress={() => navigation.navigate('CSearch')}
          style={{
            height: '7%',
            borderColor: `${colors.searchIcon[0]}50`,
            borderWidth: RFPercentage(0.1),
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: RFPercentage(1),
            alignItems: 'center',
          }}>
          <JText fontColor={colors.searchIcon[0]} fontSize={RFPercentage(2)}>
            {JobTitle}
          </JText>
          <AntDesign
            name="search1"
            color={colors.searchIcon[0]}
            size={RFPercentage(2.5)}
          />
        </Pressable>
  )
}

export default JFindTitle

const styles = StyleSheet.create({})