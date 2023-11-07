import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  View,
} from 'react-native';
import React, {useRef, useEffect, useState, useContext} from 'react';
import {observer} from 'mobx-react';
import JScreen from '../../../customComponents/JScreen';
import JInput from '../../../customComponents/JInput';
import {Formik} from 'formik';
import * as yup from 'yup';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JErrorText from '../../../customComponents/JErrorText';
import JText from '../../../customComponents/JText';
import JSelectInput from '../../../customComponents/JSelectInput';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../../config/colors';
import JGradientHeader from '../../../customComponents/JGradientHeader';
import {StoreContext} from '../../../mobx/store';
import {_getProfile} from '../../../functions/Candidate/MyProfile';
import {useNavigation, useRoute} from '@react-navigation/native';
import url from '../../../config/url';
import JChevronIcon from '../../../customComponents/JChevronIcon';
import {JToast} from '../../../functions/Toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

function CExperienceInformation({refRBSheet, data}) {
  const store = useContext(StoreContext);
  const [loader, setLoader] = useState(true);
  const [loader1, setLoader1] = useState(false);
  const [error, setError] = useState(false);
  const [experience, setExperience] = useState();
  const navigation = useNavigation();
  const profile = store.myProfile.user[0].experience_information;
  const {params} = useRoute();
  const _getExperience = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${url.baseUrl}/edit-experience-profile`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        setExperience(result);
        setLoader(false);
      })
      .catch(error => {
        // console.log('error', error);
        setError;
      });
  };
  useEffect(() => {
    _getExperience();
  }, []);
  return (
    <JScreen headerShown={false}>
      <Formik
        initialValues={{
          experience: {
            name: `${profile.experience !== null ? profile.experience : ''}`,
          },
          career: {name: params?.career_level, id: params?.career_id},
          industry: {name: params?.industry, id: params?.industry_id},
          area: {name: params?.functional_area, id: params?.functional_area_id},
          current: `${profile.current_salary ? profile.current_salary : ''}`,
          expected: `${profile.expected_salary ? profile.expected_salary : ''}`,
          currency: {
            name: params?.salary_currency,
            id: params?.salary_currency_id,
          },
        }}
        validationSchema={yup.object().shape({
          experience: yup
            .object()
            .shape()
            .nullable()
            .required(store.lang.Experience_is_required),
          career: yup
            .object()
            .shape()
            .nullable()
            .required(store.lang.Career_Level_is_required),
          industry: yup
            .object()
            .shape()
            .nullable()
            .required(store.lang.Industries_is_required),
          current: yup
            .string()
            .matches(/^[0-9]+$/, store.lang.must_be_a_numeric_value)
            .required(store.lang.current_salary_is_required)
            .label(store.lang.Current),
          area: yup
            .object()
            .shape()
            .nullable()
            .required(store.lang.Area_is_required),
          expected: yup
            .string()
            .matches(/^[0-9]+$/, store.lang.must_be_a_numeric_value)
            .required(store.lang.expected_salary_is_required)
            .label(store.lang.Expected),
          currency: yup
            .object()
            .shape()
            .nullable()
            .required(store.lang.Country_is_required),
        })}
        onSubmit={values => {
          // console.log(values);

          var myHeaders = new Headers();
          myHeaders.append('Authorization', `Bearer ${store.token.token}`);
          var formdata = new FormData();
          formdata.append('experience', values.experience.name);
          formdata.append('career_level_id', values.career.id);
          formdata.append('industry_id', values.industry.id);
          formdata.append('functional_area_id', values.area.id);
          formdata.append('current_salary', values.current);
          formdata.append('expected_salary', values.expected);
          formdata.append('salary_currency', values.currency.id);

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow',
          };
          setLoader1(true);
          fetch(`${url.baseUrl}/update-profile`, requestOptions)
            .then(response => response.json())
            .then(result => {
              // console.log(result);
              if (result.success === false) {
                JToast({
                  type: 'danger',
                  text1: result.message,
                });
              } else {
                _getProfile(store);
                JToast({
                  type: 'success',
                  text1: result.message,
                });
                navigation.navigate('Aboutme');
              }
              setLoader1(false);
            })
            .catch(error => {
              // console.log('error', error);
              setLoader(false);
            });

          // _postData(values);
        }}>
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
            <JGradientHeader
              center={
                <JText
                  fontColor={colors.white[0]}
                  fontWeight="bold"
                  fontSize={RFPercentage(2.5)}>
                  {store.lang.experience}
                </JText>
              }
              right={
                loader1 ? (
                  <ActivityIndicator
                    color={colors.white[0]}
                    size={RFPercentage(2)}
                  />
                ) : (
                  <JText
                    onPress={() => isValid && handleSubmit()}
                    fontColor={
                      !isValid ? `${colors.white[0]}70` : colors.white[0]
                    }>
                    {store.lang.save}
                  </JText>
                )
              }
              left={<JChevronIcon />}
            />
            {loader ? (
              <ActivityIndicator />
            ) : (
              <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: RFPercentage(8)}}
                style={{
                  marginHorizontal: RFPercentage(2),
                }}>
                <JSelectInput
                  containerStyle={{marginTop: RFPercentage(2)}}
                  value={values.experience?.name}
                  id={values.experience}
                  setValue={e => setFieldValue('experience', e)}
                  header={store.lang.experience}
                  heading={`${store.lang.experience_in_years}:`}
                  error={touched.experience && errors.experience && true}
                  rightIcon={
                    <Feather
                      name="chevron-down"
                      size={RFPercentage(2.5)}
                      color={colors.black[0]}
                    />
                  }
                />
                {touched.experience && errors.experience && (
                  <JErrorText>{errors.experience}</JErrorText>
                )}

                <JSelectInput
                  containerStyle={{marginTop: RFPercentage(2)}}
                  data={
                    store.lang.id == 0
                      ? experience?.dataEnglish?.careerLevel
                      : experience?.dataArabic?.careerLevel
                  }
                  value={values.career?.name}
                  id={values.career.id}
                  setValue={e => setFieldValue('career', e)}
                  header={store.lang.career_level}
                  heading={`${store.lang.career_level}:`}
                  error={touched.career && errors.career && true}
                  rightIcon={
                    <Feather
                      name="chevron-down"
                      size={RFPercentage(2.5)}
                      color={colors.black[0]}
                    />
                  }
                />
                {touched.career && errors.career && (
                  <JErrorText>{errors.career}</JErrorText>
                )}

                <JSelectInput
                  containerStyle={{marginTop: RFPercentage(2)}}
                  value={values.industry?.name}
                  setValue={e => setFieldValue('industry', e)}
                  header={store.lang.Industry}
                  heading={`${store.lang.Industry}:`}
                  data={
                    store.lang.id == 0
                      ? experience?.dataEnglish?.industry
                      : experience?.dataArabic?.industry
                  }
                  id={values.industry}
                  error={touched.industry && errors.industry && true}
                  rightIcon={
                    <Feather
                      name="chevron-down"
                      size={RFPercentage(2.5)}
                      color={colors.black[0]}
                    />
                  }
                />
                {touched.industry && errors.industry && (
                  <JErrorText>{errors.industry}</JErrorText>
                )}

                <JSelectInput
                  containerStyle={{marginTop: RFPercentage(2)}}
                  value={values.area?.name}
                  data={
                    store.lang.id == 0
                      ? experience?.dataEnglish?.functionalArea
                      : experience?.dataArabic?.functionalArea
                  }
                  setValue={e => setFieldValue('area', e)}
                  header={store.lang.functional_Area}
                  heading={`${store.lang.functional_Area}:`}
                  error={touched.area && errors.area && true}
                  rightIcon={
                    <Feather
                      name="chevron-down"
                      size={RFPercentage(2.5)}
                      color={colors.black[0]}
                    />
                  }
                />
                {touched.area && errors.area && (
                  <JErrorText>{errors.area}</JErrorText>
                )}

                <JInput
                  style={{
                    textAlign: store.lang.id == 0 ? 'left' : 'right',
                  }}
                  maxLength={14}
                  containerStyle={{marginTop: RFPercentage(2)}}
                  heading={`${store.lang.current_salary}:`}
                  value={values.current}
                  error={touched.current && errors.current && true}
                  onChangeText={handleChange('current')}
                  onBlur={() => setFieldTouched('current')}
                  keyboardType={'numeric'}
                />
                {touched.current && errors.current && (
                  <JErrorText>{errors.current}</JErrorText>
                )}
                <JInput
                  style={{
                    textAlign: store.lang.id == 0 ? 'left' : 'right',
                  }}
                  maxLength={14}
                  containerStyle={{marginTop: RFPercentage(2)}}
                  value={values.expected}
                  heading={`${store.lang.expected_salary}:`}
                  error={touched.expected && errors.expected && true}
                  onChangeText={handleChange('expected')}
                  onBlur={() => setFieldTouched('expected')}
                  keyboardType={'numeric'}
                />
                {touched.expected && errors.expected && (
                  <JErrorText>{errors.expected}</JErrorText>
                )}

                <JSelectInput
                  data={
                    store.lang.id == 0
                      ? experience?.dataEnglish?.currency
                      : experience?.dataArabic?.currency
                  }
                  containerStyle={{marginTop: RFPercentage(2)}}
                  value={values.currency?.name}
                  setValue={e => setFieldValue('currency', e)}
                  header={store.lang.salary_currency}
                  heading={`${store.lang.salary_currency}:`}
                  error={touched.currency && errors.currency && true}
                  rightIcon={
                    <Feather
                      name="chevron-down"
                      size={RFPercentage(2.5)}
                      color={colors.black[0]}
                    />
                  }
                />
                {touched.currency && errors.currency && (
                  <JErrorText>{errors.currency}</JErrorText>
                )}
              </KeyboardAwareScrollView>
            )}
          </>
        )}
      </Formik>
    </JScreen>
  );
}
export default observer(CExperienceInformation);
const styles = StyleSheet.create({});
