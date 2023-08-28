import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useContext} from 'react';
import {StoreContext} from '../mobx/store';
import JIcon from './JIcon';
import {RFPercentage} from 'react-native-responsive-fontsize';

const JChevronIcon = ({color = '#fff',onPress}) => {
  const store = useContext(StoreContext);
  const navigation = useNavigation();
  return (
    <JIcon
      onPress={onPress? onPress: () => navigation.canGoBack() ? navigation.goBack():navigation.navigate('Home')}
      icon={'io'}
      name={store.lang?.id == 0 ? 'chevron-back' : 'chevron-forward'}
      size={RFPercentage(3)}
      color={color}
    />
  );
};

export default JChevronIcon;

const styles = StyleSheet.create({});
