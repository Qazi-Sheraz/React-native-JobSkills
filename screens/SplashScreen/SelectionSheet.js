import {StyleSheet, View} from 'react-native';
import React from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import colors from '../../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JButton from '../../customComponents/JButton';
import JDivider from '../../customComponents/JDivider';
import * as Animatable from 'react-native-animatable';
export default function SelectionSheet({navigation}) {
  return (
    <Animatable.View style={styles.sheetContainer} animation="slideInUp">
      <View style={styles.sheetItemContainer}>
        <JButton
          fontStyle={styles.buttonStyle}
          onPress={() => alert('Employer')}>
          Employer
        </JButton>
        <JDivider
          containerStyle={{marginVertical: RFPercentage(2)}}
          children="OR"
        />
        <JButton
          fontStyle={styles.buttonStyle}
          onPress={() => navigation.navigate('CLogin', {type: 1})}
          borderColor={colors.black[0]}
          backgroundColor={colors.white[0]}>
          Candidate
        </JButton>
      </View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    fontWeight: '500',
  },

  sheetContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  sheetItemContainer: {
    backgroundColor: colors.white[0],
    height: heightPercentageToDP(30),
    width: '100%',
    borderTopEndRadius: RFPercentage(2),
    borderTopStartRadius: RFPercentage(2),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: RFPercentage(2),
  },
});
