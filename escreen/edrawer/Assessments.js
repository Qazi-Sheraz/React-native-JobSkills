import {Pressable, StyleSheet, FlatList, ActivityIndicator,View} from 'react-native'
import React ,{ useState,useContext, useEffect } from 'react'
import JScreen from '../../customComponents/JScreen';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JChevronIcon from '../../customComponents/JChevronIcon';
import JText from '../../customComponents/JText';
import colors from '../../config/colors';
import { StoreContext } from '../../mobx/store';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { baseUrl } from '../../ApiUrls';

const Assessments = () => {
  const store = useContext(StoreContext);
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const [error,setError]=useState(false)

  const _getAssesmentsData = () => {

    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDZjZDg5MzZkNmQ0ZWE3NTQ5N2RlZDZhMDgwNjliNzM1NmRmYmQ5YzZlODRmZmFiZTE2NjQ4N2VkN2ExMWFkMzk1YzgyZjZkNGRkNWZkMGUiLCJpYXQiOjE2ODAyNTA2NDYuNzg0NjAxLCJuYmYiOjE2ODAyNTA2NDYuNzg0NjA0LCJleHAiOjE3MTE4NzMwNDYuNzc3NzY2LCJzdWIiOiI4NCIsInNjb3BlcyI6W119.XQA1UjOHQZkuqkLbAY0V8quXIn6dBY_ZIl8Igkko0Kv1ODdOrVXmUsnbUu59jeIg_I8mVgcnH3XGRSoEDAXb5YSocyD1POwDo7_ED1dc4TYeniS7RrBwoJ4ZTyLFdc0rWo7inelD9n2HoLHquTsh6_tz4QAyc8xaB4_58H3LvKo86FEWoBTY4NsP3CAGzylD-8-SEIHze-HfeYjaaRoVlDeQpY6d3mfqzmBummF7nKHtkLSgTCEEaEsIx2yhZTrapWL-5GKdx-aj1qmKbTE5WYGUgMVu-39Mz7GCvYMryN5HF-9Y4guufDMT0atrXnc7BkyRe0lIVfNE3ga9GcSePLDkzMrCbBjmfTmvKuxoT-sXyXFb7_vu8FogA6Pc7v77LTciuuc9duwRSpK3_fxMy4dZucnFTGx7tTWSwlipQWthwa3wd0gVs5F9cXpgVxLk4Pndxuq-PF8_DvpbWNOCXsm0KWO59zbPgSVyil18KUv4F9NduT49z3MQgzfY9yjE1rkSgRW5Va4PGQhVEle5f2Dce-bysgPhWWK0wrQtLd1AVpbhLIIqI4obDo-2OFdK62GwLor1RfKU0Qc_WiP-8UOljUnVBskGVRVlqvDL8yblrM7ro73JbgpJPlV4Uz67FaC22iyhLbJsRnbQpJVKWgfcw6jyGqjKPaspsFYpPoM');

    fetch(`${baseUrl}/employer/assessment-list` ,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    })

    .then(response => response.json())
      .then(result => {
        console.log(result);
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
            <View
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
            </View>
          </>
        )}
        keyExtractor={(item, index) => index}
      />
    )}

   
  </JScreen>
  )
}

export default Assessments

const styles = StyleSheet.create({})