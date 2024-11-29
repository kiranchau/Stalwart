import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSubheader } from "../../../_common/layout";
import AccountInformation from "./AccountInformation";
import { ProfileOverview } from "./ProfileOverview";
// import ChangePassword from "../../profile/ChangePassword";
import PersonaInformation from "./PersonaInformation";
// import PersonaInformation2 from "./Personalnformation2";
import Personalformation_readonly from "./Personalformation_readonly";

import EmailSettings from "./EmailSettings";
import { ProfileCard } from "./components/ProfileCard";
// import { ChangePassword } from "../../profile/ChangePassword";

export default function UserProfilePage() {
  const suhbeader = useSubheader();
  suhbeader.setTitle("User profile");
  return (
    <div className="d-flex flex-row">
      <ProfileCard></ProfileCard>
      <div className="flex-row-fluid ml-lg-8">
        <Switch>
          <Redirect
            from="/user-profile"
            exact={true}
            to="/user-profile/personal-information-readonly"
          />
          <Route
            path="/user-profile/profile-overview"
            component={ProfileOverview}
          />
          <Route
            path="/user-profile/account-information"
            component={AccountInformation}
          />
          {/* <Route
            path="/user-profile/change-password"
            component={ChangePassword}
          /> */}
          <Route
            path="/user-profile/email-settings"
            component={EmailSettings}
          />
          
          <Route
            path="/user-profile/personal-information-readonly"
            component={Personalformation_readonly}

          />
          <Route
            path="/user-profile/personal-information"
            component={PersonaInformation}

          />
        </Switch>
      </div>
    </div>
  );
}
