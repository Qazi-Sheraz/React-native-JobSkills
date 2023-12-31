import {View, Switch, StyleSheet} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import * as yup from 'yup';
import moment from 'moment';
import {Formik} from 'formik';
import url from '../../../config/url';
import colors from '../../../config/colors';
import {JToast} from '../../../functions/Toast';
import JRow from '../../../customComponents/JRow';
import {StoreContext} from '../../../mobx/store';
import JText from '../../../customComponents/JText';
import JInput from '../../../customComponents/JInput';
import Feather from 'react-native-vector-icons/Feather';
import JScreen from '../../../customComponents/JScreen';
import JButton from '../../../customComponents/JButton';
import JErrorText from '../../../customComponents/JErrorText';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JSelectInput from '../../../customComponents/JSelectInput';
import JChevronIcon from '../../../customComponents/JChevronIcon';
import {useNavigation, useRoute} from '@react-navigation/native';
import JGradientHeader from '../../../customComponents/JGradientHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Platform } from 'react-native';

const ExperienceInfo = () => {
  const store = useContext(StoreContext);
  const {params} = useRoute();
  const navigation = useNavigation();
  const start = new Date(params?.start);
  const [loader1, setLoader1] = useState(false);

  const currentDate = new Date();
  const current = moment();
  // Calculate the maximum start date (1 day before the current date)
  const maximumStartDate = new Date(currentDate);
  maximumStartDate?.setDate(currentDate?.getDate() - 1);
  // Calculate one day ahead
  const oneDayAhead = new Date(start);
  oneDayAhead.setDate(start.getDate() + 1);

  const [endDate, setEndDate] = useState(
    params?.start ? new Date(oneDayAhead) : null,
  );

  const _addExperince = values => {
    setLoader1(true);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

    var formdata = new FormData();

    formdata.append('experience_title', values.title);
    formdata.append('company', values.company);
    formdata.append('country_id', values.county?.id);
    formdata.append('state_id', `${values.state?.id}`);
    formdata.append('city_id', `${values.city?.id}`);
    formdata.append('start_date', moment(values.start).format('MM/DD/YYYY'));
    formdata.append('description', values.description);
    formdata.append('currently_working', values.working ? '1' : '0');
    values.working == false &&
      formdata.append('end_date', moment(values.end).format('MM/DD/YYYY'));

    // console.log('formdata', formdata);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch(
      params?.type == 0
        ? `${url.baseUrl}/candidate-experience-update/${params?.experienceId}`
        : `${url.baseUrl}/experience-create`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (
          moment(values.start).format('MM/DD/YYYY') ===
          moment(values.end).format('MM/DD/YYYY')
        ) {
          JToast({
            type: 'danger',
            text1: store.lang.eror,
            text2: result.end_date[0],
          });
          setLoader1(false);
        } else {
          _addExp(result.data?.candidateExperience);
          JToast({
            type: 'success',
            text1: store.lang.success,
            text2: result.message,
          });
          navigation.goBack();
          setLoader1(false);
        }
      })
      .catch(error => {
        // console.log('error-post', error);
        setLoader1(false);
      });
  };
  const _addExp = e => {
    try {
      let arr = [...store.experienceList];
      arr.unshift(e);
      store.setExperienceList(arr);
      // console.log('Data added successfully:', e);
    } catch (error) {
      // console.error('Error adding data:', error);
    }
  };

  // console.log("end date====>", endDate)

  useEffect(() => {}, [maximumStartDate]);

  return (
    <JScreen
      // headerShown={true}
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {store.lang.experience}
            </JText>
          }
          left={<JChevronIcon />}
        />
      }>
      <Formik
        initialValues={{
          title: params?.title ? params?.title : '',
          company: params?.company ? params?.company : '',
          county: params?.country_id
            ? {
                id: params?.country_id ? params?.country_id : '',
                name: params?.country,
              }
            : '',
          city: params?.city_id
            ? {
                id: params?.city_id ? params?.city_id : '',
                name: params?.city,
              }
            : '',

          state: params?.state_id
            ? {
                id: params?.state_id ? params?.state_id : '',
                name: params?.state,
              }
            : '',
          start: params?.start
            ? moment(params?.start).format('MM/DD/YYYY')
            : '',
          end: params?.end
            ? moment(params?.end).format('MM/DD/YYYY')
            : endDate
            ? endDate
            : '',
          working: params?.working ? params?.working : false,
          description: params?.description !== null ? params?.description : '',
        }}
        onSubmit={values => {
          _addExperince(values);
        }}
      
        validationSchema={yup.object().shape({
          title: yup
            .string()
            .transform(value => value.trim())
            .matches(
              /^[A-Za-z\u0600-\u06FF\s]+$/,
              `${store.lang.Title} ${store.lang.Symbols_are_not_allowed},` )
            .max(100, store.lang.Title_must_not_exceed_100_characters)
            .required(`${store.lang.Title} ${store.lang.is_a_required_field}`),
          company: yup
            .string()
            .transform(value => value.trim())
            .matches(
              /^[a-zA-Z\u0600-\u06FF\0-9_].*$/,
              `${store.lang.Company} ${store.lang.cannot_start_special_character},` )
            .required(`${store.lang.Company} ${store.lang.is_a_required_field}`),
          start: yup
            .string()
            .required(store.lang.Start_Date_is_required)
            .label(store.lang.start),
          // end: yup.string().required('End Date is required').label('end'),

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

          description: yup
            .string()
            .transform(value => value.trim())
            .matches(
              /^[a-zA-Z\u0600-\u06FF\0-9_].*$/,
              `${store.lang.description} ${store.lang.cannot_start_special_character}`,
            )
            .max(500, store.lang.Title_must_not_exceed_500_characters)
            .required(`${store.lang.descriptions} ${store.lang.is_a_required_field}`),
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
              style={{marginHorizontal: RFPercentage(2)}}>
              <JInput
                style={{
                  textAlign: store.lang.id == 0 ? 'left' : 'right',
                }}
                maxLength={100}
                isRequired={true}
                containerStyle={{marginTop: RFPercentage(3)}}
                heading={`${store.lang.experience_title}:`}
                value={values.title}
                error={touched.title && errors.title && true}
                onChangeText={handleChange('title')}
                onBlur={() => setFieldTouched('title')}
              />
              {touched.title && errors.title && (
                <JErrorText>{errors.title}</JErrorText>
              )}
              <JInput
                style={{
                  textAlign: store.lang.id == 0 ? 'left' : 'right',
                }}
                isRequired={true}
                containerStyle={{marginTop: RFPercentage(2)}}
                value={values?.company}
                heading={`${store.lang.company}:`}
                error={touched.company && errors.company && true}
                onChangeText={handleChange('company')}
                onBlur={() => setFieldTouched('company')}
              />
              {touched.company && errors.company && (
                <JErrorText>{errors.company}</JErrorText>
              )}

              <JSelectInput
              isRequired
                containerStyle={{marginTop: RFPercentage(2)}}
                data={
                  store.lang.id == 0
                    ? store.myProfile?.dataEnglish?.countries
                    : store.myProfile?.dataArabic?.countries
                }
                value={values?.county?.name}
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
                containerStyle={{marginTop: RFPercentage(2)}}
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
                containerStyle={{marginTop: RFPercentage(2)}}
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

              <JSelectInput
              isRequired
                isDate={true}
                containerStyle={{marginTop: RFPercentage(2)}}
                date1={maximumStartDate && maximumStartDate}
                maximumDate={maximumStartDate && maximumStartDate}
                setValue={e => {
                  setFieldValue('start', e);

                  const nextDayDate = new Date(e);
                  nextDayDate?.setDate(nextDayDate?.getDate() + 1);
                  setFieldValue('end', nextDayDate);
                  setEndDate(nextDayDate);
                }}
                value={
                  values.start && moment(values?.start).format('MM/DD/YYYY')
                }
                header={store.lang.start_date}
                heading={`${store.lang.start_date}:`}
                error={touched.start && errors.start && true}
                rightIcon={
                  <Feather
                    name="chevron-down"
                    size={RFPercentage(2.5)}
                    color={colors.black[0]}
                  />
                }
              />
              {touched.start && errors.start && (
                <JErrorText>{errors.start}</JErrorText>
              )}

              {values.working == false && (
                <>
                  <JSelectInput
                  isRequired
                    disabled={values.start !== '' ? false : true}
                    date1={values.end ? new Date(values.end) : new Date()}
                    // minimumDate={values?.start && moment(values?.start, 'MM/DD/YYYY').clone().add(1, 'day')}
                    minimumDate={new Date(endDate)}
                    maximumDate={new Date()}
                    containerStyle={{marginTop: RFPercentage(2)}}
                    isDate={true}
                    value={
                      values.end && moment(values.end).format('MM/DD/YYYY')
                    }
                    setValue={e => {
                      setFieldValue('end', e);
                      // console.log(moment(e, 'DD MMM YYYY'))
                    }}
                    header={store.lang.end_date}
                    heading={`${store.lang.end_date}:`}
                    error={touched.end && errors.end && true}
                    rightIcon={
                      <Feather
                        name="chevron-down"
                        size={RFPercentage(2.5)}
                        color={
                          values.start == ''
                            ? colors.inputBorder[0]
                            : colors.black[0]
                        }
                      />
                    }
                    // disabled={!values.start}
                  />
                  {touched.end && errors.end && (
                    <JErrorText>{errors.end}</JErrorText>
                  )}
                </>
              )}
              <JInput
              isRequired
                style={{
                  textAlign: store.lang.id == 0 ? 'left' : 'right',
                }}
                maxLength={500}
                containerStyle={{marginTop: RFPercentage(2)}}
                heading={`${store.lang.description}:`}
                value={values.description}
                error={touched.description && errors.description && true}
                onChangeText={handleChange('description')}
                onBlur={() => setFieldTouched('description')}
              />
              {touched.description && errors.description && (
                <JErrorText>{errors.description}</JErrorText>
              )}
              <JRow
                style={{
                  justifyContent: 'space-between',
                  marginVertical: RFPercentage(2),
                }}>
                <JText fontWeight={Platform.OS=='ios'?'400' :'500'} fontSize={RFPercentage(2.5)}>
                  {store.lang.currently_working}
                </JText>

                <Switch
                  trackColor={{true: colors.purple[0]}}
                  onValueChange={e => {
                    setFieldValue('working', e);
                    // console.log('eeeeeeee', e)
                  }}
                  value={values.working}
                />
              </JRow>
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
    </JScreen>
  );
};

export default ExperienceInfo;

const styles = StyleSheet.create({
  container: {marginTop: RFPercentage(2)},
  bottomV: {
    width: '100%',
    height: RFPercentage(7),
    padding: RFPercentage(1),
    backgroundColor: '#ffff',
  },
});
