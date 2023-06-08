import url from '../../config/url';
import {JToast} from '../Toast';

export const _getFollowingCompanyData = store => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${store.token.token}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  fetch(`${url.baseUrl}/favourite-companies`, requestOptions)
    .then(response => response.json())
    .then(res => {
      // console.log('Following Company', res.data);
      store.setFollowingApiLoader(true);
      store.setFollowingInput('');
      store.setFollowingList(res.data);
      store.setFollowingApiLoader(false);
    })
    .catch(error => {
      // console.log('Error while getting Favourite Company', error);
      JToast({
        type: 'error',
        text1: 'Error',
        text2: error.response && error.response.data,
      });
      store.setFollowingApiError(true);
      store.setFollowingApiLoader(false);
    });
};

export const _saveToFollowing = (store, setLoader, id) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${store.token.token}`);

  var formdata = new FormData();
  formdata.append('companyId', id);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };
  setLoader(true);
  fetch(`${url.baseUrl}/save-favourite-companies`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result);
      if (result.data) {
        JToast({
          type: 'success',
          text1: result.message,
        });

        // store.pushFollowingList(result);
        _getFollowingCompanyData(store);
      } else if (result.data === false) {
        JToast({
          type: 'error',
          text1: result.message,
        });
        _getFollowingCompanyData(store);
        // store.filterFollowingList(id);
      }
    })
    .catch(error => {
      // console.log(error);
      JToast({
        type: 'error',
        text1: 'Error',
        text2: error.response && error.response.data,
      });
    })
    .finally(() => {
      setLoader(false);
    });
};
