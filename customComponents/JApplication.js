import {Pressable, StyleSheet, View,Modal,SafeAreaView,ScrollView, Switch, Text} from 'react-native';
import React, { useState ,useContext,useEffect} from 'react';
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
import Toast from 'react-native-toast-message';
import { StoreContext } from '../mobx/store';

import url from '../config/url';
import JGradientHeader from './JGradientHeader';
import {Formik} from 'formik';
import * as yup from 'yup';
import JInput from './JInput';
import JButton from './JButton';
import DatePicker from 'react-native-date-picker';
import { useRoute,useNavigation } from '@react-navigation/native';
import { keys, values } from 'mobx';
// import url from '../../config/url';
export default function JApplication({
  Hname,
  status,
  ApplyDate,
  onSelect,
  onPress,
  item,
  jobApplications,
}) {
  const{params}=useRoute();
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
  const [option, setOption] = useState(false);
  
  const [meetings, setMeetings] = useState();
  const [menu, setMenu] = useState('');

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const store = useContext(StoreContext);
  const navigation=useNavigation();
const [stat,setStat]=useState(item.status);
  const [selectedStatus, setSelectedStatus] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const handleStatusSelect = (status1) => {
    setSelectedStatus(status1);
    status1==store.lang.drafted
    ?_applicantsStatus(0,'Drafted')
    :  status1== store.lang.applied
    ?_applicantsStatus(1,'Applied')
    :  status1==store.lang.rejected
    ?_applicantsStatus(2,'Rejected')
    :  status1==store.lang.selected
    ?_applicantsStatus(3,'Selected')
    :  status1==store.lang.shortlisted
    ?_applicantsStatus(4,'Shortlisted')
    :  status1==store.lang.invitation_Sent
    ?_applicantsStatus(5,'Invitation Sent')
    :  status1==store.lang.interview_scheduled
    ?_applicantsStatus(6,'Interview Scheduled')
    :  status1==store.lang.interview_accepted
    ?_applicantsStatus(7,'Interview Accepted')
    :  status1==store.lang.interview_rescheduled
    ?_applicantsStatus(8,'Interview Rescheduled')
    :  status1==store.lang.interview_completed && _applicantsStatus(9,'Interview Completed')
    // console.log(status1)
  };
  const _meetingSubmit = values => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization",`Bearer ${store.token?.token}`);

    var formdata = new FormData();
    
    formdata.append("topic", values.interview_topic);
    formdata.append(
      'start_time',
      moment(values.interview_date_and_time).format(
        'YYYY/MM/DD HH:MM',
      ));
    formdata.append("agenda", values.description);
    formdata.append("interviewType", values.interview_type === 'Office Base'? 0:'Zoom'? 1:2);
    formdata.append("office_location", values.office_location);
    formdata.append("zoom_link", values.zoom_link);
    formdata.append("candidateID", item.candidate_user_id);
    formdata.append("jobid",item.job_id);
  //  console.log('formdata',formdata)


    fetch(`${url.baseUrl}/meetings-submit`, {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    })
      .then(response => response.json())
      .then(result => { 
        
      if (result.success === true ){
             Toast.show({
               type: 'success',
               text1: 'Successfully Meeting created',
             });
             
        // console.log('success===','true')
        // navigate('Meeting',)   
      }
      
      else{ 
        // console.log('error',message);
        Toast.show({
        type: 'error',
        // text1: result.message,
      });
    }
  }).catch(error => 
      console.log('error', error));
   
  };
  

  const _applicantsStatus = (id,selectedStatus) => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${store.token?.token}`,
    );


    fetch(`${url.baseUrl}/employer/job-applications/${item.id}/status/${id}`,{
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    }
    )  
      .then(response => response.json())
      .then(result => {
        // console.log(`${url.baseUrl}/employer/job-applications/${item.id}/status/${id}`)
        console.log(result)
        if (result.success == true) {
          setStat(selectedStatus)
        
       }
       else{

         Toast.show({
           type: 'error',
           text1: message,
         });
       }

      })
      .catch(error => {
        console.log('error', error);
        // setError(true);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  const _interviewScheduled = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${store.token?.token}`,
    );


    fetch(`${url.baseUrl}/employer/ScheduleDetail/${item.candidate_user_id}/${item.job_id}`,{
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    }
    )  

      .then(response => response.json())
      .then(result => {
        // console.log(result)
          setMeetings(result)})
       
      .catch(error => {
        console.log('error', error);
        // setError(true);
      })
      .finally(() => {
        setLoader(false);
      });
  };

            // console.log(item.candidate_user_id);
  // const handleDateChange = (selectedDate) => {
  //   setDate(selectedDate);
  //   setOpen(false);
  // };
