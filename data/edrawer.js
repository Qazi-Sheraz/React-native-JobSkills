import { useContext } from "react";
import { StoreContext } from "../mobx/store";

export const getDrawerItem = () => {
  const store = useContext(StoreContext);
    return [
      'Account Setting',
      store.lang.followers,
      'Employees',
      store.lang.assessments,
      'Help & Center',
      'Logout',
    ];
  };