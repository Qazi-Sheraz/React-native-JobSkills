import {StyleSheet, ScrollView, View, Switch, Modal} from 'react-native';
import React, { useEffect, useState } from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import JScreen from '../../customComponents/JScreen';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JText from '../../customComponents/JText';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../../config/colors';
import JIcon from '../../customComponents/JIcon';
import {Formik} from 'formik';
import * as yup from 'yup';
import JSelectInput from '../../customComponents/JSelectInput';
import JErrorText from '../../customComponents/JErrorText';
import JButton from '../../customComponents/JButton';
import JInput from '../../customComponents/JInput';
import JRow from '../../customComponents/JRow';
import { baseUrl } from '../../ApiUrls';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {Calendar} from 'react-native-calendars';
import Toast from 'react-native-toast-message';
import JNewJobIcon from '../../customComponents/JNewJobIcon';
import url from '../../config/url';
import { useContext } from 'react';
import { StoreContext } from '../../mobx/store';

const JobRequirement = ({calendar='0',}) => {

  const {params,values}=useRoute()
  // console.log(
  //   'params=====================>',
  //   params,
  //   'values==============>',
  //   values,
  // );
  const store = useContext(StoreContext);
  const {navigate, goBack} = useNavigation();
  const [isEnabled, setIsEnabled] = useState('0');
  const [isEnabled1, setIsEnabled1] = useState('0');
  const toggleSwitch = () => setIsEnabled(previousState => previousState === '0' ? '1' : '0');
  const toggleSwitch1 = () => setIsEnabled1(previousState => previousState === '0' ? '1' : '0');
  const [selected, setSelected] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
  const [requirements, setRequirements] = useState();

// const arry=params.assessment.map((item)=>item.id).map(Number)
// // const arr1= arry.map(Number);
// console.log((params?.jobTag?.map((item)=>item.id).map(Number)))
// params.assessment.map((item)=>console.log("id",item.id))
  
  const _handleSubmit = values => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization",`Bearer ${store.token?.token}`);

    var formdata = new FormData();
    
    formdata.append('job_category_id', params?.jobCategory?.id);
    formdata.append('job_title', params?.jobTilte);
    formdata.append('assessment', JSON.stringify(params?.assessment?.map((item)=>item.id).map(Number)));
    formdata.append('job_shift_id', params?.jobShift?.id);
    formdata.append('jobsSkill', JSON.stringify(params?.jobSkill?.map((item)=>item.id).map(Number)));
    formdata.append('jobTag', JSON.stringify(params?.jobTag?.map((item)=>item.id).map(Number)));
    
    formdata.append('description', params?.jobDescription);
    formdata.append('no_preference',params?.preference?.id);
    formdata.append('salary_from', params?.salaryFrom);
    formdata.append('salary_to',params?.salaryTo);
    formdata.append('currency_id',params?.currencies.id);
    formdata.append('salary_period_id', params?.salaryPeriods.id);
    formdata.append('country_id',params?.countries.id);
    formdata.append('state_id', `${params?.state.id}`);
    formdata.append('city_id',`${params?.city.id}`);
    formdata.append('career_level_id',values?.careerLevels.id);
    formdata.append('degree_level_id', JSON.stringify(values?.requiredDegreeLevel.map((item)=>item.id).map(Number)));
    formdata.append('jobsNationality', JSON.stringify(values?.jobNationality?.map((item)=>item.id).map(Number)));
    formdata.append('jobsLanguage', JSON.stringify(values?.jobLanguage?.map((item)=>item.id).map(Number)));
    formdata.append('position', values?.position);
    formdata.append('experience',values?.experience);
    formdata.append('job_publish_date', values?.publishDate);
    formdata.append('job_expiry_date', values?.expiry);
    formdata.append('hide_salary',isEnabled);
    formdata.append('is_freelance',isEnabled1);
   console.log('formdata',formdata)


    fetch(`${url.baseUrl}/employer/jobs/store`, {
      method: 'POST',
      headers: myHeaders,
      body: formdata,

      
    })
      .then(response => response.json())
      .then(result => { 
        
      if (result.success == true ){
             Toast.show({
               type: 'success',
               text1: 'Successfully Job created',
             });
             
        
        navigate('Job', {...params, ...values})   
      }
      
      else{ 
        Toast.show({
        type: 'error',
        text1: result.message,
      });
    }
  }).catch(error => 
      console.log('error', error));
   
  };
  

  const _addRequirement= () => {
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
        setRequirements(result.data);

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
    _addRequirement();
  }, [loader]);
  return (
    <JScreen
      isError={error}
      onTryAgainPress={() => _addRequirement()}
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
          careerLevels: '',
          requiredDegreeLevel: [],
          jobNationality: [],
          jobLanguage: [],
          position: '',
          experience: '',
          publishDate: new Date().toDateString(),
          expiry: new Date().toDateString(),
         
        }}
        onSubmit={values => {
          console.log({...params, ...values});
          // console.log(values);
          _handleSubmit(values);
          
        }}
        // validationSchema={yup.object().shape({
        //   career: yup.string().required().label('Career Level'),
        //   degree: yup.string().required().label('Degree Level'),
        //   position: yup.string().required().label('Position'),
        //   experience: yup.string().required().label('Experience'),
        //   publishDate: yup.string().required().label('Publish Date'),
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
              contentContainerStyle={{paddingBottom: RFPercentage(8)}}>
              <JSelectInput
             
                containerStyle={styles.container}
                value={values.careerLevels?.name}
                data={requirements?.careerLevels}
                id={values.careerLevels?.id}
                header={'Carrer Level'}
                heading={'Career Level:'}
                setValue={e => setFieldValue('careerLevels', e)}
                error={touched.careerLevels && errors.careerLevels && true}
                rightIcon={
                  <JNewJobIcon/>
                }
              />
              {touched.careerLevels && errors.careerLevels && (
                <JErrorText>{errors.careerLevels}</JErrorText>
              )}
              <JSelectInput
               isMultiple={true}
                containerStyle={styles.container}
                value={values.requiredDegreeLevel?.map((item )=> item.name).join(', ')}
                data={requirements?.requiredDegreeLevel}
                id={values.requiredDegreeLevel?.map((item )=> item.id).join(', ')}
                header={'Degree Level'}
                heading={'Degree Level:'}
                setValue={e => setFieldValue('requiredDegreeLevel', e)}
                error={touched.requiredDegreeLevel && errors.requiredDegreeLevel && true}
                rightIcon={
                  <JNewJobIcon/>
                }
              />
              {touched.requiredDegreeLevel && errors.requiredDegreeLevel && (
                <JErrorText>{errors.requiredDegreeLevel}</JErrorText>
              )}
              <JSelectInput
               isMultiple={true}
                containerStyle={styles.container}
                value={values.jobNationality?.map((item )=> item.name).join(', ')}
                data={requirements?.jobNationality}
                id={values.jobNationality?.map((item )=> item.id).join(', ')}
                header={'job Nationality'}
                heading={'job Nationality:'}
                setValue={e => setFieldValue('jobNationality', e)}
                error={touched.jobNationality && errors.jobNationality && true}
                rightIcon={
                  <JNewJobIcon/>
                }
              />
              {touched.jobNationality && errors.jobNationality && (
                <JErrorText>{errors.jobNationality}</JErrorText>
              )}
              <JSelectInput
               isMultiple={true}
                containerStyle={styles.container}
                value={values.jobLanguage?.map((item )=> item.name).join(', ')}
                data={requirements?.jobLanguage}
                id={values.jobLanguage?.map((item )=> item.id).join(', ')}
                header={'Language'}
                heading={'Job Language:'}
                setValue={e => setFieldValue('jobLanguage', e)}
                error={touched.jobLanguage && errors.jobLanguage && true}
                rightIcon={
                  <JNewJobIcon/>
                }
              />
              {touched.jobLanguage && errors.jobLanguage && (
                <JErrorText>{errors.jobLanguage}</JErrorText>
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
             <View
                  style={{
                    justifyContent: 'space-between',
                    paddingTop: RFPercentage(2),
                    marginBottom: RFPercentage(1),
                  }}>
                  <JText
                    style={{fontSize: RFPercentage(2.5), fontWeight: '500'}}>
                    Job Expiry Date:`
                  </JText>
                  <Pressable
                    onPress={() => setModalVisible1(true)}
                    style={{
                      height: RFPercentage(6),
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderBottomWidth: RFPercentage(0.2),
                      // backgroundColor: 'red',
                      borderBottomColor: error
                        ? colors.danger[0]
                        : colors.inputBorder[0],
                    }}>
                    <JText fontSize={RFPercentage(2)}>{values.expiry}</JText>
                  </Pressable>
                </View>
                <View
                style={{
                  justifyContent: 'space-between',
                  paddingTop: RFPercentage(1),
                  marginBottom: RFPercentage(1),
                }}>
                <JText style={{fontSize: RFPercentage(2.5), fontWeight: '500'}}>
                  Publish Date:
                </JText>
                <Pressable
                  onPress={() => setModalVisible(true)}
                  style={{
                    height: RFPercentage(6),
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomWidth: RFPercentage(0.2),
                    borderBottomColor: error
                      ? colors.danger[0]
                      : colors.inputBorder[0],
                  }}>
                  <JText fontSize={RFPercentage(2)}>{values.publishDate}</JText>
                </Pressable>
              </View>
              <View style={{marginVertical: RFPercentage(2)}}>
                <JRow style={styles.switch}>
                  <JText style={styles.txtSwitch}>Hide Salary</JText>
                  <Switch
                    trackColor={{false: '#767577', true: colors.purple[0]}}
                    thumbColor="#f4f3f4"
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled === '1'}
                  />
                </JRow>
                <JRow style={styles.switch}>
                  <JText style={styles.txtSwitch}>Is Freelance</JText>
                  <Switch
                    trackColor={{false: '#767577', true: colors.purple[0]}}
                    thumbColor="#f4f3f4"
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch1}
                    value={isEnabled1 === '1'}
                  />
                </JRow>
              </View>
            </ScrollView>
            <JButton
              isValid={isValid}
              onPress={() => {
                // alert('Alert');
                handleSubmit();
              }}
              style={{
                position: 'absolute',
                bottom: RFPercentage(3),
                width: RFPercentage(20),
              }}>
              {'Post Job'}
            </JButton>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}>
              <Pressable
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.modal}>
                <Calendar
                  style={styles.date}
                  onDayPress={day => {
                    setFieldValue('publishDate', day.dateString)
                  }}
                  markedDates={{
                    [selected]: {
                      selected: true,
                      disableTouchEvent: true,
                      selectedDotColor: 'orange',
                    },
                  }}
                />
              </Pressable>
            </Modal>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible1}>
              <Pressable
                onPress={() => setModalVisible1(!modalVisible1)}
                style={styles.modal}>
                <Calendar
                  style={styles.date}
                  onDayPress={day => {
                    setFieldValue('expiry', day.dateString)
                  }}
                  markedDates={{
                    [selected]: {
                      selected: true,
                      disableTouchEvent: true,
                      selectedDotColor: 'orange',
                    },
                  }}
                />
              </Pressable>
            </Modal>
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
switch:{justifyContent:'space-between',width:RFPercentage(22)},
modal: {
  height:'100%',
  width:'100%',
  alignSelf:'center',
  alignItems: 'center',
  justifyContent:'center',
},
date:{
height:RFPercentage(50),
width:RFPercentage(40),
  backgroundColor:'#fff',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
}
});
