import {
  ActivityIndicator,
  KeyboardAvoidingView,
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
import JScrollView from '../../customComponents/JScrollView';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const AddNew_Job = () => {
  const {navigate, goBack} = useNavigation();
  const store = useContext(StoreContext);

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
              .max(25, store.lang.Title_must_be_at_most_25_characters_long)
              .required(store.lang.Job_Title_is_required)
              .label(store.lang.Job_Title),
            jobCategory: yup
              .object()
              .shape()
              .nullable()
              .required(store.lang.Job_Category_is_required),
            assessment: yup
              .array()
              .nullable()
              .of(
                yup.object().shape({
                  id: yup.string().required(store.lang.Assessment_ID_is_required),
                  name: yup.string().required(store.lang.Assessment_name_is_required),
                }),
              )
              .required(store.lang.Required_Assessment_is_required)
              .min(1, store.lang.At_least_one_Assessment_is_required),
            jobShift: yup
              .object()
              .shape()
              .nullable()
              .required(store.lang.Job_Shift_is_required),
            jobSkill: yup
              .array()
              .nullable()
              .of(
                yup.object().shape({
                  id: yup.string().required(store.lang.Skill_ID_is_required),
                  name: yup.string().required(store.lang.Skill_name_is_required),
                }),
              )
              .required(store.lang.Job_Skills_are_required)
              .min(1, store.lang.At_least_one_Skill_is_required),
            jobTag: yup
              .array()
              .nullable()
              .of(
                yup.object().shape({
                  id: yup.string().required(store.lang.Tag_ID_is_required),
                  name: yup.string().required(store.lang.Tag_name_is_required),
                }),
              )
              .required(store.lang.Job_Tags_are_required)
              .min(1, store.lang.At_least_one_Tag_is_required),
            jobDescription: yup.string().required(store.lang.Job_Description_is_required).label('Description'),
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
       >

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
                  <JErrorText style={{ }}>{errors.jobTilte}</JErrorText>
                )}

                <JSelectInput
                  isMultiple={true}
                  
                  containerStyle={styles.container}
                  header={store.lang.required_assessment}
                  heading={`${store.lang.required_assessment}:`}
                  id={values.assessment}
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
                  id={values.jobSkill}
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
                  id={values.jobTag}
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
          
              </KeyboardAwareScrollView>
              <View>
              <JButton
                isValid={isValid}
                onPress={() => handleSubmit()}
                style={{
                  // position: 'absolute',
                  // bottom: RFPercentage(3),
                  width: RFPercentage(20),
                }}>
                {store.lang.next}
              </JButton>
              </View>
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
