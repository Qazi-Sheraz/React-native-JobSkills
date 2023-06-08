import {ActivityIndicator, ScrollView, StyleSheet, Switch} from 'react-native';
import React from 'react';
import {observer} from 'mobx-react';
import JScreen from '../../../customComponents/JScreen';

import JInput from '../../../customComponents/JInput';
import {Formik} from 'formik';

import {RFPercentage} from 'react-native-responsive-fontsize';

import JErrorText from '../../../customComponents/JErrorText';

import JText from '../../../customComponents/JText';
import JSelectInput from '../../../customComponents/JSelectInput';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../../config/colors';
import JRow from '../../../customComponents/JRow';

import moment from 'moment';
import JGradientHeader from '../../../customComponents/JGradientHeader';
import {StoreContext} from '../../../mobx/store';
import {useContext} from 'react';
import {_getProfile} from '../../../functions/Candidate/MyProfile';
import {JToast} from '../../../functions/Toast';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

function CGeneralInformation({refRBSheet, data, user}) {
  const store = useContext(StoreContext);
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();

  const _postData = values => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token.token}`);
    var formdata = new FormData();
    formdata.append('first_name', values.first_name);
    formdata.append('last_name', values.last_name);
    formdata.append('father_name', values.father);
    formdata.append('dob', moment(values.dob).format('YYYY-MM-DD'));
    formdata.append('gender', values.gender.name == 'Male' ? '0' : '1');
    formdata.append('country_id', values.country.id);
    formdata.append('state_id', values.state.id);
    formdata.append('city_id', values.city.id);
    formdata.append('candidateLanguage', values.language.id);
    formdata.append('marital_status_id', values.status.id);
    formdata.append('immediate_available', values.availability ? '1' : '0');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    // console.log(formdata);
    setLoader(true);
    fetch('https://dev.jobskills.digital/api/update-profile', requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        if (result.success === false) {
          alert('Error while saving data');
        } else {
          _getProfile(store);
          alert(result);
        }
        setLoader(false);
      })
      .catch(error => {
        // console.log('error', error);
        setLoader(false);
      });
  };

  const profile = store.myProfile.user[0].general_information;

  return (
    <JScreen headerShown={false}>
      <Formik
        initialValues={{
          first_name: profile.first_name,
          last_name: profile.last_name,
          father: profile.father_name,
          dob: profile.date_of_birth,
          gender: profile.gender == '0' ? {name: 'Male'} : {name: 'Female'},
          country: profile.country_name,
          state: profile.state_name,
          city: profile.city_name,
          language: profile.language,
          status: profile.marital_status,
          availability: profile.immediate_available ? true : false,
        }}
        onSubmit={values => {
          // console.log(values);
          _postData(values);
        }}
        // validationSchema={yup.object().shape({
        //   title: yup.string().required().label('Title'),
        //   company: yup.string().required().label('Company'),
        //   county: yup.string().required().label('Country'),
        //   city: yup.string().required().label('City'),
        //   state: yup.string().required().label('State'),
        //   start: yup.string().required().label('Start'),
        //   end: yup.string().required().label('End'),
        //   description: yup.string().required().label('Description'),
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
            <JGradientHeader
              center={
                <JText
                  fontColor={colors.white[0]}
                  fontWeight="bold"
                  fontSize={RFPercentage(2.5)}>
                  General
                </JText>
              }
              right={
                loader ? (
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
                    Save
                  </JText>
                )
              }
              left={
                <Feather
                  onPress={() => navigation.goBack()}
                  name="chevron-left"
                  size={RFPercentage(3.5)}
                  color={colors.white[0]}
                />
              }
            />
            <ScrollView
              contentContainerStyle={{paddingBottom: RFPercentage(8)}}
              style={{
                marginHorizontal: RFPercentage(2),
              }}>
              <JInput
                containerStyle={{marginTop: RFPercentage(2)}}
                heading={'First Name:'}
                value={values.first_name}
                error={touched.first_name && errors.first_name && true}
                onChangeText={handleChange('first_name')}
                onBlur={() => setFieldTouched('first_name')}
              />
              {touched.first_name && errors.first_name && (
                <JErrorText>{errors.first_name}</JErrorText>
              )}
              <JInput
                containerStyle={{marginTop: RFPercentage(2)}}
                value={values.last_name}
                heading={'Last Name :'}
                error={touched.last_name && errors.last_name && true}
                onChangeText={handleChange('last_name')}
                onBlur={() => setFieldTouched('last_name')}
              />
              {touched.last_name && errors.last_name && (
                <JErrorText>{errors.last_name}</JErrorText>
              )}

              <JInput
                containerStyle={{marginTop: RFPercentage(2)}}
                value={values.father}
                heading={'Father Name :'}
                error={touched.father && errors.father && true}
                onChangeText={handleChange('father')}
                onBlur={() => setFieldTouched('father')}
              />
              {touched.father && errors.father && (
                <JErrorText>{errors.father}</JErrorText>
              )}

              <JSelectInput
                containerStyle={{marginTop: RFPercentage(2)}}
                value={values.dob && moment(values.dob).format('DD MM YYYY')}
                isDate
                heading={'Date of Birth :'}
                setValue={e => setFieldValue('dob', e)}
                error={touched.dob && errors.dob && true}
                rightIcon={
                  <Feather
                    name="chevron-down"
                    size={RFPercentage(2.5)}
                    color={colors.black[0]}
                  />
                }
              />
              {touched.dob && errors.dob && (
                <JErrorText>{errors.dob}</JErrorText>
              )}

              <JSelectInput
                containerStyle={{marginTop: RFPercentage(2)}}
                value={values.gender?.name}
                data={data.Gender}
                header={'Gender'}
                heading={'Gender :'}
                setValue={e => setFieldValue('gender', e)}
                error={touched.gender && errors.gender && true}
                rightIcon={
                  <Feather
                    name="chevron-down"
                    size={RFPercentage(2.5)}
                    color={colors.black[0]}
                  />
                }
              />
              {touched.gender && errors.gender && (
                <JErrorText>{errors.gender}</JErrorText>
              )}

              <JSelectInput
                containerStyle={{marginTop: RFPercentage(2)}}
                value={values.country?.name}
                data={data.countries}
                header={'Country'}
                heading={'Country :'}
                setValue={e => {
                  setFieldValue('country', e);
                  setFieldValue('state', null);
                  setFieldValue('city', null);
                }}
                error={touched.country && errors.country && true}
                rightIcon={
                  <Feather
                    name="chevron-down"
                    size={RFPercentage(2.5)}
                    color={colors.black[0]}
                  />
                }
              />
              {touched.country && errors.country && (
                <JErrorText>{errors.country}</JErrorText>
              )}

              <JSelectInput
                containerStyle={{marginTop: RFPercentage(2)}}
                value={values.state?.name}
                id={values.country?.id}
                setValue={e => setFieldValue('state', e)}
                header={'State'}
                heading={'State :'}
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
                containerStyle={{marginTop: RFPercentage(2)}}
                value={values.city?.name}
                setValue={e => setFieldValue('city', e)}
                header={'City'}
                heading={'City :'}
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
                containerStyle={{marginTop: RFPercentage(2)}}
                value={values.language?.name}
                setValue={e => setFieldValue('language', e)}
                data={data.language}
                header={'Language'}
                heading={'Language:'}
                error={touched.language && errors.language && true}
                rightIcon={
                  <Feather
                    name="chevron-down"
                    size={RFPercentage(2.5)}
                    color={colors.black[0]}
                  />
                }
              />
              {touched.language && errors.language && (
                <JErrorText>{errors.language}</JErrorText>
              )}

              <JSelectInput
                containerStyle={{marginTop: RFPercentage(2)}}
                value={values.status?.name}
                setValue={e => setFieldValue('status', e)}
                header={'Martial Status'}
                data={data.maritalStatus}
                heading={'Martial Status:'}
                error={touched.status && errors.status && true}
                rightIcon={
                  <Feather
                    name="chevron-down"
                    size={RFPercentage(2.5)}
                    color={colors.black[0]}
                  />
                }
              />
              {touched.status && errors.status && (
                <JErrorText>{errors.status}</JErrorText>
              )}

              <JRow
                style={{
                  justifyContent: 'space-between',
                  marginVertical: RFPercentage(2),
                }}>
                <JText fontWeight={'500'} fontSize={RFPercentage(2.5)}>
                  Immediate Available
                </JText>

                <Switch
                  trackColor={{true: colors.purple[0]}}
                  onValueChange={e => {
                    setFieldValue('availability', e);
                  }}
                  value={values.availability}
                />
              </JRow>
            </ScrollView>
          </>
        )}
      </Formik>
    </JScreen>
  );
}
export default observer(CGeneralInformation);
const styles = StyleSheet.create({});
