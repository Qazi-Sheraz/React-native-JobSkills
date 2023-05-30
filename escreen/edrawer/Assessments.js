import {Pressable, StyleSheet, FlatList, ActivityIndicator,View} from 'react-native'
import React ,{ useState,useContext, useEffect } from 'react'
import JScreen from '../../customComponents/JScreen';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JChevronIcon from '../../customComponents/JChevronIcon';
import JText from '../../customComponents/JText';
import colors from '../../config/colors';
import { StoreContext } from '../../mobx/store';
import { RFPercentage } from 'react-native-responsive-fontsize';
import url from '../../config/url';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';

const Assessments = () => {
  const store = useContext(StoreContext);
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const [error,setError]=useState(false);
const navigation= useNavigation();
  const _getAssesmentsData = () => {

    var myHeaders = new Headers();
    myHeaders.append('Authorization',`Bearer ${store?.token?.token}`,);

    fetch(`${url.baseUrl}/employer/assessment-list` ,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    })

    .then(response => response.json())
      .then(result => {
        // console.log(result.assessment);
        setData(result.assessment);
      
      })

      .catch(error => {
        console.log('error', error);
        setError(true)
   
      }).finally(()=>{
        setLoader(false);
      });
  };

 useEffect(() => {
 _getAssesmentsData();
 }, [loader]);


  return (
    <JScreen
    onTryAgainPress={()=> _getAssesmentsData()}
    isError={error}
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
        left={JChevronIcon}
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
            onPress={()=>navigation.navigate('AssessmentView',{id:item.id,name:item.assessment_name})}
              style={{
                borderBottomColor: colors.border[0],
                borderBottomWidth: RFPercentage(0.1),
                padding: RFPercentage(2),
              }}>
              <JText fontWeight="bold" fontSize={RFPercentage(1.8)}>
                {item.assessment_name}
              </JText>
              <JText style={{marginTop: RFPercentage(1)}}>
               Category: {item.job_category}
              </JText>
            </Pressable>
          </>
        )}
        keyExtractor={(item, index) => index}
      />
    )}

   
  </JScreen>
  )
}

export default observer(Assessments)

const styles = StyleSheet.create({})