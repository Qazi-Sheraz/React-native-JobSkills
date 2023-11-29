import AsyncStorage from '@react-native-async-storage/async-storage';
import {JToast} from './Toast';
const storeData = async (value, store) => {
  try {
    store.pushSearch(value);
    const jsonValue = JSON.stringify(store.recentSearch);
    await AsyncStorage.setItem('@recent', jsonValue);
  } catch (e) {
    // saving error
  }
};

export const _search = (e, store, isSearch) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

  var formdata = new FormData();

  formdata.append('title', e?.search);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };

  store.setFilterDataApiLoader(true);
  fetch('https://dev.jobskills.digital/api/search-jobs', requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      if (result?.count == 0) {
        JToast({
          type: 'danger',
          text1: store.lang.no_result_found,
        });
        store.setFilterData([]);
        store.setFilterDataApiLoader(false);
      } else {
        if (isSearch) {
          storeData(e, store);
        }
        store.setFilterData(result?.data);
        store.setFilterDataApiLoader(false);
      }
    })
    .catch(error => {
      // console.log('error', error);
      store.setFilterDataApiLoader(false);
    });
};

export const _searchFilter = (values, store, navigation) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

  var formdata = new FormData();

  formdata.append('job_type', values.type ? `[${values.type?.id}]` : '');
  formdata.append('categories', values.category?.id ? values.category?.id : '');
  formdata.append('skill', values.skill?.id ? values.skill?.id : '');
  formdata.append(
    'gender',
    values.gender?.name === 'Male'
      ? '1'
      : values.gender?.name === 'Female'
      ? '0'
      : '',
  );
  formdata.append('career_level', values.level?.id ? values.level?.id : '');
  // formdata.append('functional_area', values.area?.id ? values.area?.id : '');
  console.log(formdata);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };

  // console.log(requestOptions);
  store.setFilterDataApiLoader(true);
  fetch('https://dev.jobskills.digital/api/search-jobs', requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log('result', result?.count);
      if (result?.count == 0) {
        JToast({
          type: 'danger',
          text1: store.lang.no_result_found,
        });
        store.setFilterData([]);
      } else {
        store.setFilterData(result?.data);
      }
    })
    .catch(error => {
      console.log('error', error);
    })
    .finally(() => {
      navigation.navigate('ESearch');
      store.setFilterDataApiLoader(false);
    });
};
