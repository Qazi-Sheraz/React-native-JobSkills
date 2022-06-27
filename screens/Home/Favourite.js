import {StyleSheet, FlatList, RefreshControl} from 'react-native';
import React, {useEffect, useContext, useCallback, useState} from 'react';
import JScreen from '../../customComponents/JScreen';
import JText from '../../customComponents/JText';
import {StoreContext} from '../../mobx/store';
import {observer} from 'mobx-react';
import JJobTile from '../../customComponents/JJobTile';
import {RFPercentage} from 'react-native-responsive-fontsize';

import colors from '../../config/colors';

import JSearchInput from '../../customComponents/JSearchInput';
import CLFavouriteJob from '../../loaders/Candidate/FavouriteJob/CLFavouriteJob';
import JEmpty from '../../customComponents/JEmpty';
import JGradientHeader from '../../customComponents/JGradientHeader';
import url from '../../config/url';
import Toast from 'react-native-toast-message';
function Favourite() {
  const store = useContext(StoreContext);

  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
  const getFavouriteJobList = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${url.baseUrl}/favourite-jobs`, requestOptions)
      .then(response => response.json())
      .then(res => {
        setLoader(true);
        setError(false);
        setInput('');
        store.setFavouriteList(res.data);
        setLoader(false);
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.response && error.response.data,
        });
        setError(true);
      });
  };

  const onRefresh = useCallback(() => {
    store.setIsRefreshing(true);
    getFavouriteJobList();
    store.setIsRefreshing(false);
  }, []);

  useEffect(() => {
    getFavouriteJobList();

    return () => {};
  }, []);

  return (
    <JScreen
      onTryAgainPress={() => getFavouriteJobList()}
      isError={error}
      errorText={'Reload Screen!'}
      onReloadPress={() => getFavouriteJobList()}
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {'Favourite Job'}
            </JText>
          }
        />
      }
      style={{marginHorizontal: RFPercentage(2)}}>
      {loader === true ? (
        <CLFavouriteJob />
      ) : (
        <React.Fragment>
          <JSearchInput
            onChangeText={e => {
              setInput(e);
            }}
            onPressIcon={() => alert('Icon Pressed')}
          />
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={store.isRefreshing}
                onRefresh={onRefresh}
              />
            }
            data={
              input.length === 0
                ? store.favouriteList
                : store.favouriteList.filter(e =>
                    e.job.job_title.toLowerCase().includes(input.toLowerCase()),
                  )
            }
            ListEmptyComponent={() => <JEmpty />}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <JJobTile
                type="job"
                containerStyle={{marginBottom: RFPercentage(2)}}
                img={item.job.company.company_url}
                title={item.job.job_title}
                location={item.job.city.name}
                category={item.job.job_category.name}
              />
            )}
            keyExtractor={data => data.id}
          />
        </React.Fragment>
      )}
    </JScreen>
  );
}

export default observer(Favourite);

const styles = StyleSheet.create({});
