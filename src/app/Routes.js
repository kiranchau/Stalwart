import React from "react";
import { Switch } from "react-router-dom";
import BasePage from "./BasePage";
import { AuthPage } from "./modules/Auth";

export function Routes() {
  
  return (
    // <Switch>
      <AuthPage />
      // <BasePage />
    // </Switch>
    
  );
}
