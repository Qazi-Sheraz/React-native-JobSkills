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
import { _addnewJob } from '../../functions/Candidate/BottomTab';

const AddNew_Job = () => {
  const {navigate, goBack} = useNavigation();
  // const [error, setError] = useState(false);
  // const [addJob, setAddJob] = useState();
  const store = useContext(StoreContext);
// console.log(store.createApiLoader)

  return (
    <JScreen
      isError={store.createApiError}
      onTryAgainPress={() => {
        _addnewJob(store), store.setCreateApiError(false);
      }}
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
          left={<JChevronIcon />}
        />
      }>
      {store?.createApiLoader ? (
        <ActivityIndicator />
      ) : (
        <Formik
          initialValues={{
            jobTilte: '',
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
            jobTilte: yup
              .string()
              .max(25, 'Title must be at most 25 characters long')
              .required('Job Title is required')
              .label('Job Title'),
            jobCategory: yup
              .object()
              .shape()
              .nullable()
              .required('Job Category is required'),
            assessment: yup
              .array()
              .nullable()
              .of(
                yup.object().shape({
                  id: yup.string().required('Assessment ID is required'),
                  name: yup.string().required('Assessment name is required'),
                }),
              )
              .required('Required Assessment is required')
              .min(1, 'At least one Assessment is required'),
            jobShift: yup
              .object()
              .shape()
              .nullable()
              .required('Job Shift is required'),
            jobSkill: yup
              .array()
              .nullable()
              .of(
                yup.object().shape({
                  id: yup.string().required('Skill ID is required'),
                  name: yup.string().required('Skill name is required'),
                }),
              )
              .required('Job Skills are required')
              .min(1, 'At least one Skill is required'),
            jobTag: yup
              .array()
              .nullable()
              .of(
                yup.object().shape({
                  id: yup.string().required('Tag ID is required'),
                  name: yup.string().required('Tag name is required'),
                }),
              )
              .required('Job Tags are required')
              .min(1, 'At least one Tag is required'),
            jobDescription: yup.string().required('Job Description is required').label('Description'),
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
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: RFPercentage(8)}}>
                <JSelectInput
                  containerStyle={styles.container}
                  value={values.jobCategory?.name}
                  data={
                    store.lang.id == 0
                      ? store.jobCreate?.english_data?.jobCategory
                      : store.jobCreate?.arabic_data?.jobCategory
                  }
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

                <JSelectInput
                  isMultiple={true}
                  containerStyle={styles.container}
                  header={store.lang.required_assessment}
                  heading={`${store.lang.required_assessment}:`}
                  id={values.assessment?.map(item => item.id).join(', ')}
                  data={
                    store.lang.id == 0
                      ? store.jobCreate?.english_data?.assessment
                      : store.jobCreate?.arabic_data?.assessment
                  }
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
                  data={
                    store.lang.id == 0
                      ? store.jobCreate?.english_data?.jobShift
                      : store.jobCreate?.arabic_data?.jobShift
                  }
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
                  data={
                    store.lang.id == 0
                      ? store.jobCreate?.english_data?.jobSkill
                      : store.jobCreate?.arabic_data?.jobSkill
                  }
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
                  data={
                    store.lang.id == 0
                      ? store.jobCreate?.english_data?.jobTag
                      : store.jobCreate?.arabic_data?.jobTag
                  }
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
                {store.lang.next}
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
