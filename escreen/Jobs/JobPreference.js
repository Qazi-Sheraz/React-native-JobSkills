import {StyleSheet, ScrollView, View} from 'react-native';
import React from 'react';
import JScreen from '../../customComponents/JScreen';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JText from '../../customComponents/JText';
import JIcon from '../../customComponents/JIcon';
import {Formik} from 'formik';
import * as yup from 'yup';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JSelectInput from '../../customComponents/JSelectInput';
import JErrorText from '../../customComponents/JErrorText';
import JInput from '../../customComponents/JInput';
import JButton from '../../customComponents/JButton';
import {useNavigation} from '@react-navigation/native';
import colors from '../../config/colors';
import Feather from 'react-native-vector-icons/Feather';

const JobPreference = () => {
  const {navigate, goBack} = useNavigation();
  return (
    <JScreen
      style={{paddingHorizontal: RFPercentage(2)}}
      header={
        <JGradientHeader
          right={
            <JText fontColor={colors.white[0]} fontSize={RFPercentage(2)}>
              Previous
            </JText>
          }
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {'Job Preference'}
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
      <Formik
        initialValues={{
          preference: '',
          currency: '',
          SalaryPeriod: '',
          country: '',
          state: '',
          city: '',
          expiry: '',
          salaryFrom: '',
          salaryTo: '',
        }}
        onSubmit={values => {
          console.log(values);
          _addEducation(values);
        }}
        validationSchema={yup.object().shape({
          preference: yup.string().required().label('Gender'),
          curcityrency: yup.string().required().label('Currency'),
          SalaryPeriod: yup.string().required().label('Job Shift'),
          country: yup.string().required().label('Country'),
          state: yup.string().required().label('State'),
          city: yup.string().required().label('City'),
          expiry: yup.string().required().label('Expiry Date'),
          
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
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: RFPercentage(8)}}>
              <JSelectInput
                containerStyle={styles.container}
                value={values.preference.name}
                // data={store.myProfile.data.countries}
                header={'Gender Preference'}
                heading={'Gender Preference:'}
                //   setValue={e => setFieldValue('preference', e)}
                error={touched.preference && errors.preference && true}
                rightIcon={
                  <Feather
                    name="chevron-right"
                    size={RFPercentage(2.5)}
                    color={colors.black[0]}
                  />
                }
              />
              {touched.preference && errors.preference && (
                <JErrorText>{errors.preference}</JErrorText>
              )}

              <JInput
                isRequired
                containerStyle={styles.container}
                heading={'Job Expiry Date:'}
                value={values.expiry}
                error={touched.expiry && errors.expiry && true}
                onChangeText={handleChange('expiry')}
                onBlur={() => setFieldTouched('expiry')}
              />
              {touched.expiry && errors.expiry && (
                <JErrorText>{errors.expiry}</JErrorText>
              )}

              <JInput
                isRequired
                containerStyle={styles.container}
                heading={'Salary From:'}
                value={values.salaryFrom}
                error={touched.salaryFrom && errors.salaryFrom && true}
                onChangeText={handleChange('salaryFrom')}
                onBlur={() => setFieldTouched('salaryFrom')}
              />
              {touched.salaryFrom && errors.salaryFrom && (
                <JErrorText>{errors.salaryFrom}</JErrorText>
              )}

              <JInput
                isRequired
                containerStyle={styles.container}
                heading={'Salary To:'}
                value={values.salaryTo}
                error={touched.salaryTo && errors.salaryTo && true}
                onChangeText={handleChange('salaryTo')}
                onBlur={() => setFieldTouched('salaryTo')}
              />
              {touched.salaryTo && errors.salaryTo && (
                <JErrorText>{errors.salaryTo}</JErrorText>
              )}

              <JSelectInput
                containerStyle={styles.container}
                value={values.currency.name}
                id={values.currency.id}
                //   setValue={e => setFieldValue('currency', e)}
                header={'Currency'}
                heading={'Currency:'}
                error={touched.currency && errors.currency && true}
                rightIcon={
                  <Feather
                    name="chevron-right"
                    size={RFPercentage(2.5)}
                    color={colors.black[0]}
                  />
                }
              />
              {touched.currency && errors.currency && (
                <JErrorText>{errors.currency}</JErrorText>
              )}

              <JSelectInput
                containerStyle={styles.container}
                value={values.SalaryPeriod.name}
                setValue={e => setFieldValue('SalaryPeriod', e)}
                header={'Salary Period'}
                heading={'Salary Period:'}
                id={values.SalaryPeriod.id}
                error={touched.SalaryPeriod && errors.SalaryPeriod && true}
                rightIcon={
                  <Feather
                    name="chevron-right"
                    size={RFPercentage(2.5)}
                    color={colors.black[0]}
                  />
                }
              />
              {touched.SalaryPeriod && errors.SalaryPeriod && (
                <JErrorText>{errors.SalaryPeriod}</JErrorText>
              )}
              <JSelectInput
                containerStyle={styles.container}
                value={values.country.name}
                setValue={e => setFieldValue('country', e)}
                header={'Country'}
                heading={'Country:'}
                id={values.country.id}
                error={touched.country && errors.country && true}
                rightIcon={
                  <Feather
                    name="chevron-right"
                    size={RFPercentage(2.5)}
                    color={colors.black[0]}
                  />
                }
              />
              {touched.country && errors.country && (
                <JErrorText>{errors.country}</JErrorText>
              )}
              <JSelectInput
                containerStyle={styles.container}
                value={values.state.name}
                setValue={e => setFieldValue('state', e)}
                header={'State'}
                heading={'State:'}
                id={values.state.id}
                error={touched.state && errors.state && true}
                rightIcon={
                  <Feather
                    name="chevron-right"
                    size={RFPercentage(2.5)}
                    color={colors.black[0]}
                  />
                }
              />
              {touched.state && errors.state && (
                <JErrorText>{errors.state}</JErrorText>
              )}
              <JSelectInput
                containerStyle={styles.container}
                value={values.city.name}
                setValue={e => setFieldValue('city', e)}
                header={'City'}
                heading={'City:'}
                id={values.city.id}
                error={touched.city && errors.city && true}
                rightIcon={
                  <Feather
                    name="chevron-right"
                    size={RFPercentage(2.5)}
                    color={colors.black[0]}
                  />
                }
              />
              {touched.city && errors.city && (
                <JErrorText>{errors.city}</JErrorText>
              )}
            </ScrollView>
            <JButton
              isValid={isValid}
              onPress={() => handleSubmit()}
              style={{
                position: 'absolute',
                bottom: RFPercentage(3),
                width: RFPercentage(20),
              }}>
              {'Next'}
            </JButton>
          </>
        )}
      </Formik>
      {/* )} */}
    </JScreen>
  );
};

export default JobPreference;

const styles = StyleSheet.create({container: {marginTop: RFPercentage(2)}});
