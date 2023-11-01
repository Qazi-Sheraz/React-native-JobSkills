import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import url from '../../config/url';
import {observer} from 'mobx-react';
import colors from '../../config/colors';
import {JToast} from '../../functions/Toast';
import {StoreContext} from '../../mobx/store';
import JText from '../../customComponents/JText';
import JEmpty from '../../customComponents/JEmpty';
import JScreen from '../../customComponents/JScreen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JSearchInput from '../../customComponents/JSearchInput';
import JEmployeUser from '../../customComponents/JEmployeUser';
import JChevronIcon from '../../customComponents/JChevronIcon';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import JGradientHeader from '../../customComponents/JGradientHeader';
import CLFavouriteJob from '../../loaders/Candidate/FavouriteJob/CLFavouriteJob';

const Employes = () => {
  const {navigate, goBack} = useNavigation();
  const store = useContext(StoreContext);
  const [loader, setLoader] = useState(true);
  const [employeeData, setEmployeeData] = useState([]);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(employeeData);
  const isFoucs = useIsFocused();
  const handleSearch = text => {
    setSearchQuery(text);

    const filtered = employeeData.filter(item => {
      return item.name.toLowerCase().includes(text.toLowerCase());
    });
    setFilteredData(filtered);
  };

  const _getEmployeData = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

    fetch(`${url.baseUrl}/company/employees`, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    })
      .then(response => response.json())
      .then(result => {
        // console.log(result.employee);
        setEmployeeData(result.employee);
      })

      .catch(error => {
        // console.log('error', error);
        JToast({
          type: 'danger',
          text1: store.lang.eror,
          text2: store.lang.error_while_getting_data,
        });
        setError(true);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    _getEmployeData();
  }, []);

  const onRefresh = useCallback(() => {
    store.setIsRefreshing(true);

    setTimeout(() => {
      _getEmployeData();
      store.setIsRefreshing(false);
    }, 1000);
  }, [loader]);

  return (
    <JScreen
      isError={error}
      onTryAgainPress={() => {
        _getEmployeData(), setError(false);
      }}
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
          left={<JChevronIcon />}
        />
      }>
      {loader ? (
        <CLFavouriteJob />
      ) : employeeData?.length > 0 ? (
        <>
          <JSearchInput
            length={1}
            // autoFocus={false}
            onChangeText={handleSearch}
            value={searchQuery}
          />
          <View style={{flex: 1}}>
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={store.isRefreshing}
                  onRefresh={onRefresh}
                />
              }
              showsVerticalScrollIndicator={false}
              data={searchQuery?.length > 0 ? filteredData : employeeData}
              renderItem={({item, index}) => <JEmployeUser item={item} />}
            />
          </View>
        </>
      ) : (
        <JEmpty />
      )}
    </JScreen>
  );
};

export default observer(Employes);

const styles = StyleSheet.create({});
