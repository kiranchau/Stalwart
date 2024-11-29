import React, {useMemo,useState,useEffect} from "react";
import {Link} from "react-router-dom";
import objectPath from "object-path";
import SVG from "react-inlinesvg";
import {useHtmlClassService} from "../../_core/AppLayout";
import {toAbsoluteUrl} from "../../../_helpers";
import { useSelector, shallowEqual, connect, useDispatch } from "react-redux"


export function Brand() {
  const uiService = useHtmlClassService();
  const logo = useSelector((state) => state.auth.logo, shallowEqual)
 
  const layoutProps = useMemo(() => {
    return {
      brandClasses: uiService.getClasses("brand", true),
      asideSelfMinimizeToggle: objectPath.get(
          uiService.config,
          "aside.self.minimize.toggle"
      ),
      headerLogo: uiService.getLogo(),
      headerStickyLogo: uiService.getStickyLogo()
    };
  }, [uiService]);

  return (
    <>
      {/* begin::Brand */}
      <div
          className={`brand flex-column-auto main-logo ${layoutProps.brandClasses}`}
          id="kt_brand"
      >
        {/* begin::Logo */}
        <Link to="" className="brand-logo">
          {/* <img  style={{backgroundColor:'#5d6c77', padding: '5px', borderRadius:'4px'}} src={logo?logo:layoutProps.headerLogo}/> */}
          <p> StalWartGlobal</p>
          <img src="/media/svg/icons/Design/white-logo.svg"/>
        </Link>
        {/* end::Logo */}

        {layoutProps.asideSelfMinimizeToggle && (
          <>
            {/* begin::Toggle */}
            <button className="brand-toggle btn btn-sm px-0" id="kt_aside_toggle">
              <span className="svg-icon svg-icon-xl">
                  <SVG src={toAbsoluteUrl("/media/svg/icons/Navigation/menu.svg")}/>
              </span>
            </button>
            {/* end::Toolbar */}
            </>
        )}
      </div>
      {/* end::Brand */}
      </>
  );
}
