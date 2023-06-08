export const _getProfile = store => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${store.token.token}`);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  fetch('https://dev.jobskills.digital/api/profile', requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result);
      store.setMyProfile(result);
      store.setMyProfileApiLoader(false);
    })
    .catch(error => {
      // console.log('error', error);
      store.setMyProfileApiError(error);
      store.setMyProfileApiLoader(false);
    });
};
