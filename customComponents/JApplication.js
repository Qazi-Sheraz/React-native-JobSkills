import {
  Pressable,
  StyleSheet,
  View,
  Modal,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import JText from './JText';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JRow from './JRow';
import colors from '../config/colors';
import JIcon from './JIcon';
import moment from 'moment';
import JStatusChecker from './JStatusChecker';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {StoreContext} from '../mobx/store';
import url from '../config/url';
import JGradientHeader from './JGradientHeader';
import {Formik} from 'formik';
import * as yup from 'yup';
import JInput from './JInput';
import JButton from './JButton';
import {useRoute, useNavigation, useIsFocused} from '@react-navigation/native';
import {keys, values} from 'mobx';
import {observer} from 'mobx-react';
import {JToast} from '../functions/Toast';
import JSelectInput from './JSelectInput';
import {_jobApplication} from '../escreen/Jobs/JobApplication';
import JErrorText from './JErrorText';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const JApplication = ({
  onPress,
  routeItem,
  item,
  onPressStatus,
  update,
  setUpdate,
  api,
  navigate,
}) => {
  const [details, setDetails] = useState();
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
  const [loader1, setLoader1] = useState(false);
  const [btnloader, setBtnLoader] = useState(false);
  const [option, setOption] = useState(false);
  const [meetings, setMeetings] = useState();
  const isFoucs = useIsFocused();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [links, setLink] = useState();
  const store = useContext(StoreContext);
  const navigation = useNavigation();
  const [stat, setStat] = useState(parseInt(item.status_id));
  const [selectedStatus, setSelectedStatus] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const handleStatusSelect = status1 => {
    setLoader1(true);
    setSelectedStatus(status1);
    status1 == 0
      ? _applicantsStatus(0)
      : status1 == 1
      ? _applicantsStatus(1)
      : status1 == 2
      ? _applicantsStatus(2)
      : status1 == 3
      ? _applicantsStatus(3)
      : status1 == 4
      ? _applicantsStatus(4)
      : status1 == 5
      ? _applicantsStatus(5)
      : status1 == 6
      ? _applicantsStatus(6)
      : status1 == 7
      ? _applicantsStatus(7)
      : status1 == 8
      ? _applicantsStatus(8)
      : status1 == 9 && _applicantsStatus(9);
  };

  const _applicantsStatus = (id, selectedStatus) => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

    fetch(`${url.baseUrl}/employer/job-applications/${item?.id}/status/${id}`, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    })
      .then(response => response.json())
      .then(result => {
        if (result.success == true) {
          setStat(id);
          setUpdate(!update);
          api();
          JToast({
            type: 'success',
            text1: store.lang.success,
            text2: result.message,
          });
        } else {
          JToast({
            type: 'danger',
            text1: store.lang.eror,
            text2: result.message,
          });
        }
      })
      .catch(error => {
        // console.log('error', error);
        setError(true);
      })
      .finally(() => {
        setLoader(false);
        setLoader1(false);
      });
  };
  const _meetingSubmit = values => {
    setBtnLoader(true);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

    var formdata = new FormData();

    formdata.append('topic', values.interview_topic);
    formdata.append(
      'start_time',
      moment(values.interview_date_and_time).format('YYYY/MM/DD HH:mm'),
    );
    formdata.append('agenda', values.description);
    formdata.append(
      'interviewType',
      values.interview_type == meetings?.meeting_type[0]
        ? 0
        : values.interview_type == meetings?.meeting_type[1]
        ? 1
        : 2,
    );
formdata.append('office_location', values?.office_location);
    formdata.append('zoom_link', values?.manual_link);
    formdata.append('candidateID', item?.candidate_user_id);
    formdata.append('jobid', item?.job_id);
  

    console.log('formdata', formdata);

    fetch(`${url.baseUrl}/meetings-submit`, {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.success == true) {
          setStat(5);
          setUpdate(!update);
          JToast({
            type: 'success',
            text1: store.lang.success,
            text2: result.message,
          });
          setBtnLoader(false);
          setModalVisible(!modalVisible);
        } else {
          setBtnLoader(false);
          JToast({
            type: 'danger',
            text1: store.lang.eror,
            text2: result.message,
          });
        }
      })
      .catch(error => {
        setBtnLoader(false);
        console.log('error', error);
        JToast({
          type: 'danger',
          text1: store.lang.eror,
          text2: store.lang.an_error_occurred_please_try_again_later,
        });
      });
  };
  const _getScheduleDetails = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    fetch(
      `${url.baseUrl}/scheduleDetail/${item.candidate_user_id}/${item?.job_id}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        // console.log('result', result[0]?.start_time)
        setDetails(result[0]?.start_time);
      })
      .catch(error => {
        // console.log('error', error);
      })
      .finally(() => {
        //FINAL
      });
  };

  const _interviewScheduled = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

    fetch(
      `${url.baseUrl}/employer/ScheduleDetail/${item?.candidate_user_id}/${item?.job_id}`,
      {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      },
    )
      .then(response => response.json())
      .then(result => {
        // console.log(result?.meeting_type);
        setMeetings(result);
        setLink(result?.meeting_type[0]);
      })

      .catch(error => {
        // console.log('error', error);
        setError(true);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  // console.log('linksssssss', links)

  const currentDate = new Date();

  // Add 30 minutes to the current date and time
  currentDate.setMinutes(currentDate.getMinutes() + 30);

  // Parse the "start_time" string into a Date object

  const detail = moment(details, 'YYYY/MM/DD HH:mm');
  // console.log('detail', detail.format('YYYY/MM/DD HH:mm'));

  // Get the current date and time using moment
  const currentTime = moment();
  // console.log('currentTime', currentTime.format('YYYY/MM/DD HH:mm'));

  useEffect(() => {
    _getScheduleDetails();
    _interviewScheduled();
    setStat(parseInt(item.status_id));

    // item.applicantType == 1 && setStat(6)
  }, [item.status_id]);

  // Replace the placeholders with the selected date and time
  const updatedDescription = (description, value) =>
    description
      .replace(/--Select Time--/i, moment(value).format('HH:mm'))
      .replace(/--Select Date--/i, moment(value).format('YYYY/MM/DD'));
  return (
    <>
      <Pressable
        onPress={() => {
          navigation.navigate('ProfileApplication', {
            candidate_id: item.candidate_id,
            candidate_user_id: item.candidate_user_id,
            job_id: item.job_id,
            id: item.id,
          });
        }}
        style={{
          marginVertical: RFPercentage(0.8),
          borderBottomWidth: RFPercentage(0.1),
          borderBottomColor: colors.border[0],
        }}>
        <JRow
          style={{
            justifyContent: 'space-between',
          }}>
          <JText style={styles.Hname}>{item.candidate_name}</JText>

          {stat === 8 ||
          stat === 3 ||
          stat === 2 ||
          ((stat === 5 || stat === 6) &&
            !currentTime.isAfter(detail)) ? null : (
            <Menu>
              <MenuTrigger
                disabled={loader1 ? true : false}
                style={{
                  width: RFPercentage(3),
                  height: RFPercentage(4),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <JIcon icon={'sm'} name={'options-vertical'} size={20} />
              </MenuTrigger>

              <MenuOptions>
                {/* <MenuOption
                  onSelect={() => handleStatusSelect(store.lang.drafted)}>
                  <JText style={styles.menutxt}>{store.lang.drafted}</JText>
                </MenuOption> */}
                {/* {stat !== 1 &&
                  <MenuOption
                    onSelect={() => handleStatusSelect(1, store.lang.applied)}>
                    <JText style={styles.menutxt}>{store.lang.applied}</JText>
                  </MenuOption>} */}

                <MenuOption
                  onSelect={() => handleStatusSelect(2, store.lang.rejected)}>
                  <JText style={styles.menutxt}>{store.lang.rejected}</JText>
                </MenuOption>
                <MenuOption
                  onSelect={() => handleStatusSelect(3, store.lang.selected)}>
                  <JText style={styles.menutxt}>{store.lang.selected}</JText>
                </MenuOption>
                {stat !== 4 && (
                  <MenuOption
                    onSelect={() =>
                      handleStatusSelect(4, store.lang.shortlisted)
                    }>
                    <JText style={styles.menutxt}>
                      {store.lang.shortlisted}
                    </JText>
                  </MenuOption>
                )}
                {/* <MenuOption
                onSelect={() => handleStatusSelect(store.lang.invitation_Sent)}>
                <JText style={styles.menutxt}>
                  {store.lang.invitation_Sent}
                </JText>
              </MenuOption> */}
                {/* {stat !== 6 && ( */}
                <MenuOption
                  onSelect={() => {
                    setModalVisible(true),
                      {
                        candidate_user_id: item.candidate_user_id,
                        job_id: item.job_id,
                        id: item.id,
                      };
                  }}>
                  <JText style={styles.menutxt}>
                    {store.lang.interview_scheduled}
                  </JText>
                </MenuOption>
                {/* )} */}

                {/* <MenuOption
                  onSelect={() =>
                    handleStatusSelect(7, store.lang.interview_accepted)
                  }>
                  <JText style={styles.menutxt}>
                    {store.lang.interview_accepted}
                  </JText>
                </MenuOption>
                <MenuOption
                  onSelect={() => {
                    handleStatusSelect(8, store.lang.interview_rescheduled)
                  }}>
                  <JText style={styles.menutxt}>
                    {store.lang.interview_rescheduled}
                  </JText>
                </MenuOption>
                {stat !== 9 && <MenuOption
                  onSelect={() =>
                    handleStatusSelect(9, store.lang.interview_completed)
                  }>
                  <JText style={styles.menutxt}>
                    {store.lang.interview_completed}
                  </JText>
                </MenuOption>} */}
              </MenuOptions>
            </Menu>
          )}
        </JRow>
        <JRow
          style={{
            justifyContent: 'space-between',
            paddingVertical: RFPercentage(1),
          }}>
          <View>
            <JText style={styles.txt}>{moment(item.apply_date, 'DD-MM-YYYY').format('DD MMM,YYYY')}
            </JText>
            <JRow>
              <JText style={styles.txt}>
                {`${store.lang.fit_score} ${item.fit_score == null ? 'N/A' : item.fit_score} `}
              </JText>
              <JIcon
                onPress={onPress}
                style={styles.info}
                icon="fe"
                name={'info'}
              />
            </JRow>
          </View>
          <View
            style={{
              marginTop: RFPercentage(2),
              alignItems: store.lang.id == 0 ? 'flex-end' : null,
              justifyContent: 'flex-end',
            }}>
            <JStatusChecker
              onPressStatus={() => {
                if (
                  stat === 5 ||
                  (stat === 6 && !currentTime.isAfter(detail))
                ) {
                  setModalVisible(true);
                } else if (stat === 8) {
                  navigate('Reschedule', {
                    cID: item.candidate_user_id,
                    jobID: item?.job_id,
                    applicant: true,
                  });
                } else {
                  onPressStatus;
                }
              }}
              status={stat}
            />
          </View>
        </JRow>
      </Pressable>
      <Modal animationType="slide" visible={modalVisible}>
        <SafeAreaView style={{marginBottom: RFPercentage(10)}}>
          <JGradientHeader
            center={
              <JText
                fontColor={colors.white[0]}
                fontWeight="bold"
                fontSize={RFPercentage(2.5)}>
                {stat == 8
                  ? store.lang.action_for_interview_schedule
                  : store.lang.interview_scheduled}
              </JText>
            }
          />
          {stat === 5 || (stat === 6 && !currentTime.isAfter(detail)) ? (
            <SafeAreaView
              style={{justifyContent: 'space-between', height: '90%'}}>
              <View style={{marginHorizontal: RFPercentage(2)}}>
                <JText style={styles.headers}>
                  {store.lang.interview_date} :
                </JText>
                <JText style={styles.date}>
                  {moment(details).format('DD MMM,YYYY')}
                </JText>

                <JText style={styles.headers}>
                  {store.lang.interview_time} :
                </JText>
                <JText style={styles.date}>
                  {moment(details).format('HH:mm A')}
                </JText>
              </View>
              <JButton onPress={() => setModalVisible(false)}>
                {store.lang.close}
              </JButton>
            </SafeAreaView>
          ) : (
            <Formik
              initialValues={{
                interview_topic: meetings?.interview_topic
                  ? meetings?.interview_topic
                  : '',
                interview_date_and_time: currentDate,
                description: meetings?.description ? meetings?.description : '',
                interview_type: meetings?.meeting_type
                  ? meetings?.meeting_type[0]
                  : '',
                office_location: '',
                manual_link: '',
              }}
              onSubmit={values => {
                _meetingSubmit(values);
                // console.log('values', values);
              }}
              validationSchema={yup.object().shape({
                interview_topic:yup.string()
                .max(100, store.lang.Title_must_not_exceed_100_characters)
                // .matches(
                //   /^[A-Za-z\u0600-\u06FF\s]+$/,
                //   `${store.lang.interview_topic} ${store.lang.Symbols_are_not_allowed},` )
                .transform(value => value.trim())
                .test(
                  'no-leading-space',
                  store.lang.cannot_start_with_a_space,
                  value => {
                    if (value && value.startsWith(' ')) {
                      return false; // Return false to indicate a validation error
                    }
                    return true; // Return true if the validation passes
                  },
                )
                .required(store.lang.interview_topic),
                description:yup.string()
                
                .transform(value => value.trim())
                .test(
                  'no-leading-space',
                  store.lang.cannot_start_with_a_space,
                  value => {
                    if (value && value.startsWith(' ')) {
                      return false; // Return false to indicate a validation error
                    }
                    return true; // Return true if the validation passes
                  },
                )
                .required(store.lang.Job_Description_is_required),
                office_location: yup.string().when('interview_type', {
                  is: (interviewType, schema) =>
                    interviewType === meetings?.meeting_type[0],
                  then: yup
                    .string()
                    .url(
                      `${meetings?.meeting_type[0]} ${store.lang.Invalid_URL_format}`,
                    )
                    .required(
                      `${meetings?.meeting_type[0]} ${store.lang.URL_is_required}`,
                    )
                    .label(meetings?.meeting_type[0]),
                }),
                manual_link: yup.string().when('interview_type', {
                  is: (interviewType, schema) =>
                    interviewType === meetings?.meeting_type[1],
                  then: yup
                    .string()
                    .url(
                      `${meetings?.meeting_type[1]} ${store.lang.Invalid_URL_format}`,
                    )
                    .required(
                      `${meetings?.meeting_type[1]} ${store.lang.URL_is_required}`,
                    )
                    .label(meetings?.meeting_type[1]),
                }),
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
                <KeyboardAwareScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingVertical: RFPercentage(1),
                    marginHorizontal: RFPercentage(2),
                  }}>
                  <JInput
                    style={{
                      textAlign: store.lang.id == 0 ? 'left' : 'right',
                    }}
                    containerStyle={{marginTop: RFPercentage(1)}}
                    isRequired
                    heading={`${store.lang.interview_topic}:`}
                    value={values.interview_topic}
                    error={
                      touched.interview_topic && errors.interview_topic && true
                    }
                    multiline={true}
                    onChangeText={handleChange('interview_topic')}
                    onBlur={() => setFieldTouched('interview_topic')}
                  />
                   {touched.interview_topic &&errors.interview_topic && (
                      <JErrorText>{errors.interview_topic}</JErrorText> )}

                  <JSelectInput
                    mode="datetime"
                    isDate={true}
                    date1={currentDate}
                    minimumDate={currentDate}
                    containerStyle={{marginTop: RFPercentage(2)}}
                    value={moment(values.interview_date_and_time).format('YYYY/MM/DD HH:mm')}
                    setValue={e => {
                      setFieldValue('interview_date_and_time', e);
                    }}
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

                  <JInput
                    style={{
                      textAlign: store.lang.id == 0 ? 'left' : 'right',
                    }}
                    // editable={false}
                    containerStyle={{marginTop: RFPercentage(1)}}
                    isRequired
                    multiline={true}
                    heading={store.lang.descriptions}
                    value={
                      values.description
                      // updatedDescription(
                      //   values.description,
                      //   moment(values.interview_date_and_time).format(
                      //     'YYYY/MM/DD HH:mm',
                      //   ),)
                    }
                    error={touched.description && errors.description && true}
                    onChangeText={text => {
                      setFieldValue('description', text);
                    }}
                    onBlur={() => setFieldTouched('description')}
                  />
                   {touched.description &&errors.description && (
                      <JErrorText>{errors.description}</JErrorText> )}

                  <View
                    style={{
                      justifyContent: 'space-between',
                      paddingTop: RFPercentage(1),
                      marginBottom: RFPercentage(1),
                    }}>
                    <JText
                      style={{fontSize: RFPercentage(2.5), fontWeight: '500'}}>
                      {store.lang.interview_type}
                    </JText>
                    <Pressable
                      onPress={() => setOption(!option)}
                      style={[
                        styles.menuV,
                        {
                          flexDirection:
                            store.lang.id === 0 ? 'row' : 'row-reverse',
                        },
                      ]}>
                      <JText
                        fontSize={RFPercentage(2)}
                        style={{paddingHorizontal: RFPercentage(1)}}>
                        {/* {menu ? menu : meetings?.meeting_type[0]} */}
                        {values.interview_type === meetings?.meeting_type[0]
                          ? meetings?.meeting_type[0]
                          : meetings?.meeting_type[1]}
                      </JText>
                      <JIcon
                        icon={'en'}
                        name={
                          option === true
                            ? 'chevron-small-up'
                            : 'chevron-small-down'
                        }
                        color={'#00000090'}
                        size={RFPercentage(4)}
                      />
                    </Pressable>
                    {option === true && (
                      <View
                        style={{
                          borderWidth: RFPercentage(0.1),
                          borderRadius: RFPercentage(1),
                          paddingVertical: RFPercentage(1),
                        }}>
                        {meetings?.meeting_type.map((item, index) => (
                          <Pressable
                            key={index}
                            style={{
                              padding: 10,
                              justifyContent: 'space-between',
                              flexDirection:
                                store.lang.id === 0 ? 'row' : 'row-reverse',
                            }}
                            onPress={() => {
                              setFieldValue('interview_type', item);
                              setLink(item);
                              item == meetings?.meeting_type[0]
                                ? setFieldValue('manual_link', '')
                                : item == meetings?.meeting_type[1] &&
                                  setFieldValue('office_location', '');
                              setOption(false);
                            }}>
                            <JText fontSize={RFPercentage(2)}>
                              {item === meetings?.meeting_type[0]
                                ? meetings?.meeting_type[0]
                                : meetings?.meeting_type[1]}
                              {/* ? store.lang.office_base
                                : store.lang.manual_link} */}
                            </JText>
                          </Pressable>
                        ))}
                      </View>
                    )}
                  </View>

                  {values.interview_type === meetings?.meeting_type[0] ? (
                    <JInput
                      style={{
                        textAlign: store.lang.id == 0 ? 'left' : 'right',
                      }}
                      containerStyle={{marginTop: RFPercentage(1)}}
                      isRequired
                      placeholder={'https://map.app.goo.gl/B31Ubk'}
                      heading={meetings?.meeting_type[0]}
                      value={values.office_location}
                      error={
                        touched.office_location &&
                        errors.office_location &&
                        true
                      }
                      onChangeText={handleChange('office_location')}
                      onBlur={() => setFieldTouched('office_location')}
                    />
                  ) : (
                    values.interview_type === meetings?.meeting_type[1] && (
                      <JInput
                        isRequired
                        style={{
                          textAlign: store.lang.id == 0 ? 'left' : 'right',
                        }}
                        containerStyle={{marginTop: RFPercentage(1)}}
                        placeholder={'https://map.app.goo.gl/B31Ubk'}
                        heading={meetings?.meeting_type[1]}
                        value={values.manual_link}
                        error={
                          touched.manual_link && errors.manual_link && true
                        }
                        onChangeText={handleChange('manual_link')}
                        onBlur={() => setFieldTouched('manual_link')}
                      />
                    )
                  )}

                  {values.interview_type === meetings?.meeting_type[0] &&
                  touched.office_location &&
                  errors.office_location ? (
                    <JErrorText>{errors.office_location}</JErrorText>
                  ) : (
                    touched.manual_link &&
                    errors.manual_link && (
                      <JErrorText>{errors.manual_link}</JErrorText>
                    )
                  )}
                  <JRow
                    style={{
                      justifyContent: 'flex-end',
                      margin: RFPercentage(2),
                    }}>
                    <JButton
                      onPress={() => setModalVisible(false)}
                      style={{
                        marginHorizontal: RFPercentage(2),
                        backgroundColor: '#fff',
                        borderColor: '#000040',
                      }}>
                      {store.lang.close}
                    </JButton>
                    <JButton
                      disabled={btnloader ? true : false}
                      onPress={() => handleSubmit()}>
                      {btnloader ? store.lang.loading : store.lang.submit}
                    </JButton>
                  </JRow>
                  {/* {open && (
                    <DatePicker
                      modal
                      open={open}
                      minDate={new Date()}
                      date={values.interview_date_and_time}
                      onConfirm={e =>
                        setFieldValue('interview_date_and_time', e)
                      }
                      onCancel={() => setOpen(false)}
                    />
                  )} */}
                </KeyboardAwareScrollView>
              )}
            </Formik>
          )}
        </SafeAreaView>
      </Modal>

      <View></View>
    </>
  );
};
export default observer(JApplication);
const styles = StyleSheet.create({
  Hname: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    marginVertical: RFPercentage(0.5),
    width: '80%',
  },
  info: {
    height: RFPercentage(3),
    width: RFPercentage(4),
    alignItems: 'center',
    margin: RFPercentage(1),
  },
  txt: {fontSize: RFPercentage(2), marginVertical: RFPercentage(0.3)},
  menutxt: {
    fontSize: RFPercentage(2),
    marginVertical: RFPercentage(0.5),
    paddingHorizontal: RFPercentage(1),
  },
  menuV: {
    height: RFPercentage(7),
    marginVertical: RFPercentage(1),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RFPercentage(1),
    backgroundColor: colors.white[0],

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  headers: {
    fontWeight: 'bold',
    fontSize: RFPercentage(3),
    marginVertical: RFPercentage(2),
  },
  date: {fontSize: RFPercentage(2.5), marginHorizontal: RFPercentage(2)},
});
