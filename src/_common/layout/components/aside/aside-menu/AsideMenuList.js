/* eslint-disable react/display-name, jsx-a11y/click-events-have-key-events */
import { useHistory, useLocation } from "react-router-dom";
// import Icon from "awesome-react-icons";
import React, { useState } from "react";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { useTranslation } from "react-i18next";

export const AsideMenuList = () => {
  const { i18n, t } = useTranslation(["common"]);
  const history = useHistory();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
   <div> Sidemenu </div>
  );
};
