import React from 'react'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, Switch, Redirect } from "react-router-dom"
import { ContentRoute } from "../../../../_common/layout"
import Search from "./Search/index"
import Login from "./Login/index"
import Dashboard from './Dashboard/index'
import BasePage from '../../../BasePage'

export function AuthPage() {
  return (
    <>
      <div className="login-root">
        <div className="login-wrapper">
          <div className="d-flex flex-column flex-root login-wrapper-inner">
            <div
              className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white"
              id="kt_login"
            >
              <div className="d-flex flex-column flex-row-fluid position-relative p-7 overflow-hidden login-left">
                <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0 login-left-top">
                    <Switch>
                      <ContentRoute path="/auth/search" component={Search} />
                      <ContentRoute path="/auth/login" component={Login} />
                      <Redirect from="/auth" exact={true} to="/auth/search" />
                      {/* <Redirect to="/auth/search" /> */}
                      <BasePage/>
                    </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
