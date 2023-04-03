import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { useContext } from 'react';
import { StoreContext } from '../mobx/store';
import { observer } from 'mobx-react';

const JRow = ({style, children,disabled=true,onPress}) => {
  const store=useContext(StoreContext)
  return (
   
    <Pressable onPress={onPress} disabled={disabled} style={[{flexDirection:store.lang.id == 0 ? 'row' : 'row-reverse', alignItems: 'center'}, style]}>
      {children}
    </Pressable>
  );
};

export default observer(JRow);

const styles = StyleSheet.create({});
