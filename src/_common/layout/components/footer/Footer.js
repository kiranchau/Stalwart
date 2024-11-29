import React, { useMemo } from "react"
import { useHtmlClassService } from "../../_core/AppLayout"

export function Footer() {
  const uiService = useHtmlClassService()

  const layoutProps = useMemo(() => {
    return {
      footerClasses: uiService.getClasses("footer", true),
      footerContainerClasses: uiService.getClasses("footer_container", true),
    }
  }, [uiService])

  return (
    <div
      className={`footer bg-white py-4 d-flex flex-lg-column  ${layoutProps.footerClasses}`}
      id="kt_footer"
    >
      <div className={`${layoutProps.footerContainerClasses}`}>
        <div className="text-dark order-2 order-md-1">
          <span className="text-muted font-weight-bold mr-2">
          {/* <img src="/media/favicon/appicon.png"/> */}
          © 2021-2022 <a href="#">StalWartGlobal LLC.</a> All rights reserved.
            {" "}
          
          </span>
         
        </div>
        
      </div>
    </div>
  )
}
