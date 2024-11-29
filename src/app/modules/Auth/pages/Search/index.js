import React from 'react';
import './style.css'; // Tell webpack that Button.js uses these styles
import Logo from '../../pages/Images/logo.png';
import RightBg from '../../pages/Images/right-img.jpg';


// import Logo from '';
export const Search = () => {
  return <div>
    
    
    

<div className="container-fluid">
<div className='row'>
          <div className='col-md-9'>
          <a className="navbar-brand" href="#">
               <img src={Logo}  className="d-inline-block align-top" alt=""/> 
          </a>
          </div>
          <div className='col-md-3'>
          <button className="btnSearch"> Login</button>

          </div>
        </div>
  <div className="row">
    <div className="col-sm-6">
      <h1 className="topHeading">Search Best Course For You</h1>
      <p className="MainP"> Lorem ipsum dolor sit amet, consectetur adipisicing elit...Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
        <div className="search-sec">
            <select type="text" className="inputsearch">
                <option>Select Course</option>
                <option>MBA</option>
                <option>MCA</option>
                <option>B-Tech</option>
                <option>BCA</option>

            </select>
            <input type="text" className="inputsearch" placeholder="search Location"/>
            <button className="btnSearch"> Search</button>
        </div>
    </div>
    <div className="col-sm-6">
        <img src={RightBg} style={{width: "88%"}} className="d-inline-block align-top" alt=""/>

    </div>
  </div>
</div>









</div>;
};

export default Search;