import {ActivityIndicator, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import JText from '../../customComponents/JText';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JScreen from '../../customComponents/JScreen';
import colors from '../../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JShadowView from '../../customComponents/JShadowView';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import { useContext } from 'react';
import { StoreContext } from '../../mobx/store';
import { useState } from 'react';
import JSearchInput from '../../customComponents/JSearchInput';
import JRecentJobTile from '../../customComponents/JRecentJobTile';
import JScrollView from '../../customComponents/JScrollView';
const Job = () => {
  const store = useContext(StoreContext);
  const [search, setSearch] = useState('');

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
              {'Jobs'}
            </JText>
          }
        />
      }>
       
         <JSearchInput
            length={1}
            onChangeText={e => {
              store.setAllFeatureCompanyInput(e);
            }}
            onPressIcon={() => alert('Icon Pressed')}
          />
           <JScrollView>
           {[0, 1, 2, 3, 4, 5].map((item, index) => (
            <>
            <JRecentJobTile image={false} title={'Project Manager'} key={index} />
          </>))}
      </JScrollView>
      </JScreen>
  );
};

export default Job;

const styles = StyleSheet.create({});
