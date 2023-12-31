import {
  StyleSheet,
  ScrollView,
  View,
  Switch,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import JNewJobIcon from '../../customComponents/JNewJobIcon';
import url from '../../config/url';
import {useContext} from 'react';
import {StoreContext} from '../../mobx/store';
import {observer} from 'mobx-react';
import JChevronIcon from '../../customComponents/JChevronIcon';
import {_addnewJob} from '../../functions/Candidate/BottomTab';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather';
import {JToast} from '../../functions/Toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const JobRequirement = () => {
  const {params, values} = useRoute();

  const store = useContext(StoreContext);
  const {navigate, goBack} = useNavigation();
  const [isEnabled, setIsEnabled] = useState('0');
  const [isEnabled1, setIsEnabled1] = useState('0');
  const toggleSwitch = () =>
    setIsEnabled(previousState => (previousState === '0' ? '1' : '0'));
  const toggleSwitch1 = () =>
    setIsEnabled1(previousState => (previousState === '0' ? '1' : '0'));
  const [loader, setLoader] = useState(false);
  const [isDate1, setIsDate1] = useState(true);
  const [miniDate, setMiniDate] = useState('');
  const nextDate = miniDate && new Date(miniDate);
  miniDate && nextDate.setDate(nextDate.getDate() + 1);

  const _handleSubmit = values => {
    setLoader(true);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

    var formdata = new FormData();

    formdata.append('job_category_id', params?.jobCategory?.id);
    formdata.append('job_title', params?.jobTilte);
    formdata.append(
      'assessment',
      JSON.stringify(params?.assessment?.map(item => item.id).map(Number)),
    );
    formdata.append('job_shift_id', params?.jobShift?.id);
    formdata.append(
      'jobsSkill',
      JSON.stringify(params?.jobSkill?.map(item => item.id).map(Number)),
    );
    formdata.append(
      'jobTag',
      JSON.stringify(params?.jobTag?.map(item => item.id).map(Number)),
    );
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
    formdata.append(
      'degree_level_id',
      JSON.stringify(
        values?.requiredDegreeLevel.map(item => item.id).map(Number),
      ),
    );
    formdata.append(
      'jobsNationality',
      JSON.stringify(values?.jobNationality?.map(item => item.id).map(Number)),
    );
    formdata.append(
      'jobsLanguage',
      JSON.stringify(values?.jobLanguage?.map(item => item.id).map(Number)),
    );
    formdata.append('position', values?.position);
    formdata.append('experience', values?.experience);
    formdata.append(
      'job_publish_date',
      moment(values.publishDate).format('DD-MM-YYYY'),
    );
    formdata.append(
      'job_expiry_date',
      moment(values.expiry).format('DD-MM-YYYY'),
    );
    formdata.append('hide_salary', isEnabled);
    formdata.append('is_freelance', isEnabled1);
    // console.log(formdata);

    fetch(`${url.baseUrl}/employer/jobs/store`, {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
    })
      .then(response => response.json())
      .then(result => {
        if (result.success === true) {
          // console.log('new jobsssssss', result.data)
          store.AddJobEmployerData(result.data[0]);
          store.AddRecentJobs(result.data[0]);
          JToast({
            type: 'success',
            text1: store.lang.success,
            text2: result.message,
          });
          navigate('Job');
        } else {
          JToast({
            type: 'danger',
            text1: store.lang.eror,
            text2: result.message,
          });
        }
      })
      .catch(error => {
        // console.log('error/employer/jobs/store', error);
        JToast({
          type: 'danger',
          text1: store.lang.eror,
          text2: store.lang.an_error_occurred_please_try_again_later,
        });
      })
      .finally(() => {
        setTimeout(() => {
          setLoader(false);
        }, 1000);
      });
  };

  return (
    <JScreen
      isError={store.createApiError}
      onTryAgainPress={() => {
        _addnewJob(store);
      }}
      style={{paddingHorizontal: RFPercentage(2)}}
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
      {/* {store?.createApiLoader ? (
        <ActivityIndicator />
      ) : ( */}
      <Formik
        initialValues={{
          careerLevel: '',
          requiredDegreeLevel: [],
          jobNationality: [],
          jobLanguage: [],
          position: '',
          experience: '',
          publishDate: '',
          expiry: '',
          // publishDate: new Date().toDateString(),
          // expiry:moment(values.publishDate).add(1, 'days').toDate(),
        }}
        onSubmit={values => {
          _handleSubmit(values);
        }}
        validationSchema={yup.object().shape({
          publishDate: yup
            .date()
            .required(store.lang.Publish_date_is_required)
            .typeError(store.lang.Publish_date_must_be_a_valid_date),

          expiry: yup
            .date()
            .required(store.lang.Expiry_date_is_required)
            .typeError(store.lang.Expiry_date_must_be_a_valid_date),

          position: yup
            .string()
            .matches(
              /^[1-9]\d*$/,
              `${store.lang.position} ${store.lang.must_be_a_integer_digits_greater_than_0},`
            )
            .nullable()
            .required(store.lang.Position_is_required),

          experience: yup
            .number()
            .typeError(
              `${store.lang.job_Experience} ${store.lang.must_be_a_number}`,
            )
            .required(store.lang.Experience_is_required)
            .label(store.lang.job_Experience),
          careerLevel: yup
            .object()
            .shape()
            .nullable()
            .required(store.lang.Career_Level_is_required),
          requiredDegreeLevel: yup
            .array()
            .of(
              yup.object().shape({
                id: yup
                  .string()
                  .required(store.lang.DegreeLevel_ID_is_required),
                name: yup
                  .string()
                  .required(store.lang.DegreeLevel_name_is_required),
              }),
            )
            .required(store.lang.DegreeLevel_is_required)
            .min(1, store.lang.At_least_one_DegreeLevel_is_required),
          jobNationality: yup
            .array()
            .of(
              yup.object().shape({
                id: yup
                  .string()
                  .required(store.lang.Job_Nationality_ID_is_required),
                name: yup
                  .string()
                  .required(store.lang.Job_Nationality_name_is_required),
              }),
            )
            .required(store.lang.job_Nationality_is_required)
            .min(1, store.lang.At_least_one_job_Nationality_is_required),
          jobLanguage: yup
            .array()
            .of(
              yup.object().shape({
                id: yup
                  .string()
                  .required(store.lang.Job_Language_ID_is_required),
                name: yup
                  .string()
                  .required(store.lang.Job_Language_name_is_required),
              }),
            )
            .required(store.lang.job_Language_is_required)
            .min(1, store.lang.At_least_one_job_Language_is_required),
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
            showsVerticalScrollIndicator={false}>
              <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <JSelectInput
                  isRequired
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
                  isRequired
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
                  isRequired
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
                  isRequired
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
                  maxLength={4}
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
                  maxLength={4}
                />
                {touched.experience && errors.experience && (
                  <JErrorText>{errors.experience}</JErrorText>
                )}

                <JSelectInput
                  isRequired
                  isDate={true}
                  minimumDate={new Date()}
                  containerStyle={{marginTop: RFPercentage(2)}}
                  value={
                    values.publishDate &&
                    moment(values.publishDate).format('DD-MM-YYYY')
                  }
                  setValue={e => {
                    setFieldValue('publishDate', e);
                    const nextDayDate = new Date(e);
                    nextDayDate.setDate(nextDayDate.getDate() + 1);
                    setFieldValue('expiry', nextDayDate);
                    setMiniDate(e);
                  }}
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
                  isRequired
                  disabled={values.expiry ? false : true}
                  date1={nextDate && new Date(nextDate)}
                  minimumDate={nextDate && nextDate}
                  containerStyle={{marginTop: RFPercentage(2)}}
                  isDate={true}
                  value={
                    values.expiry && moment(values.expiry).format('DD-MM-YYYY')
                  }
                  setValue={e => {
                    setFieldValue('expiry', e);
                    // setMiniDate('')
                  }}
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
                      trackColor={{false: '#767577', true: colors.purple[0]}}
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
                      trackColor={{false: '#767577', true: colors.purple[0]}}
                      thumbColor="#f4f3f4"
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch1}
                      value={isEnabled1 === '1'}
                    />
                  </JRow>
                </View>
              </KeyboardAwareScrollView>
            </ScrollView>
            <View
                style={{
                  justifyContent:'flex-start',
                  // paddingVertical: RFPercentage(2),
                  // backgroundColor: 'transparent',
                }}>
            <JButton
              disabled={loader ? true : false}
              isValid={isValid}
              onPress={() => {
                handleSubmit();
              }}
              style={{
                // position: 'absolute',
                // bottom: RFPercentage(3),
                marginVertical: RFPercentage(1),
                width: RFPercentage(20),
              }}>
              {loader ? store.lang.loading : store.lang.post_job}
            </JButton>
            </View>
          </>
        )}
      </Formik>
      {/* )
      } */}
    </JScreen>
  );
};

export default observer(JobRequirement);

const styles = StyleSheet.create({
  container: {marginTop: RFPercentage(2)},
  txtSwitch: {
    fontSize: RFPercentage(2.4),
    // fontWeight: 'bold',
    marginRight: RFPercentage(2),
    marginVertical: RFPercentage(1),
  },
  switch: {justifyContent: 'space-between', width: RFPercentage(22)},
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
  },
});
{
  /* <View
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
                </View> */
}
{
  /* <Modal
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
              </Modal> */
}
