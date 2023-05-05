import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useRef} from 'react';
import JScreen from '../../customComponents/JScreen';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JText from '../../customComponents/JText';
import {ActivityIndicator} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import JInput from '../../customComponents/JInput';
import PhoneInput from 'react-native-phone-number-input';
import JSelectInput from '../../customComponents/JSelectInput';
import {Formik} from 'formik';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
import JChevronIcon from '../../customComponents/JChevronIcon';
import {useEffect} from 'react';
import { baseUrl } from '../../ApiUrls';


const ECompanyInformation = () => {
  const [loader, setLoader] = useState(false);
  const [info, setInfo] = useState();
  const navigation = useNavigation();
  const phoneInput = useRef(null);

  const _companyInfo = values => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDZjZDg5MzZkNmQ0ZWE3NTQ5N2RlZDZhMDgwNjliNzM1NmRmYmQ5YzZlODRmZmFiZTE2NjQ4N2VkN2ExMWFkMzk1YzgyZjZkNGRkNWZkMGUiLCJpYXQiOjE2ODAyNTA2NDYuNzg0NjAxLCJuYmYiOjE2ODAyNTA2NDYuNzg0NjA0LCJleHAiOjE3MTE4NzMwNDYuNzc3NzY2LCJzdWIiOiI4NCIsInNjb3BlcyI6W119.XQA1UjOHQZkuqkLbAY0V8quXIn6dBY_ZIl8Igkko0Kv1ODdOrVXmUsnbUu59jeIg_I8mVgcnH3XGRSoEDAXb5YSocyD1POwDo7_ED1dc4TYeniS7RrBwoJ4ZTyLFdc0rWo7inelD9n2HoLHquTsh6_tz4QAyc8xaB4_58H3LvKo86FEWoBTY4NsP3CAGzylD-8-SEIHze-HfeYjaaRoVlDeQpY6d3mfqzmBummF7nKHtkLSgTCEEaEsIx2yhZTrapWL-5GKdx-aj1qmKbTE5WYGUgMVu-39Mz7GCvYMryN5HF-9Y4guufDMT0atrXnc7BkyRe0lIVfNE3ga9GcSePLDkzMrCbBjmfTmvKuxoT-sXyXFb7_vu8FogA6Pc7v77LTciuuc9duwRSpK3_fxMy4dZucnFTGx7tTWSwlipQWthwa3wd0gVs5F9cXpgVxLk4Pndxuq-PF8_DvpbWNOCXsm0KWO59zbPgSVyil18KUv4F9NduT49z3MQgzfY9yjE1rkSgRW5Va4PGQhVEle5f2Dce-bysgPhWWK0wrQtLd1AVpbhLIIqI4obDo-2OFdK62GwLor1RfKU0Qc_WiP-8UOljUnVBskGVRVlqvDL8yblrM7ro73JbgpJPlV4Uz67FaC22iyhLbJsRnbQpJVKWgfcw6jyGqjKPaspsFYpPoM',
    );
    // console.log(values.industries.id);
    var formdata = new FormData();
    formdata.append('ceo', values.ceo_name);
    formdata.append('industry_id', values.industries.id);
    formdata.append('ownership_type_id', values.ownerShipTypes.id);
    formdata.append('companyName', values.company_name);
    formdata.append('company_size_id', values.companySize.id);
    formdata.append('details', values.employeDetail);
    formdata.append('no_of_offices',values.offices);
    formdata.append('location', values.location);
    formdata.append('website', values.website);
    formdata.append('fax', values.fax);
    // console.log(formdata);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch(`${baseUrl}/companyUpdate/8`, requestOptions)
      .then(response => response.json())
      .then(result => 
        console.log(result)
        )
      .catch(error => console.log('error', error));
  };

  const _getcompanyInfo = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDZjZDg5MzZkNmQ0ZWE3NTQ5N2RlZDZhMDgwNjliNzM1NmRmYmQ5YzZlODRmZmFiZTE2NjQ4N2VkN2ExMWFkMzk1YzgyZjZkNGRkNWZkMGUiLCJpYXQiOjE2ODAyNTA2NDYuNzg0NjAxLCJuYmYiOjE2ODAyNTA2NDYuNzg0NjA0LCJleHAiOjE3MTE4NzMwNDYuNzc3NzY2LCJzdWIiOiI4NCIsInNjb3BlcyI6W119.XQA1UjOHQZkuqkLbAY0V8quXIn6dBY_ZIl8Igkko0Kv1ODdOrVXmUsnbUu59jeIg_I8mVgcnH3XGRSoEDAXb5YSocyD1POwDo7_ED1dc4TYeniS7RrBwoJ4ZTyLFdc0rWo7inelD9n2HoLHquTsh6_tz4QAyc8xaB4_58H3LvKo86FEWoBTY4NsP3CAGzylD-8-SEIHze-HfeYjaaRoVlDeQpY6d3mfqzmBummF7nKHtkLSgTCEEaEsIx2yhZTrapWL-5GKdx-aj1qmKbTE5WYGUgMVu-39Mz7GCvYMryN5HF-9Y4guufDMT0atrXnc7BkyRe0lIVfNE3ga9GcSePLDkzMrCbBjmfTmvKuxoT-sXyXFb7_vu8FogA6Pc7v77LTciuuc9duwRSpK3_fxMy4dZucnFTGx7tTWSwlipQWthwa3wd0gVs5F9cXpgVxLk4Pndxuq-PF8_DvpbWNOCXsm0KWO59zbPgSVyil18KUv4F9NduT49z3MQgzfY9yjE1rkSgRW5Va4PGQhVEle5f2Dce-bysgPhWWK0wrQtLd1AVpbhLIIqI4obDo-2OFdK62GwLor1RfKU0Qc_WiP-8UOljUnVBskGVRVlqvDL8yblrM7ro73JbgpJPlV4Uz67FaC22iyhLbJsRnbQpJVKWgfcw6jyGqjKPaspsFYpPoM',
    );

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `${baseUrl}/company/company-information`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        setInfo(result);
      })
      .catch(error => console.log('error', error))
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    _getcompanyInfo();
  }, [loader]);

  return (
    <JScreen headerShown={false}>
      <Formik
        initialValues={{
          ceo_name: '',
          ownerShipTypes: '',
          industries: '',
          companySize: '',
          location: '',
          company_name: '',
          offices: '',
          website: '',
          fax: '',
          employeDetail: '',
        }}
        onSubmit={values => {
          // console.log(values);
          _companyInfo(values);
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
                  Employer
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
                    onPress={() => {
                      isValid && handleSubmit()}
                    
                    }
                    fontColor={
                      !isValid ? `${colors.white[0]}70` : colors.white[0]
                    }>
                    Save
                  </JText>
                )
              }
              left={JChevronIcon}
            />
            <ScrollView
            showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: RFPercentage(8)}}
              style={{
                marginHorizontal: RFPercentage(2),
              }}>
              <JInput
                containerStyle={{marginTop: RFPercentage(2)}}
                heading={'CEO Name:'}
                value={values.ceo_name}
                error={touched.ceo_name && errors.ceo_name && true}
                onChangeText={handleChange('ceo_name')}
                onBlur={() => setFieldTouched('ceo_name')}
              />
              {touched.ceo_name && errors.ceo_name && (
                <JErrorText>{errors.ceo_name}</JErrorText>
              )}

              <JSelectInput
                containerStyle={{marginTop: RFPercentage(2)}}
                value={values.ownerShipTypes.name}
                data={info?.ownerShipTypes}
                id={values.ownerShipTypes?.id}
                header={'Owner Ship'}
                heading={'Owner Ship :'}
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
                containerStyle={{marginTop: RFPercentage(2)}}
                value={values.industries.name}
                data={info?.industries}
                // id={values.industries?.id}
                header={'Industry'}
                heading={'Industry :'}
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
                containerStyle={{marginTop: RFPercentage(2)}}
                value={values.companySize.name}
                data={info?.companySize}
                id={values.companySize?.id}
                header={'Size'}
                heading={'Size :'}
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
                containerStyle={{marginTop: RFPercentage(2)}}
                heading={'Company Name:'}
                value={values.company_name}
                error={touched.company_name && errors.company_name && true}
                onChangeText={handleChange('company_name')}
                onBlur={() => setFieldTouched('company_name')}
              />
              {touched.company_name && errors.company_name && (
                <JErrorText>{errors.company_name}</JErrorText>
              )}
              <JInput
                containerStyle={{marginTop: RFPercentage(2)}}
                heading={'Location:'}
                value={values.location}
                error={touched.location && errors.location && true}
                onChangeText={handleChange('location')}
                onBlur={() => setFieldTouched('location')}
              />
              {touched.location && errors.location && (
                <JErrorText>{errors.location}</JErrorText>
              )}
              <JInput
                containerStyle={{marginTop: RFPercentage(2)}}
                heading={'No of Offices:'}
                value={values.offices}
                error={touched.offices && errors.offices && true}
                onChangeText={handleChange('offices')}
                onBlur={() => setFieldTouched('offices')}
              />
              {touched.offices && errors.offices && (
                <JErrorText>{errors.offices}</JErrorText>
              )}
              <JInput
                containerStyle={{marginTop: RFPercentage(2)}}
                heading={'Website:'}
                value={values.website}
                error={touched.website && errors.website && true}
                onChangeText={handleChange('website')}
                onBlur={() => setFieldTouched('website')}
              />
              {touched.website && errors.website && (
                <JErrorText>{errors.website}</JErrorText>
              )}
              <JInput
                containerStyle={{marginTop: RFPercentage(2)}}
                heading={'Fax:'}
                value={values.fax}
                error={touched.fax && errors.fax && true}
                onChangeText={handleChange('fax')}
                onBlur={() => setFieldTouched('fax')}
              />
              {touched.fax && errors.fax && (
                <JErrorText>{errors.fax}</JErrorText>
              )}
              <JInput
                containerStyle={{marginTop: RFPercentage(2)}}
                heading={'Employe Detail:'}
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
      </Formik>
    </JScreen>
  );
};

export default ECompanyInformation;

const styles = StyleSheet.create({});
