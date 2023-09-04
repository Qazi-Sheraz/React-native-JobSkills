import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import JScreen from '../../../customComponents/JScreen';
import JGradientHeader from '../../../customComponents/JGradientHeader';
import JText from '../../../customComponents/JText';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../../config/colors';
import JRow from '../../../customComponents/JRow';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useRef } from 'react';
import { useState } from 'react';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import JButton from '../../../customComponents/JButton';
import { Formik } from 'formik';
import * as yup from 'yup';
import JErrorText from '../../../customComponents/JErrorText';
import JInput from '../../../customComponents/JInput';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import JSelectInput from '../../../customComponents/JSelectInput';
import { useContext } from 'react';
import { StoreContext } from '../../../mobx/store';
import Experience from './SubHeagings/Experience';
import Education from './SubHeagings/Education';
import { useEffect } from 'react';
import JChevronIcon from '../../../customComponents/JChevronIcon';
import JScrollView from '../../../customComponents/JScrollView';
import { observer } from 'mobx-react';
import url from '../../../config/url';
import { JToast } from '../../../functions/Toast';
import JModal from '../../../customComponents/JModal';
import CLCareerInfo from '../../../loaders/Candidate/CareerInfo/CLCareerInfo';

const CareerInformation = ({ navigation }) => {
  const refRBSheet = useRef();
  const [selected, setSelected] = useState(0);
  const [loader, setLoader] = useState(true);
  const [loader1, setLoader1] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const [education, setEducation] = useState([]);
  const [edu, setEdu] = useState([]);
  const [experience, setExpereince] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedEdu, setSelectedEdu] = useState(null);
  const store = useContext(StoreContext);


  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState({
    experienceId: '',
    educationId: ''
  })

  const _addExperince = values => {
    setLoader1(true);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token.token}`);

    var formdata = new FormData();

    formdata.append('experience_title', values.title);
    formdata.append('company', values.company);
    formdata.append('country_id', values.county.id);
    formdata.append('state_id', `${values.state.id}`);
    formdata.append('city_id', `${values.city.id}`);
    formdata.append('start_date', moment(values.start).format('YYYY/MM/DD'));

    values.working === false &&

      formdata.append('end_date', moment(values.end).format('YYYY/MM/DD'));
    formdata.append('currently_working', values.working ? '1' : '0');
    formdata.append('description', values.description);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch(selectedExperience == null ? `${url.baseUrl}/experience-create` : `${url.baseUrl}/candidate-experience-update/${selectedExperience?.experienceId}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (moment(values.start).format('DD MMM YYYY') === moment(values.end).format('DD MMM YYYY')) {
          JToast({
            type: 'danger',
            text1: store.lang.eror,
            text2: result.end_date[0],
            // visibilityTime: 1500
          });

          setLoader1(false);
        }
        else {
          selectedExperience !== null && (
            _addExp(result.data?.candidateExperience))
             
          JToast({
            type: 'success',
            text1: store.lang.success,
            text2: result.message,
          });
          _getExperience();
          setLoader1(false);
          refRBSheet.current.close();
        }
      })
      .catch(error => {
        console.log('error', error);
        setLoader1(false);
      });
  };

  const _addEducation = values => {
    setLoader1(true);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token.token}`);

    var formdata = new FormData();
    formdata.append('degree_level_id', values.level?.id);
    formdata.append('degree_title', values.title);
    formdata.append('country_id', `${values.county?.id}`);
    formdata.append('state_id', `${values.state?.id}`);
    formdata.append('city_id', `${values.city?.id}`);
    formdata.append('institute', values.institude);
    formdata.append('result', values.result);
    formdata.append('year', `${values.year?.name}`);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch(
      selectedEdu == null ? `${url.baseUrl}/candidate-education-create` : `${url.baseUrl}/candidate-education-update/${selectedEdu?.educationId}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        // console.log(result.data);
        selectedEdu !== null &&(
          _addEdu(result.data)) 
          _getExperience();
        JToast({
          type: 'success',
          text1: store.lang.success,
          text2: result.message,
        });
        setLoader1(false);
        refRBSheet.current.close();
      })
      .catch(error => {
        console.log('error', error);
        setLoader1(false);
      });
  };

  const _getExperience = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    setApiLoader(true);
    fetch(
      'https://dev.jobskills.digital/api/career-information',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        // console.log(result.canidateEducation);
        setEducation(result.canidateEducation);
        setExpereince(result.canidateExperience);
        setApiLoader(false);
      })
      .catch(error => {
        // console.log('error', error);
        JToast({
          type: 'danger',
          text1: store.lang.eror,
          text2: store.lang.error_while_getting_data,
        });
        setApiLoader(false);
      });
  };
  const _getEdu = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    setApiLoader(true);
    fetch(
      `${url.baseUrl}/edit-general-profile`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        setEdu(result);
        setApiLoader(false);
      })
      .catch(error => {
        // console.log('error', error);
        JToast({
          type: 'danger',
          text1: store.lang.eror,
          text2: store.lang.error_while_getting_data,
        });
        setApiLoader(false);
      });
  };
  const _Edelete = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token.token}`);

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
    };
    // console.log(requestOptions);
    fetch(
      `https://dev.jobskills.digital/api/candidate-experience-delete/${id?.experienceId}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if(result.success){
        setExpereince(experience.filter(e => e.id?.experienceId !== id?.experienceId));
        JToast({
          type: 'danger',
          text1: store.lang.success,
          text2: result.message,
        });
        _getExperience()
        setModalVisible(false)
}
      })
    // .catch(error => console.log('error', error));
  };


  const _delete = () => {
    // console.log(id);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
    };
    fetch(
      `https://dev.jobskills.digital/api/candidate-education-delete/${id?.educationId}`,
      requestOptions,

    )
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        if(result.success){
        setEducation(education.filter(e => e.id?.educationId !== id?.educationId));
        JToast({
          type: 'danger',
          text1: store.lang.success,
          text2: result.message,
        });
        _getExperience();
        setModalVisible(false)}
        
      })
    // .catch(error => console.log('error', error));
  };


  const _addExp = e => {
    let arr = [...experience];
    // arr.push(e);
    arr.unshift(e);
    setExpereince(arr);
  };

  const _addEdu = e => {
    let arr = [...education];
    arr.unshift(e);

    setEducation(arr);
  };
  useEffect(() => {
    _getExperience();
    _getEdu();
  }, []);

  const currentDate = new Date();

  // Calculate the maximum start date (1 day before the current date)
  const maximumStartDate = new Date(currentDate);
  maximumStartDate.setDate(currentDate.getDate() - 1);
  return (
    <JScreen
      headerShown={true}
      header={
        <JGradientHeader
          center={
            <JText
              onPress={() => add()}
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {store.lang.career_information}
            </JText>
          }
          left={<JChevronIcon />}
        />
      }>
      {apiLoader ? (
        // <ActivityIndicator />
        <CLCareerInfo/>

      ) : (
        <ScrollView
          style={{
            paddingHorizontal: RFPercentage(2),
            marginTop: RFPercentage(3),
          }}
          contentContainerStyle={{
            paddingBottom: RFPercentage(5),
          }}>
          <Experience
            loader={apiLoader}
            select={selected}
            experience={experience}
            setSelected={setSelected}
            refRBSheet={refRBSheet}
            _deleteExperience={(id) => {
              setModalVisible(true)
              setId({
                experienceId: id,
                educationId: ''
              })
            }}
            selectedExperience={selectedExperience}
            setSelectedExperience={setSelectedExperience}
          />
          <Education
            loader={apiLoader}
            select={selected}
            education={education}
            setSelected={setSelected}
            refRBSheet={refRBSheet}
            _deleteEducation={(id) => {
              setModalVisible(true)
              setId({
                experienceId: '',
                educationId: id
              })
            }}
            selectedEdu={selectedEdu}
            setSelectedEdu={setSelectedEdu}
          />
        </ScrollView>
      )}

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={false}
        height={heightPercentageToDP(97)}
        customStyles={{
          wrapper: {
            backgroundColor: '#00000080',
          },
          draggableIcon: {
            backgroundColor: colors.black[0],
            display: 'none',
          },
        }}>
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {selected == 0 ? store.lang.experience : store.lang.education}
            </JText>
          }
          left={<JChevronIcon onPress={() => refRBSheet?.current.close()} />}
        />
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          {/* {selected === 0 ? ( */}
          <Formik
            initialValues={
              selected === 0 ? {
                title:
                  selectedExperience?.title !== null
                    ? selectedExperience?.title
                    : '',
                company:
                  selectedExperience?.company !== null
                    ? selectedExperience?.company
                    : '',
                county: {
                  id:
                    experience[0]?.country?.id !== null
                      ? experience[0]?.country?.id
                      : '',
                  name: selectedExperience?.country,
                },
                city: {
                  id:
                    experience[0]?.city?.id !== null
                      ? experience[0]?.city?.id
                      : '',
                  name: selectedExperience?.city,
                },

                state: {
                  id:
                    experience[0]?.state?.id !== null
                      ? experience[0]?.state?.id
                      : '',
                  name: selectedExperience?.state,
                },
                start:
                  selectedExperience?.start !== null &&
                    selectedExperience?.start !== undefined
                    ? selectedExperience?.start
                    : '',
                end:
                  selectedExperience?.end !== null
                    ? selectedExperience?.end
                    : '',
                working: false,
                description:
                  selectedExperience?.description !== null
                    ? selectedExperience?.description
                    : '',
              }
                : {
                  title: selectedEdu?.title !== null ? selectedEdu?.title : '',
                  level: {
                    id:
                      selectedEdu?.degree_level_id !== null
                        ? selectedEdu?.degree_level_id
                        : '',
                    name:
                      selectedEdu?.degree_level !== null
                        ? selectedEdu?.degree_level
                        : '',
                  },
                  county: {
                    id: selectedEdu?.country_id,
                    name: selectedEdu?.country,
                  },
                  city: {
                    id: selectedEdu?.city_id,
                    name: selectedEdu?.city,
                  },

                  state: {
                    id: selectedEdu?.state_id,
                    name: selectedEdu?.state,
                  },
                  institude:
                    selectedEdu?.institute !== null
                      ? selectedEdu?.institute
                      : '',
                  result:
                    selectedEdu?.result !== null ? selectedEdu?.result : '',
                  year: {
                    name: selectedEdu?.year !== null ? selectedEdu?.year : '',
                  },
                }}
            onSubmit={values => {
              selected === 0 ?
                _addExperince(values)
                : _addEducation(values);
            }}
            validationSchema={yup.object().shape(
              selected === 0 ? {
                title: yup.string().required().label('Title'),
                company: yup.string().required().label('Company'),

                county: yup.object().shape().required('Country is required'),
                city: yup.object().shape().required('City is required'),
                state: yup.object().shape().required('State is required'),

                description: yup.string().required().label('Description'),
              }
                :
                {
                  title: yup.string().required().label('Title'),
                  level: yup.object().shape().required('Level is required'),
                  county: yup.object().shape().required('Country is required'),
                  city: yup.object().shape().required('City is required'),
                  state: yup.object().shape().required('State is required'),
                  institude: yup.string().required().label('Institude'),
                  result: yup.string().required().label('Eesult'),
                  year: yup.object().shape().required('Year is required'),
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
              selected === 0 ?
                (<>
                  <JScrollView
                    // contentContainerStyle={{paddingBottom: RFPercentage(8),}}
                    style={{
                      marginHorizontal: RFPercentage(2),
                    }}>
                    <JInput
                      style={{
                        textAlign: store.lang.id == 0 ? 'left' : 'right',
                      }}
                      isRequired={true}
                      containerStyle={{ marginTop: RFPercentage(2) }}
                      heading={`${store.lang.experience_title}:`}
                      value={values.title}
                      error={touched.title && errors.title && true}
                      onChangeText={handleChange('title')}
                      onBlur={() => setFieldTouched('title')}
                    />
                    {touched.title && errors.title && (
                      <JErrorText>{errors.title}</JErrorText>
                    )}
                    <JInput
                      style={{
                        textAlign: store.lang.id == 0 ? 'left' : 'right',
                      }}
                      isRequired={true}
                      containerStyle={{ marginTop: RFPercentage(2) }}
                      value={values?.company}
                      heading={`${store.lang.company}:`}
                      error={touched.company && errors.company && true}
                      onChangeText={handleChange('company')}
                      onBlur={() => setFieldTouched('company')}
                    />
                    {touched.company && errors.company && (
                      <JErrorText>{errors.company}</JErrorText>
                    )}

                    <JSelectInput
                      containerStyle={{ marginTop: RFPercentage(2) }}
                      data={
                        store.lang.id == 0
                          ? store.myProfile?.dataEnglish?.countries
                          : store.myProfile?.dataArabic?.countries
                      }
                      value={values?.county?.name}
                      header={store.lang.country}
                      heading={`${store.lang.country}:`}
                      setValue={e => {
                        setFieldValue('county', e);
                        setFieldValue('state', null);
                        setFieldValue('city', null);
                      }}
                      error={touched.county && errors.county && true}
                      rightIcon={
                        <Feather
                          name="chevron-down"
                          size={RFPercentage(2.5)}
                          color={colors.black[0]}
                        />
                      }
                    />
                    {touched.county && errors.county && (
                      <JErrorText>{errors.county}</JErrorText>
                    )}

                    <JSelectInput
                      containerStyle={{ marginTop: RFPercentage(2) }}
                      value={values.state?.name}
                      id={values.county?.id}
                      setValue={e => {
                        setFieldValue('state', e);
                        setFieldValue('city', null);
                      }}
                      header={store.lang.state}
                      heading={`${store.lang.state}:`}
                      error={touched.state && errors.state && true}
                      rightIcon={
                        <Feather
                          name="chevron-down"
                          size={RFPercentage(2.5)}
                          color={colors.black[0]}
                        />
                      }
                    />
                    {touched.state && errors.state && (
                      <JErrorText>{errors.state}</JErrorText>
                    )}

                    <JSelectInput
                      containerStyle={{ marginTop: RFPercentage(2) }}
                      value={values.city?.name}
                      setValue={e => setFieldValue('city', e)}
                      header={store.lang.city}
                      heading={`${store.lang.city}:`}
                      id={values.state?.id}
                      error={touched.city && errors.city && true}
                      rightIcon={
                        <Feather
                          name="chevron-down"
                          size={RFPercentage(2.5)}
                          color={colors.black[0]}
                        />
                      }
                    />
                    {touched.city && errors.city && (
                      <JErrorText>{errors.city}</JErrorText>
                    )}

                    <JSelectInput
                      isDate={true}
                      containerStyle={{ marginTop: RFPercentage(2) }}
                      date1={maximumStartDate}
                      maximumDate={maximumStartDate}
                      value={
                        values.start &&
                        moment(values.start).format('DD MMM YYYY')
                      }
                      setValue={e => {
                        {
                          values.start ?
                            setFieldValue('start', e)
                            : setFieldValue('start', maximumStartDate)
                        }
                        setFieldValue('end', '')
                      }}
                      header={store.lang.start_date}
                      heading={`${store.lang.start_date}:`}
                      error={touched.start && errors.start && true}
                      rightIcon={
                        <Feather
                          name="chevron-down"
                          size={RFPercentage(2.5)}
                          color={colors.black[0]}
                        />
                      }
                    />
                    {touched.start && errors.start && (
                      <JErrorText>{errors.start}</JErrorText>
                    )}

                    {values.working == false && (
                      <>
                        <JSelectInput
                          disabled={values.start !== '' ? false : true}
                          date={moment(values.end).format('DD MMM YYYY')}
                          // minimumDate={moment(values.start, 'DD MMM YYYY').add(1, 'day')}
                          minimumDate={new Date()}
                          containerStyle={{ marginTop: RFPercentage(2) }}
                          isDate={true}
                          value={values.end && moment(values.end).format('DD MMM YYYY')}
                          setValue={e => {
                            setFieldValue('end', e)
                            console.log(moment(e, 'DD MMM YYYY'))
                          }}
                          header={store.lang.end_date}
                          heading={`${store.lang.end_date}:`}
                          error={touched.end && errors.end && true}
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
                        // disabled={!values.start}
                        />
                        {touched.end && errors.end && (
                          <JErrorText>{errors.end}</JErrorText>
                        )}
                      </>
                    )}
                    <JInput
                      style={{
                        textAlign: store.lang.id == 0 ? 'left' : 'right',
                      }}
                      containerStyle={{ marginTop: RFPercentage(2) }}
                      heading={`${store.lang.description}:`}
                      value={values.description}
                      error={touched.description && errors.description && true}
                      onChangeText={handleChange('description')}
                      onBlur={() => setFieldTouched('description')}
                    />
                    {touched.description && errors.description && (
                      <JErrorText>{errors.description}</JErrorText>
                    )}
                    <JRow
                      style={{
                        justifyContent: 'space-between',
                        marginVertical: RFPercentage(2),
                      }}>
                      <JText fontWeight={'500'} fontSize={RFPercentage(2.5)}>
                        {store.lang.currently_working}
                      </JText>

                      <Switch
                        trackColor={{ true: colors.purple[0] }}
                        onValueChange={e => {
                          setFieldValue('working', e);
                        }}
                        value={values.working}
                      />
                    </JRow>
                  </JScrollView>

                  <View style={styles.bottomV}>

                    <JButton
                    disabled={loader1?true:false}
                      isValid={isValid}
                      onPress={() => handleSubmit()}
                      style={{
                        position: 'absolute',
                        bottom: RFPercentage(1),
                        width: RFPercentage(20),
                      }}>
                      {loader1 ? store.lang.loading : store.lang.save}
                    </JButton>
                  </View>
                </>)
                : (<>
                  <JScrollView
                    contentContainerStyle={{ paddingBottom: RFPercentage(8) }}
                    style={{
                      marginHorizontal: RFPercentage(2),
                    }}>
                    <JSelectInput
                      containerStyle={styles.container}
                      value={values.level?.name}
                      id={values.level?.id}
                      data={
                        store.lang.id == 0
                          ? edu?.dataEnglish?.degreeLevels
                          : edu?.dataArabic?.degreeLevels
                      }
                      header={store.lang.degree_level}
                      heading={`${store.lang.degree_level}:`}
                      setValue={e => setFieldValue('level', e)}
                      error={touched.level && errors.level && true}
                      rightIcon={
                        <Feather
                          name="chevron-down"
                          size={RFPercentage(2.5)}
                          color={colors.black[0]}
                        />
                      }
                    />
                    {touched.level && errors.level && (
                      <JErrorText>{errors.level}</JErrorText>
                    )}
                    {/* <JInput
                   style={{
                     textAlign: store.lang.id == 0 ? 'left' : 'right',
                   }}
                   keyboardType={'numeric'}
                     isRequired={true}
                     containerStyle={styles.container}
                     heading={`${store.lang.degree_level}:`}
                     value={values.level}
                     error={touched.level && errors.level && true}
                     onChangeText={handleChange('level')}
                     onBlur={() => setFieldTouched('level')}
                   />
                   {touched.level && errors.level && (
                     <JErrorText>{errors.level}</JErrorText>
                   )} */}
                    <JInput
                      style={{
                        textAlign: store.lang.id == 0 ? 'left' : 'right',
                      }}
                      isRequired={true}
                      containerStyle={styles.container}
                      value={values.title}
                      heading={`${store.lang.degree_title}:`}
                      error={touched.title && errors.title && true}
                      onChangeText={handleChange('title')}
                      onBlur={() => setFieldTouched('title')}
                    />
                    {touched.title && errors.title && (
                      <JErrorText>{errors.title}</JErrorText>
                    )}

                    <JSelectInput
                      containerStyle={styles.container}
                      value={values.county.name}
                      data={
                        store.lang.id == 0
                          ? store.myProfile.dataEnglish.countries
                          : store.myProfile.dataArabic.countries
                      }
                      // id={values.county.id}
                      header={store.lang.country}
                      heading={`${store.lang.country}:`}
                      setValue={e => {
                        setFieldValue('county', e);
                        setFieldValue('state', null);
                        setFieldValue('city', null);
                      }}
                      error={touched.county && errors.county && true}
                      rightIcon={
                        <Feather
                          name="chevron-down"
                          size={RFPercentage(2.5)}
                          color={colors.black[0]}
                        />
                      }
                    />
                    {touched.county && errors.county && (
                      <JErrorText>{errors.county}</JErrorText>
                    )}

                    <JSelectInput
                      containerStyle={styles.container}
                      value={values.state?.name}
                      id={values.county?.id}
                      setValue={e => {
                        setFieldValue('state', e);
                        setFieldValue('city', null);
                      }}
                      header={store.lang.state}
                      heading={`${store.lang.state}:`}
                      error={touched.state && errors.state && true}
                      rightIcon={
                        <Feather
                          name="chevron-down"
                          size={RFPercentage(2.5)}
                          color={colors.black[0]}
                        />
                      }
                    />
                    {touched.state && errors.state && (
                      <JErrorText>{errors.state}</JErrorText>
                    )}

                    <JSelectInput
                      containerStyle={styles.container}
                      value={values.city?.name
                      }
                      setValue={e => setFieldValue('city', e)}
                      header={store.lang.city}
                      heading={`${store.lang.city}:`}
                      id={values.state?.id}
                      error={touched.city && errors.city && true}
                      rightIcon={
                        <Feather
                          name="chevron-down"
                          size={RFPercentage(2.5)}
                          color={colors.black[0]}
                        />
                      }
                    />
                    {touched.city && errors.city && (
                      <JErrorText>{errors.city}</JErrorText>
                    )}

                    <JInput
                      style={{
                        textAlign: store.lang.id == 0 ? 'left' : 'right',
                      }}
                      isRequired={true}
                      containerStyle={styles.container}
                      heading={`${store.lang.institute}:`}
                      value={values.institude}
                      error={touched.institude && errors.institude && true}
                      onChangeText={handleChange('institude')}
                      onBlur={() => setFieldTouched('institude')}
                    />
                    {touched.institude && errors.institude && (
                      <JErrorText>{errors.institude}</JErrorText>
                    )}

                    <JInput
                      style={{
                        textAlign: store.lang.id == 0 ? 'left' : 'right',
                      }}
                      isRequired
                      keyboardType={'numeric'}
                      containerStyle={styles.container}
                      heading={`${store.lang.result}:`}
                      value={values.result}
                      error={touched.result && errors.result && true}
                      onChangeText={handleChange('result')}
                      onBlur={() => setFieldTouched('result')}
                    />
                    {touched.result && errors.result && (
                      <JErrorText>{errors.result}</JErrorText>
                    )}

                    <JSelectInput
                      isRequired
                      containerStyle={styles.container}
                      value={values.year?.name}
                      setValue={e => setFieldValue('year', e)}
                      header={store.lang.year}
                      heading={`${store.lang.year}:`}
                      error={touched.year && errors.year && true}
                      rightIcon={
                        <Feather
                          name="chevron-down"
                          size={RFPercentage(2.5)}
                          color={colors.black[0]}
                        />
                      }
                    />
                    {touched.year && errors.year && (
                      <JErrorText>{errors.year}</JErrorText>
                    )}
                  </JScrollView>
                  <View style={styles.bottomV}>
                    <JButton
                    disabled={loader1?true:false}
                      isValid={isValid}
                      onPress={() => handleSubmit()}
                      style={{
                        position: 'absolute',
                        bottom: RFPercentage(1),
                        width: RFPercentage(20),
                      }}>
                      {loader1 ? store.lang.loading : store.lang.save}
                    </JButton>
                  </View>
                </>)
            )}
          </Formik>

        </KeyboardAvoidingView>

      </RBSheet>
      <JModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        alertMsg={store.lang.delete}
        msg={store.lang.are_you_sure_to_delete}
        onPressYes={() => {
          id.educationId !== '' ? _delete() : _Edelete();
        }}
        onPressNo={() => {
          setId({
            experienceId: '',
            educationId: ''
          })
          setModalVisible(false)

        }}
      // onPress={()=> {_Edelete(exp_Id)}}
      />
    </JScreen>
  );
};

export default observer(CareerInformation);

const styles = StyleSheet.create({
  container: { marginTop: RFPercentage(2) },
  bottomV: {
    height: RFPercentage(9), width: '100%', padding: RFPercentage(1), shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
});
