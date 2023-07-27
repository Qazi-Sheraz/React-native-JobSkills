import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';
import React, {useContext, useCallback} from 'react';
import CLHome from '../../loaders/Candidate/Home/CLHome';
import JScreen from '../../customComponents/JScreen';
import {StoreContext} from '../../mobx/store';
import {observer} from 'mobx-react';
import JHeader from '../../customComponents/JHeader';
import JText from '../../customComponents/JText';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JLogoImage from '../../customComponents/JLogoImage';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import colors from '../../config/colors';
import JGradientView from '../../customComponents/JGradientView';
import JSideHeading from '../../customComponents/JSideHeading';
import JJobTile from '../../customComponents/JJobTile';
import JScrollView from '../../customComponents/JScrollView';
import JEmpty from '../../customComponents/JEmpty';
import {_getHomeData} from '../../functions/Candidate/BottomTab';
import JCompanyTile from '../../customComponents/JCompanyTile';
import {_searchFilter} from '../../functions/CFilter';
import JFindTitle from '../../customComponents/JFindTitle';

function Home({navigation}) {
  const store = useContext(StoreContext);
  const data = store.homeData;
  const maxLength = 20;
  const onRefresh = useCallback(() => {
    store.setIsRefreshing(true);
    setTimeout(() => {
      _getHomeData(store);

      store.setIsRefreshing(false);
    }, 2000);
  }, []);

  return (
    <JScreen
      isError={store.homeApiError}
      onTryAgainPress={() => _getHomeData(store)}
      style={{paddingHorizontal: RFPercentage(2)}}
      internet={true}
      header={
        <JHeader
        containerStyle={{
          flexDirection: 'row',
        }}
          left={
            <Feather
              color={colors.black[0]}
              onPress={() => navigation.openDrawer()}
              name="menu"
              size={RFPercentage(3.5)}
            />
          }
          center={
            <JLogoImage
              height={heightPercentageToDP(6.5)}
              width={widthPercentageToDP(15)}
              tintColor={null}
            />
          }
          right={
            <MaterialCommunityIcons
              color={colors.black[0]}
              onPress={() => navigation.navigate('CNotification')}
              name="bell-badge-outline"
              size={RFPercentage(3.5)}
            />
          }
        />
      }>
      {store.homeApiLoader === true ? (
        <CLHome />
      ) : (
        <React.Fragment>

          <JFindTitle JobTitle={store.lang.jobTitle_Skills_Company}  onPress={() => navigation.navigate('ESearch')}/>


          <JScrollView refreshing={store.isRefreshing} onRefresh={onRefresh}>
            <JSideHeading
              leftHeading={store.lang.popular_categories}
              rightHeading={
                store.filterDataApiLoader && (
                  <ActivityIndicator
                    style={{marginRight: RFPercentage(1)}}
                    size="small"
                    color={colors.black[0]}
                  />
                )
              }
              onRightHeadingPress={() => alert('sEE all')}
            />

            <FlatList
              horizontal
              data={data?.popularCategories}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <JGradientView
                  onPress={() => {
                    const values = {
                      category: {
                        id: item.id,
                      },
                    };

                    _searchFilter(values, store, navigation);
                  }}
                  containerStyle={{
                    width: RFPercentage(14),
                    height: RFPercentage(14),
                    marginRight: RFPercentage(0.5),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <JText fontColor={colors.white[0]}style={{textAlign:'center'}}>{item.name}</JText>
                  <JText fontColor={colors.white[0]}>({item.job_count})</JText>
                </JGradientView>
              )}
              keyExtractor={data => data.name}
            />
              <JSideHeading
              leftHeading={store.lang.featured_job}
              rightHeading={store.lang.see_all}
              onRightHeadingPress={() => navigation.navigate('CFeatureJob')}
            />
            {data?.featuredJobs?.length > 0 ? (
              <JJobTile
                favouriteData={store.favouriteList}
                jobId={data?.featuredJobs[0]?.id}
                onPress={() =>
                  navigation.navigate('CJobDetails', {
                    id: data?.featuredJobs[0]?.job_id,
                  })
                }
                onIconPress={() => alert('Icon Press')}
                type="job"
                location={`${data?.featuredJobs[0]?.city_name!==null?data?.featuredJobs[0]?.city_name:''} ${data?.featuredJobs[0]?.state_name!==null?data?.featuredJobs[0]?.state_name:''} ${data?.featuredJobs[0]?.country_name!==null?data?.featuredJobs[0]?.country_name:'N/A'}`}
                category={`${store.lang.id==0?data?.featuredJobs[0]?.job_category_english:data?.featuredJobs[0]?.job_category_arabic}`}
                img={data?.featuredJobs[0]?.image}
                title={data?.featuredJobs[0]?.job_title}
              />
            ) : (
              <JJobTile type="job" isempty={true} />
            )}

            <JSideHeading
              leftHeading={store.lang.featured_company}
              rightHeading={store.lang.see_all}
              onRightHeadingPress={() => navigation.navigate('CFeatureCompany')}
            />
            {data?.featuredCompanies?.length > 0 ? (
              <JCompanyTile
              type={'company'}
                followingList={store.followingList}
                companyId={data?.featuredCompanies[0]?.id}
                onPress={() =>
                  navigation.navigate('CSelectedCompany', {
                    id: data?.featuredCompanies[0]?.unique_id,
                  })
                }
                onIconPress={() => alert('Icon Press')}
                location={`${data?.featuredCompanies[0]?.city_name!==null?data?.featuredCompanies[0]?.city_name:''} ${data?.featuredCompanies[0]?.state_name!==null?data?.featuredCompanies[0]?.state_name:''} ${data?.featuredCompanies[0]?.country_name!==null?data?.featuredCompanies[0]?.country_name:'N/A'}`}
                img={data?.featuredCompanies[0]?.company_url}
                title={data?.featuredCompanies[0]?.company_name}
              />
            ) : (
              <JJobTile isempty={true} />
            )}
            <JSideHeading
              leftHeading={store.lang.latest_jobs}
              rightHeading={store.lang.see_all}
              onRightHeadingPress={() => navigation.navigate('CAllJobs')}
            />

            {data?.latestJobs?.length > 0 ? (
              data?.latestJobs.map((item, index) => (
                <React.Fragment key={index}>
                  <JJobTile
                    favouriteData={store.favouriteList}
                    jobId={item.id}
                    onPress={() =>
                      navigation.navigate('CJobDetails', {
                        id: item.job_id,
                      })
                    }
                    onIconPress={() => alert('Icon Press')}
                    type="job"
                    title={item?.job_title}
                    location={item?.full_location}
                    category={`${ 
                      store.lang.id==0 ?
                         (item?.job_category_english.length>30?item.job_category_english.substring(0, 30) + '....':item.job_category_english)
                        :(item?.job_category_arabic.length>30?item?.job_category_arabic.substring(0, 30) + '....':item?.job_category_arabic)
                    }`}
                    img={item?.company_image}
                    containerStyle={{marginVertical: RFPercentage(1)}}
                  />
                </React.Fragment>
              ))
            ) : (
              <JJobTile type="job" isempty={true} />
            )}
          </JScrollView>
        </React.Fragment>
      )}
    </JScreen>
  );
}

export default observer(Home);
const styles = StyleSheet.create({});
