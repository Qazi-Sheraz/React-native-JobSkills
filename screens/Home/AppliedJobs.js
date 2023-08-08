import { StyleSheet, FlatList, RefreshControl, Modal, SafeAreaView, View, Pressable, ActivityIndicator } from 'react-native';
import React, { useContext, useCallback, useState, useEffect } from 'react';
import JScreen from '../../customComponents/JScreen';
import JText from '../../customComponents/JText';
import { StoreContext } from '../../mobx/store';
import { observer } from 'mobx-react';
import JJobTile from '../../customComponents/JJobTile';
import { RFPercentage } from 'react-native-responsive-fontsize';

import colors from '../../config/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import JSearchInput from '../../customComponents/JSearchInput';
import CLFavouriteJob from '../../loaders/Candidate/FavouriteJob/CLFavouriteJob';
import JEmpty from '../../customComponents/JEmpty';
import JGradientHeader from '../../customComponents/JGradientHeader';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import moment from 'moment';
import { _getAppliedJobData } from '../../functions/Candidate/BottomTab';
import JButton from '../../customComponents/JButton';
import { Formik } from 'formik';
import * as yup from 'yup';
import JIcon from './../../customComponents/JIcon';
import DatePicker from 'react-native-date-picker';
import url from '../../config/url';
import { JToast } from '../../functions/Toast';
import Day from 'react-native-calendars/src/calendar/day';

