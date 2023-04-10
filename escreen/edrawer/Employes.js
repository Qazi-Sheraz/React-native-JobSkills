import {StyleSheet, Text, View} from 'react-native';
import React, { useContext } from 'react';
import JScreen from '../../customComponents/JScreen';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JText from '../../customComponents/JText';
import JIcon from '../../customComponents/JIcon';
import colors from '../../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
import JSearchInput from '../../customComponents/JSearchInput';
import JEmployeUser from '../../customComponents/JEmployeUser';
import { StoreContext } from '../../mobx/store';

const Employes = () => {
  const {navigate, goBack} = useNavigation();
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
              Employe User
            </JText>
          }
          left={
            <JIcon
              icon="fe"
              onPress={() => goBack()}
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
      <View style={{ marginVertical: RFPercentage(2)}}>
        {[0, 1, 2].map((item, index) => (
          <JEmployeUser
            name={'Taqi Haider'}
            email={'OfficeAdministration@gmail.com'}
            text={'Reviewer Interviewer'}
            status={'pending'}
          />
        ))}
      </View>
    </JScreen>
  );
};

export default Employes;

const styles = StyleSheet.create({});
