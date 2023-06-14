import React from 'react';
// import { useLocalStore, useObserver } from "mobx-react";
import {useLocalObservable} from 'mobx-react-lite';
import {action} from 'mobx';
import ar from '../config/translation/ar.json'
import en from '../config/translation/en.json'
import ud from '../config/translation/ud.json'
export const StoreContext = React.createContext();

export const StoreProvider = props => {
  const store = useLocalObservable(() => ({
    //Global

    isRefreshing: false,
    setIsRefreshing: action(e => (store.isRefreshing = e)),

    // Career Information
    //Experience
    experienceList: [],
    setExperienceList: action(e => (store.experienceList = e)),
    setOneExperienceList: action(
      e => (store.experienceList = [...store.experienceList, e]),
    ),
    experienceApiLoader: true,
    setExperienceApiLoader: action(e => (store.experienceApiLoader = e)),
    experienceApiError: false,
    setExperienceApiError: action(e => (store.experienceApiError = e)),

    //Education
    educationList: [],
    setEducationList: action(e => (store.educationList = e)),
    educationApiLoader: true,
    setEducationApiLoader: action(e => (store.educationApiLoader = e)),
    educationApiError: false,
    setEducationApiError: action(e => (store.educationApiError = e)),

    lang: 0,
    setLang: action(e => (store.lang = e)),

    //Home
    homeData: {},
    setHomeData: action(e => (store.homeData = e)),
    homeApiLoader: true,
    setHomeApiLoader: action(e => (store.homeApiLoader = e)),
    homeApiError: false,
    setHomeApiError: action(e => (store.homeApiError = e)),

    //Favourite
    favouriteList: [],
    removeFavoriteList: action(
      id =>
        (store.favouriteList = store.favouriteList.filter(
          e => e.job_id !== id,
        )),
    ),
    setFavouriteList: action(e => (store.favouriteList = e)),
    pushFavouriteList: action(e => {
      store.favouriteList.push(e);
    }),
    filterFavouriteList: action(e =>
      store.favouriteList.filter(item => item.job_id !== e),
    ),
    favouriteApiLoader: true,
    setFavouriteApiLoader: action(e => (store.favouriteApiLoader = e)),
    favouriteApiError: false,
    setFavouriteApiError: action(e => (store.favouriteApiError = e)),
    favouriteInput: '',
    setFavouriteInput: action(e => (store.favouriteInput = e)),

    //Followings
    followingList: [],
    setFollowingList: action(e => (store.followingList = e)),
    pushFollowingList: action(e => {
      store.followingList.push(e);
    }),
    filterFollowingList: action(e =>
      store.followingList.filter(item => item.company_id != e),
    ),
    followingApiLoader: true,
    setFollowingApiLoader: action(e => (store.followingApiLoader = e)),
    followingApiError: false,
    setFollowingApiError: action(e => (store.followingApiError = e)),
    followingInput: '',
    setFollowingInput: action(e => (store.followingInput = e)),

    //AppliedJobs
    appliedJobList: [],
    setAppliedJobList: action(e => (store.appliedJobList = e)),
    appliedJobApiLoader: true,
    setAppliedJobApiLoader: action(e => (store.appliedJobApiLoader = e)),
    appliedJobError: false,
    setAppliedJobError: action(e => (store.appliedJobError = e)),
    appliedJobInput: '',
    setAppliedJobInput: action(e => (store.appliedJobInput = e)),
    appliedJobSelect: 'All',
    setAppliedJobSelect: action(e => (store.appliedJobSelect = e)),

    //MY Profile
    myProfile: {},
    setMyProfile: action(e => (store.myProfile = e)),
    myProfileApiLoader: true,
    setMyProfileApiLoader: action(e => (store.myProfileApiLoader = e)),
    myProfileApiError: false,
    setMyProfileApiError: action(e => (store.myProfileApiError = e)),

    //CFilter

    filterData: [],
    setFilterData: action(e => (store.filterData = e)),
    filterDataApiLoader: false,
    setFilterDataApiLoader: action(e => (store.filterDataApiLoader = e)),
    filterDataApiError: false,
    setFilterDataApiError: action(e => (store.filterDataApiError = e)),

    filterList: {},
    setFilterList: action(e => (store.filterList = e)),
    filterApiLoader: true,
    setFilterApiLoader: action(e => (store.filterApiLoader = e)),
    filterApiError: false,
    setFilterApiError: action(e => (store.filterApiError = e)),

    //login
    loginLoader: false,
    setLoginLoader: action(e => (store.loginLoader = e)),

    //token
    token: {},
    setToken: action(e => (store.token = e)),
    //userInfo
    userInfo: {},
    setUserInfo: action(e => (store.userInfo = e)),

    //ALL JOBS
    jobData: {},
    setJobData: action(e => (store.jobData = e)),
    jobApiLoader: true,
    setJobApiLoader: action(e => (store.jobApiLoader = e)),
    jobApiError: false,
    setJobApiError: action(e => (store.jobApiError = e)),
    allJobInput: '',
    setAllJobInput: action(e => (store.allJobInput = e)),

    //ALL Feature Jobs
    featureJobData: {},
    setFeatureJobData: action(e => (store.featureJobData = e)),
    featureJobApiLoader: true,
    setFeatureJobApiLoader: action(e => (store.featureJobApiLoader = e)),
    featureJobApiError: false,
    setFeatureApiError: action(e => (store.featureJobApiError = e)),
    allFeatureJobInput: '',
    setAllFeatureJobInput: action(e => (store.allFeatureJobInput = e)),

    //ALL Feature Companies
    featureCompanyData: {},
    setFeatureCompanyData: action(e => (store.featureCompanyData = e)),
    featureCompanyApiLoader: true,
    setFeatureCompanyApiLoader: action(
      e => (store.featureCompanyApiLoader = e),
    ),
    featureCompanyApiError: false,
    setFeatureApiError: action(e => (store.featureCompanyApiError = e)),
    allFeatureCompanyInput: '',
    setAllFeatureCompanyInput: action(e => (store.allFeatureCompanyInput = e)),
    //All Languages
    lang: en,
    setLang: action(
      e => (store.lang = e == 'en' ? en : e == 'ur' ? ud : e == 'ar' && ar),
    ),
    langType: false,
    setLangType: action(e => (store.langType = e)),
    // Search Find Job
    recentSearch: [],
    setRecentSearch: action(e => (store.recentSearch = e)),
    pushSearch: action(e => (store.recentSearch = [...store.recentSearch, e])),
    //PDF Url
    pdf: '',
    setPdf: action(e => (store.pdf = e)),
    pdfApiLoader: true,
    setPdfApiLoader: action(e => (store.pdfApiLoader = e)),
    pdfApiError: true,
    setPdfApiError: action(e => (store.pdfApiError = e)),

    // Update State
    update: true,
    setUpdate: action(e => (store.update = e)),

    // Get Employe Job
    jobEmployerData: [],
    setJobEmployerData: action(e => (store.jobEmployerData = e)),
    AddJobEmployerData: action(e => (store.jobEmployerData = [e,...store.jobEmployerData])),

    // Get Employe Job Details
    jobDetail: [],
    setJobDetail: action(e => (store.jobDetail = e)),

    // Get Job Application
    jApplication: [],
    setJApplication: action(e => (store.jApplication = e)),
    jAppLoader: [],
    setJAppLoader: action(e => (store.jAppLoader = e)),
    jAppError: [],
    setJAppError: action(e => (store.jAppError = e)),
 
// Get Employe Home
    employeHome: {},
    setEmployeHome: action(e => (store.employeHome = e)),
    AddRecentJobs: action(e => {store.employeHome.recentJobs[0] = [e,store.employeHome.recentJobs[0]]}),
    eHomeApiLoader:true,
    setEHomeApiLoader: action(e => (store.eHomeApiLoader = e)),
    eHomeApiError:true,
    setEHomeApiError: action(e => (store.eHomeApiError = e)),
    
    //Job Store
    jobCreate: {},
    setJobCreate: action(e => (store.jobCreate = e)),
    createApiLoader:true,
    setCreateApiLoader: action(e => (store.createApiLoader = e)),
    createApiError:true,
    setCreateApiError: action(e => (store.createApiError = e)),

  }));
  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
};
