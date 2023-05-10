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
import url from '../../config/url';

const Employes = () => {
  const {navigate, goBack} = useNavigation();
  const store=useContext(StoreContext);
  const [loader, setLoader] = useState(true);
  const [employeeData, setEmployeeData] = useState([]);
  const [error,setError]=useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(employeeData);

  const handleSearch = (text) => {
    setSearchQuery(text);
    
    const filtered = employeeData.filter((item) => {
      return item.name.toLowerCase().includes(text.toLowerCase());
    });
    setFilteredData(filtered);
  };


  const _getEmployeData = () => {

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token.token}`,);

    fetch(`${url.baseUrl}/company/employees` ,
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
            // autoFocus={false}
            onChangeText={handleSearch}
            value={searchQuery}

            
            onPressIcon={() => alert('Icon Pressed')}
          />
          <View>
            <FlatList

             data={searchQuery.length > 0 ?filteredData :employeeData}
              renderItem={({item, index}) => <JEmployeUser item={item} />}
            />
          </View>
        </>
      )}
    </JScreen>
  );
};

export default Employes;

const styles = StyleSheet.create({});
