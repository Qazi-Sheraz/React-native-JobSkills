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
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as yup from 'yup';
import JErrorText from '../../customComponents/JErrorText';

const ChangePassword = () => {
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
      <Formik
        initialValues={{
          currentP: '',
          newP: '',
          confirm: '',
        }}
        onSubmit={values => {
          console.log(values);
          _addEducation(values);
        }}
        validationSchema={yup.object().shape({
          currentP: yup.string().required().label('Current Password'),
          newP: yup.string().required().label('New Password'),
          confirm: yup.string().required().label('Password'),
        })}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
          setFieldValue,
        }) => (
          <>
            <View style={{flex: 1, marginTop: RFPercentage(4)}}>
              <JInput
                headingWeight="bold"
                heading={'Current Password'}
                icon={<CurrentP marginRight={RFPercentage(2)} />}
                value={values.currentP}
                error={touched.currentP && errors.currentP && true}
                onChangeText={handleChange('currentP')}
                onBlur={() => setFieldTouched('currentP')}
              />
              {touched.currentP && errors.currentP && (
                <JErrorText>{errors.currentP}</JErrorText>
              )}
              <JInput
                headingWeight="bold"
                heading={'New Password'}
                icon={<Key marginRight={RFPercentage(2)} />}
                value={values.newP}
                error={touched.newP && errors.newP && true}
                onChangeText={handleChange('newP')}
                onBlur={() => setFieldTouched('newP')}
              />
              {touched.newP && errors.newP && (
                <JErrorText>{errors.newP}</JErrorText>
              )}
              <JInput
                headingWeight="bold"
                heading={'Confirm Password'}
                icon={<Key marginRight={RFPercentage(2)} />}
                value={values.confirm}
                error={touched.expiry && errors.confirm && true}
                onChangeText={handleChange('confirm')}
                onBlur={() => setFieldTouched('confirm')}
              />
              {touched.confirm && errors.confirm && (
                <JErrorText>{errors.confirm}</JErrorText>
              )}
            </View>
            <JRow
              style={{
                justifyContent: 'space-around',
                marginBottom: RFPercentage(3),
              }}>
              <JButton
                style={styles.btn}
                backgroundColor={'#fff'}
                borderColor={colors.black[0]}
                children={'Cancel'}
              />
              <JButton isValid={isValid}
              onPress={() => handleSubmit()} style={styles.btn} children={'Update'} />
            </JRow>
          </>
        )}
      </Formik>
    </JScreen>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({btn: {paddingHorizontal: RFPercentage(7)}});
