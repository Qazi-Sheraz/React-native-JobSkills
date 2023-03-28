import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import JScreen from '../../customComponents/JScreen';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JText from '../../customComponents/JText';
import JSearchInput from '../../customComponents/JSearchInput';
import JIcon from '../../customComponents/JIcon';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../../config/colors';
import {useNavigation} from '@react-navigation/native';
import JRow from '../../customComponents/JRow';
import JCircleImage from '../../customComponents/JCircleImage';
import Img from '../../assets/svg/Icon/Img.svg';


const Followers = () => {
  const navigation = useNavigation();
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
              Followers
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
      <View style={{marginVertical: RFPercentage(2)}}>
        {[0, 1, 2].map((item, index) => (
          <JRow style={{marginVertical: RFPercentage(1),}}>

              <Img />
              
            <View style={styles.mainView}>
              <JText style={{fontWeight: 'bold'}}>Umer</JText>
              <JText>Umer.nazar@bftech.io</JText>
              <JRow style={{justifyContent:'space-between'}}>
                <JText>+9234687678</JText>
                <JText>Immediate Available</JText>
              </JRow>
            </View>
          </JRow>
        ))}
      </View>
    </JScreen>
  );
};

export default Followers;

const styles = StyleSheet.create({
  mainView: {marginHorizontal: RFPercentage(1),flex:1},

});
