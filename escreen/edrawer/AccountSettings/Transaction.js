import {StyleSheet, Text, View} from 'react-native';
import React, { useContext } from 'react';
import JScreen from '../../../customComponents/JScreen';
import JGradientHeader from '../../../customComponents/JGradientHeader';
import JText from '../../../customComponents/JText';
import colors from '../../../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JIcon from '../../../customComponents/JIcon';
import JSearchInput from '../../../customComponents/JSearchInput';
import JTransaction from '../../../customComponents/JTransaction';
import { useNavigation } from '@react-navigation/native';
import { StoreContext } from '../../../mobx/store';

const Transaction = () => {
  const navigation = useNavigation();
const store=useContext(StoreContext);
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
              Transaction
            </JText>
          }
          left={
            <JIcon
              icon="fe"
              onPress={() => navigation.goBack()}
              name="chevron-left"
              size={RFPercentage(3.5)}
              color={colors.white[0]}
            />
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
      <View style={{flex: 1, marginVertical: RFPercentage(2)}}>
        {[0,1,2,].map((item,index)=>(
          <JTransaction text={'invoice'} date={'12-33-44'} />
        )
        )}
        
      </View>
    </JScreen>
  );
};

export default Transaction;

const styles = StyleSheet.create({});
