import {StyleSheet, ScrollView, View, Switch} from 'react-native';
import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import JScreen from '../../customComponents/JScreen';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JText from '../../customComponents/JText';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../../config/colors';
import JIcon from '../../customComponents/JIcon';
import {Formik} from 'formik';
import * as yup from 'yup';
import Feather from 'react-native-vector-icons/Feather';
import JSelectInput from '../../customComponents/JSelectInput';
import JErrorText from '../../customComponents/JErrorText';
import JButton from '../../customComponents/JButton';
import JInput from '../../customComponents/JInput';
import JRow from '../../customComponents/JRow';
const JobRequirement = () => {
  const {navigate, goBack} = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled1, setIsEnabled1] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);
  return (
    <JScreen
      style={{paddingHorizontal: RFPercentage(2)}}
      header={
        <JGradientHeader
          right={
            <JText fontColor={colors.white[0]} fontSize={RFPercentage(2)}>
              Previous
            </JText>
          }
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {'Job Requirement'}
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
          career: '',
          degree: '',
          position: '',
          experience: '',
          publishDate: '',
        }}
        onSubmit={values => {
          console.log(values);
          _addEducation(values);
        }}
        validationSchema={yup.object().shape({
          career: yup.string().required().label('Career Level'),
          degree: yup.string().required().label('Degree Level'),
          position: yup.string().required().label('Position'),
          experience: yup.string().required().label('Experience'),
          publishDate: yup.string().required().label('Publish Date'),
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
                value={values.career.name}
                // data={store.myProfile.data.countries}
                header={'Career Level'}
                heading={'Career Level:'}
                //   setValue={e => setFieldValue('career', e)}
                error={touched.career && errors.career && true}
                rightIcon={
                  <Feather
                    name="chevron-right"
                    size={RFPercentage(2.5)}
                    color={colors.black[0]}
                  />
                }
              />
              {touched.career && errors.career && (
                <JErrorText>{errors.career}</JErrorText>
              )}
              <JSelectInput
                containerStyle={styles.container}
                value={values.degree.name}
                // data={store.myProfile.data.countries}
                header={'Degree Level'}
                heading={'Degree Level:'}
                //   setValue={e => setFieldValue('degree', e)}
                error={touched.degree && errors.degree && true}
                rightIcon={
                  <Feather
                    name="chevron-right"
                    size={RFPercentage(2.5)}
                    color={colors.black[0]}
                  />
                }
              />
              {touched.degree && errors.degree && (
                <JErrorText>{errors.degree}</JErrorText>
              )}

              <JInput
                isRequired
                containerStyle={styles.container}
                heading={'Position:'}
                value={values.position}
                error={touched.position && errors.position && true}
                onChangeText={handleChange('position')}
                onBlur={() => setFieldTouched('position')}
              />
              {touched.position && errors.position && (
                <JErrorText>{errors.position}</JErrorText>
              )}

              <JInput
                isRequired
                containerStyle={styles.container}
                heading={'Job Experience:'}
                value={values.experience}
                error={touched.experience && errors.experience && true}
                onChangeText={handleChange('experience')}
                onBlur={() => setFieldTouched('experience')}
              />
              {touched.experience && errors.experience && (
                <JErrorText>{errors.experience}</JErrorText>
              )}

              <JInput
                isRequired
                containerStyle={styles.container}
                heading={'Job Publish Date:'}
                value={values.publishDate}
                error={touched.publishDate && errors.publishDate && true}
                onChangeText={handleChange('publishDate')}
                onBlur={() => setFieldTouched('publishDate')}
              />
              {touched.publishDate && errors.publishDate && (
                <JErrorText>{errors.publishDate}</JErrorText>
              )}

              
              <View style={{marginVertical: RFPercentage(2)}}>
                <JRow style={styles.switch}>
                <JText style={styles.txtSwitch}>Hide Salary</JText>
                <Switch
                  trackColor={{false: '#767577', true: colors.purple[0]}}
                  thumbColor="#f4f3f4"
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                /></JRow>
                <JRow style={styles.switch}>
                <JText style={styles.txtSwitch}>Is Freelance</JText>
                <Switch
                  trackColor={{false: '#767577', true: colors.purple[0]}}
                  thumbColor="#f4f3f4"
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch1}
                  value={isEnabled1}
                /></JRow>
              </View>
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
    </JScreen>
  );
};

export default JobRequirement;

const styles = StyleSheet.create({
  container: {marginTop: RFPercentage(2)},
  txtSwitch: {
    fontSize: RFPercentage(2.4),
    // fontWeight: 'bold',
    marginRight: RFPercentage(2),
    marginVertical: RFPercentage(1), 
},
switch:{justifyContent:'space-between',width:RFPercentage(22)}
});
