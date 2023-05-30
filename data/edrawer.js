import { useContext } from "react";
import { StoreContext } from "../mobx/store";

export const getDrawerItem = () => {
  const store = useContext(StoreContext);
    return [
      store.lang.account_settings,
      store.lang.followers,
      store.lang.employees,
      store.lang.assessments,
      store.lang.help_center,
      store.lang.logout,
      
    ];
  };