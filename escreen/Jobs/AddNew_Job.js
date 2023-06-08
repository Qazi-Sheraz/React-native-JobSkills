import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import JScreen from '../../customComponents/JScreen';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JText from '../../customComponents/JText';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../../config/colors';
import JSelectInput from '../../customComponents/JSelectInput';
import {useState} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import JInput from '../../customComponents/JInput';
import JErrorText from '../../customComponents/JErrorText';
import JButton from '../../customComponents/JButton';
import {StoreContext} from '../../mobx/store';
import JIcon from '../../customComponents/JIcon';
import {useNavigation} from '@react-navigation/native';
import JNewJobIcon from '../../customComponents/JNewJobIcon';
import url from '../../config/url';
import { observer } from 'mobx-react';
import JChevronIcon from '../../customComponents/JChevronIcon';

const AddNew_Job = () => {
  const {navigate, goBack} = useNavigation();
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
  const [addJob, setAddJob] = useState();
  const store = useContext(StoreContext);
  const _addnewJob = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${store.token?.token}`,
    );
    fetch(
      `${url.baseUrl}/employer/jobs/create`,

      {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      },
    )
      .then(response => response.json())
      .then(result => {
        store.setJobCreate(result);
        // console.log(result.arabic_data)

      })
      .catch(error => {
        // console.log('error', error);
        store.setCreateApiError(true);

      })
      .finally(() => {
        store.setCreateApiLoader(false);
        
      });
  };
  useEffect(() => {
    _addnewJob();
  }, []);

  return (
    <JScreen
      isError={store.createApiError}
      onTryAgainPress={() => {_addnewJob(),store.setCreateApiError(false)}}
      style={{paddingHorizontal: RFPercentage(2)}}
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {store.lang.job_Details}
            </JText>
          }
          left={
            <JChevronIcon />
          }
        />
      }>
      {store.CreateApiLoader ? (
        <ActivityIndicator />
      ) : (
        <Formik
          initialValues={{
            jobTilte: '',
            // jobType: [],
            jobCategory: [],
            // functionalArea: '',
            assessment: [],
            jobShift: '',
            jobSkill: [],
            jobTag: [],
            jobDescription: '',
          }}
          onSubmit={values => {
            // console.log(values);
            navigate('JobPreference', {...values});
          }}
          validationSchema={yup.object().shape({
            jobTilte: yup.string().max(25,'Title must be at most 25 characters long').required().label('Job Title'),
          //   type: yup.string().required().label('Job Type'),
          //   category: yup.string().required().label('Job Category'),
          //   city: yup.string().required().label('Functional Area'),
          //   required: yup.string().required().label('Assessment'),
          //   shift: yup.string().required().label('Job Shift'),
          //   skill: yup.string().required().label('Job Skills'),
          //   tag: yup.string().required().label('Job Tag'),
          //   description: yup.string().required().label('Description'),
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
              <ScrollView
                contentContainerStyle={{paddingBottom: RFPercentage(8)}}>
                <JSelectInput
                  containerStyle={styles.container}
                  value={values.jobCategory?.name}
                  data={store.lang.id==0?store.jobCreate?.english_data?.jobCategory:store.jobCreate?.arabic_data?.jobCategory}
                  setValue={e => setFieldValue('jobCategory', e)}
                  header={store.lang.job_category}
                  heading={`${store.lang.job_category}:`}
                  id={values.jobCategory.id}
                  error={touched.jobCategory && errors.jobCategory && true}
                  rightIcon={<JNewJobIcon />}
                />
                {touched.jobCategory && errors.jobCategory && (
                  <JErrorText>{errors.jobCategory}</JErrorText>
                )}
                <JInput
                style={{
                    textAlign: store.lang.id == 0 ? 'left' : 'right',
                  }}
                  isRequired
                  containerStyle={styles.container}
                  heading={`${store.lang.job_title}:`}
                  
                  value={values.jobTilte}
                  error={touched.jobTilte && errors.jobTilte && true}
                  onChangeText={handleChange('jobTilte')}
                  onBlur={() => setFieldTouched('jobTilte')}
                />
                {touched.jobTilte && errors.jobTilte && (
                  <JErrorText>{errors.jobTilte}</JErrorText>
                )}
                {/* <JSelectInput
                  containerStyle={styles.container}
                  header={'Job Title'}
                  heading={'Job Title:'}
                  value={values.jobTilte.name}
                  data={addJob?.jobTilte}
                  id={values.jobTilte.id}
                  setValue={e => setFieldValue('jobTilte', e)}
                  error={touched.jobTilte && errors.jobTilte && true}
                  rightIcon={
                    <JNewJobIcon/>
                  }
                />
                {touched.jobTilte && errors.jobTilte && (
                  <JErrorText>{errors.jobTilte}</JErrorText>
                )} */}

                {/* <JSelectInput
                  containerStyle={styles.container}
                  header={'Job Type'}
                  heading={'Job Type:'}
                  value={values.jobType.toString()}
                  id={values.jobType.id}
                  data={addJob?.jobType}
                  setValue={e => setFieldValue('jobType', e)}
                  error={touched.jobType && errors.jobType && true}
                  rightIcon={
                    <Feather
                      name="chevron-right"
                      size={RFPercentage(2.5)}
                      color={colors.black[0]}
                    />
                  }
                />
                {console.log(values.jobType)}
                {touched.jobType && errors.jobType && (
                  <JErrorText>{errors.jobType}</JErrorText>
                )} */}

                {/* <JSelectInput
                  containerStyle={styles.container}
                  value={values.functionalArea.name}
                  data={addJob?.functionalArea}
                  setValue={e => setFieldValue('functionalArea', e)}
                  header={'Functional Area'}
                  heading={'Functional Area:'}
                  id={values.functionalArea.id}
                  error={touched.functionalArea && errors.functionalArea && true}
                  rightIcon={
                    <Feather
                      name="chevron-right"
                      size={RFPercentage(2.5)}
                      color={colors.black[0]}
                    />
                  }
                />
                {touched.functionalArea && errors.functionalArea && (
                  <JErrorText>{errors.functionalArea}</JErrorText>
                )} */}

                <JSelectInput
                  isMultiple={true}
                  containerStyle={styles.container}
                  header={store.lang.required_assessment}
                  heading={`${store.lang.required_assessment}:`}
                  id={values.assessment?.map(item => item.id).join(', ')}
                  data={store.lang.id==0?store.jobCreate?.english_data?.assessment:store.jobCreate?.arabic_data?.assessment}
                  value={values.assessment?.map(item => item.name).join(', ')}
                  setValue={e => setFieldValue('assessment', e)}
                  error={touched.assessment && errors.assessment && true}
                  rightIcon={<JNewJobIcon />}
                />
                {touched.assessment && errors.assessment && (
                  <JErrorText>{errors.assessment}</JErrorText>
                )}
                <JSelectInput
                  containerStyle={styles.container}
                  value={values.jobShift.name}
                  data={store.lang.id==0?store.jobCreate?.english_data?.jobShift:store.jobCreate?.arabic_data?.jobShift}
                  setValue={e => setFieldValue('jobShift', e)}
                  header={store.lang.job_Shift}
                  heading={`${store.lang.job_Shift}:`}
                  id={values.jobShift.id}
                  error={touched.jobShift && errors.jobShift && true}
                  rightIcon={<JNewJobIcon />}
                />
                {touched.jobShift && errors.jobShift && (
                  <JErrorText>{errors.jobShift}</JErrorText>
                )}
                <JSelectInput
                  isMultiple={true}
                  containerStyle={styles.container}
                  value={values.jobSkill?.map(item => item.name).join(', ')}
                  data={store.lang.id==0?store.jobCreate?.english_data?.jobSkill:store.jobCreate?.arabic_data?.jobSkill}
                  setValue={e => setFieldValue('jobSkill', e)}
                  header={store.lang.job_skills}
                  heading={`${store.lang.job_skills}:`}
                  id={values.jobSkill?.map(item => item.id).join(', ')}
                  error={touched.jobSkill && errors.jobSkill && true}
                  rightIcon={<JNewJobIcon />}
                />
                {touched.jobSkill && errors.jobSkill && (
                  <JErrorText>{errors.jobSkill}</JErrorText>
                )}
                <JSelectInput
                  isMultiple={true}
                  containerStyle={styles.container}
                  value={values.jobTag?.map(item => item.name).join(', ')}
                  data={store.lang.id==0?store.jobCreate?.english_data?.jobTag:store.jobCreate?.arabic_data?.jobTag}
                  setValue={e => setFieldValue('jobTag', e)}
                  header={store.lang.job_tag}
                  heading={`${store.lang.job_tag}:`}
                  id={values.jobTag?.map(item => item.id).join(', ')}
                  error={touched.jobTag && errors.jobTag && true}
                  rightIcon={<JNewJobIcon />}
                />
                {touched.jobTag && errors.jobTag && (
                  <JErrorText>{errors.jobTag}</JErrorText>
                )}

                <JInput
                style={{
                  textAlign: store.lang.id == 0 ? 'left' : 'right',
                }}
                  isRequired
                  containerStyle={styles.container}
                  heading={`${store.lang.description}:`}
                  
                  value={values.jobDescription.id}
                  // id={values.jobDescription.id}

                  error={
                    touched.jobDescription && errors.jobDescription && true
                  }
                  onChangeText={handleChange('jobDescription')}
                  onBlur={() => setFieldTouched('jobDescription')}
                />
                {touched.jobDescription && errors.jobDescription && (
                  <JErrorText>{errors.jobDescription}</JErrorText>
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
      )}
    </JScreen>
  );
};

export default observer(AddNew_Job);

const styles = StyleSheet.create({
  container: {marginTop: RFPercentage(2)},
});
