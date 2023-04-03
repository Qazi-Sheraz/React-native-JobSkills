import {
  Modal,
  Alert,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import JScreen from '../../customComponents/JScreen';
import moment from 'moment';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JText from '../../customComponents/JText';
import colors from '../../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {StoreContext} from '../../mobx/store';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import JIcon from '../../customComponents/JIcon';
import JRow from '../../customComponents/JRow';
import DEVOTEAM from '../../assets/svg/Icon/DEVOTEAM.svg';
import Placeholder from '../../assets/svg/Icon/Placeholder.svg';
import Calendar from '../../assets/svg/Icon/Calendar.svg';
import Star from '../../assets/svg/Icon/Star.svg';
import JScrollView from '../../customComponents/JScrollView';
import Entypo from 'react-native-vector-icons/Entypo';
import JButton from '../../customComponents/JButton';
import {useState} from 'react';
import JInput from '../../customComponents/JInput';
import Pdf from 'react-native-pdf';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Pressable} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {useNavigation} from '@react-navigation/native';
import PhoneInput from 'react-native-phone-number-input';
import {useRef} from 'react';
import JChevronIcon from '../../customComponents/JChevronIcon';
import {useContext} from 'react';
import { observer } from 'mobx-react';

const JobDetails = () => {
  const store = useContext(StoreContext);
  const phoneInput = useRef(null);
  const navigation = useNavigation();
  const _selectOneFile = async setFieldValue => {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      //Printing the log realted to the file

      console.log('URI : ' + res[0].uri);
      console.log('Type : ' + res[0].type);
      console.log('File Name : ' + res[0].name);
      console.log('File Size : ' + res[0].size);
      //Setting the state to show single file attributes
      setFieldValue('resume', res[0]);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <JScreen
      style={{paddingHorizontal: RFPercentage(2)}}
      header={
        <JGradientHeader
          height={heightPercentageToDP(25)}
          alignItems={store.lang.id == 0 ? 'flex-start' : 'flex-end'}
          paddingTop={RFPercentage(1)}
          left={JChevronIcon }
          right={<Star />}
          children={
            <View style={{marginTop: RFPercentage(2), width: '100%'}}>
              <JRow style={{justifyContent: 'space-between'}}>
                <JText style={styles.headertxt}>
                  {store.lang.project_Manager}
                </JText>

                <JText style={{fontSize: RFPercentage(1.8), color: '#ffff'}}>
                  {store.lang.date_posted} {moment().format('DD MMM,YYYY')}
                </JText>
              </JRow>
              <JRow>
                <DEVOTEAM />
                <JText style={styles.txt}>{store.lang.devoteam}</JText>
              </JRow>
              <JRow>
                <Placeholder />
                <JText style={styles.txt}>
                  Ar-Riyad, Ar-Riyad, Saudi Arabia
                </JText>
              </JRow>
              <JRow style={{justifyContent: 'space-between'}}>
                <JRow>
                  <Calendar />

                  <JText style={styles.txt}>
                    {store.lang.expire_on} {moment().format('DD MMM,YYYY')}
                  </JText>
                </JRow>
                <JText style={styles.txt}>5 {store.lang.open_jobs}</JText>
              </JRow>
            </View>
          }
        />
      }>
      <JScrollView style={styles.container}>
        <JText style={styles.headertxt1}>{store.lang.job_Requirement}</JText>
        <View style={{marginHorizontal: RFPercentage(1.3)}}>
          <JText style={styles.headertxt2}>{store.lang.job_skills}</JText>

          <JText style={styles.txt1}>
            Computer Skill, Leadership Skill, Problem-solving {'\n'} Skill, Time
            management Skill
          </JText>
          <JText style={styles.headertxt2}>{store.lang.degree_level}</JText>
          <JRow>
            <JText style={styles.dg}>Bachelor of Science (B.S.)</JText>
          </JRow>
          <JText style={styles.headertxt2}>
            {store.lang.assessment_Required}
          </JText>
          <JText style={styles.txt1}>{store.lang.personal_Assessment}</JText>
        </View>
        <JText style={styles.headertxt1}>{store.lang.job_Details}</JText>
        {/* <JText style={{textAlign:'center',fontSize:RFPercentage(2),marginTop: RFPercentage(-2),marginLeft: RFPercentage(-4),}}></JText> */}
        <JRow>
          <JText style={styles.headertxt3}>{store.lang.job_category}</JText>
          <JText style={styles.txt2}>Actuaries</JText>
        </JRow>
        <JRow>
          <JText style={styles.headertxt3}>{store.lang.career_level}</JText>
          <JText style={styles.txt2}>Advanced</JText>
        </JRow>
        <JRow>
          <JText style={styles.headertxt3}>{store.lang.job_tag}</JText>
          <JText style={styles.txt2}>N/A</JText>
        </JRow>
        <JRow>
          <JText style={styles.headertxt3}>{store.lang.job_type}</JText>
          <JText numberOfLines={3} style={styles.txt2}>Architecture and Engineering
          </JText>
        </JRow>
        <JRow>
          <JText style={styles.headertxt3}>{store.lang.job_Shift}</JText>
          <JText style={styles.txt2}>First Shift</JText>
        </JRow>
        <JRow>
          <JText style={styles.headertxt3}>{store.lang.functional_Area}</JText>
          <JText style={styles.txt2}>Customer Service Support</JText>
        </JRow>
        <JRow>
          <JText style={styles.headertxt3}>{store.lang.position}</JText>
          <JText style={styles.txt2}>1</JText>
        </JRow>
        <JRow>
          <JText style={styles.headertxt3}>{store.lang.job_Experience}</JText>
          <JText style={styles.txt2}>5 Year</JText>
        </JRow>
        <JRow>
          <JText style={styles.headertxt3}>{store.lang.Salary_Period}</JText>
          <JText style={styles.txt2}>Monthly Pay Period</JText>
        </JRow>
        <JRow>
          <JText style={styles.headertxt3}>{store.lang.Is_Freelance}</JText>
          <JText style={styles.txt2}>Yes</JText>
        </JRow>
        <JText style={styles.headertxt1}>{store.lang.description} </JText>
        <JText style={styles.txt2}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </JText>
      </JScrollView>
      <View style={styles.bottomV}>
        <JButton
          onPress={() => setModalVisible(true)}
          fontStyle={{
            fontSize: RFPercentage(1.9),
            fontWeight: 'bold',
            paddingHorizontal: RFPercentage(5),
          }}
          children={store.lang.add_candidate}
        />
      </View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <Formik
          initialValues={{
            FirstName: '',
            LastName: '',
            Email: '',
            is_default: false,
          }}
          onSubmit={values => {
            console.log(values);

            var myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${store.token.token}`);

            //  setModalVisible(!modalVisible);
          }}
          validationSchema={yup.object().shape({
            resume: yup.object().shape({
              uri: yup.string().required('PDF'),
            }),
            name: yup.string().required().label('Name'),
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
            <SafeAreaView style={styles.centeredView}>
              <ScrollView style={styles.modalView}>
                <JGradientHeader
                  center={
                    <JText
                      fontColor={colors.white[0]}
                      fontWeight="bold"
                      fontSize={RFPercentage(2.5)}>
                      {store.lang.add_candidate}
                    </JText>
                  }
                />
                
                <View style={{padding: RFPercentage(2)}}>
                  <JInput
                    containerStyle={{marginTop: RFPercentage(1),}}
                    isRequired
                    heading={store.lang.first_name}
                    // value={values.name}
                    // error={touched.name && errors.name && true}
                    // onChangeText={handleChange('name')}
                    // onBlur={() => setFieldTouched('name')}
                  />
                  <JInput
                    containerStyle={{marginTop: RFPercentage(1)}}
                    isRequired
                    heading={store.lang.last_name}
                    // value={values.name}
                    // error={touched.name && errors.name && true}
                    // onChangeText={handleChange('name')}
                    // onBlur={() => setFieldTouched('name')}
                  />
                  <JInput
                    containerStyle={{marginTop: RFPercentage(1)}}
                    isRequired
                    heading={store.lang.email}
                    // value={values.name}
                    // error={touched.name && errors.name && true}
                    // onChangeText={handleChange('name')}
                    // onBlur={() => setFieldTouched('name')}
                  />

                  <View style={{marginBottom: RFPercentage(2)}}>
                    <JRow
                      style={{
                        marginTop: RFPercentage(1),
                      }}>
                      <JText  fontWeight="500" fontSize={RFPercentage(2.5)}>
                      {store.lang.phone}
                      </JText>
                    </JRow>
                    <PhoneInput
                      ref={phoneInput}
                      defaultValue={values.phone}
                      defaultCode="PK"
                      containerStyle={{
                        width: '100%',
                        borderBottomWidth: RFPercentage(0.1),
                        paddingVertical: 0,
                      }}
                      textContainerStyle={{
                        paddingVertical: 0,
                        backgroundColor: 'transparent',
                      }}
                      onChangeFormattedText={text => {
                        setFieldValue('phone', text);
                      }}
                    />
                    {touched.phone && errors.phone && (
                      <JErrorText>{errors.phone}</JErrorText>
                    )}
                  </View>
                  <JRow>
                    <JText fontSize={RFPercentage(2.5)}>{store.lang.resume}</JText>
                    <JText
                      fontColor={colors.danger[0]}
                      fontSize={RFPercentage(2.5)}>
                      *
                    </JText>
                  </JRow>

                  <JText
                    fontSize={RFPercentage(2)}
                    fontColor={colors.placeHolderColor[0]}
                    style={{
                      marginBottom: RFPercentage(2),
                      marginTop: RFPercentage(1),
                    }}>
                    {store.lang.sure_updated_resume}
                  </JText>

                  {values.resume?.uri ? (
                    <View style={{alignSelf: 'center'}}>
                      <Pdf
                        trustAllCerts={false}
                        source={{uri: values.resume.uri}}
                        onLoadComplete={(numberOfPages, filePath) => {
                          console.log(`Number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page, numberOfPages) => {
                          console.log(`Current page: ${page}`);
                        }}
                        onError={error => {
                          console.log(error);
                        }}
                        onPressLink={uri => {
                          console.log(`Link pressed: ${uri}`);
                        }}
                        style={{
                          alignSelf: 'center',
                          width: Dimensions.get('window').width / 3,
                          height: Dimensions.get('window').height / 3,
                        }}
                      />
                      <Entypo
                        onPress={() => _selectOneFile(setFieldValue)}
                        name="circle-with-cross"
                        size={RFPercentage(3.5)}
                        color={colors.danger[0]}
                        style={{
                          position: 'absolute',
                          zIndex: 1,
                          right: RFPercentage(-2),
                          top: RFPercentage(-1),
                        }}
                      />
                    </View>
                  ) : (
                    <JRow
                      style={{
                        justifyContent: 'center',
                        marginHorizontal: RFPercentage(3),
                        borderColor: colors.primary[1],
                      }}>
                      <JButton
                        onPress={() => _selectOneFile(setFieldValue)}
                        style={{
                          width: '46%',
                          backgroundColor: colors.white[0],
                          borderColor: colors.black[1],
                        }}
                        children={store.lang.upload_resume}
                      />
                    </JRow>
                  )}

                  <JRow
                    style={{
                      marginTop: RFPercentage(5),
                      justifyContent: 'center',
                      borderColor: colors.primary[1],
                    }}>
                    <JButton
                      // isValid={isValid}
                      onPress={() => {
                        handleSubmit();
                      }}
                      style={{
                        width: '46%',
                      }}
                      children={store.lang.add}
                    />
                  </JRow>
                </View>
              </ScrollView>
              <Pressable
                style={{height: '20%', width: '100%'}}
                onPress={() => setModalVisible(!modalVisible)}
              />
            </SafeAreaView>
          )}
        </Formik>
      </Modal>
    </JScreen>
  );
};

