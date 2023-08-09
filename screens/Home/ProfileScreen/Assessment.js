import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import JScreen from '../../../customComponents/JScreen';
import JGradientHeader from '../../../customComponents/JGradientHeader';
import JText from '../../../customComponents/JText';
import JRow from '../../../customComponents/JRow';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../../config/colors';
import {useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useState} from 'react';
import {useEffect} from 'react';
import {useContext} from 'react';
import {StoreContext} from '../../../mobx/store';
import JChevronIcon from '../../../customComponents/JChevronIcon';
import JEmpty from '../../../customComponents/JEmpty';
import JIcon from '../../../customComponents/JIcon';
const Assessment = ({navigation}) => {
  const refRBSheet = useRef();
  const [selected, setSelected] = useState('');
  const [name, setName] = useState('');
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [loader1, setLoader1] = useState(true);

  const store = useContext(StoreContext);

  const _getAssesments = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch('https://dev.jobskills.digital/api/assessment-list', requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result.data);
        setData(result.data);
        setLoader(false);
      })
      .catch(error => {
        // console.log('error', error);
        setLoader(false);
      });
  };

  const _getSpecificAssessment = (id, userId) => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    // console.log(
    //   `https://dev.jobskills.digital/api/assessment-view/${id}/${userId}`,
    //   requestOptions,
    // );

    fetch(
      `https://dev.jobskills.digital/api/assessment-view/${id}/${userId}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        // console.log(result.data);
        setSelected(result.data);
        setLoader1(false);
      })
      .catch(error => {
        // console.log('error', error);
        setLoader1(false);
      });
  };
  useEffect(() => {
    _getAssesments();
  }, []);
  return (
    <JScreen
      headerShown={true}
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {store.lang.assessments}
            </JText>
          }
          left={<JChevronIcon />}
        />
      }>
      {loader ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          style={{marginTop: RFPercentage(2)}}
          data={data}
          ListEmptyComponent={<JEmpty/>}
          renderItem={({item, index}) => (
            <>
              <Pressable
                onPress={() => {
                  setLoader1(true)
                  _getSpecificAssessment(item.id, item.user_id);
                  setName(item?.assessment_name);
                  refRBSheet.current.open();

                }}
                style={{
                  borderBottomColor: colors.border[0],
                  borderBottomWidth: RFPercentage(0.1),
                  padding: RFPercentage(2),
                }}>
                <JText fontWeight="bold" fontSize={RFPercentage(1.8)}>
                  {item?.assessment_name}
                </JText>
                <JRow>
                  <JText style={{marginTop: RFPercentage(1)}}>
                    {store.lang.score}:
                  </JText>
                  <JText style={{marginTop: RFPercentage(1)}}>
                    {`${item?.precentage}% `}
                  </JText>
                </JRow>
              </Pressable>
            </>
          )}
          keyExtractor={(item, index) => index}
        />
      )}

      {
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
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
                    {name}
                  </JText>
                }
                left={<JChevronIcon onPress={()=> {refRBSheet.current.close()}}/>}
              />
               {loader1 ? (
            <ActivityIndicator />
          ) : (
            <>
              <FlatList
                
                data={selected?.particular_assessments}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<JEmpty />}
                renderItem={({item, index}) => (
                  <View style={styles.mainView}>
                    <JRow
                      style={{
                        paddingTop: RFPercentage(1.5),
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                      }}>
                      <JText style={styles.header}>
                        {store.lang.questions}
                        {'\r'}
                        {index + 1}
                      </JText>
                      <JText style={styles.ques}>
                        {item.assessment_question?.assessment_question}
                      </JText>
                    </JRow>
                   
                    {item.assessment_question?.question_type === 'dropDown' ||
                    item.assessment_question?.question_type === 'mcqs' ? (
                      <View style={{marginVertical: RFPercentage(2)}}>
                        {item[0]?.answer?.map(item => (
                          <JRow style={{marginHorizontal: RFPercentage(2)}}>
                            <JIcon
                              icon={'fa'}
                              name={'circle-thin'}
                              size={RFPercentage(2)}
                            />
                            <JText style={{marginHorizontal: RFPercentage(1)}}>
                              {item}
                            </JText>
                          </JRow>
                        ))}
                      </View>
                    ) : null}
                    <JRow
                      style={{
                        paddingVertical: RFPercentage(1),
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                      }}>
                      <JText style={styles.header}>{store.lang.answer}</JText>
                      <JText style={styles.answer}>
                        {item?.answer!==null ? item?.answer : 'N/A'}
                      </JText> </JRow>
                  </View>
                )}
                keyExtractor={item => item.id}
              />

             
            </>
          )}
        </RBSheet>
      }
    </JScreen>
  );
};

export default Assessment;

const styles = StyleSheet.create({
  mainView: {
    marginVertical: RFPercentage(1),
    paddingHorizontal:RFPercentage(2),
    backgroundColor: '#ffffff90',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  header: {
    fontWeight: 'bold',
    fontSize: RFPercentage(2),
  },
  answer: {
    width: '72%',
    fontSize: RFPercentage(2),
    fontColor:colors.purple[0],
  },
  ques: {
    width: '72%',
    fontSize: RFPercentage(1.9),
    fontWeight: '700',
  },
});
