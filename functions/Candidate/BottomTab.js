import { JToast } from '../Toast';
import url from '../../config/url';

export const _getHomeData = store => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  fetch(`${url.baseUrl}/home`, requestOptions)
    .then(res => res.json())
    .then(res => {

      store.setHomeApiLoader(true);
      store.setHomeData(res);
      store.setHomeApiLoader(false);
    })
    .catch(error => {
      // console.log(error);
      JToast({
        type: 'danger',
        text1: store.lang.eror,
        text2: error.response && error.response.data,
      });
      store.setHomeApiError(true);
      store.setHomeApiLoader(false);
    });
};

export const _getFavouriteJobData = store => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  store.setFavouriteApiLoader(true);
  store.setFavouriteApiError(false);
  store.setFavouriteInput('');
  fetch(`${url.baseUrl}/favourite-jobs`, requestOptions)
    .then(response => response.json())
    .then(res => {
      // console.log('Favourite Jobs', res.data);
      store.setFavouriteList(res.data);
      store.setFavouriteApiLoader(false);
    })
    .catch(error => {
      // console.log(error);
      JToast({
        type: 'danger',
        text1: store.lang.eror,
        text2: error.response && error.response.data,
      });
      store.setFavouriteApiError(true);
      store.setFavouriteApiLoader(false);
    });
};

export const _saveToFavoriteList = (store, setLoader1, id) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

  setLoader1(true);
  var formdata = new FormData();
  formdata.append('jobId', id);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };

  fetch(`${url.baseUrl}/save-favourite-job`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result);
      if (result.data) {
        JToast({
          type: 'success',
          text1: store.lang.success,
          text2: result.message,
        });
        // _getFavouriteJobData(store);
        store.pushFavouriteList(result.data[0]);
      } else if (result.data === false) {
        JToast({
          type: 'danger',
          text1: store.lang.success,
          text2: result.message,
        });
        store.removeFavoriteList(id);
      }

      setLoader1(false);
    })
    .catch(error => {
      // console.log(error);
      JToast({
        type: 'danger',
        text1: store.lang.eror,
        text2: error.response && error.response.data,
      });
      setLoader1(false);
    });
};


export const _getAppliedJobData = store => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  store.setAppliedJobApiLoader(true);
  store.setAppliedJobInput('');
  store.setAppliedJobSelect('');
  fetch(`${url.baseUrl}/applied-jobs`, requestOptions)
    .then(response => response.json())
    .then(res => {
      store.setAppliedJobList(res);
      store.setAppliedJobApiLoader(false);
    })
    .catch(error => {
      // console.log('Applied Job Error',error)
      JToast({
        type: 'danger',
        text1: store.lang.eror,
        text2: error.response && error.response.data,
      });
      setAppliedJobError(true);
      setAppliedJobApiLoader(false);
    });
};

export const _getAllJobData = store => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,

    redirect: 'follow',
  };

  fetch(`${url.baseUrl}/job-list`, requestOptions)
    .then(res => res.json())
    .then(res => {
      store.setJobApiLoader(true);
      //  console.log('ressssss',res),
      store.setJobData(res);
      store.setJobApiLoader(false);
    })
    .catch(error => {
      // console.log(error);
      JToast({
        type: 'danger',
        text1: store.lang.eror,
        text2: error.response && error.response.data,
      });
      store.setJobApiError(true);
      store.setJobApiLoader(false);
    });
};

export const _getAllFeatureJobData = store => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,

    redirect: 'follow',
  };

  fetch(`${url.baseUrl}/all-featured-jobs`, requestOptions)
    .then(res => res.json())
    .then(res => {
      store.setFeatureJobApiLoader(true);

      store.setFeatureJobData(res);
      store.setFeatureJobApiLoader(false);
    })
    .catch(error => {
      // console.log(error);
      JToast({
        type: 'danger',
        text1: store.lang.eror,
        text2: error.response && error.response.data,
      });
      store.setFeatureApiError(true);
      store.setFeatureJobApiLoader(false);
    });
};

export const _getAllFeatureCompanyData = store => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${store.token.token}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,

    redirect: 'follow',
  };

  fetch(`${url.baseUrl}/all-featured-companies`, requestOptions)
    .then(res => res.json())
    .then(res => {
      store.setFeatureCompanyApiLoader(true);

      store.setFeatureCompanyData(res);
      store.setFeatureCompanyApiLoader(false);
    })
    .catch(error => {
      // console.log(error);
      JToast({
        type: 'danger',
        text1: store.lang.eror,
        text2: error.response && error.response.data,
      });
      store.setFeatureApiError(true);
      store.setFeatureCompanyApiLoader(false);
    });
};

export const _dashboard = (store) => {
  var myHeaders = new Headers();
  myHeaders.append(

    'Authorization',
    `Bearer ${store.token?.token}`, {
    'Accept': 'application/json',
    'Content-Type': 'application/json'

  }
  );

  fetch(`${url.baseUrl}/dashboardEmployer`, {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  })
    .then(response => response.json())
    .then(result => {
      store.setEHomeApiError(false)
      store.setEmployeHome(result);
    })
    .catch(error => {
      console.log('home==error', error);
      JToast({
        type: 'danger',
        text1: store.lang.eror,
        text2: store.lang.error_while_getting_data,
      });
      store.setEHomeApiError(true);
    })
    .finally(() => {
      store.setEHomeApiLoader(false);
    });
};

export const _addnewJob = (store) => {
  var myHeaders = new Headers();
  myHeaders.append(
    'Authorization',
    `Bearer ${store.token?.token}`,
  );
  fetch(
    `${url.baseUrl}/employer/jobs/create`,

    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    },
  )
    .then(response => response.json())
    .then(result => {
      store.setCreateApiError(false);
      store.setJobCreate(result);

      // console.log(result.arabic_data)
      // store.setCreateApiLoader(false);
    })
    .catch(error => {
      // console.log('error', error);
      JToast({
        type: 'danger',
        text1: store.lang.eror,
        text2: store.lang.error_while_getting_data,
      });
      store.setCreateApiError(true);

    })
    .finally(() => {
      store.setCreateApiLoader(false);

    });
};

export const _country = (store) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

  var requestOptions = {
    method: 'Get',
    headers: myHeaders,
    redirect: 'follow',
  };
  fetch(`${url.baseUrl}/country-list`, requestOptions)
    .then(response => response?.json())
    .then(result => {
      store.setCountry(result.english?.country);
    })
    .catch(error => {
      JToast({
        type: 'danger',
        text1: store.lang.eror,
        text2: store.lang.error_while_getting_data,
      });
      store.setCountryApiError(true);
    })
    .finally(() => {
      store.setCountryApiLoader(false);
    });
};





