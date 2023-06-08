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
const Assessment = ({navigation}) => {
  const refRBSheet = useRef();
  const [selected, setSelected] = useState('');
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [loader1, setLoader1] = useState(true);

  const store = useContext(StoreContext);

  const _getAssesments = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token.token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch('https://dev.jobskills.digital/api/assessment-list', requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
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
    myHeaders.append('Authorization', `Bearer ${store.token.token}`);
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
        // console.log(result);
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
              {'Assessments'}
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
      {loader === true ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          style={{marginTop: RFPercentage(2)}}
          data={data}
          renderItem={({item, index}) => (
            <>
              <Pressable
                onPress={() => {
                  _getSpecificAssessment(item.assessment.id, item.user_id);
                  refRBSheet.current.open();
                }}
                style={{
                  borderBottomColor: colors.border[0],
                  borderBottomWidth: RFPercentage(0.1),
                  padding: RFPercentage(2),
                }}>
                <JText fontWeight="bold" fontSize={RFPercentage(1.8)}>
                  {item.assessment.assessment_name}
                </JText>
                <JText style={{marginTop: RFPercentage(1)}}>
                  Score :{item.percentage}%
                </JText>
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
          {loader1 ? (
            <ActivityIndicator />
          ) : (
            <>
              <JGradientHeader
                center={
                  <JText
                    fontColor={colors.white[0]}
                    fontWeight="bold"
                    fontSize={RFPercentage(2.5)}>
                    {selected?.assessment_name[0]?.assessment_name}
                  </JText>
                }
                left={
                  <Feather
                    onPress={() => {
                      refRBSheet.current.close();
                    }}
                    name="chevron-left"
                    size={RFPercentage(3.5)}
                    color={colors.white[0]}
                  />
                }
              />

              <FlatList
                ListEmptyComponent={
                  <JText fontAlign="center">No List found !</JText>
                }
                style={{marginTop: RFPercentage(2)}}
                data={selected.particular_assessments}
                renderItem={({item, index}) => (
                  <>
                    <Pressable
                      style={{
                        borderBottomColor: colors.border[0],
                        borderBottomWidth: RFPercentage(0.1),
                        padding: RFPercentage(2),
                      }}>
                      <JText fontSize={RFPercentage(2.2)}>
                        Q{index + 1} :{' '}
                        {item.assessment_question.assessment_question}
                      </JText>

                      <JText
                        style={{marginTop: RFPercentage(1)}}
                        fontSize={RFPercentage(2.2)}
                        fontWeight="600"
                        fontColor={colors.purple[0]}>
                        Answer : {item.answer}
                      </JText>
                    </Pressable>
                  </>
                )}
                keyExtractor={(item, index) => index}
              />
            </>
          )}
        </RBSheet>
      }
    </JScreen>
  );
};

export default Assessment;

const styles = StyleSheet.create({});
