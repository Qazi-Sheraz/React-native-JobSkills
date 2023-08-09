import {
  StyleSheet,
  FlatList,
  View,
  ScrollView,
  Pressable,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import JScreen from '../../customComponents/JScreen';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JText from '../../customComponents/JText';
import colors from '../../config/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';
import JSearchInput from '../../customComponents/JSearchInput';
import JRow from '../../customComponents/JRow';
import JApplication from '../../customComponents/JApplication';
import Sort from '../../assets/svg/Icon/Sort.svg';
import Arrow_Up from '../../assets/svg/Icon/Arrow_Up.svg';
import Arrow_Down from '../../assets/svg/Icon/Arrow_Down.svg';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import { StoreContext } from '../../mobx/store';
import RBSheet from 'react-native-raw-bottom-sheet';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import JChevronIcon from '../../customComponents/JChevronIcon';
import { observer } from 'mobx-react';
import url from '../../config/url';
import JNotfoundData from '../../customComponents/JNotfoundData';
import JApiError from '../../customComponents/JApiError';
import { _jobApplication } from '../../functions/Candidate/BottomTab';
import JEmpty from '../../customComponents/JEmpty';
import DatePicker from 'react-native-date-picker';
import { Formik } from 'formik';
import * as yup from 'yup';
import JButton from '../../customComponents/JButton';
import JIcon from '../../customComponents/JIcon';
import moment from 'moment';
import { JToast } from '../../functions/Toast';
const JobApplication = ({ route }) => {
  const { navigate, goBack } = useNavigation();
  const [selectedItem, setSelectedItem] = useState();
  const store = useContext(StoreContext);
  const handleSelect = status => {
    setSelectedItem(status);

  };
  const [modalVisible, setModalVisible] = useState(false);
  const refRBSheet = useRef();


  const data = [
    { status: 'All' },
    { id: 0, status: store.lang.drafted },
    { id: 1, status: store.lang.applied },
    { id: 2, status: store.lang.rejected },
    { id: 3, status: store.lang.selected },
    { id: 4, status: store.lang.shortlisted },
    { id: 5, status: store.lang.invitation_Sent },
    { id: 6, status: store.lang.interview_scheduled },
    { id: 7, status: store.lang.interview_accepted },
    { id: 8, status: store.lang.interview_rescheduled },
    { id: 9, status: store.lang.interview_completed },
  ];

  const filterData = status => {

    store.setJApplication(store.jApplication.filter(e => e.status == status));

    refRBSheet.current.close();
  };

  const sortByNameAscending = () => {
    store.setJApplication(
      [...store.jApplication].sort((a, b) =>
        a.candidate_name.localeCompare(b.candidate_name),
      ),
    );
  };
  const sortByFitScoreAscending = () => {
    store.setJApplication(
      [...store.jApplication].sort((a, b) => a.fit_score - b.fit_score)
    );
  };
  const sortByFitScoreDescending = () => {
    store.setJApplication(
      [...store.jApplication].sort((a, b) => b.fit_score - a.fit_score)
    );
  };
  const sortByNameDescending = () => {
    store.setJApplication(
      [...store.jApplication].sort((a, b) =>
        b.candidate_name.localeCompare(a.candidate_name),
      ),
    );
  };

  const sortByRecentApplyDateDescending = () => {
    store.setJApplication(
      [...store.jApplication].sort(
        (a, b) => new Date(b.apply_date) - new Date(a.apply_date),
      ),
    );
  };

  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
  const [loader1, setLoader1] = useState(true);
  const isFoucs = useIsFocused();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData1, setFilteredData1] = useState(store.jApplication);
  const [update, setUpdate] = useState(true);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [jobID, setJobId] = useState();
  const [reschedule, setReschedule] = useState(false);
  const [details, setDetails] = useState();
  const cId = store.jApplication[0]?.candidate_user_id;
  const [open, setOpen] = useState(false);
  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = store.jApplication.filter((item) => {
      return item.candidate_name.toLowerCase().includes(text.toLowerCase());
    });
    setFilteredData1(filtered);
  };
  // console.log('rescheduled',store.rescheduled)
  const _jobApplication = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization', `Bearer ${store.token?.token}`,
    );
    fetch(
      `${url.baseUrl}/employer/jobs/${route?.params?.id}/applications`,

      {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      },
    )
      .then(response => response.json())
      .then(result => {
        // console.log(result?.job_application[0].candidate_user_id)
        store.setJApplication(result?.job_application)

      })
      .catch(error => {
        console.log('application===error', error);
        store.setJAppError(true);
      })
      .finally(() => {
        store.setJAppLoader(false);
      });
  };
  const _getScheduleDetails = () => {
    setModalVisible1(true);
    setLoader(true);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    fetch(`${url.baseUrl}/scheduleDetail/${cId}/${jobID}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result?.start_time)
        setDetails(result[0]?.start_time);
      })
      .catch(error => {
        console.log('error', error);

      })
      .finally(() => {
        setLoader(false);
      });
  };
  const _acceptSchedule = () => {

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

    var formdata = new FormData();
    formdata.append("candidateid", cId);
    formdata.append("jobid", jobID);
    console.log(formdata)
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    fetch(`${url.baseUrl}/acceptSchedule`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          
          JToast({
            type: 'success',
            text1: result.message,
          });
          setModalVisible1(false)
        } else {
          JToast({
            type: 'error',
            text1: result.message,
          });
        }
      })
      .catch((error) => {
        console.log('Error:', error);
        JToast({
          type: 'error',
          text1: 'An error occurred. Please try again later.',
        });
      })
      .finally(() => {
        setUpdate(!update)
        _jobApplication()
        // setLoader1(false);
      });
  };
  const _reschedule = (values) => {
    // Create headers with Authorization token
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

    // Create FormData with necessary data
    var formdata = new FormData();
    formdata.append("reschedule_time", moment(values.interview_date_and_time).format('YYYY/MM/DD HH:mm'));
    formdata.append("candidateid", cId);
    formdata.append("jobid", jobID);
    console.log('formdata', formdata)
    // Set up request options
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    // Send the POST request using Fetch API
    fetch(`${url.baseUrl}/reschedule`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          // Success message
          JToast({
            type: 'success',
            text1: result.message
          });
          // Update states if needed
          setReschedule(false)
          store.setRescheduled(moment(values.interview_date_and_time).format('YYYY/MM/DD HH:mm'))
          setModalVisible1(false)
        } else {
          // Error message
          JToast({
            type: 'error',
            text1: result.message
          });
        }
      })
      .catch(error => {
        console.log('Error:', error);
        // Handle error scenario if needed
      })
      .finally(() => {
        // Regardless of success or error, set loader state to false
        // setLoader1(false);
      });
  };

  useEffect(() => {
    store.setJAppLoader(true)
    _jobApplication()
  }, [update]);

  return (
    <JScreen>
      <JGradientHeader
        center={
          <JText
            fontColor={colors.white[0]}
            fontWeight="bold"
            fontSize={RFPercentage(2.5)}>
            {store.lang.job_Applicants}
          </JText>
        }
        left={JChevronIcon}
      />

      {store.jAppLoader ? (
        <ActivityIndicator />
      ) :
        error == true ?
          <JApiError
            onTryAgainPress={() => {
              _jobApplication();
              store.setJAppError(false)
            }}
          /> :
          store.jApplication?.length > 0 ? (
            <>
              <JRow
                style={{
                  paddingHorizontal: RFPercentage(2),
                  justifyContent: 'space-between',
                }}>
                <JSearchInput
                  inputStyle={{ width: '75%', alignSelf: 'center' }}
                  length={1}
                  onChangeText={handleSearch}
                  value={searchQuery}
                  onPressIcon={() => alert('Icon Pressed')}
                />
                <Menu>
                  <MenuTrigger
                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Sort height={RFPercentage(7)} width={RFPercentage(8)} />
                  </MenuTrigger>
                  <MenuOptions>
                    <JText style={styles.menuhead}>{store.lang.sort_by}</JText>
                    <MenuOption onSelect={sortByFitScoreDescending}>
                      <JRow>
                        <JText style={styles.menutxt}>
                          {store.lang.candidate_fit_score}
                        </JText>
                        <Arrow_Up />
                      </JRow>
                    </MenuOption>
                    <MenuOption onSelect={sortByFitScoreAscending}>
                      <JRow>
                        <JText style={styles.menutxt}>
                          {store.lang.candidate_fit_score}
                        </JText>
                        <Arrow_Down />
                      </JRow>
                    </MenuOption>
                    <MenuOption onSelect={sortByRecentApplyDateDescending}>
                      <JText style={styles.menutxt}>
                        {store.lang.recent_apply_date}
                      </JText>
                    </MenuOption>
                    {/* <MenuOption onSelect={() => refRBSheet.current.open()}>
                  <JText style={styles.menutxt}>
                    {store.lang.status_of_application}
                  </JText>
                </MenuOption> */}
                  </MenuOptions>
                </Menu>
              </JRow>

              <FlatList
                style={{ flex: 1, paddingHorizontal: RFPercentage(2) }}
                data={searchQuery?.length > 0 ? filteredData1 : store.jApplication}
                renderItem={({ item, index }) => (

                  <JApplication
                    update={update}
                    setUpdate={setUpdate}
                    onPressStatus={() => { `${setJobId(item?.job_id)} ${item.status_id == 8 && _getScheduleDetails()}` }}
                    onPress={() => {
                      setModalVisible(true);
                    }}
                    onSelect={handleSelect}
                    item={item}
                  // date={moment(item.apply_date, 'DD-MM-YYYY').format('DD MMM,YYYY')}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
            </>
          ) : (
            <JEmpty />
          )}
      {/* <RBSheet
        ref={refRBSheet}
        // closeOnDragDown={false}
        closeOnPressMask={true}
        height={heightPercentageToDP(46)}
        customStyles={{
          container: {
            borderTopLeftRadius: RFPercentage(2.5),
            borderTopRightRadius: RFPercentage(2.5),
          },
          wrapper: {
            backgroundColor: '#00000080',
          },
          draggableIcon: {
            backgroundColor: colors.black[0],
            display: 'none',
          },
        }}>
        <View style={styles.RBView}>
          <JText style={styles.RBHeader}>
            {store.lang.status_of_application}
          </JText>
          <ScrollView showsVerticalScrollIndicator={false}>
            {data?.map((item, index) => (
              <JText
                key={index}
                onPress={() => filterData(item.status)}
                style={styles.RBtxt}>
                {item.status}
              </JText>
            ))}
          </ScrollView>
        </View>
      </RBSheet> */}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <Pressable
          onPress={() => setModalVisible(!modalVisible)}
          style={styles.centeredView}>
          {store.jAppLoader ? <ActivityIndicator /> :
            <View style={styles.modalView}>
              <JText fontColor={colors.white[0]} fontSize={RFPercentage(1.8)} style={{ paddingHorizontal: store.jApplication[0]?.fit_score_information == null ? RFPercentage(10) : RFPercentage(0) }}>
                {store.jApplication[0]?.fit_score_information == null ? 'N/A' : store.jApplication[0]?.fit_score_information}

              </JText>
            </View>}
        </Pressable>
      </Modal>

      <Modal animationType="slide" visible={modalVisible1}>
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
                setLoader1(true)
                _reschedule(values)
                setLoader1(false)
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
                      <JText style={styles.date}>{!details ? '--/--/--' : moment(details).format('DD/MM/YYYY')}</JText>

                      <JText style={styles.headers}>
                        {store.lang.interview_time} :
                      </JText>
                      <JText style={styles.date}>{!details ? '--/--' : moment(details).format('HH:mm A')}</JText>
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
                        {!details ? '--/--/--' : moment(details).format('DD/MM/YYYY')}
                      </JText>

                      <JText style={styles.headers}>
                        {store.lang.interview_time} :
                      </JText>
                      <JText style={styles.date}>
                        {!details ? '--/--' : moment(details).format('HH:mm A')}
                      </JText>
                    </View>}

                  <View>
                    {store.rescheduled !== moment(details).format('YYYY/MM/DD HH:mm') &&
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
                      </JButton>}
                    {reschedule == false && store.rescheduled !== moment(details).format('YYYY/MM/DD HH:mm') && 
                      <JButton
                        style={{ marginVertical: RFPercentage(1), alignSelf: 'flex-end', }}
                        onPress={() => { setReschedule(true), _getScheduleDetails() }}>
                        {store.lang.re_schedule}
                      </JButton>}
                    <JButton
                      style={{ backgroundColor: colors.border[0], marginVertical: RFPercentage(1), borderColor: 'transparent', alignSelf: 'flex-end', }}
                      onPress={() => {
                        setReschedule(false), setOpen(false), setModalVisible1(false)
                        // ,store.setRescheduled('')
                      }}>
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
};

export default observer(JobApplication);

const styles = StyleSheet.create({
  menu: { marginTop: RFPercentage(5) },
  menuhead: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    marginVertical: RFPercentage(1),
    paddingHorizontal: RFPercentage(1),
  },
  menutxt: {
    fontSize: RFPercentage(2),
    marginVertical: RFPercentage(0.5),
    paddingHorizontal: RFPercentage(1),
  },
  RBView: { paddingHorizontal: RFPercentage(2.5), paddingTop: RFPercentage(2) },
  RBHeader: {
    fontSize: RFPercentage(2.8),
    fontWeight: 'bold',
    marginVertical: RFPercentage(0.5),
  },
  RBtxt: {
    fontSize: RFPercentage(2.4),
    fontWeight: '600',
    marginVertical: RFPercentage(0.8),
    width: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: RFPercentage(2.5),
    backgroundColor: '#747474',
    borderRadius: RFPercentage(2),
    padding: RFPercentage(1.5),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headers: { fontWeight: 'bold', fontSize: RFPercentage(3), marginVertical: RFPercentage(2), },
  date: { fontSize: RFPercentage(2.5), marginHorizontal: RFPercentage(2), },
});
