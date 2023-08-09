import { Pressable, StyleSheet, View, Modal, SafeAreaView, ScrollView, Switch, Text, ActivityIndicator } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import JText from './JText';
import { RFPercentage } from 'react-native-responsive-fontsize';
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
import Toast from 'react-native-toast-message';
import { StoreContext } from '../mobx/store';

import url from '../config/url';
import JGradientHeader from './JGradientHeader';
import { Formik } from 'formik';
import * as yup from 'yup';
import JInput from './JInput';
import JButton from './JButton';
import DatePicker from 'react-native-date-picker';
import { useRoute, useNavigation, useIsFocused } from '@react-navigation/native';
import { keys, values } from 'mobx';
import { observer } from 'mobx-react';
import { JToast } from '../functions/Toast';
// import url from '../../config/url';
const JApplication = ({
  Hname,
  status,
  ApplyDate,
  onSelect,
  onPress,
  item,
  onPressStatus,
  update,
  setUpdate,
}) => {
  const { params } = useRoute();
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
  const [loader1, setLoader1] = useState(false);
  const [option, setOption] = useState(false);
  const [meetings, setMeetings] = useState();
  const isFoucs = useIsFocused();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [open, setOpen] = useState(false);
  const store = useContext(StoreContext);
  const navigation = useNavigation();
  const [stat, setStat] = useState(parseInt(item.status_id));
  const [selectedStatus, setSelectedStatus] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const handleStatusSelect = status1 => {

    setSelectedStatus(status1);
    status1 == 0
      ? _applicantsStatus(0, store.lang.drafted)
      : status1 == 1
        ? _applicantsStatus(1, store.lang.applied)
        : status1 == 2
          ? _applicantsStatus(2, store.lang.rejected)
          : status1 == 3
            ? _applicantsStatus(3, store.lang.selected)
            : status1 == 4
              ? _applicantsStatus(4, store.lang.shortlisted)
              : status1 == 5
                ? _applicantsStatus(5, store.lang.invitation_Sent)
                : status1 == 6
                  ? _applicantsStatus(6, store.lang.interview_scheduled)
                  : status1 == 7
                    ? _applicantsStatus(7, store.lang.interview_accepted)
                    : status1 == 8
                      ? _applicantsStatus(8, store.lang.interview_rescheduled)
                      : status1 == 9 &&
                      _applicantsStatus(9, store.lang.interview_completed);
    // console.log(status1)
  };
  const _meetingSubmit = values => {
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
      values.interview_type === 'Office Base' ? 0 : 'Zoom' ? 1 : 2,
    );
    formdata.append('office_location', values?.office_location);
    formdata.append('zoom_link', values?.manual_link);
    formdata.append('candidateID', item?.candidate_user_id);
    formdata.append('jobid', item?.job_id);

    // console.log('formdata', formdata);

    fetch(`${url.baseUrl}/meetings-submit`, {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    })
      .then(response => response.json())
      .then(result => {
        if (result.success == true) {
          setStat(5)
          setUpdate(!update)
          JToast({
            type: 'success',
            text1: result.message,
          });
          setModalVisible(!modalVisible);

        } else {
          JToast({
            type: 'error',
            text1: result.message,
          });

        }
      })
      .catch(error => console.log('error', error));
  };

  const _applicantsStatus = (id, selectedStatus) => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

    fetch(`${url.baseUrl}/employer/job-applications/${item.id}/status/${id}`, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    })
      .then(response => response.json())
      .then(result => {
        if (result.success == true) {

          setStat(id)
          Toast.show({
            type: 'success',
            text1: result.message,
          });
          setUpdate(!update)
        } else {
          Toast.show({
            type: 'error',
            text1: result.message,
          });
        }
      })
      .catch(error => {
        // console.log('error', error);
        setError(true);
      })
      .finally(() => {
        setLoader(false);
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
        // console.log(result)
        setMeetings(result);
      })

      .catch(error => {
        // console.log('error', error);
        setError(true);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  const _viewResum = () => {
    var myHeaders = new Headers();
    // myHeaders.append('Authorization', `Bearer ${store.token?.token}`, {
    //   // 'Accept': 'application/json',
    //   // 'Content-Type': 'application/json',
    // });

    fetch(`${url.baseUrl}/employer/resume-view/${item.id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${store.token?.token}`,
        'Accept': 'application/json',
      },
      redirect: 'follow',
    })

      .then(response => response.json())
      .then(result => {
        // console.log('result===>', result?.data);
        store.setPdf(result?.data);
      })

      .catch(error => {
        console.log('error===>', error);
        store.setPdfApiError(true);
      })
      .finally(() => {
        store.setPdfApiLoader(false);
      });
  };


  useEffect(() => {
    _interviewScheduled();
    // setStat(parseInt(item.status_id));
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
          _viewResum();
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
            stat === 2 ? null : (
            <Menu>
              <MenuTrigger
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
                {stat !== 1 &&
                  <MenuOption
                    onSelect={() => handleStatusSelect(1, store.lang.applied)}>
                    <JText style={styles.menutxt}>{store.lang.applied}</JText>
                  </MenuOption>}
                  
                <MenuOption
                  onSelect={() => handleStatusSelect(2, store.lang.rejected)}>
                  <JText style={styles.menutxt}>{store.lang.rejected}</JText>
                </MenuOption>
                <MenuOption
                  onSelect={() => handleStatusSelect(3, store.lang.selected)}>
                  <JText style={styles.menutxt}>{store.lang.selected}</JText>
                </MenuOption>
                {stat !== 4 &&
                <MenuOption
                  onSelect={() => handleStatusSelect(4, store.lang.shortlisted)}>
                  <JText style={styles.menutxt}>{store.lang.shortlisted}</JText>
                </MenuOption>}
                {/* <MenuOption
                onSelect={() => handleStatusSelect(store.lang.invitation_Sent)}>
                <JText style={styles.menutxt}>
                  {store.lang.invitation_Sent}
                </JText>
              </MenuOption> */}
              {stat !== 6 &&
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
                </MenuOption>}
                
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
            <JText style={styles.txt}>
              {store.lang.apply_date}{' '}
              {moment(item.apply_date, 'DD-MM-YYYY').format('DD MMM,YYYY')}
            </JText>
            <JRow>
              <JText style={styles.txt}>
                {store.lang.fit_score}{' '}
                {item.fit_score == null ? 'N/A' : item.fit_score}{' '}
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
              onPressStatus={onPressStatus}
              status={stat}
            />
          </View>
        </JRow>
      </Pressable>

      <Modal animationType="slide" visible={modalVisible}>
        <SafeAreaView style={{ marginBottom: RFPercentage(10) }}>
          <JGradientHeader
            center={
              <JText
                fontColor={colors.white[0]}
                fontWeight="bold"
                fontSize={RFPercentage(2.5)}>
                {stat == 8 ? store.lang.action_for_interview_schedule : store.lang.interview_scheduled}
              </JText>
            }
          />
          {stat == 5 ? (
            <SafeAreaView
              style={{ justifyContent: 'space-between', height: '90%' }}>
              <View style={{ marginHorizontal: RFPercentage(2) }}>
                <JText style={styles.headers}>
                  {store.lang.interview_date} :
                </JText>
                <JText style={styles.date}>
                  {moment(values.interview_date_and_time).format('YYYY/MM/DD')}
                </JText>

                <JText style={styles.headers}>
                  {store.lang.interview_time} :
                </JText>
                <JText style={styles.date}>
                  {moment(values.interview_date_and_time).format('HH:mm A')}
                </JText>
              </View>
              <JButton onPress={() => setModalVisible(false)}>
                {store.lang.close}
              </JButton>
            </SafeAreaView>
          ): (
                <Formik
                  initialValues={{
                    interview_topic: meetings?.interview_topic
                      ? meetings?.interview_topic
                      : '',
                    interview_date_and_time: new Date(),
                    description: meetings?.description ? meetings?.description : '',
                    interview_type:
                      meetings?.meeting_type && meetings?.meeting_type?.length > 0
                        ? meetings?.meeting_type[0]
                        : '',
                    office_location: '',
                    manual_link: '',
                  }}
                  onSubmit={values => {
                    _meetingSubmit(values);

                  }}
                // validationSchema={yup.object().shape({
                //   interview_topic: yup
                //     .string()
                //     .required()
                //     .label('interview_topic'),
                //   interview_date_and_time: yup
                //     .string()
                //     .required()
                //     .label('interview_date_and_time'),
                //   description: yup.string().required().label('description'),
                //   interview_type: yup
                //     .string()
                //     .required()
                //     .label('interview_topic'),
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
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{
                        paddingVertical: RFPercentage(1),
                        marginHorizontal: RFPercentage(2),
                      }}>
                      <JInput
                        style={{
                          textAlign: store.lang.id == 0 ? 'left' : 'right',
                        }}
                        containerStyle={{ marginTop: RFPercentage(1) }}
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
                      <View
                        style={{
                          justifyContent: 'space-between',
                          // flexDirection: store.lang.id===0?'row':'row-reverse',
                          paddingTop: RFPercentage(1),
                          marginBottom: RFPercentage(1),
                        }}>
                        <JText
                          style={{ fontSize: RFPercentage(2.5), fontWeight: '500' }}>
                          {store.lang.interview_Date_and_Time} :
                        </JText>
                        <Pressable
                          onPress={() => setOpen(true)}
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
                          <JIcon
                            icon={'ev'}
                            name={'calendar'}
                            color={'#000'}
                            size={RFPercentage(4.5)}
                          />
                          <JText fontSize={RFPercentage(2)}>
                            {moment(values.interview_date_and_time).format(
                              'YYYY/MM/DD HH:mm',
                            )}
                          </JText>
                        </Pressable>
                      </View>
                      <JInput
                        style={{
                          textAlign: store.lang.id == 0 ? 'left' : 'right',
                        }}
                        containerStyle={{ marginTop: RFPercentage(1) }}
                        isRequired
                        multiline={true}
                        heading={store.lang.descriptions}
                        value={updatedDescription(
                          values.description,
                          moment(values.interview_date_and_time).format(
                            'YYYY/MM/DD HH:mm',
                          ),
                        )}
                        error={touched.description && errors.description && true}
                        onChangeText={handleChange('description')}
                        onBlur={() => setFieldTouched('description')}
                      />

                      <View
                        style={{
                          justifyContent: 'space-between',
                          paddingTop: RFPercentage(1),
                          marginBottom: RFPercentage(1),
                        }}>
                        <JText
                          style={{ fontSize: RFPercentage(2.5), fontWeight: '500' }}>
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
                            style={{ paddingHorizontal: RFPercentage(1) }}>
                            {/* {menu ? menu : meetings?.meeting_type[0]} */}
                            {values.interview_type === 'Office Base'
                              ? store.lang.office_base
                              : store.lang.manual_link}
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
                                  setOption(false);
                                }}>
                                <JText fontSize={RFPercentage(2)}>
                                  {item === 'Office Base'
                                    ? store.lang.office_base
                                    : store.lang.manual_link}
                                </JText>
                              </Pressable>
                            ))}
                          </View>
                        )}
                      </View>
                      {values.interview_type === 'Office Base' ? (
                        <JInput
                          style={{
                            textAlign: store.lang.id == 0 ? 'left' : 'right',
                          }}
                          containerStyle={{ marginTop: RFPercentage(1) }}
                          isRequired
                          placeholder={'https//map.app.goo.gl/B31UbkjUXD5XrvkHA'}
                          heading={store.lang.office_location}
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
                        values.interview_type === 'Manual Link' && (
                          <JInput
                            style={{
                              textAlign: store.lang.id == 0 ? 'left' : 'right',
                            }}
                            containerStyle={{ marginTop: RFPercentage(1) }}
                            placeholder={store.lang.manual_link}
                            //  heading={'Zoom'}
                            value={values.manual_link}
                            error={touched.manual_link && errors.manual_link && true}
                            onChangeText={handleChange('manual_link')}
                            onBlur={() => setFieldTouched('manual_link')}
                          />
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
                        <JButton onPress={() => handleSubmit()}>
                          {store.lang.submit}
                        </JButton>
                      </JRow>
                      {open && (
                        <DatePicker
                          modal
                          open={open}
                          date={values.interview_date_and_time}
                          onConfirm={e =>
                            setFieldValue('interview_date_and_time', e)
                          }
                          onCancel={() => setOpen(false)}
                        />
                      )}
                    </ScrollView>
                  )}
                </Formik>
              )}
        </SafeAreaView>
      </Modal>

      
      <View></View>
    </>
  );
}
export default observer(JApplication)
const styles = StyleSheet.create({
  Hname: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    marginVertical: RFPercentage(0.5),
    width: '80%'
  },
  info: {
    height: RFPercentage(3),
    width: RFPercentage(4),
    alignItems: 'center',
    margin: RFPercentage(1)

  },
  txt: { fontSize: RFPercentage(2), marginVertical: RFPercentage(0.3) },
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

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  headers: { fontWeight: 'bold', fontSize: RFPercentage(3), marginVertical: RFPercentage(2), },
  date: { fontSize: RFPercentage(2.5), marginHorizontal: RFPercentage(2), },
});
