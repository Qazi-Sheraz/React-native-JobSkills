import {StyleSheet, TextInput, View, Pressable} from 'react-native';
import React from 'react';
import JScreen from '../../../customComponents/JScreen';
import JText from '../../../customComponents/JText';
import JHeader from '../../../customComponents/JHeader';
import Feather from 'react-native-vector-icons/Feather';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../../../config/colors';
import JShadowView from '../../../customComponents/JShadowView';
import JInput from '../../../customComponents/JInput';
import {useState} from 'react';

const CSearch = ({navigation}) => {
  const [search, setSearch] = useState('');
  return (
    <JScreen
      style={{paddingHorizontal: RFPercentage(4)}}
      header={
        <JHeader
          left={
            <Feather
              onPress={() => navigation.goBack()}
              name="chevron-left"
              size={RFPercentage(3.5)}
              color={colors.black[0]}
            />
          }
          right={
            <Feather
              onPress={() => alert('Filter')}
              name="filter"
              size={RFPercentage(3.5)}
              color={colors.black[0]}
            />
          }
        />
      }>
      <JText fontSize={RFPercentage(3)}>Find your Job</JText>
      <JShadowView
        shadowColor={colors.purple[0]}
        containerStyle={{
          marginVertical: RFPercentage(2),
          borderWidth: RFPercentage(0.1),
          borderColor: colors.white[0],
          justifyContent: 'space-between',
          paddingLeft: RFPercentage(1),
          height: '7%',
          flexDirection: 'row',
          alignItems: 'center',
        }}
        isPressable={false}>
        <TextInput
          onChangeText={e => setSearch(e)}
          placeholder="Search"
          placeholderTextColor={colors.placeHolderColor[0]}
        />
        <Feather
          onPress={() => {
            alert(search);
          }}
          name="search"
          size={RFPercentage(3.5)}
          color={colors.black[0]}
          style={{marginRight: RFPercentage(1)}}
        />
      </JShadowView>
      <JText style={{marginBottom: RFPercentage(2)}} fontSize={RFPercentage(3)}>
        Recent Searches
      </JText>

      <Pressable
        onPress={() => alert('UI/UX Designer')}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: RFPercentage(1),
          borderBottomWidth: RFPercentage(0.1),
        }}>
        <Feather
          name="clock"
          size={RFPercentage(3.5)}
          color={colors.black[0]}
          style={{marginRight: RFPercentage(1)}}
        />
        <JText fontSize={RFPercentage(2.5)}>UI/UX Designer</JText>
      </Pressable>
    </JScreen>
  );
};

export default CSearch;

const styles = StyleSheet.create({});
