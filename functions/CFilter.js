import AsyncStorage from '@react-native-async-storage/async-storage';
import {JToast} from './Toast';
const storeData = async (value,store) => {
  try {
    store.pushSearch(value)
    const jsonValue = JSON.stringify(store.recentSearch)
    await AsyncStorage.setItem('@recent', jsonValue)
  } catch (e) {
    // saving error
  }
}

export const _search = (e, store,isSearch) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

  var formdata = new FormData();

  formdata.append('title', e);
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
      // console.log(result.data);
      if (result.data?.length < 1) {
        JToast({
          type: 'error',
          text1: 'No Result Found !',
        });
        store.setFilterDataApiLoader(false);
      } else {
        if(isSearch){

          storeData(e,store);
        }
        store.setFilterData(result.data);
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

  values.type && formdata.append('job_type', `[${values.type?.id}]`);
  values.category && formdata.append('categories', values.category?.id);
  values.skill && formdata.append('skills', values.skill?.id);
  values.gender &&
    formdata.append(
      'gender',
      values.gender?.name === 'Male'
        ? '1'
        : values.gender?.name === 'Female'
        ? '0'
        : '2',
    );
  values.level && formdata.append('career_level', values.level?.id);
  values.area && formdata.append('functional_area', values.area?.id);

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
      // console.log(result.data);

      if (result.data?.length < 1) {
        JToast({
          type: 'error',
          text1: 'No Result Found !',
        });
      } else {
        store.setFilterData(result.data);
      }
    })
    .catch(error => {
      // console.log('error', error);
    })
    .finally(() => {
      navigation.navigate('CSearch');
      store.setFilterDataApiLoader(false);
    });
};
