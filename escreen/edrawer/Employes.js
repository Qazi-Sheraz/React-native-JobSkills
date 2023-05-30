import {StyleSheet, FlatList, View, RefreshControl,ActivityIndicator} from 'react-native';
import React, { useCallback, useContext,useEffect,useState } from 'react';
import JScreen from '../../customComponents/JScreen';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JText from '../../customComponents/JText';
import JIcon from '../../customComponents/JIcon';
import colors from '../../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import JSearchInput from '../../customComponents/JSearchInput';
import JEmployeUser from '../../customComponents/JEmployeUser';
import { StoreContext } from '../../mobx/store';
import url from '../../config/url';
import JNotfoundData from '../../customComponents/JNotfoundData';
import JChevronIcon from '../../customComponents/JChevronIcon';
import { observer } from 'mobx-react';

const Employes = () => {
  const {navigate, goBack} = useNavigation();
  const store=useContext(StoreContext);
  const [loader, setLoader] = useState(true);
  const [employeeData, setEmployeeData] = useState([]);
  const [error,setError]=useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(employeeData);
  const isFoucs = useIsFocused()
  const handleSearch = (text) => {
    setSearchQuery(text);
    
    const filtered = employeeData.filter((item) => {
      return item.name.toLowerCase().includes(text.toLowerCase());
    });
    setFilteredData(filtered);
  };


  const _getEmployeData = () => {

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`,);

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
 }, [loader,isFoucs]);

 const onRefresh = useCallback(() => {
  store.setIsRefreshing(true);

  setTimeout(() => {
    _getEmployeData();
    store.setIsRefreshing(false);
  }, 2000);
}, []);

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
              {store.lang.employe_user}
            </JText>
          }
          left={
            <JChevronIcon/>
          }
        />
      }>
      {loader ? (
        <ActivityIndicator />
      ) : (
      employeeData.length > 0 ?(
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
  refreshControl={
    <RefreshControl
      refreshing={store.isRefreshing}
      onRefresh={onRefresh}
    />
  }
             data={searchQuery.length > 0 ?filteredData :employeeData}
              renderItem={({item, index}) => <JEmployeUser item={item} />}
            />
          </View>
        </>
      ):<JNotfoundData/>)}
    </JScreen>
  );
};

export default observer(Employes);

const styles = StyleSheet.create({});
