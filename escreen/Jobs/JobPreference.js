import {StyleSheet, ScrollView, View, ActivityIndicator, Pressable, Modal} from 'react-native';
import React, { useEffect, useState } from 'react';
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
import Feather from 'react-native-vector-icons/Feather';
import { baseUrl } from '../../ApiUrls';
import JNewJobIcon from '../../customComponents/JNewJobIcon';
import { values } from 'mobx';

const JobPreference = () => {
  const {navigate, goBack} = useNavigation();
  const {params}=useRoute()
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
  const [preferences, setPreferences] = useState();

  const _addJobPreference = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDQyOTYxYTYzYTU0NmZjNjNhZGY4MWFiNmI0N2I4MDNhNzMwMmMxZWRhNDMyMDk5ZGM1ZmNlMjNiZDUyYzY4ODBlN2I4ZDdlZDQ5MWI2YzMiLCJpYXQiOjE2ODAyMTI2NzQuOTE2NzE5LCJuYmYiOjE2ODAyMTI2NzQuOTE2NzIzLCJleHAiOjE3MTE4MzUwNzQuOTA5NzQxLCJzdWIiOiI4NCIsInNjb3BlcyI6W119.aay7JchvkClUeAV79bQQ4fgTa8gRkgoM01y82G7eC1-JrtLnZTbnhQX4q0FJ_OhhDDxcoK00IMTpwmE1mKHNyVxwrw8yrAM8fRoXk0nRJOtVfNBVZ8R88uv8MBqHcREPjPRV3b-UmlaiC8Yv-2tOk4Kd4E79JfAkdyHaaFVmL8YHayifKmKBkECTY8SyaehOlFSn2cvw951aq2T0m_U1xcZsm2IL0gAOdVO_rdB4Ch0AOcEOpCyoCv8QZH7ZKrB26gSVv6IBtbLc_e_dYtV1OJCok-W8JFGiGafhQhc5RRFqTdot6R5WwfiwkqOf2tVNoLNNE06G7lPRzfpNhx7k6qV9OTYl2otef_yBhKr95gO9nr_L5WbjuazUHwYEBEqb53LwVu4-F0ncsr7epuL9oeL_XHa2t71hBqJRXuxS2djKwlKe9dkq6yPBNJQH7SNjAFlF4oDNqH-fqzmu41iKnmRBCxMGycwRUAqXbXoo6v3YJWqtTe6v6tHgTH4UdhQ6h3NrIwzozvNMLK6tMlHEunlZcMuPEUhvQRaGRu2ZQN54KowDDLEV9XmMbbXH2TkTA1LSEKQp-gA1D9w1s7-JHNHs2-rBi7-Vj_TLx5Yzoa-5ry55QIejufts2R48a4ino_lOgeG9a7W4dpPns69cUCL79g6ffe1cJyUYk2sr3mc',
    );
    fetch(
      `${baseUrl}/employer/jobs/create`,

      {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      },
    )
      .then(response => response.json())
      .then(result => {
        setPreferences(result.data);

      })
      .catch(error => {
        console.log('error', error);
        setError(true);

      })
      .finally(() => {
        setLoader(false);
        
      });
  };

  useEffect(() => {
    _addJobPreference();
  }, [loader]);

  return (
    <JScreen
      isError={error}
      onTryAgainPress={() => _addJobPreference()}
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
      {loader ? (
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
            navigate('JobRequirement', {...params, ...values});
            
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
                  data={preferences?.preference}
                  header={'Gender Preference'}
                  heading={'Gender Preference:'}
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
                  value={values.currencies.name}
                  data={preferences?.currencies}
                  setValue={e => setFieldValue('currencies', e)}
                  header={'Salary Currency'}
                  heading={'Currency:'}
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
                  data={preferences?.salaryPeriods}
                  setValue={e => setFieldValue('salaryPeriods', e)}
                  header={'Salary Period'}
                  heading={'Salary Period:'}
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
                  data={preferences?.countries}
                  setValue={e => setFieldValue('countries', e)}
                  header={'Country'}
                  heading={'Country:'}
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
                  value={values.state.name}
                  id={values.countries?.id}
                  setValue={e => setFieldValue('state', e)}
                  header={'State'}
                  heading={'State:'}
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
                  value={values.city.name}
                  setValue={e => setFieldValue('city', e)}
                  header={'City'}
                  heading={'City:'}
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
                {'Next'}
              </JButton>
              
            </>
          )}
        </Formik>
      )}


    </JScreen>
  );
};

export default JobPreference;

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
