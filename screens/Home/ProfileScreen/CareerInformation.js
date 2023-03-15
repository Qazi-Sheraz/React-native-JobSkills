import {
  Alert,
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
import {RFPercentage} from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../../config/colors';
import JRow from '../../../customComponents/JRow';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useRef} from 'react';
import {useState} from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import JButton from '../../../customComponents/JButton';
import {Formik} from 'formik';
import * as yup from 'yup';
import JErrorText from '../../../customComponents/JErrorText';
import JInput from '../../../customComponents/JInput';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import JSelectInput from '../../../customComponents/JSelectInput';
import {useContext} from 'react';
import {StoreContext} from '../../../mobx/store';
import Experience from './SubHeagings/Experience';
import Education from './SubHeagings/Education';
import {useEffect} from 'react';
const CareerInformation = ({navigation}) => {
  const refRBSheet = useRef();
  const [selected, setSelected] = useState(0);
  const [loader, setLoader] = useState();
  const [apiLoader, setApiLoader] = useState(true);
  const [education, setEducation] = useState([]);
  const [experience, setExpereince] = useState([]);

  const store = useContext(StoreContext);

  const _addExperince = values => {
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

    setLoader(true);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    console.log(requestOptions);
    fetch('https://dev.jobskills.digital/api/experience-create', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);

        _addExp(result.candidateExperience);
        alert(result.message);

        setLoader(false);
        refRBSheet.current.close();
      })
      .catch(error => {
        console.log('error', error);
        setLoader(false);
      });
  };

  const _addEducation = values => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token.token}`);

    var formdata = new FormData();
    formdata.append('degree_level_id', values.level);
    formdata.append('degree_title', values.title);
    formdata.append('country_id', values.county.id);
    formdata.append('state_id', `${values.state.id}`);
    formdata.append('city_id', `${values.city.id}`);
    formdata.append('institute', values.institude);
    formdata.append('result', values.result);
    formdata.append('year', `${values.year.name}`);

    console.log(formdata);
    setLoader(true);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch(
      'https://dev.jobskills.digital/api/candidate-education-create',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result.data);
        _addEdu(result.data);
        alert(result.message);

        setLoader(false);
        refRBSheet.current.close();
      })
      .catch(error => {
        console.log('error', error);
        setLoader(false);
      });
  };

  const _getExperience = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token.token}`);
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
        console.log(result);
        setEducation(result.canidateEducation);
        setExpereince(result.canidateExperience);
        setApiLoader(false);
      })
      .catch(error => {
        console.log('error', error);
        setApiLoader(false);
      });
  };

  const _deleteExperience = id => {
    Alert.alert('Delete Experience', 'Are you sure to delete?', [
      {
        text: 'Cancel',

        style: 'cancel',
      },
      {text: 'OK', onPress: () => _delete()},
    ]);

    const _delete = () => {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${store.token.token}`);

      var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow',
      };
      console.log(requestOptions);
      fetch(
        `https://dev.jobskills.digital/api/candidate-experience-delete/${id}`,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          console.log(result);
          setExpereince(experience.filter(e => e.id !== id));
        })
        .catch(error => console.log('error', error));
    };
  };

  const _deleteEducation = id => {
    Alert.alert('Delete Education', 'Are you sure to delete?', [
      {
        text: 'Cancel',

        style: 'cancel',
      },
      {text: 'OK', onPress: () => _delete()},
    ]);

    const _delete = () => {
      console.log(id);
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${store.token.token}`);

      var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
      };
      fetch(
        `https://dev.jobskills.digital/api/candidate-education-delete/${id}`,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          console.log(result);
          setEducation(education.filter(e => e.id !== id));
        })
        .catch(error => console.log('error', error));
    };
  };

  const _addExp = e => {
    let arr = [...experience];
    arr.push(e);

    setExpereince(arr);
  };

  const _addEdu = e => {
    let arr = [...education];
    arr.push(e);

    setEducation(arr);
  };
  useEffect(() => {
    _getExperience();
  }, []);
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
              {'Career Information'}
            </JText>
          }
          left={
            <Feather
              onPress={() => navigation.goBack()}
              name="chevron-left"
              size={RFPercentage(3.5)}
              color={colors.white[0]}
            />
          }
        />
      }>
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
          _deleteExperience={_deleteExperience}
        />

        <Education
          loader={apiLoader}
          select={selected}
          education={education}
          setSelected={setSelected}
          refRBSheet={refRBSheet}
          _deleteEducation={_deleteEducation}
        />
      </ScrollView>

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
              {selected === 0 ? 'Experience' : 'Education'}
            </JText>
          }
          left={
            <Feather
              onPress={() => refRBSheet.current.close()}
              name="chevron-left"
              size={RFPercentage(3.5)}
              color={colors.white[0]}
            />
          }
        />

        {selected === 0 ? (
          <Formik
            initialValues={{
              title: '',
              company: '',
              county: '',
              city: '',
              state: '',
              start: '',
              end: '',
              working: false,
              description: '',
            }}
            onSubmit={values => {
              console.log(values);
              _addExperince(values);
            }}
            // validationSchema={yup.object().shape({
            //   title: yup.string().required().label('Title'),
            //   company: yup.string().required().label('Company'),
            //   county: yup.string().required().label('Country'),
            //   city: yup.string().required().label('City'),
            //   state: yup.string().required().label('State'),
            //   start: yup.string().required().label('Start'),
            //   end: yup.string().required().label('End'),
            //   description: yup.string().required().label('Description'),
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
                  contentContainerStyle={{paddingBottom: RFPercentage(8)}}
                  style={{
                    marginHorizontal: RFPercentage(2),
                  }}>
                  <JInput
                    isRequired={true}
                    heading={'Experience Title :'}
                    value={values.title}
                    error={touched.title && errors.title && true}
                    onChangeText={handleChange('title')}
                    onBlur={() => setFieldTouched('title')}
                  />
                  {touched.title && errors.title && (
                    <JErrorText>{errors.title}</JErrorText>
                  )}
                  <JInput
                    isRequired={true}
                    containerStyle={{marginTop: RFPercentage(2)}}
                    value={values.company}
                    heading={'Company :'}
                    error={touched.company && errors.company && true}
                    onChangeText={handleChange('company')}
                    onBlur={() => setFieldTouched('company')}
                  />
                  {touched.company && errors.company && (
                    <JErrorText>{errors.company}</JErrorText>
                  )}

                  <JSelectInput
                    containerStyle={{marginTop: RFPercentage(2)}}
                    data={store.myProfile.data.countries}
                    value={values.county.name}
                    header={'Country'}
                    heading={'Country :'}
                    setValue={e => setFieldValue('county', e)}
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
                    containerStyle={{marginTop: RFPercentage(2)}}
                    value={values.state.name}
                    id={values.county.id}
                    setValue={e => setFieldValue('state', e)}
                    header={'State'}
                    heading={'State :'}
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
                    containerStyle={{marginTop: RFPercentage(2)}}
                    value={values.city.name}
                    setValue={e => setFieldValue('city', e)}
                    header={'City'}
                    heading={'City :'}
                    id={values.state.id}
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
                    containerStyle={{marginTop: RFPercentage(2)}}
                    value={
                      values.start && moment(values.start).format('DD MMM YYYY')
                    }
                    setValue={e => setFieldValue('start', e)}
                    header={'Start Date'}
                    heading={'Start Date:'}
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
                        containerStyle={{marginTop: RFPercentage(2)}}
                        isDate={true}
                        value={
                          values.end && moment(values.end).format('DD MMM YYYY')
                        }
                        setValue={e => setFieldValue('end', e)}
                        header={'End Date'}
                        heading={'End Date :'}
                        error={touched.end && errors.end && true}
                        rightIcon={
                          <Feather
                            name="chevron-down"
                            size={RFPercentage(2.5)}
                            color={colors.black[0]}
                          />
                        }
                      />
                      {touched.end && errors.end && (
                        <JErrorText>{errors.end}</JErrorText>
                      )}
                    </>
                  )}
                  <JRow
                    style={{
                      justifyContent: 'space-between',
                      marginVertical: RFPercentage(2),
                    }}>
                    <JText fontWeight={'500'} fontSize={RFPercentage(2.5)}>
                      Currently Working
                    </JText>

                    <Switch
                      trackColor={{true: colors.purple[0]}}
                      onValueChange={e => {
                        setFieldValue('working', e);
                      }}
                      value={values.working}
                    />
                  </JRow>

                  <JInput
                    heading={'Description :'}
                    value={values.description}
                    error={touched.description && errors.description && true}
                    onChangeText={handleChange('description')}
                    onBlur={() => setFieldTouched('description')}
                  />
                  {touched.title && errors.description && (
                    <JErrorText>{errors.description}</JErrorText>
                  )}
                </ScrollView>
                <JButton
                  isValid={isValid}
                  onPress={() => handleSubmit()}
                  style={{
                    position: 'absolute',
                    bottom: RFPercentage(1),
                    width: RFPercentage(20),
                  }}>
                  {loader ? 'Loading' : 'Save'}
                </JButton>
              </>
            )}
          </Formik>
        ) : (
          <Formik
            initialValues={{
              title: '',
              level: '',
              county: '',
              city: '',
              state: '',
              institude: '',
              result: '',
              year: '',
            }}
            onSubmit={values => {
              console.log(values);
              _addEducation(values);
            }}
            // validationSchema={yup.object().shape({
            //   title: yup.string().required().label('Title'),
            //   company: yup.string().required().label('Company'),
            //   county: yup.string().required().label('Country'),
            //   city: yup.string().required().label('City'),
            //   state: yup.string().required().label('State'),
            //   start: yup.string().required().label('Start'),
            //   end: yup.string().required().label('End'),
            //   description: yup.string().required().label('Description'),
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
                  contentContainerStyle={{paddingBottom: RFPercentage(8)}}
                  style={{
                    marginHorizontal: RFPercentage(2),
                  }}>
                  <JInput
                    isRequired={true}
                    containerStyle={styles.container}
                    heading={'Degree Level :'}
                    value={values.level}
                    error={touched.level && errors.level && true}
                    onChangeText={handleChange('level')}
                    onBlur={() => setFieldTouched('level')}
                  />
                  {touched.level && errors.level && (
                    <JErrorText>{errors.level}</JErrorText>
                  )}
                  <JInput
                    isRequired={true}
                    containerStyle={styles.container}
                    value={values.title}
                    heading={'Degree  Title :'}
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
                    data={store.myProfile.data.countries}
                    header={'Country'}
                    heading={'Country :'}
                    setValue={e => setFieldValue('county', e)}
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
                    value={values.state.name}
                    id={values.county.id}
                    setValue={e => setFieldValue('state', e)}
                    header={'State'}
                    heading={'State :'}
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
                    value={values.city.name}
                    setValue={e => setFieldValue('city', e)}
                    header={'City'}
                    heading={'City :'}
                    id={values.state.id}
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
                    isRequired={true}
                    containerStyle={styles.container}
                    heading={'Institute:'}
                    value={values.institude}
                    error={touched.institude && errors.institude && true}
                    onChangeText={handleChange('institude')}
                    onBlur={() => setFieldTouched('institude')}
                  />
                  {touched.institude && errors.institude && (
                    <JErrorText>{errors.institude}</JErrorText>
                  )}

                  <JInput
                    isRequired
                    containerStyle={styles.container}
                    heading={'Result :'}
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
                    value={values.year.name}
                    setValue={e => setFieldValue('year', e)}
                    header={'Year'}
                    heading={'Year :'}
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
                </ScrollView>
                <JButton
                  isValid={isValid}
                  onPress={() => handleSubmit()}
                  style={{
                    position: 'absolute',
                    bottom: RFPercentage(1),
                    width: RFPercentage(20),
                  }}>
                  {loader ? 'Loading' : 'Save'}
                </JButton>
              </>
            )}
          </Formik>
        )}
      </RBSheet>
    </JScreen>
  );
};

export default CareerInformation;

const styles = StyleSheet.create({
  container: {marginTop: RFPercentage(2)},
});
