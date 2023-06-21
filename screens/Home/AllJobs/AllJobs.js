import {
  FlatList,
  StyleSheet,
  Text,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useCallback} from 'react';
import {observer} from 'mobx-react';
import JScreen from '../../../customComponents/JScreen';
import {_getAllJobData} from '../../../functions/Candidate/BottomTab';
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
import JChevronIcon from '../../../customComponents/JChevronIcon';
function AllJobs({navigation}) {

  const store = useContext(StoreContext);
  useEffect(() => {
    _getAllJobData(store);
    return () => {};
  }, [store.favouriteList]);

  const onRefresh = useCallback(() => {
    store.setIsRefreshing(true);
    _getAllJobData(store);
    store.setIsRefreshing(false);
  }, []);

  return (
    <JScreen
      isError={store.appliedJobError}
      errorText={'Reload Screen!'}
      onReloadPress={() => _getFavouriteJobData(store)}
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {store.lang.jobs}
            </JText>
          }
          left={
           <JChevronIcon onPress={()=>{ store.setAllJobInput(''),navigation.goBack()}}/>
          }
        />
      }
      style={{marginHorizontal: RFPercentage(2)}}>
      {store.jobApiLoader === true ? (
        <ActivityIndicator />
      ) : (
        <React.Fragment>
          <JSearchInput
            length={store.jobData?.jobs?.length}
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
              store.allJobInput?.length === 0
                ? store.jobData?.jobs
                : store.jobData?.jobs.filter(e =>
                    e.job_title
                      .toLowerCase()
                      .includes(store.allJobInput.toLowerCase()),
                  )
            }
            ListEmptyComponent={() => <JEmpty />}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <JJobTile
                favouriteData={store.favouriteList}
                jobId={item.id}
                onPress={() =>
                  navigation.navigate('CJobDetails', {
                    id: item.job_id,
                  })
                }
                type="job"
                containerStyle={{marginBottom: RFPercentage(2)}}
                img={item.company_image}
                title={item.job_title}
                location={item.full_location?item.full_location:'N/A'}
                category={store.lang.id==0?item.job_category_english:item.job_category_arabic}
              />
            )}
            keyExtractor={data => data.id}
          />
        </React.Fragment>
      )}
    </JScreen>
  );
}

export default observer(AllJobs);

const styles = StyleSheet.create({});
