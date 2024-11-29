import React, { Suspense, lazy, useState } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_common/layout";
import Dashboard from '../app/modules/Auth/pages/Dashboard/index';
import Signup from '../app/modules/Auth/pages/Signup/index';


const UserProfilepage = lazy(() =>
  import("./modules/UserProfile/UserProfilePage")
);

export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect
  const [Isfirst_visit, setIsfirst_visit] = useState(false)
  console.log("hello")
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          Isfirst_visit ?
            <Redirect exact from="/" to="/PreNotification" />
            : <Redirect exact from="/" to="/Dashboard" />
        }
       
        <ContentRoute path="/Dashboard" component={Dashboard} />
        <ContentRoute path="/Signup" component={Signup}/>

        {/* <Route path="/user-profile" component={UserProfilepage} />
        <Route path="/SubscribedUsers-profile" SubscribedUsers={UserProfilepage} />
        <Route path="/user-profile" component={UserProfilepage} /> */}
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
