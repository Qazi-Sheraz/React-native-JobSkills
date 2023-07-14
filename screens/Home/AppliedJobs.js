import {StyleSheet, FlatList, RefreshControl} from 'react-native';
import React, {useContext, useCallback, useState} from 'react';
import JScreen from '../../customComponents/JScreen';
import JText from '../../customComponents/JText';
import {StoreContext} from '../../mobx/store';
import {observer} from 'mobx-react';
import JJobTile from '../../customComponents/JJobTile';
import {RFPercentage} from 'react-native-responsive-fontsize';

import colors from '../../config/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import JSearchInput from '../../customComponents/JSearchInput';
import CLFavouriteJob from '../../loaders/Candidate/FavouriteJob/CLFavouriteJob';
import JEmpty from '../../customComponents/JEmpty';
import JGradientHeader from '../../customComponents/JGradientHeader';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import {_getAppliedJobData} from '../../functions/Candidate/BottomTab';
function AppliedJobs({navigation}) {
  const store = useContext(StoreContext);

  const onRefresh = useCallback(() => {
    store.setIsRefreshing(true);

    setTimeout(() => {
      _getAppliedJobData(store);
      store.setIsRefreshing(false);
    }, 2000);
  }, []);

  console.log(store.appliedJobList?.statusArray);

  return (
    <JScreen
      isError={store.appliedJobError}
      errorText={'Reload Screen!'}
      onReloadPress={() => _getAppliedJobData(store)}
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {store.lang.applied_job}
            </JText>
          }
          right={
            // store.appliedJobList.appliedJob.length > 0 &&
            store.appliedJobApiLoader === false && (
              <Menu>
                <MenuTrigger>
                  <Entypo
                    name="dots-three-vertical"
                    size={RFPercentage(2.8)}
                    color={colors.white[0]}
                  />
                </MenuTrigger>

                <MenuOptions>
                  {[store.lang.all, ...store.appliedJobList?.statusArray].map(
                    (item, index) => (
                      <MenuOption
                        style={{
                          marginHorizontal: RFPercentage(1),
                          paddingVertical: RFPercentage(1.5),
                        }}
                        key={index}
                        onSelect={() => {
                          store.setAppliedJobSelect(item);
                        }}>
                        <JText>{item}</JText>
                      </MenuOption>
                    ),
                  )}
                </MenuOptions>
              </Menu>
            )
          }
        />
      }
      style={{marginHorizontal: RFPercentage(2)}}>
      {store.appliedJobApiLoader === true ? (
        <CLFavouriteJob />
      ) : (
        <React.Fragment>
          <JSearchInput
            length={store.appliedJobList?.appliedJob?.length}
            onChangeText={e => {
              store.setAppliedJobInput(e);
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
              store.appliedJobInput?.length > 0
                ? store.appliedJobList?.appliedJob?.filter(e =>
                    e.job_title
                      .toLowerCase()
                      .includes(store.appliedJobInput.toLowerCase()),
                  )
                : store.appliedJobSelect?.length > 0 &&
                  store.appliedJobSelect !== store.lang.all
                ? store.appliedJobList?.appliedJob?.filter(
                    e =>
                      e?.application_status?.toLowerCase() ===
                      store?.appliedJobSelect?.toLowerCase(),
                  )
                : store.appliedJobList?.appliedJob
            }
            ListEmptyComponent={() => <JEmpty />}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <JJobTile
                onPress={() =>
                  navigation.navigate('CJobDetails', {
                    id: item.job_unique_id,
                  })
                }
                type="appliedjob"
                containerStyle={{marginBottom: RFPercentage(2)}}
                isJob={true}
                img={item.company_url}
                title={item.job_title}
                location={item.city_name}
                category={item.job_category}
                status={item.status_id}
              />
            )}
            keyExtractor={(index) => index}
          />
        </React.Fragment>
      )}
    </JScreen>
  );
}

export default observer(AppliedJobs);

const styles = StyleSheet.create({});
