import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import JScreen from '../../customComponents/JScreen';
import JText from '../../customComponents/JText';
import JGradientHeader from '../../customComponents/JGradientHeader';
import colors from '../../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JChevronIcon from '../../customComponents/JChevronIcon';
import {Formik} from 'formik';
import JEmpty from '../../customComponents/JEmpty';
import DatePicker from 'react-native-date-picker';
import * as yup from 'yup';
import JButton from '../../customComponents/JButton';
import JIcon from '../../customComponents/JIcon';
import moment from 'moment';
import {JToast} from '../../functions/Toast';
import {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useContext} from 'react';
import {StoreContext} from '../../mobx/store';
import {useEffect} from 'react';
import url from '../../config/url';
import {_getAppliedJobData} from '../../functions/Candidate/BottomTab';
import JSelectInput from '../../customComponents/JSelectInput';
const Reschedule = ({}) => {
  const store = useContext(StoreContext);
  const {navigate, goBack} = useNavigation();
  const [reschedule, setReschedule] = useState(false);
  const [details, setDetails] = useState();
  const [open, setOpen] = useState(false);
  const {params} = useRoute();
  const [loader, setLoader] = useState(true);
  const [loader1, setLoader1] = useState(false);

  const _getScheduleDetails = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    fetch(
      `${url.baseUrl}/scheduleDetail/${params?.cID}/${params?.jobID}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        // console.log('result', result);
        setDetails(result[0]);
      })
      .catch(error => {
        // console.log('error', error);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  const _acceptSchedule = values => {
    setLoader1(true);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

    var formdata = new FormData();
    formdata.append('candidateid', params?.cID);
    formdata.append('jobid', params?.jobID);
    // console.log(formdata)
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch(`${url.baseUrl}/acceptSchedule`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        if (result.success == true) {
          JToast({
            type: 'success',
            text1: store.lang.success,
            text2: result.message,
          });

          params?.applicant ? goBack({applicantType: 1}) : goBack();
        } else {
          JToast({
            type: 'danger',
            text1: store.lang.eror,
            text2: result.message,
          });
        }
      })
      .catch(error => {
        // console.log('Error:', error);
        JToast({
          type: 'danger',
          text1: store.lang.eror,
          text2: store.lang.an_error_occurred_please_try_again_later,
        });
      })
      .finally(() => {
        setLoader1(false);
        store.token?.user?.owner_type.includes('Candidate') === true &&
          _getAppliedJobData(store);
      });
  };

  const _reschedule = values => {
    setLoader1(true);
    // Create headers with Authorization token
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

    // Create FormData with necessary data
    var formdata = new FormData();

    formdata.append(
      'reschedule_time',
      moment(values.interview_date_and_time).format('YYYY/MM/DD HH:mm'),
    );
    formdata.append('candidateID', params?.cID);
    formdata.append('jobid', params?.jobID);
    // console.log('formdata', formdata)
    // Set up request options
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch(`${url.baseUrl}/employer/reschedule`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.success == true) {
          // Success message
          JToast({
            type: 'success',
            text1: store.lang.success,
            text2: result.message,
          });
          setReschedule(false);
          goBack();
        } else {
          // Error message
          JToast({
            type: 'danger',
            text1: store.lang.eror,
            text2: result.message,
          });
        }
      })
      .catch(error => {
        // console.log('Error:', error);
      })
      .finally(() => {
        setLoader1(false);
        setOpen(false);
        setDetails('');
      });
  };
  const _CandidateReschedule = values => {
    setLoader1(true);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

    var formdata = new FormData();
    formdata.append(
      'reschedule_time',
      moment(values.interview_date_and_time).format('YYYY/MM/DD HH:mm'),
    );
    formdata.append('candidateid', params?.cID);
    formdata.append('jobid', params?.jobID);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch(`${url.baseUrl}/reschedule`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          JToast({
            type: 'success',
            text1: store.lang.success,
            text2: result.message,
          });
          _getAppliedJobData(store);
          setReschedule(false);
          goBack();
        } else {
          JToast({
            type: 'danger',
            text1: store.lang.eror,
            text2: result.message,
          });
        }
      })
      .catch(error => console.log('error', error))
      .finally(() => {
        setLoader1(false);
        setOpen(false);
        setDetails('');
      });
  };
  useEffect(() => {
    _getScheduleDetails();
  }, []);

  return (
    <JScreen>
      <JGradientHeader
        center={
          <JText
            fontColor={colors.white[0]}
            fontWeight="bold"
            fontSize={RFPercentage(2.5)}>
            {store.lang.action_for_interview_schedule}
          </JText>
        }
        left={
          reschedule && <JChevronIcon onPress={() => setReschedule(false)} />
        }
      />
      {loader ? (
        <ActivityIndicator />
      ) : (
        <Formik
          initialValues={{
            interview_date_and_time: moment().isBefore(details?.start_time)
              ? moment(details?.start_time).add(30, 'minutes').toDate()
              : moment().add(30, 'minutes').toDate(),
          }}
          onSubmit={values => {
            store.token?.user?.owner_type.includes('Candidate') === false
              ? _reschedule(values)
              : _CandidateReschedule(values);
            // console.log('values', moment(values.interview_date_and_time).format('YYYY/MM/DD HH:MM'))
          }}
          // validationSchema={yup.object().shape({

          //   interview_date_and_time: yup
          //     .string()
          //     .required()
          //     .label('interview_date_and_time'),

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
            <View
              style={{
                justifyContent: 'space-between',
                flex: 1,
                marginHorizontal: RFPercentage(2),
                marginBottom: RFPercentage(5),
              }}>
              {reschedule == true ? (
                <View>
                  <JText style={styles.headers}>
                    {store.lang.interview_date} :
                  </JText>
                  <JText style={styles.date}>
                    {!details
                      ? '--/--/--'
                      : moment(details?.start_time).format('DD/MM/YYYY')}
                  </JText>

                  <JText style={styles.headers}>
                    {store.lang.interview_time} :
                  </JText>
                  <JText style={styles.date}>
                    {!details
                      ? '--/--'
                      : moment(details?.start_time).format('HH:mm A')}
                  </JText>
                  <JSelectInput
                    mode="datetime"
                    isDate={true}
                    // date1={details&&moment(details?.start_time).add(30, 'minutes')}
                    // date1={moment(details?.start_time).add(30, 'minutes').toDate()}
                    // minimumDate={()=>{moment().format() === details?.start_time && moment(details?.start_time).format()
                    //     ? moment().add(30, 'minutes').toDate()
                    //     : moment().format() < details?.start_time && moment(details?.start_time).format()
                    //         ? moment(details?.start_time).add(30, 'minutes').format('HH:mm A')
                    //         : moment().format() >details?.start_time && moment(details?.start_time).format()
                    //         && moment().add(30, 'minutes').toDate()}}
                    date1={
                      moment().isBefore(details?.start_time)
                        ? moment(details?.start_time)
                            .add(30, 'minutes')
                            .toDate()
                        : moment().add(30, 'minutes').toDate()
                    } // Specify the initial date and time
                    minimumDate={
                      moment().isBefore(details?.start_time)
                        ? moment(details?.start_time)
                            .add(30, 'minutes')
                            .toDate()
                        : moment().add(30, 'minutes').toDate()
                    }
                    containerStyle={{marginTop: RFPercentage(2)}}
                    value={moment(values.interview_date_and_time).format(
                      'YYYY/MM/DD HH:mm',
                    )}
                    setValue={e => setFieldValue('interview_date_and_time', e)}
                    heading={`${store.lang.interview_Date_and_Time}:`}
                    error={
                      touched.interview_date_and_time &&
                      errors.interview_date_and_time &&
                      true
                    }
                    rightIcon={
                      <JIcon
                        icon={'fe'}
                        name="chevron-down"
                        size={RFPercentage(2.5)}
                        color={colors.black[0]}
                      />
                    }
                    Licon={
                      <JIcon
                        icon={'ev'}
                        name={'calendar'}
                        color={'#000'}
                        size={RFPercentage(4.5)}
                      />
                    }
                  />
                  {touched.interview_date_and_time &&
                    errors.interview_date_and_time && (
                      <JErrorText>{errors.interview_date_and_time}</JErrorText>
                    )}
                </View>
              ) : (
                <View>
                  <JText style={styles.headers}>
                    {store.lang.interview_date} :
                  </JText>
                  <JText style={styles.date}>
                    {!details
                      ? '--/--/--'
                      : moment(details?.start_time).format('DD/MM/YYYY')}
                  </JText>

                  <JText style={styles.headers}>
                    {store.lang.interview_time} :
                  </JText>
                  <JText style={styles.date}>
                    {!details
                      ? '--/--'
                      : moment(details?.start_time).format('HH:mm A')}
                  </JText>
                </View>
              )}
              {store.token?.user?.owner_type.includes('Candidate') === false ? (
                <View>
                  {details?.scheduled_by == 1 && (
                    <JButton
                      disabled={loader1 ? true : false}
                      style={{
                        backgroundColor: colors.success[0],
                        marginVertical: RFPercentage(1),
                        borderColor: 'transparent',
                        alignSelf: 'flex-end',
                      }}
                      onPress={() => {
                        if (reschedule) {
                          handleSubmit();
                        } else {
                          _acceptSchedule();
                        }
                      }}>
                      {loader1
                        ? store.lang.loading
                        : reschedule == true
                        ? store.lang.submit
                        : store.lang.accept}
                    </JButton>
                  )}
                  {!reschedule && details?.scheduled_by == 1 && (
                    <JButton
                      style={{
                        marginVertical: RFPercentage(1),
                        alignSelf: 'flex-end',
                      }}
                      onPress={() => {
                        setReschedule(true);
                      }}>
                      {store.lang.re_schedule}
                    </JButton>
                  )}
                  <JButton
                    style={{
                      backgroundColor: colors.border[0],
                      marginVertical: RFPercentage(1),
                      borderColor: 'transparent',
                      alignSelf: 'flex-end',
                    }}
                    onPress={() => {
                      setReschedule(false);
                      setOpen(false);
                      setDetails('');
                      setLoader1(false);
                      goBack();
                    }}>
                    {store.lang.close}
                  </JButton>
                </View>
              ) : (
                <View>
                  {details?.scheduled_by == 0 && (
                    <JButton
                      disabled={loader1 ? true : false}
                      style={{
                        backgroundColor: colors.success[0],
                        marginVertical: RFPercentage(1),
                        borderColor: 'transparent',
                        alignSelf: 'flex-end',
                      }}
                      onPress={() => {
                        if (reschedule) {
                          handleSubmit();
                        } else {
                          _acceptSchedule();
                        }
                      }}>
                      {loader1
                        ? store.lang.loading
                        : reschedule == true
                        ? store.lang.submit
                        : store.lang.accept}
                    </JButton>
                  )}
                  {!reschedule && details?.scheduled_by == 0 && (
                    <JButton
                      style={{
                        marginVertical: RFPercentage(1),
                        alignSelf: 'flex-end',
                      }}
                      onPress={() => {
                        setReschedule(true);
                      }}>
                      {store.lang.re_schedule}
                    </JButton>
                  )}
                  <JButton
                    style={{
                      backgroundColor: colors.border[0],
                      marginVertical: RFPercentage(1),
                      borderColor: 'transparent',
                      alignSelf: 'flex-end',
                    }}
                    onPress={() => {
                      setReschedule(false);
                      setOpen(false);
                      setDetails('');
                      setLoader1(false);
                      goBack();
                    }}>
                    {store.lang.close}
                  </JButton>
                </View>
              )}
              {open && (
                <DatePicker
                  modal
                  open={open}
                  date={values.interview_date_and_time}
                  onConfirm={e => {
                    setFieldValue('interview_date_and_time', e);
                    setOpen(false);
                  }}
                  onCancel={() => setOpen(false)}
                  mode="datetime"
                  minuteInterval={1}
                />
              )}
            </View>
          )}
        </Formik>
      )}
    </JScreen>
  );
};

export default Reschedule;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },

  headers: {
    fontWeight: 'bold',
    fontSize: RFPercentage(3),
    marginVertical: RFPercentage(2),
  },
  date: {fontSize: RFPercentage(2.5), marginHorizontal: RFPercentage(2)},
});
