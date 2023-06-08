import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import {observer} from 'mobx-react';
import JScreen from '../../../customComponents/JScreen';
import JGradientProfileHeader from '../../../customComponents/JGradientProfileHeader';
import JInput from '../../../customComponents/JInput';
import {Formik} from 'formik';
import * as yup from 'yup';
import {RFPercentage} from 'react-native-responsive-fontsize';

import JErrorText from '../../../customComponents/JErrorText';
import PhoneInput from 'react-native-phone-number-input';

import JText from '../../../customComponents/JText';
import JSelectInput from '../../../customComponents/JSelectInput';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../../config/colors';
import JRow from '../../../customComponents/JRow';
import JButton from '../../../customComponents/JButton';
import JGradientHeader from '../../../customComponents/JGradientHeader';
import {useContext} from 'react';
import {StoreContext} from '../../../mobx/store';
import {_getProfile} from '../../../functions/Candidate/MyProfile';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

function CExperienceInformation({refRBSheet, data}) {
  const store = useContext(StoreContext);
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();
  const profile = store.myProfile.user[0].experience_information;

  return (
    <JScreen headerShown={false}>
      <Formik
        initialValues={{
          experience: {name: `${profile.experience}`},
          career: profile.career_level,
          industry: profile.industry,
          area: profile.functional_area,
          current: `${profile.current_salary}`,
          expected: `${profile.expected_salary}`,
          currency: profile.salary_currency,
        }}
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
          setLoader(true);
          fetch(
            'https://dev.jobskills.digital/api/update-profile',
            requestOptions,
          )
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

          // _postData(values);
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
                  Experience
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
              <JSelectInput
                containerStyle={{marginTop: RFPercentage(2)}}
                value={values.experience?.name}
                id={values.experience}
                setValue={e => setFieldValue('experience', e)}
                header={'Experience'}
                heading={'Experience (In Years) :'}
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
                data={data.careerLevel}
                value={values.career?.name}
                id={values.career}
                setValue={e => setFieldValue('career', e)}
                header={'Carrer Level'}
                heading={'Carrer Level :'}
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
                header={'Industry'}
                data={data.industry}
                heading={'Industry :'}
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
                data={data.functionalArea}
                setValue={e => setFieldValue('area', e)}
                header={'Functional Area'}
                heading={'Functional Area :'}
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
                containerStyle={{marginTop: RFPercentage(2)}}
                heading={'Current Salary :'}
                value={values.current}
                error={touched.current && errors.current && true}
                onChangeText={handleChange('current')}
                onBlur={() => setFieldTouched('current')}
              />
              {touched.current && errors.current && (
                <JErrorText>{errors.current}</JErrorText>
              )}
              <JInput
                containerStyle={{marginTop: RFPercentage(2)}}
                value={values.expected}
                heading={'Expected Salary :'}
                error={touched.expected && errors.expected && true}
                onChangeText={handleChange('expected')}
                onBlur={() => setFieldTouched('expected')}
              />
              {touched.expected && errors.expected && (
                <JErrorText>{errors.expected}</JErrorText>
              )}

              <JSelectInput
                data={data.currency}
                containerStyle={{marginTop: RFPercentage(2)}}
                value={values.currency?.name}
                setValue={e => setFieldValue('currency', e)}
                header={'Salary Currency'}
                heading={'Salary Currency :'}
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
            </ScrollView>
          </>
        )}
      </Formik>
    </JScreen>
  );
}
export default observer(CExperienceInformation);
const styles = StyleSheet.create({});
