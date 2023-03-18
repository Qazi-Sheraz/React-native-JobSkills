import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import JScreen from '../../customComponents/JScreen'
import JGradientHeader from '../../customComponents/JGradientHeader'
import JText from '../../customComponents/JText'
import { RFPercentage } from 'react-native-responsive-fontsize'
import colors from '../../config/colors'
import JSelectInput from '../../customComponents/JSelectInput'
import { useState } from 'react'
import { Formik } from 'formik'
import JInput from '../../customComponents/JInput'
import JErrorText from '../../customComponents/JErrorText'
import Feather from 'react-native-vector-icons/Feather'
import JButton from '../../customComponents/JButton'
import JProfileInfo from '../../customComponents/JProfileInfo'
import { StoreContext } from '../../mobx/store'
const AddNew_Job = () => {
    const [selected, setSelected] = useState(0);
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
        />
      }>
      
      
          <Formik
            initialValues={{
              title: '',
              level: '',
              county: '',
              city: '',
              state: '',
              institude: '',
              result: '',
              year: '',
            }}
            onSubmit={values => {
              console.log(values);
              _addEducation(values);
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
                <ScrollView
                  contentContainerStyle={{paddingBottom: RFPercentage(8)}}
                  style={{
                    marginHorizontal: RFPercentage(2),
                  }}>
                  

                  <JSelectInput
                    containerStyle={styles.container}
                    value={values.county.name}
                    // data={store.myProfile.data.countries}
                    header={'Job Title '}
                    heading={'Job Title :*'}
                    setValue={e => setFieldValue('county', e)}
                    error={touched.county && errors.county && true}
                    rightIcon={
                      <Feather
                        name="chevron-right"
                        size={RFPercentage(2.5)}
                        color={colors.black[0]}
                      />
                    }
                  />
                  {touched.county && errors.county && (
                    <JErrorText>{errors.county}</JErrorText>
                  )}

                  <JSelectInput
                    containerStyle={styles.container}
                    value={values.state.name}
                    id={values.county.id}
                    setValue={e => setFieldValue('state', e)}
                    header={'Job Type '}
                    heading={'Job Type :*'}
                    error={touched.state && errors.state && true}
                    rightIcon={
                      <Feather
                        name="chevron-right"
                        size={RFPercentage(2.5)}
                        color={colors.black[0]}
                      />
                    }
                  />
                  {touched.state && errors.state && (
                    <JErrorText>{errors.state}</JErrorText>
                  )}

                  <JSelectInput
                    containerStyle={styles.container}
                    value={values.city.name}
                    setValue={e => setFieldValue('city', e)}
                    header={'Job Category'}
                    heading={'Job Category:*'}
                    id={values.state.id}
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
                    value={values.city.name}
                    setValue={e => setFieldValue('city', e)}
                    header={'Functional Area'}
                    heading={'Functional Area:*'}
                    id={values.state.id}
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
                    value={values.city.name}
                    setValue={e => setFieldValue('city', e)}
                    header={'Required Assessment'}
                    heading={'Required Assessment:*'}
                    id={values.state.id}
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
                    value={values.city.name}
                    setValue={e => setFieldValue('city', e)}
                    header={'Job Shift'}
                    heading={'Job Shift:*'}
                    id={values.state.id}
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
                    value={values.city.name}
                    setValue={e => setFieldValue('city', e)}
                    header={'Job Skill'}
                    heading={'Job Skill: *'}
                    id={values.state.id}
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
                    value={values.city.name}
                    setValue={e => setFieldValue('city', e)}
                    header={'Job Tag'}
                    heading={'Job Tag:'}
                    id={values.state.id}
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
  )
}

export default AddNew_Job

const styles = StyleSheet.create({
    container:{marginTop: RFPercentage(2),}
})