import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useContext} from 'react';
import {StoreContext} from '../mobx/store';
import JIcon from './JIcon';
import {RFPercentage} from 'react-native-responsive-fontsize';

const JNewJobIcon = ({color='black',onPress}) => {
  const store = useContext(StoreContext);
  const navigation = useNavigation();
  return (
    <JIcon
    //   onPress={onPress? onPress:() => navigation.goBack()}
    
      icon={'io'}
      name={store.lang.id == 0 ?'chevron-forward':'chevron-back'}
      size={RFPercentage(2.5)}
      color={color}
    />
  );
};

export default JNewJobIcon;

const styles = StyleSheet.create({});