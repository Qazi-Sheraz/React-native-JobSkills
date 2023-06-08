import {StyleSheet, ScrollView, View, ActivityIndicator, Pressable, Modal} from 'react-native';
import React, {useEffect, useState,useContext} from 'react';
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
import {useNavigation, useRoute} from '@react-navigation/native';
import colors from '../../config/colors';
import JNewJobIcon from '../../customComponents/JNewJobIcon';
import url from '../../config/url';
import { StoreContext } from '../../mobx/store';
import { observer } from 'mobx-react';
import JChevronIcon from '../../customComponents/JChevronIcon';

const JobPreference = () => {
  const {navigate, goBack} = useNavigation();
  const {params}=useRoute();
  const store = useContext(StoreContext);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
  const [preferences, setPreferences] = useState();

  // const _addJobPreference = () => {
  //   var myHeaders = new Headers();
  //   myHeaders.append(
  //     'Authorization',
  //     `Bearer ${store.token?.token}`,
  //   );
  //   fetch(
  //     `${url.baseUrl}/employer/jobs/create`,

  //     {
  //       method: 'GET',
  //       headers: myHeaders,
  //       redirect: 'follow',
  //     },
  //   )
  //     .then(response => response.json())
  //     .then(result => {
  //       setPreferences(result);
        
  //     })
  //     .catch(error => {
  //       // console.log('error', error);
  //       setError(true);

  //     })
  //     .finally(() => {
  //       setLoader(false);
        
  //     });
  // };

  // useEffect(() => {
  //   _addJobPreference();
  // }, []);

  return (
    <JScreen
      isError={error}
      onTryAgainPress={() => _addJobPreference()}
      style={{paddingHorizontal: RFPercentage(2)}}
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
            <JChevronIcon/>
          }
        />
      }>
      {/* {loader ? (
        <ActivityIndicator />
      ) : ( */}
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
            navigate('JobRequirement',{...params,...values});
            
          }}
          // validationSchema={yup.object().shape({
          //   preference: yup.string().required().label('Gender'),
          //   curcityrency: yup.string().required().label('Currency'),
          //   SalaryPeriod: yup.string().required().label('Job Shift'),
          //   country: yup.string().required().label('Country'),
          //   state: yup.string().required().label('State'),
          //   city: yup.string().required().label('City'),
          //   expiry: yup.string().required().label('Expiry Date'),

          // })}
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
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: RFPercentage(8)}}>
                <JSelectInput
                  containerStyle={styles.container}
                  value={values.preference.name}
                  id={values.preference?.id}
                  data={store.lang.id==0?store.jobCreate?.english_data?.preference:store.jobCreate?.arabic_data?.preference}
                  header={store.lang.gender_preference}
                  heading={`${store.lang.gender_preference}:`}
                  setValue={e => setFieldValue('preference', e)}
                  error={touched.preference && errors.preference && true}
                  rightIcon={
                    <JNewJobIcon/>
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
                  data={store.lang.id==0?store.jobCreate?.english_data?.currencies:store.jobCreate?.arabic_data?.currencies}
                  setValue={e => setFieldValue('currencies', e)}
                  header={store.lang.salary_currency}
                  heading={`${store.lang.salary_currency}:`}
                  error={touched.currencies && errors.currencies && true}
                  rightIcon={
                    <JNewJobIcon/>
                  }
                />
                {touched.currencies && errors.currencies && (
                  <JErrorText>{errors.currencies}</JErrorText>
                )}

                <JSelectInput
                  containerStyle={styles.container}
                  value={values.salaryPeriods.name}
                  id={values.salaryPeriods.id}
                  data={store.lang.id==0?store.jobCreate?.english_data?.salaryPeriods:store.jobCreate?.arabic_data?.salaryPeriods}
                  setValue={e => setFieldValue('salaryPeriods', e)}
                  header={store.lang.Salary_Period}
                  heading={`${store.lang.Salary_Period}:`}
                  error={touched.salaryPeriods && errors.salaryPeriods && true}
                  rightIcon={
                    <JNewJobIcon/>
                  }
                />
                {touched.salaryPeriods && errors.salaryPeriods && (
                  <JErrorText>{errors.salaryPeriods}</JErrorText>
                )}
                <JSelectInput
                  containerStyle={styles.container}
                  value={values.countries.name}
                  data={store.lang.id==0?store.jobCreate?.english_data?.countries:store.jobCreate?.arabic_data?.countries}
                  setValue={e => setFieldValue('countries', e)}
                  header={store.lang.country}
                  heading={`${store.lang.country}:`}
                  id={values.countries.id}
                  error={touched.countries && errors.countries && true}
                  rightIcon={
                    <JNewJobIcon/>
                  }
                />
                {touched.countries && errors.countries && (
                  <JErrorText>{errors.countries}</JErrorText>
                )}
                <JSelectInput
                  containerStyle={styles.container}
                  value={store.lang.id==0?values.state?.name:values.state?.arabic_title}
                  id={values.countries?.id}
                  setValue={e => setFieldValue('state', e)}
                  header={store.lang.state}
                  heading={`${store.lang.state}:`}
                  error={touched.state && errors.state && true}
                  rightIcon={
                    <JNewJobIcon/>
                  }
                />
                {touched.state && errors.state && (
                  <JErrorText>{errors.state}</JErrorText>
                )}
                <JSelectInput
                  containerStyle={styles.container}
                  value={store.lang.id==0?values.city?.name:values.city?.arabic_title}
                  setValue={e => setFieldValue('city', e)}
                  header={store.lang.city}
                  heading={`${store.lang.city}:`}
                  id={values.state?.id}
                  error={touched.city && errors.city && true}
                  rightIcon={
                    <JNewJobIcon/>
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
                {loader ? store.lang.loading : store.lang.next}
              </JButton>
              
            </>
          )}
        </Formik>
      {/* )} */}


    </JScreen>
  );
};

export default observer(JobPreference);

const styles = StyleSheet.create({container: {marginTop: RFPercentage(2)},modal: {
  height:'100%',
  width:'100%',
  alignSelf:'center',
  alignItems: 'center',
  justifyContent:'center',
},
date:{
height:RFPercentage(50),
width:RFPercentage(40),
  backgroundColor:'#fff',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
}});
