import {StyleSheet, FlatList, View, ActivityIndicator} from 'react-native';
import React, { useContext,useEffect,useState } from 'react';
import JScreen from '../../customComponents/JScreen';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JText from '../../customComponents/JText';
import JIcon from '../../customComponents/JIcon';
import colors from '../../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
import JSearchInput from '../../customComponents/JSearchInput';
import JEmployeUser from '../../customComponents/JEmployeUser';
import { StoreContext } from '../../mobx/store';
import { baseUrl } from '../../ApiUrls';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const Employes = () => {
  const {navigate, goBack} = useNavigation();
  const store=useContext(StoreContext);
  const [loader, setLoader] = useState(true);
  const [employeeData, setEmployeeData] = useState([]);
  const [error,setError]=useState(false)

  const _getEmployeData = () => {

    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDZjZDg5MzZkNmQ0ZWE3NTQ5N2RlZDZhMDgwNjliNzM1NmRmYmQ5YzZlODRmZmFiZTE2NjQ4N2VkN2ExMWFkMzk1YzgyZjZkNGRkNWZkMGUiLCJpYXQiOjE2ODAyNTA2NDYuNzg0NjAxLCJuYmYiOjE2ODAyNTA2NDYuNzg0NjA0LCJleHAiOjE3MTE4NzMwNDYuNzc3NzY2LCJzdWIiOiI4NCIsInNjb3BlcyI6W119.XQA1UjOHQZkuqkLbAY0V8quXIn6dBY_ZIl8Igkko0Kv1ODdOrVXmUsnbUu59jeIg_I8mVgcnH3XGRSoEDAXb5YSocyD1POwDo7_ED1dc4TYeniS7RrBwoJ4ZTyLFdc0rWo7inelD9n2HoLHquTsh6_tz4QAyc8xaB4_58H3LvKo86FEWoBTY4NsP3CAGzylD-8-SEIHze-HfeYjaaRoVlDeQpY6d3mfqzmBummF7nKHtkLSgTCEEaEsIx2yhZTrapWL-5GKdx-aj1qmKbTE5WYGUgMVu-39Mz7GCvYMryN5HF-9Y4guufDMT0atrXnc7BkyRe0lIVfNE3ga9GcSePLDkzMrCbBjmfTmvKuxoT-sXyXFb7_vu8FogA6Pc7v77LTciuuc9duwRSpK3_fxMy4dZucnFTGx7tTWSwlipQWthwa3wd0gVs5F9cXpgVxLk4Pndxuq-PF8_DvpbWNOCXsm0KWO59zbPgSVyil18KUv4F9NduT49z3MQgzfY9yjE1rkSgRW5Va4PGQhVEle5f2Dce-bysgPhWWK0wrQtLd1AVpbhLIIqI4obDo-2OFdK62GwLor1RfKU0Qc_WiP-8UOljUnVBskGVRVlqvDL8yblrM7ro73JbgpJPlV4Uz67FaC22iyhLbJsRnbQpJVKWgfcw6jyGqjKPaspsFYpPoM');

    fetch(`${baseUrl}/company/employees` ,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    })

    .then(response => response.json())
      .then(result => {
        // console.log(result.employee);
        setEmployeeData(result.employee);
      
      })

      .catch(error => {
        // console.log('error', error);
        alert('error',error)
   
      }).finally(()=>{
        setLoader(false);
      });
  };

 useEffect(() => {
  _getEmployeData();
 }, [loader]);

  return (
    <JScreen
      isError={error}
      onTryAgainPress={() => _getEmployeData()}
      style={{paddingHorizontal: RFPercentage(2)}}
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              Employe User
            </JText>
          }
          left={
            <JIcon
              icon="fe"
              onPress={() => goBack()}
              name="chevron-left"
              size={RFPercentage(3.5)}
              color={colors.white[0]}
            />
          }
        />
      }>
      {loader ? (
        <ActivityIndicator />
      ) : (
        <>
          <JSearchInput
            length={1}
            onChangeText={e => {
              store.setAllFeatureCompanyInput(e);
            }}
            onPressIcon={() => alert('Icon Pressed')}
          />
          <View>
            <FlatList
              data={employeeData}
              renderItem={({item, index}) => (
                <JEmployeUser
                  item={item} 
                />
              )}
            />
          </View>
        </>
      )}
    </JScreen>
  );
};

export default Employes;

const styles = StyleSheet.create({});
