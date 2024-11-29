
import React, { useMemo, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Dash_Top_Wid({ dashData }) {
    const { i18n, t } = useTranslation(["common"]);
    return (
        <>
            <div className="dash-event">
                <div className="dash-event-inner active">
                    <div className="event-info">
                        <div className="event-img"><img src="/media/svg/icons/Design/dash-accomplish.svg" /></div>
                        <h2>{dashData.accomplishment}</h2>
                        <NavLink to="/Accomplishments" >
                            <p>{t("Total_Accomplishments")}<img src="/media/svg/icons/Design/arrow.svg" /></p>
                        </NavLink>
                    </div>
                </div>

                <div className="dash-event-inner">
                    <div className="event-info">
                        <div className="event-img"><img src="/media/svg/icons/Design/dash-users.svg" /></div>
                        <h2>{dashData.person}</h2>
                        <NavLink to="Users/AppUsers">
                            <p>{t("Total_App_Users")}<img src="/media/svg/icons/Design/arrow.svg" /></p>
                        </NavLink>
                    </div>
                </div>

                <div className="dash-event-inner">
                    <div className="event-info">
                        <div className="event-img"><img src="/media/svg/icons/Design/dash-rewards.svg" /></div>
                        <h2>{dashData.rewards}</h2>
                        <NavLink to="/Rewards" >
                            <p>{t("Pending_Rewards")}<img src="/media/svg/icons/Design/arrow.svg" /></p>
                        </NavLink>
                    </div>
                </div>


                <div className="dash-event-inner">
                    <div className="event-info">
                        <div className="event-img"><img src="/media/svg/icons/Design/dash-spam.svg" /></div>
                        <h2>{dashData.reportSpam}</h2>
                        <NavLink to="ReportedSpam">
                            <p> {t("Spams")}<img src="/media/svg/icons/Design/arrow.svg" /></p>
                        </NavLink>
                    </div>
                </div>


            </div>
        </>
    );
}
export default Dash_Top_Wid;