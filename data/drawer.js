import { useContext } from "react";
import { StoreContext } from "../mobx/store";

export const getDrawerItems = () => {
  const store = useContext(StoreContext);
  return [
    store.lang.account_settings,
    store.lang.jobs,
    store.lang.job_alert,
    store.lang.followings,
    store.lang.help_center,
    store.lang.logout,
  ];
};
