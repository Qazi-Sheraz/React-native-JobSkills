import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import JInput from '../../customComponents/JInput';
import JScreen from '../../customComponents/JScreen';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JText from '../../customComponents/JText';
import JIcon from '../../customComponents/JIcon';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../../config/colors';
import Key from '../../assets/svg/Icon/Key.svg';
import CurrentP from '../../assets/svg/Icon/CurrentP.svg';
import JButton from '../../customComponents/JButton';
import JRow from '../../customComponents/JRow';
const ChangePassword = () => {
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
              Change Password
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
      <View style={{flex: 1, marginTop: RFPercentage(4)}}>
        <JInput
          headingWeight="bold"
          heading={'Current Password'}
          icon={<CurrentP marginRight={RFPercentage(2)} />}
        />
        <JInput
          headingWeight="bold"
          heading={'New Password'}
          icon={<Key marginRight={RFPercentage(2)} />}
        />

        <JInput
          headingWeight="bold"
          heading={'Confirm Password'}
          icon={<Key marginRight={RFPercentage(2)} />}
        />
      </View>
      <JRow style={{justifyContent: 'space-around',marginBottom: RFPercentage(3),}}>
        <JButton style={styles.btn} backgroundColor={'#fff'} borderColor={colors.black[0]}   children={'Cancel'} />
        <JButton style={styles.btn} children={'Update'} />
      </JRow>
    </JScreen>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({ btn:{paddingHorizontal:RFPercentage(7)}});
