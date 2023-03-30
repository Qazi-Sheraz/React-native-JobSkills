import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
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
import Feather from 'react-native-vector-icons/Feather';
import JButton from '../../customComponents/JButton';
import JProfileInfo from '../../customComponents/JProfileInfo';
import {StoreContext} from '../../mobx/store';
import JIcon from '../../customComponents/JIcon';
import {useNavigation} from '@react-navigation/native';
const AddNew_Job = () => {
  const {navigate, goBack} = useNavigation();
  return (
    <JScreen
      style={{paddingHorizontal: RFPercentage(2)}}
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {'Job Detail'}
            </JText>
          }
          left={
            <JIcon
              icon="fe"
              onPress={() => goBack()}
              name="chevron-left"
              size={RFPercentage(3.5)}
              color={colors.white[0]}
            />
          }
        />
      }>
      <Formik
        initialValues={{
          title: '',
          type: '',
          category: '',
          city: '',
          required: '',
          shift: '',
          skill: '',
          tag: '',
          Description: '',
        }}
        onSubmit={values => {
          console.log(values);
          _addEducation(values);
        }}
        validationSchema={yup.object().shape({
          title: yup.string().required().label('Job Title'),
          type: yup.string().required().label('Job Type'),
          category: yup.string().required().label('Job Category'),
          city: yup.string().required().label('Functional Area'),
          required: yup.string().required().label('Assessment'),
          shift: yup.string().required().label('Job Shift'),
          skill: yup.string().required().label('Job Skills'),
          tag: yup.string().required().label('Job Tag'),
          Description: yup.string().required().label('Description'),
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
              contentContainerStyle={{paddingBottom: RFPercentage(8)}}
              style={{
                marginHorizontal: RFPercentage(2),
              }}>
              <JSelectInput
                containerStyle={styles.container}
                value={values.title.name}
                // data={store.myProfile.data.countries}
                header={'Job Title'}
                heading={'Job Title:'}
                setValue={e => setFieldValue('title', e)}
                error={touched.title && errors.title && true}
                rightIcon={
                  <Feather
                    name="chevron-right"
                    size={RFPercentage(2.5)}
                    color={colors.black[0]}
                  />
                }
              />
              {touched.title && errors.title && (
                <JErrorText>{errors.title}</JErrorText>
              )}

              <JSelectInput
                containerStyle={styles.container}
                value={values.type.name}
                id={values.type.id}
                setValue={e => setFieldValue('type', e)}
                header={'Job Type'}
                heading={'Job Type:'}
                error={touched.type && errors.type && true}
                rightIcon={
                  <Feather
                    name="chevron-right"
                    size={RFPercentage(2.5)}
                    color={colors.black[0]}
                  />
                }
              />
              {touched.type && errors.type && (
                <JErrorText>{errors.type}</JErrorText>
              )}

              <JSelectInput
                containerStyle={styles.container}
                value={values.category.name}
                setValue={e => setFieldValue('category', e)}
                header={'Job Category'}
                heading={'Job Category:'}
                id={values.category.id}
                error={touched.category && errors.category && true}
                rightIcon={
                  <Feather
                    name="chevron-right"
                    size={RFPercentage(2.5)}
                    color={colors.black[0]}
                  />
                }
              />
              {touched.category && errors.category && (
                <JErrorText>{errors.city}</JErrorText>
              )}
              <JSelectInput
                containerStyle={styles.container}
                value={values.city.name}
                setValue={e => setFieldValue('city', e)}
                header={'Functional Area'}
                heading={'Functional Area:'}
                id={values.city.id}
                error={touched.city && errors.city && true}
                rightIcon={
                  <Feather
                    name="chevron-right"
                    size={RFPercentage(2.5)}
                    color={colors.black[0]}
                  />
                }
              />
              {touched.city && errors.city && (
                <JErrorText>{errors.city}</JErrorText>
              )}
              <JSelectInput
                containerStyle={styles.container}
                value={values.required.name}
                setValue={e => setFieldValue('required', e)}
                header={'Required Assessment'}
                heading={'Required Assessment:'}
                id={values.required.id}
                error={touched.required && errors.required && true}
                rightIcon={
                  <Feather
                    name="chevron-right"
                    size={RFPercentage(2.5)}
                    color={colors.black[0]}
                  />
                }
              />
              {touched.required && errors.required && (
                <JErrorText>{errors.required}</JErrorText>
              )}
              <JSelectInput
                containerStyle={styles.container}
                value={values.shift.name}
                setValue={e => setFieldValue('shift', e)}
                header={'Job Shift'}
                heading={'Job Shift:'}
                id={values.shift.id}
                error={touched.shift && errors.shift && true}
                rightIcon={
                  <Feather
                    name="chevron-right"
                    size={RFPercentage(2.5)}
                    color={colors.black[0]}
                  />
                }
              />
              {touched.shift && errors.shift && (
                <JErrorText>{errors.shift}</JErrorText>
              )}
              <JSelectInput
                containerStyle={styles.container}
                value={values.skill.name}
                setValue={e => setFieldValue('skill', e)}
                header={'Job Skill'}
                heading={'Job Skill:'}
                id={values.skill.id}
                error={touched.skill && errors.skill && true}
                rightIcon={
                  <Feather
                    name="chevron-right"
                    size={RFPercentage(2.5)}
                    color={colors.black[0]}
                  />
                }
              />
              {touched.skill && errors.skill && (
                <JErrorText>{errors.skill}</JErrorText>
              )}
              <JSelectInput
                containerStyle={styles.container}
                value={values.tag.name}
                setValue={e => setFieldValue('tag', e)}
                header={'Job Tag'}
                heading={'Job Tag:'}
                id={values.tag.id}
                error={touched.tag && errors.tag && true}
                rightIcon={
                  <Feather
                    name="chevron-right"
                    size={RFPercentage(2.5)}
                    color={colors.black[0]}
                  />
                }
              />
              {touched.tag && errors.tag && (
                <JErrorText>{errors.tag}</JErrorText>
              )}

              <JInput
                isRequired
                containerStyle={styles.container}
                heading={'Description:'}
                value={values.result}
                error={touched.result && errors.result && true}
                onChangeText={handleChange('result')}
                onBlur={() => setFieldTouched('result')}
              />
              {touched.result && errors.result && (
                <JErrorText>{errors.result}</JErrorText>
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
              {'Next'}
            </JButton>
          </>
        )}
      </Formik>
      {/* )} */}
    </JScreen>
  );
};

export default AddNew_Job;

const styles = StyleSheet.create({
  container: {marginTop: RFPercentage(2)},
});
