import {FlatList, StyleSheet, Text, RefreshControl} from 'react-native';
import React, {useEffect, useCallback} from 'react';
import {observer} from 'mobx-react';
import JScreen from '../../../customComponents/JScreen';
import {_getAllFeatureJobData} from '../../../functions/Candidate/BottomTab';
import JText from '../../../customComponents/JText';
import {useContext} from 'react';
import {StoreContext} from '../../../mobx/store';
import JJobTile from '../../../customComponents/JJobTile';
import JEmpty from '../../../customComponents/JEmpty';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JGradientHeader from '../../../customComponents/JGradientHeader';
import colors from '../../../config/colors';
import JSearchInput from '../../../customComponents/JSearchInput';
import Feather from 'react-native-vector-icons/Feather';
const FeatureJob = ({navigation}) => {
  const store = useContext(StoreContext);
  useEffect(() => {
    _getAllFeatureJobData(store);
    return () => {};
  }, [store.favouriteList]);

  const onRefresh = useCallback(() => {
    store.setIsRefreshing(true);
    _getAllFeatureJobData(store);
    store.setIsRefreshing(false);
  }, []);

  return (
    <JScreen
      isError={store.featureJobApiError}
      errorText={'Reload Screen!'}
      onReloadPress={() => _getAllFeatureJobData(store)}
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {'Featured Job'}
            </JText>
          }
          left={
            <Feather
              onPress={() => navigation.goBack()}
              name="chevron-left"
              size={RFPercentage(3.5)}
              color={colors.white[0]}
            />
          }
        />
      }
      style={{marginHorizontal: RFPercentage(2)}}>
      {store.featureJobApiLoader === true ? (
        <JText>Loading....</JText>
      ) : (
        <React.Fragment>
          <JSearchInput
            length={store.featureJobData.featuredJobs.length}
            onChangeText={e => {
              store.setAllJobInput(e);
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
              store.allFeatureJobInput.length === 0
                ? store.featureJobData.featuredJobs
                : store.featureJobData.featuredJobs.filter(e =>
                    e.job_title
                      .toLowerCase()
                      .includes(store.allFeatureJobInput.toLowerCase()),
                  )
            }
            ListEmptyComponent={() => <JEmpty />}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <JJobTile
                favouriteData={store.favouriteList}
                jobId={item.id}
                onPress={() =>
                  navigation.navigate('CSelectedJob', {
                    id: item.job_id,
                  })
                }
                type="job"
                containerStyle={{marginBottom: RFPercentage(2)}}
                img={item.company.company_url}
                title={item.job_title}
                location={item.city.name}
                category={item.job_category.name}
              />
            )}
            keyExtractor={data => data.id}
          />
        </React.Fragment>
      )}
    </JScreen>
  );
};

export default observer(FeatureJob);

const styles = StyleSheet.create({});
