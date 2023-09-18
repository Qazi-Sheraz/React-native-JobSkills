import { StyleSheet, ScrollView, View, Switch, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import JScreen from '../../customComponents/JScreen';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JText from '../../customComponents/JText';
import { RFPercentage } from 'react-native-responsive-fontsize';
import colors from '../../config/colors';
import JIcon from '../../customComponents/JIcon';
import { Formik } from 'formik';
import * as yup from 'yup';
import JSelectInput from '../../customComponents/JSelectInput';
import JErrorText from '../../customComponents/JErrorText';
import JButton from '../../customComponents/JButton';
import JInput from '../../customComponents/JInput';
import JRow from '../../customComponents/JRow';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { Calendar } from 'react-native-calendars';
import Toast from 'react-native-toast-message';
import JNewJobIcon from '../../customComponents/JNewJobIcon';
import url from '../../config/url';
import { useContext } from 'react';
import { StoreContext } from '../../mobx/store';
import { observer } from 'mobx-react';
import JChevronIcon from '../../customComponents/JChevronIcon';
import { _addnewJob } from '../../functions/Candidate/BottomTab';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather';
import { JToast } from '../../functions/Toast';
const JobRequirement = () => {

  const { params, values } = useRoute()

  const store = useContext(StoreContext);
  const { navigate, goBack } = useNavigation();
  const [isEnabled, setIsEnabled] = useState('0');
  const [isEnabled1, setIsEnabled1] = useState('0');
  const toggleSwitch = () => setIsEnabled(previousState => previousState === '0' ? '1' : '0');
  const toggleSwitch1 = () => setIsEnabled1(previousState => previousState === '0' ? '1' : '0');
  const [selected, setSelected] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [requirements, setRequirements] = useState();



  const _handleSubmit = values => {
    setLoader(true)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${store.token?.token}`);

    var formdata = new FormData();

    formdata.append('job_category_id', params?.jobCategory?.id);
    formdata.append('job_title', params?.jobTilte);
    formdata.append('assessment', JSON.stringify(params?.assessment?.map((item) => item.id).map(Number)));
    formdata.append('job_shift_id', params?.jobShift?.id);
    formdata.append('jobsSkill', JSON.stringify(params?.jobSkill?.map((item) => item.id).map(Number)));
    formdata.append('jobTag', JSON.stringify(params?.jobTag?.map((item) => item.id).map(Number)));
    formdata.append('description', params?.jobDescription);
    formdata.append('no_preference', params?.preference?.id);
    formdata.append('salary_from', params?.salaryFrom);
    formdata.append('salary_to', params?.salaryTo);
    formdata.append('currency_id', params?.currencies.id);
    formdata.append('salary_period_id', params?.salaryPeriods.id);
    formdata.append('country_id', params?.countries.id);
    formdata.append('state_id', `${params?.state.id}`);
    formdata.append('city_id', `${params?.city.id}`);
    formdata.append('career_level_id', values?.careerLevel.id);
    formdata.append('degree_level_id', JSON.stringify(values?.requiredDegreeLevel.map((item) => item.id).map(Number)));
    formdata.append('jobsNationality', JSON.stringify(values?.jobNationality?.map((item) => item.id).map(Number)));
    formdata.append('jobsLanguage', JSON.stringify(values?.jobLanguage?.map((item) => item.id).map(Number)));
    formdata.append('position', values?.position);
    formdata.append('experience', values?.experience);
    formdata.append('job_publish_date', moment(values.publishDate).format('DD-MM-YYYY'));
    formdata.append('job_expiry_date', moment(values.expiry).format('DD-MM-YYYY'));
    formdata.append('hide_salary', isEnabled);
    formdata.append('is_freelance', isEnabled1);
    // console.log(formdata)

    fetch(`${url.baseUrl}/employer/jobs/store`, {
      method: 'POST',
      headers: myHeaders,
      body: formdata,


    })
      .then(response => response.json())
      .then(result => {
        if (result.success === true) {
          // console.log('new jobsssssss', result.data)
          store.AddJobEmployerData(result.data[0])
          store.AddRecentJobs(result.data[0])
          JToast({
            type: 'success',
            text1: store.lang.success,
            text2: result.message,
          });
          navigate('Job')

        }

        else {
          JToast({
            type: 'danger',
            text1: store.lang.eror,
            text2: result.message,
          });
        }
      }).catch(error => {
        console.log('error', error)
        JToast({
          type: 'danger',
          text1: store.lang.eror,
          text2: store.lang.an_error_occurred_please_try_again_later,
        });
      })
      .finally(() => {
        setLoader(false)
      })

  };


  const currentDate = new Date();

  // Calculate the maximum start date (1 day before the current date)
  const maximumStartDate = new Date(currentDate);
  maximumStartDate.setDate(currentDate.getDate() - 1);

  return (
    <JScreen
      isError={store.createApiError}
      onTryAgainPress={() => {
        _addnewJob(store);
      }}
      style={{ paddingHorizontal: RFPercentage(2) }}
      header={
        <JGradientHeader
          // right={
          //   <JText fontColor={colors.white[0]} fontSize={RFPercentage(2)}>
          //     {store.lang.previous}
          //   </JText>
          // }
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {store.lang.job_requirement}
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
            careerLevel: '',
            requiredDegreeLevel: [],
            jobNationality: [],
            jobLanguage: [],
            position: '',
            experience: '',
            publishDate: '',
            expiry:'',
            // publishDate: new Date().toDateString(),
            // expiry:moment(values.publishDate).add(1, 'days').toDate(),
          }}
          onSubmit={values => {
            _handleSubmit(values);
          }}
          validationSchema={yup.object().shape({
        
            publishDate: yup
              .date()
              .required('Publish date is required')
              .typeError('Publish date must be a valid date'),

            expiry: yup
              .date()
              // .when('publishDate', (publishDate, schema) => {
              //   if (publishDate) {
              //     // Calculate one day ahead of publishDate
              //     const nextDay = new Date(publishDate);
              //     nextDay.setDate(nextDay.getDate() + 1);

              //     return schema.min(nextDay, 'Expiry date must be at least one day after publish date');
              //   }
              //   return schema; // No validation if publishDate is not selected yet
              // })
              .required('Expiry date is required')
              .typeError('Expiry date must be a valid date'),

            position: yup
              .string()
              .max(4, 'Maximum 4 digits allowed')
              .nullable()
              .required('Position is required'),
            experience: yup
              .string()
              .max(4, 'Maximum 4 digits allowed')
              .nullable()
              .required('Experience is required'),
            careerLevel: yup
              .object()
              .shape()
              .nullable()
              .required('Career Level is required'),
            requiredDegreeLevel: yup
              .array()
              .of(
                yup.object().shape({
                  id: yup.string().required('DegreeLevel ID is required'),
                  name: yup.string().required('DegreeLevel name is required'),
                }),
              )
              .required('DegreeLevel is required')
              .min(1, 'At least one DegreeLevel is required'),
            jobNationality: yup
              .array()
              .of(
                yup.object().shape({
                  id: yup.string().required('Job Nationality ID is required'),
                  name: yup.string().required('Job Nationality name is required'),
                }),
              )
              .required('job Nationality is required')
              .min(1, 'At least one job Nationality is required'),
            jobLanguage: yup
              .array()
              .of(
                yup.object().shape({
                  id: yup.string().required('Job Language ID is required'),
                  name: yup.string().required('Job Language name is required'),
                }),
              )
              .required('job Language is required')
              .min(1, 'At least one job Language is required'),
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
              <View style={{ height: '90%' }}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: RFPercentage(8) }}>
                  <JSelectInput
                    containerStyle={styles.container}
                    value={values.careerLevel?.name}
                    data={
                      store.lang.id === 0
                        ? store.jobCreate?.english_data?.careerLevels
                        : store.jobCreate?.arabic_data?.careerLevels
                    }
                    id={values.careerLevel?.id}
                    header={store.lang.career_level}
                    heading={`${store.lang.career_level}:`}
                    setValue={e => setFieldValue('careerLevel', e)}
                    error={touched.careerLevel && errors.careerLevel && true}
                    rightIcon={<JNewJobIcon />}
                  />
                  {touched.careerLevel && errors.careerLevel && (
                    <JErrorText>{errors.careerLevel}</JErrorText>
                  )}

                  <JSelectInput
                    isMultiple={true}
                    containerStyle={styles.container}
                    value={values.requiredDegreeLevel
                      ?.map(item => item.name)
                      .join(', ')}
                    data={
                      store.lang.id === 0
                        ? store.jobCreate?.english_data?.requiredDegreeLevel
                        : store.jobCreate?.arabic_data?.requiredDegreeLevel
                    }
                    id={values.requiredDegreeLevel}
                    header={store.lang.degree_level}
                    heading={`${store.lang.degree_level}:`}
                    setValue={e => setFieldValue('requiredDegreeLevel', e)}
                    error={
                      touched.requiredDegreeLevel &&
                      errors.requiredDegreeLevel &&
                      true
                    }
                    rightIcon={<JNewJobIcon />}
                  />
                  {touched.requiredDegreeLevel && errors.requiredDegreeLevel && (
                    <JErrorText>{errors.requiredDegreeLevel}</JErrorText>
                  )}
                  <JSelectInput
                    isMultiple={true}
                    containerStyle={styles.container}
                    value={values.jobNationality
                      ?.map(item => item?.name)
                      .join(', ')}
                    data={
                      store.lang.id == 0
                        ? store.jobCreate?.english_data?.jobNationality
                        : store.jobCreate?.arabic_data?.jobNationality
                    }
                    id={values.jobNationality}
                    header={store.lang.job_nationality}
                    heading={`${store.lang.job_nationality}:`}
                    setValue={e => setFieldValue('jobNationality', e)}
                    error={
                      touched.jobNationality && errors.jobNationality && true
                    }
                    rightIcon={<JNewJobIcon />}
                  />
                  {touched.jobNationality && errors.jobNationality && (
                    <JErrorText>{errors.jobNationality}</JErrorText>
                  )}
                  <JSelectInput
                    isMultiple={true}
                    containerStyle={styles.container}
                    value={values.jobLanguage?.map(item => item?.name).join(', ')}
                    data={
                      store.lang.id === 0
                        ? store.jobCreate?.english_data?.jobLanguage
                        : store.jobCreate?.arabic_data?.jobLanguage
                    }
                    id={values.jobLanguage}
                    header={store.lang.language}
                    heading={`${store.lang.language}:`}
                    setValue={e => setFieldValue('jobLanguage', e)}
                    error={touched.jobLanguage && errors.jobLanguage && true}
                    rightIcon={<JNewJobIcon />}
                  />
                  {touched.jobLanguage && errors.jobLanguage && (
                    <JErrorText>{errors.jobLanguage}</JErrorText>
                  )}
                  <JInput
                    style={{
                      textAlign: store.lang.id == 0 ? 'left' : 'right',
                    }}
                    isRequired
                    containerStyle={styles.container}
                    heading={`${store.lang.position}:`}
                    value={values.position}
                    error={touched.position && errors.position && true}
                    onChangeText={handleChange('position')}
                    onBlur={() => setFieldTouched('position')}
                    keyboardType="numeric"
                  />
                  {touched.position && errors.position && (
                    <JErrorText>{errors.position}</JErrorText>
                  )}
                  <JInput
                    style={{
                      textAlign: store.lang.id == 0 ? 'left' : 'right',
                    }}
                    isRequired
                    containerStyle={styles.container}
                    heading={`${store.lang.job_Experience}:`}
                    value={values.experience}
                    error={touched.experience && errors.experience && true}
                    onChangeText={handleChange('experience')}
                    onBlur={() => setFieldTouched('experience')}
                    keyboardType="numeric"
                  />
                  {touched.experience && errors.experience && (
                    <JErrorText>{errors.experience}</JErrorText>
                  )}
                  {/* <View
                  style={{
                    justifyContent: 'space-between',
                    paddingTop: RFPercentage(1),
                    marginBottom: RFPercentage(1),
                  }}>
                  <JText
                    style={{fontSize: RFPercentage(2.5), fontWeight: '500'}}>
                    {store.lang.publish_date}:
                  </JText>
                  <Pressable
                    onPress={() => setModalVisible(true)}
                    style={{
                      height: RFPercentage(6),
                      flexDirection:
                        store.lang.id === 0 ? 'row' : 'row-reverse',
                      alignItems: 'center',
                      borderBottomWidth: RFPercentage(0.2),
                      borderBottomColor: error
                        ? colors.danger[0]
                        : colors.inputBorder[0],
                    }}>
                    <JText fontSize={RFPercentage(2)}>
                      {values.publishDate}
                    </JText>
                  </Pressable>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    paddingTop: RFPercentage(2),
                    marginBottom: RFPercentage(1),
                  }}>
                  <JText
                    style={{fontSize: RFPercentage(2.5), fontWeight: '500'}}>
                    {store.lang.expiry_date}:
                  </JText>
                  <Pressable
                    onPress={() => setModalVisible1(true)}
                    style={{
                      height: RFPercentage(6),
                      flexDirection:
                        store.lang.id === 0 ? 'row' : 'row-reverse',
                      alignItems: 'center',
                      borderBottomWidth: RFPercentage(0.2),
                      // backgroundColor: 'red',
                      borderBottomColor: error
                        ? colors.danger[0]
                        : colors.inputBorder[0],
                    }}>
                    <JText fontSize={RFPercentage(2)}>{values.expiry}</JText>
                  </Pressable>
                </View> */}
                  <JSelectInput
                    isDate={true}
                    minimumDate={new Date()}
                    containerStyle={{ marginTop: RFPercentage(2) }}
                    value={
                      values.publishDate &&
                      moment(values.publishDate).format('DD-MM-YYYY')
                    }
                    setValue={e => setFieldValue('publishDate', e)}
                    header={store.lang.publish_date}
                    heading={`${store.lang.publish_date}:`}
                    error={touched.publishDate && errors.publishDate && true}
                    rightIcon={
                      <Feather
                        name="chevron-down"
                        size={RFPercentage(2.5)}
                        color={colors.black[0]}
                      />
                    }
                  />
                  {touched.publishDate && errors.publishDate && (
                    <JErrorText>{errors.publishDate}</JErrorText>
                  )}
                  <JSelectInput
                    date1={moment().add(1, 'days').toDate()}
                    minimumDate={moment().add(1, 'days').toDate()}
                    containerStyle={{ marginTop: RFPercentage(2) }}
                    isDate={true}
                    value={
                      values.expiry &&
                      moment(values.expiry).format('DD-MM-YYYY')
                    }
                    setValue={e => setFieldValue('expiry', e)}
                    header={store.lang.expiry_date}
                    heading={`${store.lang.expiry_date}:`}
                    error={touched.expiry && errors.expiry && true}
                    rightIcon={
                      <Feather
                        name="chevron-down"
                        size={RFPercentage(2.5)}
                        color={
                          values.start == ''
                            ? colors.inputBorder[0]
                            : colors.black[0]
                        }
                      />
                    }
                  />
                  {touched.expiry && errors.expiry && (
                    <JErrorText>{errors.expiry}</JErrorText>
                  )}


                  <View
                    style={{
                      marginVertical: RFPercentage(2),
                      alignItems: store.lang.id === 0 ? 'flex-start' : 'flex-end',
                      width: '100%',
                    }}>
                    <JRow style={styles.switch}>
                      <JText style={styles.txtSwitch}>
                        {store.lang.hide_salary}
                      </JText>
                      <Switch
                        trackColor={{ false: '#767577', true: colors.purple[0] }}
                        thumbColor="#f4f3f4"
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled === '1'}
                      />
                    </JRow>
                    <JRow style={styles.switch}>
                      <JText style={styles.txtSwitch}>
                        {store.lang.Is_Freelance}
                      </JText>
                      <Switch
                        trackColor={{ false: '#767577', true: colors.purple[0] }}
                        thumbColor="#f4f3f4"
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch1}
                        value={isEnabled1 === '1'}
                      />
                    </JRow>
                  </View>
                </ScrollView>
              </View>
              <JButton
                disabled={loader ? true : false}
                isValid={isValid}
                onPress={() => {

                  handleSubmit();
                }}
                style={{
                  position: 'absolute',
                  bottom: RFPercentage(3),
                  width: RFPercentage(20),


                }}>
                {loader ? store.lang.loading : store.lang.post_job}
              </JButton>
              {/* <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}>
                <Pressable
                  onPress={() => setModalVisible(!modalVisible)}
                  style={styles.modal}>
                  <Calendar
                    style={styles.date}
                    onDayPress={day => {
                      setFieldValue('publishDate', day.dateString);
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
                      setFieldValue('expiry', day.dateString);
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
              </Modal> */}
            </>
          )}
        </Formik>
      )}
    </JScreen>
  );
};

export default observer(JobRequirement);

const styles = StyleSheet.create({
  container: { marginTop: RFPercentage(2) },
  txtSwitch: {
    fontSize: RFPercentage(2.4),
    // fontWeight: 'bold',
    marginRight: RFPercentage(2),
    marginVertical: RFPercentage(1),
  },
  switch: { justifyContent: 'space-between', width: RFPercentage(22) },
  modal: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    height: RFPercentage(50),
    width: RFPercentage(40),
    backgroundColor: '#fff',
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