export default observer(JobDetails);

const styles = StyleSheet.create({
  headertxt: {fontSize: RFPercentage(3), fontWeight: 'bold', color: '#ffff'},
  headertxt1: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    marginVertical: RFPercentage(1),
  },

  headertxt2: {
    fontSize: RFPercentage(2),
    fontWeight: '700',
    marginVertical: RFPercentage(1),
  },
  headertxt3: {
    fontSize: RFPercentage(2),
    width: '40%',
    fontWeight: '800',
    marginVertical: RFPercentage(1),
  },
  txt: {fontSize: RFPercentage(1.8), color: '#ffff', margin: RFPercentage(1)},
  txt1: {
    fontSize: RFPercentage(1.9),
    fontWeight: '500',
    marginVertical: RFPercentage(1),
  },
  txt2: {
    fontSize: RFPercentage(1.9),
    fontWeight: '500',
    
  },

  container: {paddingVertical: RFPercentage(2)},
  dg: {
    marginVertical: RFPercentage(2),
    width: RFPercentage(25),
    padding: RFPercentage(1),
    fontSize: RFPercentage(1.8),
    backgroundColor: '#F8FAFC',
    textAlign: 'center',
    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  bottomV: {height: RFPercentage(9), width: '100%', padding: RFPercentage(1)},
  centeredView: {
    flex: 1,

    alignItems: 'center',

    backgroundColor: '#00000080',
  },
  modalView: {
    backgroundColor: colors.white[0],
    borderRadius: RFPercentage(3),
    // paddingBottom: RFPercentage(2),
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
