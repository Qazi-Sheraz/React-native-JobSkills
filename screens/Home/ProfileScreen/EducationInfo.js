import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import JText from '../../../customComponents/JText';
import JGradientHeader from '../../../customComponents/JGradientHeader';
import JScreen from '../../../customComponents/JScreen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../../config/colors';
import JButton from '../../../customComponents/JButton';
import {Formik} from 'formik';
import * as yup from 'yup';
import JErrorText from '../../../customComponents/JErrorText';
import JInput from '../../../customComponents/JInput';
import JSelectInput from '../../../customComponents/JSelectInput';
import {StoreContext} from '../../../mobx/store';
import JChevronIcon from '../../../customComponents/JChevronIcon';
import JScrollView from '../../../customComponents/JScrollView';
import url from '../../../config/url';
import {JToast} from '../../../functions/Toast';
import {useNavigation, useRoute} from '@react-navigation/native';
import CLNotification from '../../../loaders/Candidate/Notification/CLNotification';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const EducationInfo = () => {
  const store = useContext(StoreContext);
  const navigation = useNavigation();
  const [loader1, setLoader1] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const {params} = useRoute();
  const [edu, setEdu] = useState([]);
  const _getEdu = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    setApiLoader(true);
    fetch(`${url.baseUrl}/edit-general-profile`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setEdu(result);
        setApiLoader(false);
      })
      .catch(error => {
        // console.log('error', error);
        JToast({
          type: 'danger',
          text1: store.lang.eror,
          text2: store.lang.error_while_getting_data,
        });
        setApiLoader(false);
      });
  };
  const _addEducation = values => {
    setLoader1(true);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token.token}`);

    var formdata = new FormData();
    formdata.append('degree_level_id', values.level?.id);
    formdata.append('degree_title', values.title);
    formdata.append('country_id', `${values.county?.id}`);
    formdata.append('state_id', `${values.state?.id}`);
    formdata.append('city_id', `${values.city?.id}`);
    formdata.append('institute', values.institude);
    formdata.append('result', values.result);
    formdata.append('year', `${values.year?.name}`);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch(
      !params
        ? `${url.baseUrl}/candidate-education-create`
        : `${url.baseUrl}/candidate-education-update/${params?.educationId}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        params && _addEdu(result.data);
        JToast({
          type: 'success',
          text1: store.lang.success,
          text2: result.message,
        });
        setLoader1(false);
        navigation.goBack();
      })
      .catch(error => {
        console.log('error', error);
        setLoader1(false);
      });
  };

  const _addEdu = e => {
    try {
      let arr = [...store.educationList];
      arr.unshift(e);
      store.setEducationList(arr);
      console.log('Data added successfully:', e);
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };
  useEffect(() => {
    _getEdu();
  }, []);
  return (
    <JScreen
      headerShown={true}
      header={
        <JGradientHeader
          center={
            <JText
              onPress={() => add()}
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {store.lang.education}
            </JText>
          }
          left={<JChevronIcon />}
        />
      }>
      {apiLoader ? (
        <CLNotification />
      ) : (
        (console.log(params?.degree_level_id),
        (
          <Formik
            initialValues={{
              title: params?.title !== null ? params?.title : '',
              level: params?.degree_level_id
                ? {
                    id: params?.degree_level_id,
                    name: params?.degree_level,
                  }
                : '',
              county: params?.country_id
                ? {
                    id: params?.country_id,
                    name: params?.country,
                  }
                : '',
              city: params?.city_id
                ? {
                    id: params?.city_id,
                    name: params?.city,
                  }
                : '',

              state: params?.state_id
                ? {
                    id: params?.state_id,
                    name: params?.state,
                  }
                : '',
              institude: params?.institute !== null ? params?.institute : '',
              result: params?.result !== null ? params?.result : '',
              year: params?.year
                ? {
                    name: params?.year,
                  }
                : '',
            }}
            onSubmit={values => {
              _addEducation(values);
            }}
            validationSchema={yup.object().shape({
              title: yup
                .string()
                .transform(value => value.trim())
                .max(100, store.lang.Title_must_not_exceed_100_characters)
                .required(
                  `${store.lang.Title} ${store.lang.is_a_required_field}`,
                ),
              level: yup
                .object()
                .nullable()
                .shape()
                .required(
                  `${store.lang.degree_level} ${store.lang.is_a_required_field}`,
                ),
              county: yup
                .object()
                .nullable()
                .shape()
                .required(store.lang.Country_is_required),
              city: yup
                .object()
                .nullable()
                .shape()
                .required(store.lang.City_is_required),
              state: yup
                .object()
                .nullable()
                .shape()
                .required(store.lang.State_is_required),
              institude: yup
                .string()
                .max(250, store.lang.institude_must_not_exceed_250_characters)
                .transform(value => value.trim())
                .matches(
                  /^[a-zA-Z0-9_].*$/,
                  `${store.lang.institute} ${store.lang.cannot_start_special_character},`,
                )
                .required(
                  `${store.lang.institute} ${store.lang.is_a_required_field}`,
                ),
              result: yup
                .number()
                .typeError(store.lang.GPA_must_be_a_valid_number)
                .min(0, store.lang.GPA_must_be_greater_than_or_equal_to_0)
                .max(4, store.lang.GPA_must_be_less_than_or_equal_to_4)
                .required(store.lang.GPA_is_required)
                .label(store.lang.GPA),
              year: yup
                .object()
                .nullable()
                .shape()
                .required(store.lang.Year_is_required),
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
                <KeyboardAwareScrollView
                  showsVerticalScrollIndicator={false}
                  style={{
                    marginHorizontal: RFPercentage(2),
                  }}>
                  <JSelectInput
                    isRequired
                    containerStyle={[
                      styles.container,
                      {marginTop: RFPercentage(3)},
                    ]}
                    value={values.level?.name}
                    id={values.level?.id}
                    data={
                      store.lang.id == 0
                        ? edu?.dataEnglish?.degreeLevels
                        : edu?.dataArabic?.degreeLevels
                    }
                    header={store.lang.degree_level}
                    heading={`${store.lang.degree_level}:`}
                    setValue={e => setFieldValue('level', e)}
                    error={touched.level && errors.level && true}
                    rightIcon={
                      <Feather
                        name="chevron-down"
                        size={RFPercentage(2.5)}
                        color={colors.black[0]}
                      />
                    }
                  />
                  {touched.level && errors.level && (
                    <JErrorText>{errors.level}</JErrorText>
                  )}

                  <JInput
                    style={{
                      textAlign: store.lang.id == 0 ? 'left' : 'right',
                    }}
                    isRequired={true}
                    containerStyle={styles.container}
                    value={values.title}
                    heading={`${store.lang.degree_title}:`}
                    error={touched.title && errors.title && true}
                    onChangeText={handleChange('title')}
                    onBlur={() => setFieldTouched('title')}
                  />
                  {touched.title && errors.title && (
                    <JErrorText>{errors.title}</JErrorText>
                  )}

                  <JSelectInput
                    isRequired
                    containerStyle={styles.container}
                    value={values.county.name}
                    data={
                      store.lang.id == 0
                        ? store.myProfile.dataEnglish.countries
                        : store.myProfile.dataArabic.countries
                    }
                    // id={values.county.id}
                    header={store.lang.country}
                    heading={`${store.lang.country}:`}
                    setValue={e => {
                      setFieldValue('county', e);
                      setFieldValue('state', null);
                      setFieldValue('city', null);
                    }}
                    error={touched.county && errors.county && true}
                    rightIcon={
                      <Feather
                        name="chevron-down"
                        size={RFPercentage(2.5)}
                        color={colors.black[0]}
                      />
                    }
                  />
                  {touched.county && errors.county && (
                    <JErrorText>{errors.county}</JErrorText>
                  )}

                  <JSelectInput
                    isRequired
                    disabled={values.county ? false : true}
                    containerStyle={styles.container}
                    value={values.state?.name}
                    id={values.county?.id}
                    setValue={e => {
                      setFieldValue('state', e);
                      setFieldValue('city', null);
                    }}
                    header={store.lang.state}
                    heading={`${store.lang.state}:`}
                    error={touched.state && errors.state && true}
                    rightIcon={
                      <Feather
                        name="chevron-down"
                        size={RFPercentage(2.5)}
                        color={colors.black[0]}
                      />
                    }
                  />
                  {touched.state && errors.state && (
                    <JErrorText>{errors.state}</JErrorText>
                  )}

                  <JSelectInput
                    isRequired
                    disabled={values.state ? false : true}
                    containerStyle={styles.container}
                    value={values.city?.name}
                    setValue={e => setFieldValue('city', e)}
                    header={store.lang.city}
                    heading={`${store.lang.city}:`}
                    id={values.state?.id}
                    error={touched.city && errors.city && true}
                    rightIcon={
                      <Feather
                        name="chevron-down"
                        size={RFPercentage(2.5)}
                        color={colors.black[0]}
                      />
                    }
                  />
                  {touched.city && errors.city && (
                    <JErrorText>{errors.city}</JErrorText>
                  )}

                  <JInput
                    style={{
                      textAlign: store.lang.id == 0 ? 'left' : 'right',
                    }}
                    isRequired={true}
                    containerStyle={styles.container}
                    heading={`${store.lang.institute}:`}
                    value={values.institude}
                    error={touched.institude && errors.institude && true}
                    onChangeText={handleChange('institude')}
                    onBlur={() => setFieldTouched('institude')}
                  />
                  {touched.institude && errors.institude && (
                    <JErrorText>{errors.institude}</JErrorText>
                  )}

                  <JInput
                    style={{
                      textAlign: store.lang.id == 0 ? 'left' : 'right',
                    }}
                    isRequired
                    keyboardType={'numeric'}
                    containerStyle={styles.container}
                    heading={`GPA:`}
                    value={values.result}
                    error={touched.result && errors.result && true}
                    onChangeText={handleChange('result')}
                    onBlur={() => setFieldTouched('result')}
                  />
                  {touched.result && errors.result && (
                    <JErrorText>{errors.result}</JErrorText>
                  )}

                  <JSelectInput
                    isRequired
                    containerStyle={styles.container}
                    value={values.year?.name}
                    setValue={e => setFieldValue('year', e)}
                    header={store.lang.year}
                    heading={`${store.lang.year_of_completion_of_degree}:`}
                    error={touched.year && errors.year && true}
                    rightIcon={
                      <Feather
                        name="chevron-down"
                        size={RFPercentage(2.5)}
                        color={colors.black[0]}
                      />
                    }
                  />
                  {touched.year && errors.year && (
                    <JErrorText>{errors.year}</JErrorText>
                  )}
                </KeyboardAwareScrollView>
                <View style={styles.bottomV}>
                  <JButton
                    disabled={loader1 ? true : false}
                    isValid={isValid}
                    onPress={() => handleSubmit()}
                    style={{
                      width: RFPercentage(20),
                    }}>
                    {loader1 ? store.lang.loading : store.lang.save}
                  </JButton>
                </View>
              </>
            )}
          </Formik>
        ))
      )}
    </JScreen>
  );
};

export default EducationInfo;

const styles = StyleSheet.create({
  container: {marginTop: RFPercentage(2)},
  bottomV: {
    height: RFPercentage(7),
    width: '100%',
    backgroundColor: '#ffff',
    padding: RFPercentage(1),
  },
});
