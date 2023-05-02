import {
  StyleSheet,
  FlatList,
  View,
  ScrollView,
  Pressable,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import JScreen from '../../customComponents/JScreen';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JText from '../../customComponents/JText';
import colors from '../../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
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
import {StoreContext} from '../../mobx/store';
import RBSheet from 'react-native-raw-bottom-sheet';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import JChevronIcon from '../../customComponents/JChevronIcon';
import {observer} from 'mobx-react';
import JButton from '../../customComponents/JButton';
import {baseUrl} from '../../ApiUrls';
import moment from 'moment';


const data = [

  {id: 0, name: 'All'},
  {id: 1, name: 'Drafted'},
  {id: 2, name: 'Applied'},
  {id: 3, name: 'Rejected'},
  {id: 4, name: 'Selected'},
  {id: 5, name: 'Shortlisted'},
  {id: 6, name: 'Invitation Sent'},
  {id: 7, name: 'Interview Scheduled'},
  {id: 8, name: 'Interview Accepted'},
  {id: 9, name: 'Interview Rescheduled'},
  {id: 10, name: 'Interview Completed'},
];

const JobApplication = ({route}) => {
  const {navigate, goBack} = useNavigation();
  const [selectedItem, setSelectedItem] = useState(data.status);
  const [jApplication, setJApplication] = useState();
  const handleSelect = status => {
    setSelectedItem(data);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const refRBSheet = useRef();
  const store = useContext(StoreContext);

  const filterData = status => {
    if (status === 'All') {
      setJApplication(jApplication.status);
    } else {
      setJApplication(jApplication.filter(e => e.status === status));
    }
    refRBSheet.current.close();
  };

  const sortByNameAscending = () => {
    setJApplication(
      [...jApplication].sort((a, b) =>
        a.candidate_name.localeCompare(b.candidate_name),
      ),
    );
  };

  const sortByNameDescending = () => {
    setJApplication(
      [...jApplication].sort((a, b) =>
        b.candidate_name.localeCompare(a.candidate_name),
      ),
    );
  };

  const sortByRecentApplyDateDescending = () => {
    setJApplication(
      [...jApplication].sort(
        (a, b) => new Date(b.apply_date) - new Date(a.apply_date),
      ),
    );
  };
  // const sortedData = [...jApplication].sort((a, b) => new Date(b?.apply_date) - new Date(a?.apply_date));

  // const latestDate = sortedData[0].date;

  // // Format the latest date to your desired output
  // const formattedDate = new Date(latestDate).toLocaleDateString();

  // console.log("formattedDate",formattedDate);


  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
  const _jobApplication = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDQyOTYxYTYzYTU0NmZjNjNhZGY4MWFiNmI0N2I4MDNhNzMwMmMxZWRhNDMyMDk5ZGM1ZmNlMjNiZDUyYzY4ODBlN2I4ZDdlZDQ5MWI2YzMiLCJpYXQiOjE2ODAyMTI2NzQuOTE2NzE5LCJuYmYiOjE2ODAyMTI2NzQuOTE2NzIzLCJleHAiOjE3MTE4MzUwNzQuOTA5NzQxLCJzdWIiOiI4NCIsInNjb3BlcyI6W119.aay7JchvkClUeAV79bQQ4fgTa8gRkgoM01y82G7eC1-JrtLnZTbnhQX4q0FJ_OhhDDxcoK00IMTpwmE1mKHNyVxwrw8yrAM8fRoXk0nRJOtVfNBVZ8R88uv8MBqHcREPjPRV3b-UmlaiC8Yv-2tOk4Kd4E79JfAkdyHaaFVmL8YHayifKmKBkECTY8SyaehOlFSn2cvw951aq2T0m_U1xcZsm2IL0gAOdVO_rdB4Ch0AOcEOpCyoCv8QZH7ZKrB26gSVv6IBtbLc_e_dYtV1OJCok-W8JFGiGafhQhc5RRFqTdot6R5WwfiwkqOf2tVNoLNNE06G7lPRzfpNhx7k6qV9OTYl2otef_yBhKr95gO9nr_L5WbjuazUHwYEBEqb53LwVu4-F0ncsr7epuL9oeL_XHa2t71hBqJRXuxS2djKwlKe9dkq6yPBNJQH7SNjAFlF4oDNqH-fqzmu41iKnmRBCxMGycwRUAqXbXoo6v3YJWqtTe6v6tHgTH4UdhQ6h3NrIwzozvNMLK6tMlHEunlZcMuPEUhvQRaGRu2ZQN54KowDDLEV9XmMbbXH2TkTA1LSEKQp-gA1D9w1s7-JHNHs2-rBi7-Vj_TLx5Yzoa-5ry55QIejufts2R48a4ino_lOgeG9a7W4dpPns69cUCL79g6ffe1cJyUYk2sr3mc',
    );
    //  console.log(route.params.id)
    fetch(
      `${baseUrl}/employer/jobs/${route.params.id}/applications`,

      {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      },
    )
      .then(response => response.json())
      .then(result => {
        // console.log(result.job_application);
        setJApplication(result.job_application);
      })
      .catch(error => {
        console.log('error', error);
        setError(true);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  useEffect(() => {
    _jobApplication();
  }, [loader]);

  return (
    <JScreen isError={error} onTryAgainPress={() => _jobApplication()}>
      <JGradientHeader
        center={
          <JText
            fontColor={colors.white[0]}
            fontWeight="bold"
            fontSize={RFPercentage(2.5)}>
            {'Job Applicantes'}
          </JText>
        }
        left={JChevronIcon}
      />

      {loader == true ? (
        <ActivityIndicator />
      ) : (
        <>
          <JRow
            style={{
              paddingHorizontal: RFPercentage(2),
              justifyContent: 'space-between',
            }}>
            <JSearchInput
              inputStyle={{width: '75%', alignSelf: 'center'}}
              length={1}
              onChangeText={e => {
                store.setAllFeatureCompanyInput(e);
              }}
              onPressIcon={() => alert('Icon Pressed')}
            />
            <Menu>
              <MenuTrigger
                style={{alignItems: 'center', justifyContent: 'center'}}>
                <Sort height={RFPercentage(7)} width={RFPercentage(8)} />
              </MenuTrigger>
              <MenuOptions>
                <JText style={styles.menuhead}>{store.lang.sort_by}</JText>
                <MenuOption onSelect={sortByNameAscending}>
                  <JRow>
                    <JText style={styles.menutxt}>
                      {store.lang.candidate_fit_score}
                    </JText>
                    <Arrow_Up />
                  </JRow>
                </MenuOption>
                <MenuOption onSelect={sortByNameDescending}>
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
                <MenuOption onSelect={() => refRBSheet.current.open()}>
                  <JText style={styles.menutxt}>
                    {store.lang.status_of_application}
                  </JText>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </JRow>

          <ScrollView style={{flex: 1, paddingHorizontal: RFPercentage(2)}}>
            {jApplication.map((item, index) => (
              <JApplication
                key={index}
                
                onPress={() => setModalVisible(true)}
                onSelect={handleSelect}
                item={item}
                // date={moment(item.apply_date, 'DD-MM-YYYY').format('DD MMM,YYYY')}
              />
            ))}
          </ScrollView>
        </>
      )}
      <RBSheet
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
            {data.map((item, index) => (
              <JText
                key={index}
                onPress={() => filterData(item.name)}
                style={styles.RBtxt}>
                {item.name}
              </JText>
            ))}
          </ScrollView>
        </View>
      </RBSheet>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <Pressable
          onPress={() => setModalVisible(!modalVisible)}
          style={styles.centeredView}>
          <View style={styles.modalView}>
            <JText fontColor={colors.white[0]} fontSize={RFPercentage(1.8)}>
              Candidate Fit Score calculates how a participant{'\n'}scores in
              relation to the “ideal profile” for a given{'\n'}role. The Fit
              Score is categorised to help with ease{'\n'}of interpretation and
              use during the hiring process.{'\n'}Typically, 76-100 indicates a
              good fit to the role,{'\n'}25-75 indicates a possible fit, and
              1-24 indicates a{'\n'}low fit.
            </JText>
          </View>
        </Pressable>
      </Modal>
    </JScreen>
  );
};

export default observer(JobApplication);

const styles = StyleSheet.create({
  menu: {marginTop: RFPercentage(5)},
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
  RBView: {paddingHorizontal: RFPercentage(2.5), paddingTop: RFPercentage(2)},
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
});
