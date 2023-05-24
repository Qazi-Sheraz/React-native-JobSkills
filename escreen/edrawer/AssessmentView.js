import { StyleSheet, FlatList, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import JScreen from '../../customComponents/JScreen'
import JGradientHeader from '../../customComponents/JGradientHeader'
import JText from '../../customComponents/JText'
import colors from '../../config/colors'
import { RFPercentage } from 'react-native-responsive-fontsize'
import JChevronIcon from '../../customComponents/JChevronIcon'
import JRow from '../../customComponents/JRow'
import { StoreContext } from '../../mobx/store'
import { useNavigation, useRoute } from '@react-navigation/native'
import url from '../../config/url'
import JIcon from '../../customComponents/JIcon'

const AssessmentView = () => {
    const store = useContext(StoreContext);
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState();
    const [ans, setAns] = useState();
    const [error,setError]=useState(false);
  const {params}=useRoute();
  console.log(params.name)
    const _getAssesmentQues = () => {
  
      var myHeaders = new Headers();
      myHeaders.append('Authorization',`Bearer ${store.token?.token}`,);
  
      fetch(`${url.baseUrl}/employer/assessment-view/${params?.id}` ,
      {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      })
  
      .then(response => response.json())
        .then(result => {
        //   console.log(result.assessment[0].assessment_question[0].assessment_defined_answers);
          setData(result.assessment[0]);
        //   setAns(result.assessment[0]?.assessment_defined_answers);
        
        })
  
        .catch(error => {
          console.log('error', error);
          
     
        }).finally(()=>{
          setLoader(false);
        });
    };
  
   useEffect(() => {
    _getAssesmentQues();
   }, [loader]);
//   console.log(data?.assessment_question?.assessment_defined_answers?.answer)
  
   
  return (
    <JScreen
      style={{paddingHorizontal: RFPercentage(2)}}
         onTryAgainPress={()=> _getAssesmentQues()}
         isError={error}
      headerShown={true}
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {params.name}
            </JText>
          }
          left={JChevronIcon}
        />
      }>
      <FlatList
        data={data?.assessment_question}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <View
            style={styles.mainView}>
            <JRow
              style={{
                paddingTop: RFPercentage(1.5),
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}>
              <JText
                style={styles.header}>
                Questions: {index + 1}
              </JText>
              <JText
                style={styles.ques}>
                    {item.assessment_question}
              </JText>
            </JRow> 
            <JRow
              style={{
                paddingVertical:RFPercentage(1),
                alignItems: 'flex-start',
              }}>
              <JText
                style={{ fontWeight: 'bold',
                fontSize: RFPercentage(1.9)}}>
                Questions Type : {item.question_type}
              </JText>
            
            </JRow> 
            
            { item.question_type==="dropDown" || item.question_type==="mcqs" ? 
          (  <View style={{marginVertical:RFPercentage(2)}}>
          
            {item.assessment_answers.map((item)=>
            <JRow style={{marginHorizontal:RFPercentage(2)}}>
                <JIcon icon={'fa'} name={'circle-thin'} size={RFPercentage(2)}/>
                <JText style={{marginHorizontal:RFPercentage(1)}}>{item.answer_options}</JText>
            </JRow>)}</View>):null} 
            <JRow
              style={{
                paddingVertical: RFPercentage(1),
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}>
              <JText
                style={styles.header}>
                Answer:
              </JText>
              <JText style={styles.answer}>
                {item.assessment_defined_answers[0]?.answer ?item.assessment_defined_answers[0]?.answer:'N/A' }
              </JText>
              {/* {console.log(item.question_type)} */}
            </JRow>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </JScreen>
  );
}

export default AssessmentView

const styles = StyleSheet.create({
  mainView: {
    marginVertical: RFPercentage(1),
    paddingHorizontal:RFPercentage(1),
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
  },
  ques: {
    width: '72%',
    fontSize: RFPercentage(1.9),
    fontWeight: '700',
  },
});