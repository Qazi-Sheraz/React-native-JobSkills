import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const JRow = ({style, children}) => {
  return (
    <View style={[{flexDirection: 'row', alignItems: 'center',}, style]}>
      {children}
    </View>
  );
};

export default JRow;

const styles = StyleSheet.create({});
