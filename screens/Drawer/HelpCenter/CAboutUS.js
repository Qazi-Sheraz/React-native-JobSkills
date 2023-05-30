import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StoreContext } from '../../../mobx/store';
import { useContext } from 'react';
import JText from '../../../customComponents/JText';
import { RFPercentage } from 'react-native-responsive-fontsize';
import colors from '../../../config/colors';
import JIcon from '../../../customComponents/JIcon';

const CAboutUS = () => {
  const store = useContext(StoreContext);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}>
      <View style={{margin: RFPercentage(2)}}>
        <JText style={styles.header}>{store.lang.about_us}</JText>
        <JText style={styles.txt}>{store.lang.jobskills}</JText>
      </View>
      <View
        style={{
          alignItems: 'center',
          PaddingHorizontal: RFPercentage(2),
          paddingBottom:RFPercentage(4),
          backgroundColor: colors.tileColor[0],
        }}>
        <JText style={styles.header2}>{store.lang.how_it_works}</JText>
        <View style={styles.circle}>
          <JIcon
            icon={'ev'}
            name={'pencil'}
            color={colors.white[0]}
            size={RFPercentage(6)}
          />
        </View>
        <JText style={styles.txt2}>{store.lang.step_1}</JText>
        <JText style={styles.header3}>{store.lang.register}</JText>
        <JText style={styles.txt3}>
        {store.lang.creating_account_platform}
        </JText>
        <View style={styles.circle}>
          <JIcon
            icon={'ev'}
            name={'sc-telegram'}
            color={colors.white[0]}
            size={RFPercentage(7)}
          />
        </View>
        <JText style={styles.txt2}>{store.lang.step_2}</JText>
        <JText style={styles.header3}>{store.lang.submit_resume}</JText>
        <JText style={styles.txt3}>
        {store.lang.how_fill_form}
        </JText>
        <View style={styles.circle}>
          <JIcon
            icon={'ev'}
            name={'pencil'}
            color={colors.white[0]}
            size={RFPercentage(6)}
          />
        </View>
        <JText style={styles.txt2}>{store.lang.step_3}</JText>
        <JText style={styles.header3}>{store.lang.start_working}</JText>
        <JText style={styles.txt3}>
        {store.lang.start_career}
        </JText>
      </View>
      <View  style={{
          alignItems: 'center',
          PaddingHorizontal: RFPercentage(2),
          paddingBottom:RFPercentage(6),
        }}>
          <JText style={styles.header2}>{store.lang.frequently_asked_questions}</JText>
          <JText style={styles.txt3}>{store.lang.frequently_not_available}</JText>
        </View>
    </ScrollView>
  );
}

export default CAboutUS

const styles = StyleSheet.create({
  header: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    color: colors.primary[0],
  },
  header2: {
    fontSize: RFPercentage(2.8),
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: RFPercentage(2),
  },
  header3: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: RFPercentage(1),
  },
  txt: {fontSize: RFPercentage(2), margin: RFPercentage(1)},
  txt3: {fontSize: RFPercentage(2), marginHorizontal: RFPercentage(2),textAlign:'center'},
  txt2: {fontSize: RFPercentage(1.8), margin: RFPercentage(1),color: colors.primary[0],},
  circle: {
    backgroundColor: colors.primary[0],
    height: RFPercentage(9),
    width: RFPercentage(9),
    borderRadius: RFPercentage(4.5),
    marginTop:RFPercentage(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
});