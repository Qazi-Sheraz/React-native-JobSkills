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
import * as yup from 'yup';
import moment from 'moment';
import JGradientHeader from '../../../customComponents/JGradientHeader';
import {StoreContext} from '../../../mobx/store';
import {useContext} from 'react';
import {_getProfile} from '../../../functions/Candidate/MyProfile';
import {JToast} from '../../../functions/Toast';
import {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import JChevronIcon from '../../../customComponents/JChevronIcon';

function CGeneralInformation({refRBSheet, data, user}) {
  const store = useContext(StoreContext);
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();
const{params}=useRoute();
  const _postData = values => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token.token}`);
    var formdata = new FormData();
    formdata.append('first_name', values.first_name);
    formdata.append('last_name', values.last_name);
    formdata.append('father_name', values.father);
    formdata.append('dob', moment(values.dob).format('YYYY-MM-DD'));
    formdata.append('gender', values.gender.name == store.lang.male ? '0' : '1');
    formdata.append('country_id', values.country.id);
    formdata.append('state_id', values.state.id);
    formdata.append('city_id', values.city.id);
    formdata.append('candidateLanguage', values.language.id);
    formdata.append('marital_status_id', values.status.id);
    formdata.append('immediate_available', values.availability ? '1' : '0');
// console.log(formdata)
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
          JToast({
            type: 'success',
            text1: store.lang.success,
            text2: result,
          });
          navigation.navigate('Aboutme')
        }
        setLoader(false);
      })
      .catch(error => {
        // console.log('error', error);
        setLoader(false);
      });
  };

  const profile = store.myProfile.user[0].general_information;
// console.log(profile?.marital_status.id)
  return (
    <JScreen headerShown={false}>
      <Formik
        initialValues={{
          first_name: profile.first_name==null?'':profile.first_name,
          last_name: profile.last_name==null?'':profile.last_name,
          father: profile.father_name==null?'':profile.father_name,
          dob: profile.date_of_birth==null?'':profile.date_of_birth,
          gender: profile.gender==null?'':profile.gender == '0' ? {name: store.lang.male} : {name: store.lang.female},
          country:{
            name:params?.country_name?params?.country_name:'',
            id: params?.country_id,
          },
          state: profile.state_name
          ?{
            name: profile.state_name?.name,
            id: profile.state_name?.id,
          }
          
          :'',
          city: profile.city_name
          ?
          {
            name: profile.city_name?.name,
            id: profile.city_name?.id,
          }
          : '',
          language: profile.language
          ?{
            name: profile.language[0]?.language,
            id: profile.language[0]?.id,
          }
          : '',
          status:params?.marital_status?{id:profile?.marital_status.id,name:params?.marital_status}:'',
          availability: profile.immediate_available ? true : false,
        }}
        onSubmit={values => {
          // console.log(values);
          _postData(values);
        }}
        validationSchema={yup.object().shape({
            
          country: yup
          .object().nullable()
          .shape()
          .required('Country is required'),
          city: yup
          .object().nullable()
          .shape()
          .required('City is required'),
          state: yup
          .object().nullable()
          .shape()
          .required('State is required'),
          language: yup
          .object().nullable()
          .shape()
          .required('Language is required'),
          status: yup
          .object().nullable()
          .shape()
          .required('Status is required'),
          
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
            <JGradientHeader
              center={
                <JText
                  fontColor={colors.white[0]}
                  fontWeight="bold"
                  fontSize={RFPercentage(2.5)}>
                  {store.lang.general}
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
                    {store.lang.save}
                  </JText>
                )
              }
              left={<JChevronIcon />}
            />
            <ScrollView 
            showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: RFPercentage(8)}}
              style={{
                marginHorizontal: RFPercentage(2),
              }}>
              <JInput
                style={{
                  textAlign: store.lang.id == 0 ? 'left' : 'right',
                }}
                containerStyle={{marginTop: RFPercentage(2)}}
                maxLength={100}
                heading={store.lang.first_name}
                value={values.first_name}
                error={touched.first_name && errors.first_name && true}
                onChangeText={handleChange('first_name')}
                onBlur={() => setFieldTouched('first_name')}
              />
              {touched.first_name && errors.first_name && (
                <JErrorText>{errors.first_name}</JErrorText>
              )}
              <JInput
                style={{
                  textAlign: store.lang.id == 0 ? 'left' : 'right',
                }}
                containerStyle={{marginTop: RFPercentage(2)}}
                value={values.last_name}
                heading={store.lang.last_name}
                maxLength={100}
                error={touched.last_name && errors.last_name && true}
                onChangeText={handleChange('last_name')}
                onBlur={() => setFieldTouched('last_name')}
              />
              {touched.last_name && errors.last_name && (
                <JErrorText>{errors.last_name}</JErrorText>
              )}

              <JInput
                style={{
                  textAlign: store.lang.id == 0 ? 'left' : 'right',
                }}
                containerStyle={{marginTop: RFPercentage(2)}}
                value={values.father}
                heading={`${store.lang.father_name}:`}
                maxLength={100}
                error={touched.father && errors.father && true}
                onChangeText={handleChange('father')}
                onBlur={() => setFieldTouched('father')}
              />
              {touched.father && errors.father && (
                <JErrorText>{errors.father}</JErrorText>
              )}

              <JSelectInput
                containerStyle={{marginTop: RFPercentage(2)}}
                value={values.dob && moment(values.dob).format('DD-MM-YYYY')}
                maximumDate={new Date()}
                isDate
                heading={`${store.lang.date_of_birth}:`}
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
                data={store.lang.id==0?store.myProfile?.dataEnglish?.Gender:store.myProfile?.dataArabic?.Gender}
                header={store.lang.gender}
                heading={`${store.lang.gender}:`}
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
                data={store.lang.id==0?store.myProfile.dataEnglish.countries:store.myProfile.dataArabic.countries}
                header={store.lang.country}
                heading={`${store.lang.country}:`}
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
                setValue={e => {setFieldValue('state', e);setFieldValue('city', null);}}
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
                containerStyle={{marginTop: RFPercentage(2)}}
                value={values.language?.name}
                setValue={e => setFieldValue('language', e)}
                data={store.lang.id==0?store.myProfile.dataEnglish.language:store.myProfile.dataArabic.language}
                header={store.lang.language}
                heading={`${store.lang.language}:`}
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
                header={store.lang.marital_status}
                    heading={`${store.lang.marital_status}:`}
                data={store.lang.id==0?store.myProfile.dataEnglish.maritalStatus:store.myProfile.dataArabic.maritalStatus}
                
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
                  {store.lang.immediate_available}
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
