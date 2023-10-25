import {
  FlatList,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import React, {
  useContext,
  useCallback
} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { observer } from 'mobx-react';
import colors from '../../config/colors';
import { StoreContext } from '../../mobx/store';
import JText from '../../customComponents/JText';
import JHeader from '../../customComponents/JHeader';
import JScreen from '../../customComponents/JScreen';
import { _searchFilter } from '../../functions/CFilter';
import JJobTile from '../../customComponents/JJobTile';
import Feather from 'react-native-vector-icons/Feather';
import CLHome from '../../loaders/Candidate/Home/CLHome';
import JFindTitle from '../../customComponents/JFindTitle';
import JLogoImage from '../../customComponents/JLogoImage';
import JScrollView from '../../customComponents/JScrollView';
import { RFPercentage } from 'react-native-responsive-fontsize';
import JCompanyTile from '../../customComponents/JCompanyTile';
import JSideHeading from '../../customComponents/JSideHeading';
import JGradientView from '../../customComponents/JGradientView';
import { _getHomeData } from '../../functions/Candidate/BottomTab';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


function Home({ navigation }) {
  const store = useContext(StoreContext);
  const data = store.homeData;
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
      style={{ paddingHorizontal: RFPercentage(2) }}
      internet={true}
      header={
        <JHeader
          containerStyle={{
            flexDirection: 'row',
          }}
          left={
            <Feather
              name="menu"
              color={colors.black[0]}
              size={RFPercentage(3.5)}
              onPress={() => navigation.openDrawer()}
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
              name="bell-badge-outline"
              size={RFPercentage(3.5)}
              onPress={() => navigation.navigate('CNotification')}
            />
          }
        />
      }>
      {store.homeApiLoader === true ? (
        <CLHome />
      ) : (
        <React.Fragment>

          <JFindTitle JobTitle={store.lang.jobTitle_Skills_Company} onPress={() => navigation.navigate('ESearch')} />


          <JScrollView refreshing={store.isRefreshing} onRefresh={onRefresh}>
            <JSideHeading
              leftHeading={store.lang.popular_categories}
              rightHeading={
                store.filterDataApiLoader && (
                  <ActivityIndicator
                    size="small"
                    color={colors.black[0]}
                    style={{ marginRight: RFPercentage(1) }}
                  />
                )
              }
              onRightHeadingPress={() => alert('sEE all')}
            />

            <FlatList
              horizontal
              data={data?.popularCategories}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
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
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: RFPercentage(14),
                    height: RFPercentage(14),
                    marginRight: RFPercentage(0.5),
                  }}>
                  <JText fontColor={colors.white[0]} style={{ textAlign: 'center' }}>{item.name}</JText>
                  <JText fontColor={colors.white[0]}>({item.job_count})</JText>
                </JGradientView>
              )}
              keyExtractor={data => data.name}
            />
            <JSideHeading
              rightHeading={store.lang.see_all}
              leftHeading={store.lang.featured_job}
              onRightHeadingPress={() => navigation.navigate('CFeatureJob')}
            />
            {data?.featuredJobs?.length > 0 ? (
              <JJobTile
                type="job"
                onPress={() =>
                  navigation.navigate('CJobDetails', {
                    id: data?.featuredJobs[0]?.job_id,
                  })
                }
                jobId={data?.featuredJobs[0]?.id}
                img={data?.featuredJobs[0]?.image}
                favouriteData={store.favouriteList}
                title={data?.featuredJobs[0]?.job_title}
                location={`${data?.featuredJobs[0]?.city_name !== null ? data?.featuredJobs[0]?.city_name : ''} ${data?.featuredJobs[0]?.state_name !== null ? data?.featuredJobs[0]?.state_name : ''} ${data?.featuredJobs[0]?.country_name !== null ? data?.featuredJobs[0]?.country_name : 'N/A'}`}
                category={`${store.lang.id == 0 ? data?.featuredJobs[0]?.job_category_english : data?.featuredJobs[0]?.job_category_arabic}`}
              />
            ) : (
              <JJobTile type="job" isempty={true} />
            )}

            <JSideHeading
              rightHeading={store.lang.see_all}
              leftHeading={store.lang.featured_company}
              onRightHeadingPress={() => navigation.navigate('CFeatureCompany')}
            />
            {data?.featuredCompanies?.length > 0 ? (
              <JCompanyTile
                type={'company'}
                OpenJob={'Open Job'}
                followingList={store.followingList}
                companyId={data?.featuredCompanies[0]?.id}
                onPress={() =>
                  navigation.navigate('CSelectedCompany', {
                    id: data?.featuredCompanies[0]?.unique_id,
                    c_name: data?.featuredCompanies[0]?.company_name,
                  })
                }
                onIconPress={() => alert('Icon Press')}
                img={data?.featuredCompanies[0]?.company_url}
                title={data?.featuredCompanies[0]?.company_name ? data?.featuredCompanies[0]?.company_name : 'N/A'}
                location={`${data?.featuredCompanies[0]?.city_name !== null ? data?.featuredCompanies[0]?.city_name : ''} ${data?.featuredCompanies[0]?.state_name !== null ? data?.featuredCompanies[0]?.state_name : ''} ${data?.featuredCompanies[0]?.country_name !== null ? data?.featuredCompanies[0]?.country_name : 'N/A'}`}
              />
            ) : (
              <JJobTile isempty={true} />
            )}
            <JSideHeading
              rightHeading={store.lang.see_all}
              leftHeading={store.lang.latest_jobs}
              onRightHeadingPress={() => navigation.navigate('CAllJobs')}
            />

            {data?.latestJobs?.length > 0 ? (
              data?.latestJobs.map((item, index) => (
                <React.Fragment key={index}>
                  <JJobTile
                    jobId={item.id}
                    favouriteData={store.favouriteList}
                    onPress={() =>
                      navigation.navigate('CJobDetails', {
                        id: item.job_id,
                      })
                    }
                    onIconPress={() => alert('Icon Press')}
                    type="job"
                    title={item?.job_title}
                    location={item?.full_location}
                    category={`${store.lang.id == 0 ?
                      (item?.job_category_english.length > 30 ? item.job_category_english.substring(0, 30) + '....' : item.job_category_english)
                      : (item?.job_category_arabic.length > 30 ? item?.job_category_arabic.substring(0, 30) + '....' : item?.job_category_arabic)
                      }`}
                    img={item?.company_image}
                    containerStyle={{ marginVertical: RFPercentage(1) }}
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
