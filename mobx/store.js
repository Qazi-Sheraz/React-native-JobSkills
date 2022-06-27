import React from 'react';
// import { useLocalStore, useObserver } from "mobx-react";
import {useLocalObservable} from 'mobx-react-lite';
import {action} from 'mobx';
export const StoreContext = React.createContext();

export const StoreProvider = props => {
  const store = useLocalObservable(() => ({
    //Global

    isRefreshing: false,
    setIsRefreshing: action(e => (store.isRefreshing = e)),

    //Home
    homeApiLoader: true,
    setHomeApiLoader: action(e => (store.homeApiLoader = e)),
    homeApiError: false,
    setHomeApiError: action(e => (store.homeApiError = e)),

    //Favourite
    favouriteList: [],
    setFavouriteList: action(e => (store.favouriteList = e)),
    favouriteApiLoader: true,
    setFavouriteApiLoader: action(e => (store.favouriteApiLoader = e)),
    favouriteApiError: false,
    setFavouriteApiError: action(e => (store.favouriteApiError = e)),

    //AppliedJobs
    appliedJobList: [],
    setAppliedJobList: action(e => (store.appliedJobList = e)),
    appliedJobApiLoader: true,
    setAppliedJobApiLoader: action(e => (store.appliedJobApiLoader = e)),
    appliedJobError: false,
    setAppliedJobError: action(e => (store.appliedJobError = e)),

    //login
    loginLoader: false,
    setLoginLoader: action(e => (store.loginLoader = e)),

    //token
    token: null,
    setToken: action(e => (store.token = e)),
  }));
  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
};
