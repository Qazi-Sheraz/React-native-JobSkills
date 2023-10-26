import { StyleSheet, ScrollView, View, ActivityIndicator, Pressable, Modal } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import JScreen from '../../customComponents/JScreen';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JText from '../../customComponents/JText';
import JIcon from '../../customComponents/JIcon';
import { Formik } from 'formik';
import * as yup from 'yup';
import { RFPercentage } from 'react-native-responsive-fontsize';
import JSelectInput from '../../customComponents/JSelectInput';
import JErrorText from '../../customComponents/JErrorText';
import JInput from '../../customComponents/JInput';
import JButton from '../../customComponents/JButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from '../../config/colors';
import JNewJobIcon from '../../customComponents/JNewJobIcon';
import url from '../../config/url';
import { StoreContext } from '../../mobx/store';
import { observer } from 'mobx-react';
import JChevronIcon from '../../customComponents/JChevronIcon';
import { _addnewJob } from '../../functions/Candidate/BottomTab';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const JobPreference = () => {
  const { navigate, goBack } = useNavigation();
  const { params } = useRoute();
  const store = useContext(StoreContext);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
  const [preferences, setPreferences] = useState();

  return (
    <JScreen
      isError={store.createApiError}
      onTryAgainPress={() => { _addnewJob(store) }}
      style={{ paddingHorizontal: RFPercentage(2) }}
      header={
        <JGradientHeader
          // right={
          //   <JText fontColor={colors.white[0]} fontSize={RFPercentage(2)}>
          //     {store.lang.previous}
          //   </JText>
          // }
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {store.lang.job_preference}
            </JText>
          }
          left={
            <JChevronIcon />
          }
        />
      }>
      {store?.createApiLoader ? (
        <ActivityIndicator />
      ) : (
        <Formik
          initialValues={{
            preference: '',
            currencies: '',
            salaryPeriods: '',
            countries: '',
            state: '',
            city: '',
            salaryFrom: '',
            salaryTo: '',
          }}
          onSubmit={values => {
            // console.log(...params, ...values)
            navigate('JobRequirement', { ...params, ...values });

          }}
          validationSchema={yup.object().shape({
            salaryFrom: yup
              .string()
              .max(8, store.lang.Maximum_8_digits_allowed)
              .required(store.lang.salaryFrom_is_required),
            salaryTo: yup
              .string()
              .max(10, store.lang.Maximum_10_digits_allowed)
              .required(store.lang.salaryTo_is_required)
              .test(store.lang.is_greater_than_salaryFrom, store.lang.Salary_To_must_be_greater_than_salary_From, function (value) {
                const salaryFrom = this.parent.salaryFrom; // Accessing the value of salaryFrom from the parent object
                if (value && salaryFrom) {
                  return parseFloat(value) > parseFloat(salaryFrom); // Compare the numeric values
                }
                return true; // If either field is empty, don't perform the comparison
              }),
            preference: yup
              .object().nullable()
              .required(store.lang.Gender_is_required),

            currencies: yup
              .object().nullable()
              .shape()
              .required(store.lang.Salary_Currency_is_required),
            salaryPeriods: yup
              .object().nullable()
              .shape()
              .required(store.lang.Salary_Period_is_required),
            countries: yup
              .object().nullable()
              .shape()
              .required(store.lang.Country_is_required),
            city: yup
              .object().nullable()
              .shape()
              .required(store.lang.City_is_required),
            state: yup
              .object().nullable()
              .shape()
              .required(store.lang.State_is_required),


            // jobDescription: yup.string().required('Description is required').label('Description'),
          })}
        >
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
              <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                style={{ paddingBottom: RFPercentage(8) }}
              >
                <JSelectInput
                  containerStyle={styles.container}
                  value={values.preference.name}
                  id={values.preference?.id}
                  data={store.lang.id == 0 ? store.jobCreate?.english_data?.preference : store.jobCreate?.arabic_data?.preference}
                  header={store.lang.gender_preference}
                  heading={`${store.lang.gender_preference}:`}
                  setValue={e => setFieldValue('preference', e)}
                  error={touched.preference && errors.preference && true}
                  rightIcon={
                    <JNewJobIcon />
                  }
                />
                {touched.preference && errors.preference && (
                  <JErrorText>{errors.preference}</JErrorText>
                )}



                <JInput
                  style={{
                    textAlign: store.lang.id == 0 ? 'left' : 'right',
                  }}
                  isRequired
                  maxLength={8}
                  containerStyle={styles.container}
                  heading={`${store.lang.salary_from}:`}
                  value={values.salaryFrom}
                  error={touched.salaryFrom && errors.salaryFrom && true}
                  onChangeText={handleChange('salaryFrom')}
                  onBlur={() => setFieldTouched('salaryFrom')}
                  keyboardType="numeric"
                />
                {touched.salaryFrom && errors.salaryFrom && (
                  <JErrorText>{errors.salaryFrom}</JErrorText>
                )}

                <JInput
                  style={{
                    textAlign: store.lang.id == 0 ? 'left' : 'right',
                  }}
                  isRequired
                  maxLength={10}
                  containerStyle={styles.container}
                  heading={`${store.lang.salary_to}:`}
                  value={values.salaryTo}
                  error={touched.salaryTo && errors.salaryTo && true}
                  onChangeText={handleChange('salaryTo')}
                  onBlur={() => setFieldTouched('salaryTo')}
                  keyboardType="numeric"
                />
                {touched.salaryTo && errors.salaryTo && (
                  <JErrorText>{errors.salaryTo}</JErrorText>
                )}

                <JSelectInput
                  containerStyle={styles.container}
                  value={values.currencies.name}
                  id={values.currencies.id}
                  data={store.lang.id == 0 ? store.jobCreate?.english_data?.currencies : store.jobCreate?.arabic_data?.currencies}
                  setValue={e => setFieldValue('currencies', e)}
                  header={store.lang.salary_currency}
                  heading={`${store.lang.salary_currency}:`}
                  error={touched.currencies && errors.currencies && true}
                  rightIcon={
                    <JNewJobIcon />
                  }
                />
                {touched.currencies && errors.currencies && (
                  <JErrorText>{errors.currencies}</JErrorText>
                )}

                <JSelectInput
                  containerStyle={styles.container}
                  value={values.salaryPeriods.name}
                  id={values.salaryPeriods.id}
                  data={store.lang.id == 0 ? store.jobCreate?.english_data?.salaryPeriods : store.jobCreate?.arabic_data?.salaryPeriods}
                  setValue={e => setFieldValue('salaryPeriods', e)}
                  header={store.lang.Salary_Period}
                  heading={`${store.lang.Salary_Period}:`}
                  error={touched.salaryPeriods && errors.salaryPeriods && true}
                  rightIcon={
                    <JNewJobIcon />
                  }
                />
                {touched.salaryPeriods && errors.salaryPeriods && (
                  <JErrorText>{errors.salaryPeriods}</JErrorText>
                )}
                <JSelectInput
                  containerStyle={styles.container}
                  value={values.countries.name}
                  data={store.lang.id == 0 ? store.jobCreate?.english_data?.countries : store.jobCreate?.arabic_data?.countries}
                  setValue={e => {
                    setFieldValue('countries', e)
                    setFieldValue('state', '');
                    setFieldValue('city', '');
                  }}
                  header={store.lang.country}
                  heading={`${store.lang.country}:`}
                  id={values.countries.id}
                  error={touched.countries && errors.countries && true}
                  rightIcon={
                    <JNewJobIcon />
                  }
                />
                {touched.countries && errors.countries && (
                  <JErrorText>{errors.countries}</JErrorText>
                )}
                <JSelectInput
                  containerStyle={styles.container}
                  value={store.lang.id == 0 ? values.state?.name : values.state?.arabic_title}
                  id={values.countries?.id}
                  setValue={e => { setFieldValue('state', e); setFieldValue('city', null); }}
                  header={store.lang.state}
                  heading={`${store.lang.state}:`}
                  error={touched.state && errors.state && true}
                  rightIcon={
                    <JNewJobIcon />
                  }
                />
                {touched.state && errors.state && (
                  <JErrorText>{errors.state}</JErrorText>
                )}
                <JSelectInput
                  containerStyle={styles.container}
                  value={store.lang.id == 0 ? values.city?.name : values.city?.arabic_title}
                  setValue={e => setFieldValue('city', e)}
                  header={store.lang.city}
                  heading={`${store.lang.city}:`}
                  id={values.state?.id}
                  error={touched.city && errors.city && true}
                  rightIcon={
                    <JNewJobIcon />
                  }
                />
                {touched.city && errors.city && (
                  <JErrorText>{errors.city}</JErrorText>
                )}
              </KeyboardAwareScrollView>
              <View
                style={{
                  height: RFPercentage(6),
                  paddingTop: RFPercentage(0.3),
                  backgroundColor: 'transparent',
                }}>
                <JButton

                  isValid={isValid}
                  onPress={() => handleSubmit()}
                  style={{
                    // position: 'absolute',
                    // bottom: RFPercentage(3),
                    width: RFPercentage(20),
                  }}>
                  {store.lang.next}
                </JButton></View>

            </>
          )}
        </Formik>
      )}


    </JScreen>
  );
};

export default observer(JobPreference);

const styles = StyleSheet.create({
  container: { marginTop: RFPercentage(2) }, modal: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    height: RFPercentage(50),
    width: RFPercentage(40),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }
});
