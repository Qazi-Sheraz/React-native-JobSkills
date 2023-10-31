import {FlatList, StyleSheet, Text, RefreshControl, ActivityIndicator} from 'react-native';
import React, {useEffect, useCallback} from 'react';
import {observer} from 'mobx-react';
import JScreen from '../../../customComponents/JScreen';
import {
  _getAllFeatureCompanyData,
  _getAllJobData,
} from '../../../functions/Candidate/BottomTab';
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
import JCompanyTile from '../../../customComponents/JCompanyTile';
import JChevronIcon from '../../../customComponents/JChevronIcon';
const FeatureCompany = ({navigation}) => {
  const store = useContext(StoreContext);
  useEffect(() => {
    _getAllFeatureCompanyData(store);
    return () => {};
  }, [store.followingList]);

  const onRefresh = useCallback(() => {
    store.setIsRefreshing(true);
    _getAllFeatureCompanyData(store);
    store.setIsRefreshing(false);
  }, []);

  return (
    <JScreen
      isError={store.featureCompanyApiError}
      errorText={'Reload Screen!'}
      onReloadPress={() => _getAllFeatureCompanyData()}
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {store.lang.featured_company}
            </JText>
          }
          left={<JChevronIcon onPress={()=>{ store.setAllFeatureCompanyInput(''),navigation.goBack()}}/>}
        />
      }
      style={{marginHorizontal: RFPercentage(2)}}>
      {store.featureCompanyApiLoader === true ? (
        <ActivityIndicator/>
      ) : (
        <React.Fragment>
          <JSearchInput
            length={store.featureCompanyData?.featuredCompanies?.length}
            onChangeText={e => {
              store.setAllFeatureCompanyInput(e);
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
              store.allFeatureCompanyInput?.length === 0
                ? store.featureCompanyData?.featuredCompanies
                : store.featureCompanyData?.featuredCompanies.filter(e =>
                    e.company_name
                      .toLowerCase()
                      .includes(store.allFeatureCompanyInput.toLowerCase()),
                  )
            }
            ListEmptyComponent={() => <JEmpty />}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <JCompanyTile
                onPress={() =>
                  navigation.navigate('CSelectedCompany', { 
                    id: item.unique_id,
                  })
                }
                // follower={true}
                containerStyle={{marginBottom: RFPercentage(2)}}
                companyId={item.id}
                followingList={store.followingList}
                onIconPress={() => alert('Icon Press')}
                location={`${item?.city_name!==null?item?.city_name:''} ${item?.state_name!==null?item?.state_name:''} ${item?.country_name!==null?item?.country_name:'N/A'}`}
                img={item.company_url}
                title={item.company_name}
              />
            )}
            keyExtractor={data => data.id}
          />
        </React.Fragment>
      )}
    </JScreen>
  );
};

export default observer(FeatureCompany);

const styles = StyleSheet.create({});
