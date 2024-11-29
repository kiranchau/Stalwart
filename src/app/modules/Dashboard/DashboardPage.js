import React, { useState, useEffect, useContext } from "react"
import { connect } from "react-redux"
import * as auth from "../Auth/_redux/authRedux"
import { getDashData } from "../Auth/_redux/authCrud"
import { LoaderContext } from '../../../app/context'



export function DashboardPage(props) {
  const [dashData, setdashData] = useState([])
  const { loader, changeLoader } = useContext(LoaderContext);
 
  useEffect(() => {
    changeLoader(true);
    getDashBoardData();
  }, [])
  const getDashBoardData = () => {
    getDashData()
      .then((value) => {
        setdashData(value.data.data);
        changeLoader(false);
      })
      .catch((error) => {
        changeLoader(false);
        console.log("dashboard Data", error)
      })
  }

  return (
    <>
      <div className="row">
        <div class="col-md-12">
          <div className="accomplish-doc">
            <h3>Dashboard</h3>
          </div>
        </div>
      </div>

    </>
  )
}
export default connect(null, auth.actions)(DashboardPage)