//  useEffect(() => {
//  _applicantsStatus()
//  }, [loader])
 useEffect(() => {
  _interviewScheduled()
 }, [loader])


// Replace the placeholders with the selected date and time
const updatedDescription =(description,value)=>description.replace(
  /--Select Time--/i,
  moment(value).format('HH:MM'),
).replace(/--Select Date--/i, moment(value).format('YYYY/MM/DD'))
;



  return (
    <>
      <Pressable
        onPress={() =>
          navigation.navigate('ProfileApplication', {
            candidate_id: item.candidate_id,
            job_id: item.job_id,
            id: item.id,
          })
        }
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
              <MenuOption
                onSelect={() => handleStatusSelect(store.lang.drafted)}>
                <JText style={styles.menutxt}>{store.lang.drafted}</JText>
              </MenuOption>
              <MenuOption
                onSelect={() => handleStatusSelect(store.lang.applied)}>
                <JText style={styles.menutxt}>{store.lang.applied}</JText>
              </MenuOption>
              <MenuOption
                onSelect={() => handleStatusSelect(store.lang.rejected)}>
                <JText style={styles.menutxt}>{store.lang.rejected}</JText>
              </MenuOption>
              <MenuOption
                onSelect={() => handleStatusSelect(store.lang.selected)}>
                <JText style={styles.menutxt}>{store.lang.selected}</JText>
              </MenuOption>
              <MenuOption
                onSelect={() => handleStatusSelect(store.lang.shortlisted)}>
                <JText style={styles.menutxt}>{store.lang.shortlisted}</JText>
              </MenuOption>
              <MenuOption
                onSelect={() => handleStatusSelect(store.lang.invitation_Sent)}>
                <JText style={styles.menutxt}>
                  {store.lang.invitation_Sent}
                </JText>
              </MenuOption>
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
              <MenuOption
                onSelect={() =>
                  handleStatusSelect(store.lang.interview_accepted)
                }>
                <JText style={styles.menutxt}>
                  {store.lang.interview_accepted}
                </JText>
              </MenuOption>
              <MenuOption
                onSelect={() =>
                  handleStatusSelect(store.lang.interview_rescheduled)
                }>
                <JText style={styles.menutxt}>
                  {store.lang.interview_rescheduled}
                </JText>
              </MenuOption>
              <MenuOption
                onSelect={() =>
                  handleStatusSelect(store.lang.interview_completed)
                }>
                <JText style={styles.menutxt}>
                  {store.lang.interview_completed}
                </JText>
              </MenuOption>
            </MenuOptions>
          </Menu>
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
                {item.fit_scores == null ? 'N/A' : item.fit_scores}{' '}
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
            <JStatusChecker status={stat} />
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
                {'Interview Scheduled'}
              </JText>
            }
          />

          <Formik
            initialValues={{
              interview_topic: meetings?.interview_topic
                ? meetings?.interview_topic
                : '',
              interview_date_and_time: new Date(),
              description: meetings?.description ? meetings.description : '',
              interview_type: meetings?.meeting_type && meetings.meeting_type.length > 0 ? meetings.meeting_type[0] : '',
              office_location: '',
              zoom_link: '',
            }}
            onSubmit={values => {
              // console.log(values.interview_type=== 'Office Base'? 0:'Zoom' && 1);

              // const selectedMeetingTypeID = meetings?.meeting_type[0][values.interview_type];
              // console.log('Selected Meeting Type ID:', selectedMeetingTypeID);
              // setLoader(true);
              _meetingSubmit(values);
              setModalVisible(!modalVisible);
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
                  containerStyle={{marginTop: RFPercentage(1)}}
                  isRequired
                  heading={'Interview Topic: '}
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
                    paddingTop: RFPercentage(1),
                    marginBottom: RFPercentage(1),
                  }}>
                  <JText
                    style={{fontSize: RFPercentage(2.5), fontWeight: '500'}}>
                    Interview Date and Time :
                  </JText>
                  <Pressable
                    onPress={() => setOpen(true)}
                    style={{
                      height: RFPercentage(6),
                      flexDirection: 'row',
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
                        'YYYY/MM/DD HH:MM',
                      )}
                    </JText>
                  </Pressable>
                </View>
                <JInput
                  containerStyle={{marginTop: RFPercentage(1)}}
                  isRequired
                  multiline={true}
                  heading={'Description'}
                  value={updatedDescription(
                    values.description,
                    moment(values.interview_date_and_time).format(
                      'YYYY/MM/DD HH:MM',
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
                    style={{fontSize: RFPercentage(2.5), fontWeight: '500'}}>
                    Interview Type
                  </JText>
                  <Pressable
                    onPress={() => setOption(!option)}
                    style={styles.menuV}>
                    <JText
                      fontSize={RFPercentage(2)}
                      style={{paddingHorizontal: RFPercentage(1)}}>
                      {/* {menu ? menu : meetings?.meeting_type[0]} */}
                      {values.interview_type}
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
                      {(meetings?.meeting_type).map((item, index) => (
                        <Pressable
                          key={index}
                          style={{
                            padding: 10,
                            justifyContent: 'space-between',
                          }}
                          onPress={() => {
                           
                            setFieldValue('interview_type',item);
                            setOption(false);
                          }}>
                          <JText fontSize={RFPercentage(2)}>{item}</JText>
                        </Pressable>
                      ))}
                    </View>
                  )}
                </View>
                {values.interview_type === 'Office Base' ? (
                  <JInput
                    containerStyle={{marginTop: RFPercentage(1)}}
                    isRequired
                    placeholder={'https//map.app.goo.gl/B31UbkjUXD5XrvkHA'}
                    heading={'Office location'}
                    value={values.office_location}
                    error={
                      touched.office_location && errors.office_location && true
                    }
                    onChangeText={handleChange('office_location')}
                    onBlur={() => setFieldTouched('office_location')}
                  />
                ) : (
                  values.interview_type === 'Zoom' && (
                    <JRow style={{marginVertical: RFPercentage(2)}}>
                      <Switch
                        trackColor={{
                          false: '#767577',
                          true: colors.purple[0],
                        }}
                        thumbColor="#f4f3f4"
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                      />
                      <JText>Add Zoom Meeting Link Manually</JText>
                    </JRow>
                  )
                )}
                {isEnabled === true && values.interview_type === 'Zoom' && (
                   <JInput
                   containerStyle={{marginTop: RFPercentage(1)}}
                   placeholder={'Zoom'}
                  //  heading={'Zoom'}
                   value={values.zoom_link}
                   error={
                     touched.zoom_link && errors.zoom_link && true
                   }
                   onChangeText={handleChange('zoom_link')}
                   onBlur={() => setFieldTouched('zoom_link')}
                 />
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
                    Close
                  </JButton>
                  <JButton onPress={() => handleSubmit()}>Submit</JButton>
                </JRow>
                {open && (
                  <DatePicker
                    modal
                    open={open}
                    date={values.interview_date_and_time}
                    onConfirm={e => setFieldValue('interview_date_and_time', e)}
                    onCancel={() => setOpen(false)}
                  />
                )}
              </ScrollView>
            )}
          </Formik>
        </SafeAreaView>
      </Modal>
      <View></View>
    </>
  );
}

const styles = StyleSheet.create({
  Hname: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    marginVertical: RFPercentage(0.5),
    width:'80%'
  },
  info: {
    height: RFPercentage(3),
    width: RFPercentage(4),
    alignItems:'center',
    margin:RFPercentage(1)
    
  },
  txt: {fontSize: RFPercentage(2), marginVertical: RFPercentage(0.3)},
  menutxt: {
    fontSize: RFPercentage(2),
    marginVertical: RFPercentage(0.5),
    paddingHorizontal: RFPercentage(1),
  },
  menuV:{
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
});
