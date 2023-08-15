import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useRef } from 'react';
import JScreen from '../../customComponents/JScreen';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JText from '../../customComponents/JText';
import { ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import JInput from '../../customComponents/JInput';
import * as yup from 'yup';
import JSelectInput from '../../customComponents/JSelectInput';
import { Formik } from 'formik';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../config/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import JChevronIcon from '../../customComponents/JChevronIcon';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import url from '../../config/url';
import { useContext } from 'react';
import { StoreContext } from '../../mobx/store';
import JErrorText from '../../customComponents/JErrorText';

const ECompanyInformation = () => {
  const [loader, setLoader] = useState(true);
  const [loader1, setLoader1] = useState(false);
  const [info, setInfo] = useState();
  const [error, setError] = useState(false);
  const navigation = useNavigation();
  const phoneInput = useRef(null);
  const store = useContext(StoreContext);
  const { params } = useRoute();
  // console.log(params?.details)
  const _companyInfo = values => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${store.token?.token}`,
    );
    // console.log(values.industries.id);
    var formdata = new FormData();
    formdata.append('ceo', values?.ceo_name);
    formdata.append('industry_id', values?.industries.id);
    formdata.append('ownership_type_id', values?.ownerShipTypes.id);
    formdata.append('companyName', values?.company_name);
    formdata.append('company_size_id', values?.companySize.id);
    formdata.append('details', values?.employeDetail);
    formdata.append('no_of_offices', values?.no_of_offices);
    formdata.append('location', values?.location);
    formdata.append('website', values?.website);
    // formdata.append('fax', values?.fax);
    // console.log(formdata);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch(`${url.baseUrl}/companyUpdate/${store.token?.user?.owner_id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result)

        Toast.show({
          type: 'success',
          text1: 'Successfully update',
        })
        setLoader1(false)
        navigation.goBack()
      })
      .catch(error => {
        // console.log('error====',error)
        Toast.show({
          type: 'error',
          text1: 'Oops! Something went wrong',
        })
      })
  };

  const _getcompanyInfo = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${store.token?.token}`,
    );

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `${url.baseUrl}/company/company-information`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        setInfo(result);
      })
      .catch(error => { console.log('error', error), setError(true) })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    _getcompanyInfo();
  }, []);


  return (
    <JScreen
      headerShown={false}
      isError={error}
      onTryAgainPress={() => {
        _getcompanyInfo(), setError(false);
      }}>
      {loader ? (<ActivityIndicator />) : (
        <Formik
          initialValues={{
            ceo_name: params?.ceo_name ? params?.ceo_name : '',
            ownerShipTypes:
              params?.ownership && params?.ownership_id
                ? {
                  name: params?.ownership,
                  id: params?.ownership_id,
                }
                : '',
            industries:
              params?.industry && params?.industry_id
                ? {
                  name: params?.industry,
                  id: params?.industry_id,
                }
                : '',
            companySize:
              params?.company_size && params?.company_size_id
                ? {
                  name: params?.company_size,
                  id: params?.company_size_id,
                }
                : '',
            location: params?.location ? params?.location : '',
            company_name: params?.company_name ? params?.company_name : '',
            no_of_offices: params?.offices == null ? '' : JSON.stringify(params?.offices),
            website: params?.website ? params?.website : '',
            // fax: params?.fax ? params?.fax : '',
            employeDetail: params?.details == null ? '' : params?.details,
          }}
          onSubmit={values => {
            // console.log(values);
            _companyInfo(values);
          }}
          validationSchema={yup.object().shape({

            ownerShipTypes: yup
              .object()
              .shape()
              .required('OwnerShipTypes is required'),
            industries: yup
              .object()
              .shape()
              .required('Industries is required'),
            companySize: yup
              .object()
              .shape()
              .required('CompanySize is required'),
            company_name: yup.string().required(),
            location: yup.string().max(288).required('Location is required'),
            ceo_name: yup.string()
            .transform(value => value.trim())
            .matches(/^[A-Za-z\u0600-\u06FF\s]+$/, 'Ceo Name must contain at least 1 alphabet character and can include English, Urdu, Arabic, and spaces')
            .matches(/^[^!@#$%^&*()_+={}|[\]\\:';"<>?,./0-9]+$/, 'Symbols are not allowed in the Ceo Name')
            .required(),
            website: yup.string().required('Website is required'),
            // fax: yup.string().max(14).required(),
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
                    {store.lang.employer}
                  </JText>
                }
                right={
                  <JText
                  disabled={loader1?true:false}
                    onPress={() => {
                      setLoader1(true)
                      isValid && handleSubmit();
                    }}
                    fontColor={
                      !isValid ? `${colors.white[0]}70` : colors.white[0]
                    }>
                    {loader1 ?
                      <ActivityIndicator
                        color={colors.white[0]}
                        size={RFPercentage(2)}
                      /> : store.lang.save}
                  </JText>

                }
                left={JChevronIcon}
              />
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: RFPercentage(8) }}
                style={{
                  marginHorizontal: RFPercentage(2),
                }}>
                <JInput
                  style={{
                    textAlign: store.lang.id == 0 ? 'left' : 'right',
                  }}
                  containerStyle={{ marginTop: RFPercentage(2) }}
                  heading={`${store.lang.CEO_name}:`}
                  maxLength={100}
                  value={values.ceo_name}
                  error={touched.ceo_name && errors.ceo_name && true}
                  onChangeText={handleChange('ceo_name')}
                  onBlur={() => setFieldTouched('ceo_name')}
                />
                {touched.ceo_name && errors.ceo_name && (
                  <JErrorText>{errors.ceo_name}</JErrorText>
                )}
                <JInput
                  style={{
                    textAlign: store.lang.id == 0 ? 'left' : 'right',
                  }}
                  containerStyle={{ marginTop: RFPercentage(2) }}
                  heading={`${store.lang.company_name}`}
                  value={values.company_name}
                  error={touched.company_name && errors.company_name && true}
                  onChangeText={handleChange('company_name')}
                  maxLength={100}
                  onBlur={() => setFieldTouched('company_name')}
                />
                {touched.company_name && errors.company_name && (
                  <JErrorText>{errors.company_name}</JErrorText>
                )}
                <JSelectInput
                  style={{
                    textAlign: store.lang.id == 0 ? 'left' : 'right',
                  }}
                  containerStyle={{ marginTop: RFPercentage(2) }}
                  value={values?.ownerShipTypes?.name}
                  data={store.lang.id == 0 ? info?.english?.ownerShipTypes : info?.arabic?.ownerShipTypes}
                  id={values.ownerShipTypes?.id}
                  header={store.lang.ownership_type}
                  heading={`${store.lang.ownership_type}:`}
                  setValue={e => {
                    setFieldValue('ownerShipTypes', e);
                  }}
                  error={touched.ownerShipTypes && errors.ownerShipTypes && true}
                  rightIcon={
                    <Feather
                      name="chevron-down"
                      size={RFPercentage(2.5)}
                      color={colors.black[0]}
                    />
                  }
                />
                {touched.ownerShipTypes && errors.ownerShipTypes && (
                  <JErrorText>{errors.ownerShipTypes}</JErrorText>
                )}
                <JSelectInput
                  containerStyle={{ marginTop: RFPercentage(2) }}
                  value={values.industries?.name}
                  data={store.lang.id == 0 ? info?.english?.industries : info?.arabic?.industries}
                  id={values.industries?.id}
                  header={store.lang.Industry}
                  heading={`${store.lang.Industry}:`}
                  setValue={e => {
                    setFieldValue('industries', e);
                  }}
                  error={touched.industries && errors.industries && true}
                  rightIcon={
                    <Feather
                      name="chevron-down"
                      size={RFPercentage(2.5)}
                      color={colors.black[0]}
                    />
                  }
                />
                {touched.industries && errors.industries && (
                  <JErrorText>{errors.industries}</JErrorText>
                )}
                <JSelectInput
                  containerStyle={{ marginTop: RFPercentage(2) }}
                  value={values.companySize.name}
                  data={store.lang.id == 0 ? info?.english?.companySize : info?.arabic?.companySize}
                  id={values.companySize?.id}
                  header={store.lang.size}
                  heading={`${store.lang.size}:`}
                  setValue={e => {
                    setFieldValue('companySize', e);
                  }}
                  error={touched.companySize && errors.companySize && true}
                  rightIcon={
                    <Feather
                      name="chevron-down"
                      size={RFPercentage(2.5)}
                      color={colors.black[0]}
                    />
                  }
                />
                {touched.companySize && errors.companySize && (
                  <JErrorText>{errors.companySize}</JErrorText>
                )}

                <JInput
                  style={{
                    textAlign: store.lang.id == 0 ? 'left' : 'right',
                  }}
                  containerStyle={{ marginTop: RFPercentage(2) }}
                  heading={`${store.lang.location}:`}
                  value={values.location}
                  error={touched.location && errors.location && true}
                  onChangeText={handleChange('location')}
                  onBlur={() => setFieldTouched('location')}
                />
                {touched.location && errors.location && (
                  <JErrorText>{errors.location}</JErrorText>
                )}
                <JInput
                  style={{
                    textAlign: store.lang.id == 0 ? 'left' : 'right',
                  }}
                  containerStyle={{ marginTop: RFPercentage(2) }}
                  heading={`${store.lang.no_of_office}:`}
                  value={values.no_of_offices}
                  error={touched.no_of_offices && errors.no_of_offices && true}
                  onChangeText={handleChange('no_of_offices')}
                  keyboardType="numeric"
                  onBlur={() => setFieldTouched('no_of_offices')}
                />
                {touched.no_of_offices && errors.no_of_offices && (
                  <JErrorText>{errors.no_of_offices}</JErrorText>
                )}
                <JInput
                  style={{
                    textAlign: store.lang.id == 0 ? 'left' : 'right',
                  }}
                  containerStyle={{ marginTop: RFPercentage(2) }}
                  heading={`${store.lang.website}:`}
                  value={values.website}
                  error={touched.website && errors.website && true}
                  onChangeText={handleChange('website')}
                  onBlur={() => setFieldTouched('website')}
                />
                {touched.website && errors.website && (
                  <JErrorText>{errors.website}</JErrorText>
                )}
                {/* <JInput
                style={{
                  textAlign: store.lang.id == 0 ? 'left' : 'right',
                }}
                containerStyle={{marginTop: RFPercentage(2)}}
                heading={`${store.lang.fax}:`}
                value={values.fax}
                error={touched.fax && errors.fax && true}
                onChangeText={handleChange('fax')}
                onBlur={() => setFieldTouched('fax')}
              />
              {touched.fax && errors.fax && (
                <JErrorText>{errors.fax}</JErrorText>
              )} */}
                <JInput
                  style={{
                    textAlign: store.lang.id == 0 ? 'left' : 'right',
                  }}
                  containerStyle={{ marginTop: RFPercentage(2) }}
                  heading={`${store.lang.employe_detail}:`}
                  value={values.employeDetail}
                  error={touched.employeDetail && errors.employeDetail && true}
                  onChangeText={handleChange('employeDetail')}
                  onBlur={() => setFieldTouched('employeDetail')}
                />
                {touched.employeDetail && errors.employeDetail && (
                  <JErrorText>{errors.employeDetail}</JErrorText>
                )}
              </ScrollView>
            </>
          )}
        </Formik>)}
    </JScreen>
  );
};

export default ECompanyInformation;

const styles = StyleSheet.create({});
