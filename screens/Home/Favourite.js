import {StyleSheet, FlatList, RefreshControl} from 'react-native';
import React, {useContext, useCallback} from 'react';
import JScreen from '../../customComponents/JScreen';
import JText from '../../customComponents/JText';
import {StoreContext} from '../../mobx/store';
import {observer} from 'mobx-react-lite';
import JJobTile from '../../customComponents/JJobTile';
import {RFPercentage} from 'react-native-responsive-fontsize';

import colors from '../../config/colors';

import JSearchInput from '../../customComponents/JSearchInput';
import CLFavouriteJob from '../../loaders/Candidate/FavouriteJob/CLFavouriteJob';
import JEmpty from '../../customComponents/JEmpty';
import JGradientHeader from '../../customComponents/JGradientHeader';
import {_getFavouriteJobData} from '../../functions/Candidate/BottomTab';
function Favourite({navigation}) {
  const store = useContext(StoreContext);

  const onRefresh = useCallback(() => {
    store.setIsRefreshing(true);

    setTimeout(() => {
      _getFavouriteJobData(store);
      store.setIsRefreshing(false);
    }, 2000);
  }, []);

  return (
    <JScreen
      onTryAgainPress={() => _getFavouriteJobData(store)}
      isError={store.favouriteApiError}
      errorText={'Reload Screen!'}
      onReloadPress={() => _getFavouriteJobData(store)}
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
      {store.favouriteApiLoader === true ? (
        <CLFavouriteJob />
      ) : (
        <React.Fragment>
          <JSearchInput
            length={store.favouriteList.length}
            onChangeText={e => {
              store.setFavouriteInput(e);
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
              store.favouriteInput.length === 0
                ? store.favouriteList
                : store.favouriteList.filter(e =>
                    e.job_title
                      .toLowerCase()
                      .includes(store.favouriteInput.toLowerCase()),
                  )
            }
            ListEmptyComponent={() => <JEmpty />}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <JJobTile
                favouriteData={store.favouriteList}
                jobId={item.job_id}
                onPress={() =>
                  navigation.navigate('CSelectedJob', {
                    id: item.job_unique_id,
                  })
                }
                type="job"
                containerStyle={{marginBottom: RFPercentage(2)}}
                img={item.company_url}
                title={item.job_title}
                location={item.country_name}
                category={item.job_category}
              />
            )}
            keyExtractor={(item, index) => index}
          />
        </React.Fragment>
      )}
    </JScreen>
  );
}

export default observer(Favourite);

const styles = StyleSheet.create({});