function AppliedJobs({ navigation }) {

  const store = useContext(StoreContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [reschedule, setReschedule] = useState(false);
  const [loader, setLoader] = useState(false);
  const [details, setDetails] = useState();
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [jobID, setJobId] = useState();
  const onRefresh = useCallback(() => {
    store.setIsRefreshing(true);
    setTimeout(() => {
      _getAppliedJobData(store);
      store.setIsRefreshing(false);
    }, 2000);
  }, []);

  const _acceptSchedule = () => {

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

    var formdata = new FormData();
    formdata.append("candidateid", store.token?.user?.owner_id);
    formdata.append("jobid", jobID);
    console.log(formdata)
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    fetch(`${url.baseUrl}/acceptSchedule`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.success == true) {
          JToast({
            type: 'success',
            text1: result.message
          });

        } else {
          JToast({
            type: 'error',
            text1: result.message
          });
        }
      })
      .catch(error => console.log('error', error))
      .finally(() => {
        setLoader(false);
        setModalVisible(false);
      });
  };
  const _reschedule = (values) => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

    var formdata = new FormData();
    formdata.append("reschedule_time", moment(values.interview_date_and_time).format('YYYY/MM/DD HH:mm'));
    formdata.append("candidateid", store.token?.user?.owner_id);
    formdata.append("jobid", jobID);
    console.log(formdata)
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    fetch(`${url.baseUrl}/reschedule`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.success == true) {
          JToast({
            type: 'success',
            text1: result.message
          });

        } else {
          JToast({
            type: 'error',
            text1: result.message
          });
        }
      })
      .catch(error => console.log('error', error))
      .finally(() => {
        setLoader(false);
        setReschedule(false);
        setModalVisible(false);
      });
  };

  const _getScheduleDetails = () => {
    setLoader(true);
    setModalVisible(true);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    fetch(`${url.baseUrl}/scheduleDetail/${store.token?.user?.owner_id}/${jobID}`, requestOptions)
      .then(response => response.json())
      .then(result => {
         setDetails(result[0]?.start_time);
      })
      .catch(error => {
        console.log('error', error);

      })
      .finally(() => {
        setLoader(false);
      });
  };






  // const date = startTimeMoment.format('YYYY/MM/DD');
  // console.log('date',date )
  // const time = startTimeMoment.format('HH:mm');
  // console.log('time',time)

  const statusArr = [
    { id: 0, name: store.lang.drafted },
    { id: 1, name: store.lang.applied },
    { id: 2, name: store.lang.rejected },
    { id: 3, name: store.lang.selected },
    { id: 4, name: store.lang.shortlisted },
    { id: 5, name: store.lang.invitation_Sent },
    { id: 6, name: store.lang.interview_scheduled },
    { id: 7, name: store.lang.interview_accepted },
    { id: 8, name: store.lang.interview_rescheduled },
    { id: 9, name: store.lang.interview_completed },

  ]

  return (
    <JScreen
      isError={store.appliedJobError}
      errorText={'Reload Screen!'}
      onReloadPress={() => _getAppliedJobData(store)}
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {store.lang.applied_job}
            </JText>
          }
          right={
            // store.appliedJobList.appliedJob.length > 0 &&
            store.appliedJobApiLoader === false && (
              <Menu>
                <MenuTrigger>
                  <Entypo
                    name="dots-three-vertical"
                    size={RFPercentage(2.8)}
                    color={colors.white[0]}
                  />
                </MenuTrigger>

                <MenuOptions>
                  {[store.lang.all, ...store.appliedJobList?.statusArray].map(
                    (item, index) => (
                      <MenuOption
                        style={{
                          marginHorizontal: RFPercentage(1),
                          paddingVertical: RFPercentage(1.5),
                        }}
                        key={index}
                        onSelect={() => {
                          store.setAppliedJobSelect(item);
                        }}>

                        <JText>{item}</JText>
                      </MenuOption>
                    ),
                  )}
                </MenuOptions>
              </Menu>
            )
          }
        />
      }
      style={{ marginHorizontal: RFPercentage(2) }}>
      {store.appliedJobApiLoader === true ? (
        <CLFavouriteJob />
      ) : (
        <React.Fragment>
          <JSearchInput
            length={store.appliedJobList?.appliedJob?.length}
            onChangeText={e => {
              store.setAppliedJobInput(e);
            }}
            onPressIcon={() => alert('Icon Pressed')}
          />
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={store.isRefreshing}
                onRefresh={onRefresh}
              />
            }
            data={
              store.appliedJobInput?.length > 0
                ? store.appliedJobList?.appliedJob?.filter(e =>
                  e.job_title
                    .toLowerCase()
                    .includes(store.appliedJobInput.toLowerCase()),
                )
                : store.appliedJobSelect?.length > 0 &&
                  store.appliedJobSelect !== store.lang.all
                  ? store.appliedJobList?.appliedJob?.filter(
                    e =>
                      e?.application_status?.toLowerCase() ===
                      store?.appliedJobSelect?.toLowerCase(),
                  )
                  : store.appliedJobList?.appliedJob
            }
            ListEmptyComponent={() => <JEmpty />}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (

              <JJobTile
                onPress={() =>
                  navigation.navigate('JobDetails', {
                    id: item.job_unique_id,
                  })
                }
                type="appliedjob"
                containerStyle={{ marginBottom: RFPercentage(2) }}
                isJob={true}
                onPressStatus={() => { ` ${setJobId(item?.job_id)}${item.status_id == 6 && _getScheduleDetails()}` }}
                img={item.company_url}
                title={item.job_title}
                location={item.city_name}
                category={item.job_category}
                status={item.status_id}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </React.Fragment>
      )}

      <Modal animationType="slide" visible={modalVisible}>
        <View style={{ marginBottom: RFPercentage(10) }}>
          <JGradientHeader
            center={
              <JText
                fontColor={colors.white[0]}
                fontWeight="bold"
                fontSize={RFPercentage(2.5)}>
                {store.lang.action_for_interview_schedule}
              </JText>
            }
          />
          {loader ? <ActivityIndicator />
            : <Formik
              initialValues={{
                interview_date_and_time: new Date(),
              }}
              onSubmit={values => {
                _reschedule(values);
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
                  style={{ justifyContent: 'space-between', height: '90%', marginHorizontal: RFPercentage(2) }}>
                  {reschedule == true ?
                    <View >
                      <JText style={styles.headers}>
                        {store.lang.interview_date} :
                      </JText>
                      <JText style={styles.date}>  {!details?'--/--/--':moment(details).format('DD/MM/YYYY')}</JText>

                      <JText style={styles.headers}>
                        {store.lang.interview_time} :
                      </JText>
                      <JText style={styles.date}>{!details?'--/--':moment(details).format('HH:mm A')}</JText>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          // flexDirection: store.lang.id===0?'row':'row-reverse',
                          paddingTop: RFPercentage(1),
                          marginBottom: RFPercentage(1),
                        }}>
                        <JText
                          style={styles.headers}>
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
                            {moment(values.interview_date_and_time).format('YYYY/MM/DD HH:mm')}
                          </JText>
                        </Pressable>
                      </View>
                    </View>
                    : <View >
                      <JText style={styles.headers}>
                        {store.lang.interview_date} :
                      </JText>
                      <JText style={styles.date}>
                      {!details?'--/--/--':moment(details).format('DD/MM/YYYY')}
                      </JText>

                      <JText style={styles.headers}>
                        {store.lang.interview_time} :
                      </JText>
                      <JText style={styles.date}>
                      {!details?'--/--':moment(details).format('HH:mm A')}
                      </JText>
                    </View>}
                  <View>
                    <JButton
                      style={{ backgroundColor: colors.success[0], marginVertical: RFPercentage(1), borderColor: 'transparent', alignSelf: 'flex-end', }}
                      onPress={() => {
                        if (reschedule) {
                          handleSubmit();
                        } else {
                          _acceptSchedule();
                        }
                      }}>
                      {reschedule == true ? store.lang.submit : store.lang.accept}
                    </JButton>
                    {reschedule == false &&
                      <JButton
                        style={{ marginVertical: RFPercentage(1), alignSelf: 'flex-end', }}
                        onPress={() => {setReschedule(true),_getScheduleDetails()}}>
                        {store.lang.re_schedule}
                      </JButton>}
                    <JButton
                      style={{ backgroundColor: colors.border[0], marginVertical: RFPercentage(1), borderColor: 'transparent', alignSelf: 'flex-end', }}
                      onPress={() => { setReschedule(false), setOpen(false), setModalVisible(false) }}>
                      {store.lang.close}
                    </JButton>
                  </View>
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
            </Formik>}
        </View>
      </Modal>
    </JScreen>
  );
}

export default observer(AppliedJobs);

const styles = StyleSheet.create({
  headers: { fontWeight: 'bold', fontSize: RFPercentage(3), marginVertical: RFPercentage(2), },
  date: { fontSize: RFPercentage(2.5), marginHorizontal: RFPercentage(2), },
});
