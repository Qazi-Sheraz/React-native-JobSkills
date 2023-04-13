import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
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
import {baseUrl} from '../../ApiUrls';

const AddNew_Job = () => {
  const {navigate, goBack} = useNavigation();
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
  const [addJob, setAddJob] = useState();

  const _addnewJob = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDQyOTYxYTYzYTU0NmZjNjNhZGY4MWFiNmI0N2I4MDNhNzMwMmMxZWRhNDMyMDk5ZGM1ZmNlMjNiZDUyYzY4ODBlN2I4ZDdlZDQ5MWI2YzMiLCJpYXQiOjE2ODAyMTI2NzQuOTE2NzE5LCJuYmYiOjE2ODAyMTI2NzQuOTE2NzIzLCJleHAiOjE3MTE4MzUwNzQuOTA5NzQxLCJzdWIiOiI4NCIsInNjb3BlcyI6W119.aay7JchvkClUeAV79bQQ4fgTa8gRkgoM01y82G7eC1-JrtLnZTbnhQX4q0FJ_OhhDDxcoK00IMTpwmE1mKHNyVxwrw8yrAM8fRoXk0nRJOtVfNBVZ8R88uv8MBqHcREPjPRV3b-UmlaiC8Yv-2tOk4Kd4E79JfAkdyHaaFVmL8YHayifKmKBkECTY8SyaehOlFSn2cvw951aq2T0m_U1xcZsm2IL0gAOdVO_rdB4Ch0AOcEOpCyoCv8QZH7ZKrB26gSVv6IBtbLc_e_dYtV1OJCok-W8JFGiGafhQhc5RRFqTdot6R5WwfiwkqOf2tVNoLNNE06G7lPRzfpNhx7k6qV9OTYl2otef_yBhKr95gO9nr_L5WbjuazUHwYEBEqb53LwVu4-F0ncsr7epuL9oeL_XHa2t71hBqJRXuxS2djKwlKe9dkq6yPBNJQH7SNjAFlF4oDNqH-fqzmu41iKnmRBCxMGycwRUAqXbXoo6v3YJWqtTe6v6tHgTH4UdhQ6h3NrIwzozvNMLK6tMlHEunlZcMuPEUhvQRaGRu2ZQN54KowDDLEV9XmMbbXH2TkTA1LSEKQp-gA1D9w1s7-JHNHs2-rBi7-Vj_TLx5Yzoa-5ry55QIejufts2R48a4ino_lOgeG9a7W4dpPns69cUCL79g6ffe1cJyUYk2sr3mc',
    );
    fetch(
      `${baseUrl}/employer/jobs/create`,

      {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      },
    )
      .then(response => response.json())
      .then(result => {
        setAddJob(result.data);

      })
      .catch(error => {
        console.log('error', error);
        setError(true);

      })
      .finally(() => {
        setLoader(false);
        
      });
  };
  useEffect(() => {
    _addnewJob();
  }, [loader]);

  return (
    <JScreen
    isError={error}
    onTryAgainPress={()=> _addnewJob()}
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
      {loader ? (
        <ActivityIndicator />
      ) : (
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
            description: '',
          }}
          onSubmit={values => {
            console.log(values);
            navigate('JobPreference',{...values})
          }}
         
          // validationSchema={yup.object()({
          //   title: yup.string().required().label('Job Title'),
          //   type: yup.string().required().label('Job Type'),
          //   category: yup.string().required().label('Job Category'),
          //   city: yup.string().required().label('Functional Area'),
          //   required: yup.string().required().label('Assessment'),
          //   shift: yup.string().required().label('Job Shift'),
          //   skill: yup.string().required().label('Job Skills'),
          //   tag: yup.string().required().label('Job Tag'),
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
                  header={'Job Title'}
                  heading={'Job Title:'}
                  value={values.title.name}
                  data={addJob?.jobTilte}
                  id={values.title.id}
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
                  header={'Job Type'}
                  heading={'Job Type:'}
                  value={values.type.name}
                  id={values.type.id}
                  data={addJob?.jobType}
                  setValue={e => setFieldValue('type', e)}
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
                  data={addJob?.jobCategory}
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
                  data={addJob?.functionalArea}
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
                  header={'Required Assessment'}
                  heading={'Required Assessment:'} 
                  id={values.required.id}
                  data={addJob?.assessment}
                  value={values.required.name}
                  setValue={e => setFieldValue('required', e)}
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
                  data={addJob?.jobShift}
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
                  data={addJob?.jobSkill}
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
                  data={addJob?.jobTag}
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
                  value={values.description}
                  error={touched.description && errors.description && true}
                  onChangeText={handleChange('description')}
                  onBlur={() => setFieldTouched('description')}
                />
                {touched.description && errors.description && (
                  <JErrorText>{errors.description}</JErrorText>
                )}
              </ScrollView>
              <JButton
                isValid={isValid}
                onPress={() =>  
                  handleSubmit()
                }
                style={{
                  position: 'absolute',
                  bottom: RFPercentage(3),
                  width: RFPercentage(20),
                }}>
                 {loader ? 'Loading' : 'Next'}
              </JButton>
            </>
          )}
        </Formik>
      )}
    </JScreen>
  );
};

export default AddNew_Job;

const styles = StyleSheet.create({
  container: {marginTop: RFPercentage(2)},
});
