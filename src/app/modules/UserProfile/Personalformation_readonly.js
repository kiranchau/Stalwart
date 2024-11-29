import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector, shallowEqual, connect } from "react-redux"
import { useFormik } from "formik"
import * as Yup from "yup"
import "date-fns"
import TextField from "@material-ui/core/TextField"
import MenuItem from "@material-ui/core/MenuItem"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import Dialog from "@material-ui/core/Dialog"
import MuiDialogTitle from "@material-ui/core/DialogTitle"
import MuiDialogContent from "@material-ui/core/DialogContent"
import MuiDialogActions from "@material-ui/core/DialogActions"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import { ModalProgressBar } from "../../../_common/_partials/controls"
import { toAbsoluteUrl } from "../../../_common/_helpers"
import Icon from "@material-ui/core/Icon"
import * as auth from "../Auth"
import Drang_Drop_File from "../../../_common/_helpers/Drag_n_drop_file"
import {
  get_countries,
  get_state,
  get_city,
  update_profile,
  update_profile_img,
  Study_api,
  Study_api2,
} from "../Auth/_redux/authCrud"
import { useHistory } from "react-router-dom"
import { Spinner } from "react-bootstrap"
import PersonaInformation_popup from "./PersonaInformation_popup"

// style for material ui

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(0.5),
    top: theme.spacing(0.4),
    color: "#fff",
    paddingRight: "10px",
  },
})
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions)
// style for material ui end

export function Personalformation_readonly(props) {
  // api calls  for country state city
  let history = useHistory()
  const [country_N_code, setcountry_N_code] = useState([])
  const [cityname, setcityname] = useState([])
  const [statename, setstatename] = useState([])
  const user = useSelector((state) => state.auth.user, shallowEqual)
  const [loading, setloading] = useState(true)
  const [spin, setspin] = useState(false)
  const [dropdown_Selected_data, setdropdown_Selected_data] = useState([])
  const [study_api_data, setstudy_api_data] = React.useState([])
  const [spinner_loading, setspinner_loading] = React.useState(true)

  useEffect(() => {
    getdata()
    getcity(user.StateID)
    getstate(user.CountryID)
    localStorage.setItem("countryname2", "country")
    localStorage.setItem("statename2", "state")
    // console.log("USER", user)
    setdropdown_Selected_data(JSON.parse(localStorage.getItem("site_obj")))
  }, [])

  // to chage value when dropdown changes
  useEffect(() => {
    // console.log("USER2", user)
    const converted_date_ = user.BirthDate.slice(0, 10)

    formik.setFieldValue("firstname", user.FirstName)
    formik.setFieldValue("lastname", user.LastName)
    formik.setFieldValue("country_code", user.CountryCodeID)
    formik.setFieldValue("phone", user.Phone)
    formik.setFieldValue("email",  user.Email)
    formik.setFieldValue("country", user.CountryID)
    formik.setFieldValue("state", user.StateID)
    formik.setFieldValue("city", user.CityID)
    formik.setFieldValue("date", converted_date)
    formik.setFieldValue("address", user.Address)

  }, [user])

  const getdata = async () => {
    await get_countries()
      .then((val2) => {
        setcountry_N_code(val2.data)
        // console.log("val2", val2.data)
      })
      .catch((err) => {
        console.log("error", err)
      })
  }

  const getstate = async (value) => {
    await get_state(value)
      .then((val2) => {
        setstatename(val2.data)
        // console.log("state dat", val2.data)
      })
      .catch((err) => {
        console.log("error", err)
      })
  }

  const getcity = async (value) => {
    await get_city(value)
      .then((val2) => {
        setcityname(val2.data)
        // console.log("city dat", val2.data)
      })
      .catch((err) => {
        console.log("error", err)
      })
  }

  const dropdown = (value) => {
    // console.log("value of country", value)
    if (
      localStorage.getItem("countryname2") &&
      value != localStorage.getItem("countryname2")
    ) {
      // console.log("values are differnt country")
      console.log("values", value)
      getstate(value)
      formik.setFieldValue("state", "")
      formik.setFieldValue("city", "")
      formik.setFieldTouched("state")
      localStorage.setItem("countryname2", value)
    } else {
      console.log("values are same country")
    }
  }
  const dropdown2 = (value) => {
    // console.log("value of state", value)
    if (
      localStorage.getItem("statename2") &&
      value != localStorage.getItem("statename2")
    ) {
      console.log("values of state are differnt")
      console.log("values", value)
      getcity(value)
      localStorage.setItem("statename2", value)
      formik.setFieldValue("city", "")
      formik.setFieldTouched("city")
    } else {
      console.log(" state values are same")
    }
  }

  // api call end...............
  // Fields
  const [pic, setPic] = useState("")
  const [pic2, setPic2] = useState("")
  const [opens, setOpens] = React.useState(false)
  const [cont_popup, setcont_popup] = React.useState(false)

  const [errorpopup, seterrorpopup] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [img, setimg] = React.useState([])
  const [open_api_box, setopen_api_box] = React.useState(false)

  const profileImg =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"

  //methods to open and close popups
  const handleClickOpens = () => {
    if (img.length > 0) {
      setloading(true)
      setspin(true)
      Update_profile_img2()
    } else {
      seterrorpopup(true)
    }
  }
  const handleCloses = () => {
    setOpens(false)
    setimg([])
    setPic2([])
    setOpen(false)
  }
  const handleCloses_error = () => {
    seterrorpopup(false)
  }
  const handleCloses_contpopup = () => {
    setcont_popup(false)
    setspinner_loading(true)
  }
  const handleClickOpens_cange_details = async () => {
    setcont_popup(true)
    // console.log("dropdown_Selected_data;;", dropdown_Selected_data)
    await Study_api(dropdown_Selected_data)
      .then((value) => {
        console.log("value dashboard_api_data", value)
        Get_study(value.data?.SessionKey)
      })
      .catch((error) => {
        console.log("error dashboard", error)
      })
  }
  // setstudy_api_data([])
  const Get_study = async (SessionKey) => {
    await Study_api2(SessionKey, dropdown_Selected_data)
      .then((value) => {
        console.log("second api", value)
        setstudy_api_data([value.data])
        setspinner_loading(false)
      })
      .catch((error) => {
        console.log("second api error", error)
      })
  }

  // api dialog method
  const handleClickOpens_apicall = () => {
    setopen_api_box(true)
  }
  const handleCloses_apicall = () => {
    setopen_api_box(false)
  }

  // main dilog method
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setspin(false)
    setOpen(false)
    setimg([])
    setPic2([])
  }
  // to set profile pic on any change/
  useEffect(() => {
    if (user.ImageURL) {
      setPic(user.ImageURL)
    } else {
      setPic(profileImg)
    }
  }, [user])

  //  update profile  Methods
  const saveUser = (values, setStatus, setSubmitting) => {
    update_profile(values)
      .then((value) => {
        formsumit()
      })
      .catch((error) => {
        console.log("error", error)
      })
    setloading(true)
  }

  const formsumit = () => {
    console.log("inside form submit")
    props.requestUser()
    history.push("/")
  }
  // UI Helpers
  const [state_local, setstate_local] = useState(user.StateID)
  const [city_local, setcity_local] = useState(user.CityID)
  const date1 = new Date(user.BirthDate)
  const current_date = new Date()
  const converted_date = user.BirthDate.slice(0, 10)
  const date_for_validation =
    current_date.getFullYear() -
    10 +
    "-" +
    (current_date.getMonth() + 1) +
    "-" +
    (current_date.getMonth() + 1)
  // console.log("date_for_validation", date_for_validation)

  const local_date = "2017-05-24"
  const initialValues = {
    img: user.ImageURL,
    firstname: user.FirstName,
    lastname: user.LastName,
    country_code: user.CountryCodeID,
    phone: user.Phone,
    email: user.Email,
    date: converted_date,
    // date:"2017-05-24",
    country: user.CountryID,
    state: state_local,
    city: city_local,
    address: user.Address,
  }

  // validation method
  const Schema = Yup.object().shape({
    img: Yup.string(),
    firstname: Yup.string()
      .min(3, "Minimum 3 characters,")
      .max(50, "Maximum 50 characters")
      .required("First name is required"),

    lastname: Yup.string()
      .min(3, "Minimum 3 characters,")
      .max(50, "Maximum 50 characters")
      .required("Last name is required"),

    phone: Yup.string()
      .required("Phone is required")
      .min(10, " Mobile number should have 10 digits")
      .matches(/^[0-9\b]+$/, "invalid mobile number !")
      .max(10, " Mobile number should have 10 digits"),
    email: Yup.string()
      .email("Wrong email format")
      .required("Email is required"),

    address: Yup.string()
      .min(3, "Minimum 3 characters")
      .max(50, "Maximum 70 characters")
      .required("Required"),

    date: Yup.date()
      .required("Required")
      .required("required"),

    // .test("min age", "minimum age is 10 ", value => { console.log("value...", value); return value > date_for_validation }),

    country_code: Yup.string()
      .required("Required")
      .test("not blank", "select country code", (value) => {
        return value != ""
      }),

    country: Yup.string()
      .required("Required")
      .test("not blank", "select country", (value) => {
        return value != "country"
      }),

    state: Yup.string()
      .required("Required")
      .test("not blank", "select state", (value) => {
        return value != ""
      }),

    city: Yup.string()
      .required("Required")
      .test("not blank", "select city", (value) => {
        return value != ""
      }),
  })
  // method to apply error class
  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid"
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid"
    }

    return ""
  }
  // formik start
  const formik = useFormik({
    initialValues,
    validationSchema: Schema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      // saveUser(values, setStatus, setSubmitting);
      // console.log("form submitted", values)
    },
    onReset: (values, { resetForm }) => {
      resetForm()
    },
  })
  const getUserPic = () => {
    if (!pic) {
      // console.log("return null pic")
      return "none"
    }
    console.log("return pic", pic)
    return `url(${pic})`
  }
  const removePic = () => {
    setPic("")
  }
  // drag n drop data is here
  const Returndata = (data) => {
    console.log("data...", data)
    setimg(data)
    setPic2(data[0].preview)
    setloading(false)
  }
  // method to update profileImg
  const Update_profile_img2 = () => {
    update_profile_img(img)
      .then((pre) => {
        console.log("img upload success")
        img_upload_success()
      })
      .catch((error) => {
        console.log("error img upload failed", error)
      })
  }

  const img_upload_success = () => {
    props.requestUser()
    setOpens(true)
    setloading(true)
    setspin(false)
  }

  return (
    <div className="my-account-wrapper personal-account">
      {/* <h2>hiiiiii</h2> */}
      <form className="card card-custom card-stretch" onSubmit={formik.handleSubmit}>
        {loading && <ModalProgressBar />}

        {/* begin::Header */}
        <div className="card-header py-3">
          <div className="card-title align-items-start flex-column mb-0">
            <h3 className="card-label font-weight-bolder text-dark">My Account</h3>
            <span className="mt-5 sub-heading">Personal Information</span>
          </div>
          <div className="card-toolbar">
            <Link to="/user-profile/change-password">
              <button type="submit" className="btn btn-primary mr-2 change-pass-btn">
                Change Password
                {formik.isSubmitting}
              </button>
            </Link>
          </div>
        </div>
        {/* end::Header */}
        {/* begin::Form */}
        <div className="form">
          <div>
            <Dialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
              className="uplaod-profile "
            >
              <DialogTitle
                id="customized-dialog-title"
                onClose={handleClose}
                className="popup-heading"
              >
                Upload Profile Image
              </DialogTitle>
              <DialogContent className="upload-pic">
                <Drang_Drop_File filetype=".png, .jpg, .jpeg" Returndata={Returndata} />

                {pic2.length > 0 ? (
                  <img
                    src={pic2}
                    alt=""
                    id="img"
                    className="img"
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: 5,
                      marginTop: 10,
                    }}
                  />
                ) : null}
              </DialogContent>
              {spin && <Spinner animation="border" variant="primary" />}
              <DialogActions className="pb-6 pt-6 btn-wrap">
                <div className="card-toolbar">
                  <button
                    type="submit"
                    onClick={handleClickOpens}
                    className="btn btn-primary mr-5 save-btn"
                    disabled={loading}
                  >
                    Submit
                  </button>
                  <Link className="btn btn-secondary" onClick={handleClose} to="#">
                    Cancel
                  </Link>
                </div>
              </DialogActions>
            </Dialog>
          </div>
          {/* Successfully popup */}
          <Dialog
            onClose={handleCloses}
            aria-labelledby="customized-dialog-title"
            open={opens}
            className="success-popup"
          >
            {/* <DialogTitle id="customized-dialog-title" onClose={handleCloses}>
                             Modal title
                            </DialogTitle> */}
            <DialogContent dividers className="text-center p-10">
              <div className="success-icon">
                <Icon className="fa fa-check icon" />
              </div>
              <h2 className="font-weight-bold m-10 success-head">Successfully!</h2>
              <p className="success-text mb-10">
                Your profile image successfully uploaded!
              </p>
              <button
                type="submit"
                onClick={handleCloses}
                className="btn btn-primary mr-5 save-btn"
              >
                Ok
              </button>
            </DialogContent>
          </Dialog>

          {/* Failed dialog */}
          <Dialog
            onClose={handleCloses_error}
            aria-labelledby="customized-dialog-title"
            open={errorpopup}
            className="success-popup"
          >
            {/* <DialogTitle id="customized-dialog-title" onClose={handleCloses}>
                          Modal title
                          </DialogTitle> */}
            <DialogContent dividers className="text-center p-10">
              <div className="success-icon">
                <Icon className="fa fa-exclamation-triangle" />
              </div>
              <h2 className="font-weight-bold m-10 success-head">ERROR!</h2>
              <p className="success-text mb-10">Please upload image !</p>
              <button
                type="submit"
                onClick={handleCloses_error}
                className="btn btn-primary mr-5 save-btn"
              >
                Ok
              </button>
            </DialogContent>
          </Dialog>

          {/* contact info popup */}

          <Dialog
            onClose={handleCloses_contpopup}
            aria-labelledby="customized-dialog-title"
            open={cont_popup}
            className="success-popup contact-person"
          >
            <DialogTitle
          id="customized-dialog-title"
          onClose={handleCloses_contpopup}
          className="popup-heading"
        >
          Alert!
        </DialogTitle>

            <DialogContent dividers className="text-center p-10">
              <div className="success-icon"> <img src="/media/misc/contact.png"/>

                {spinner_loading && (
                  <Spinner
                    animation="border"
                    className="spinner-info"
                    variant="primary"
                  />
                )}{" "}
              </div>
              {/* <h2 className="font-weight-bold m-10 success-head">Alert!</h2> */}

              {!spinner_loading ?     <p className="success-text mb-10">
                Please contact following number to change your information .
                {study_api_data.map((value) => {
                  return [<h2> {value.CompanyPhone}</h2>]
                })}
                
              </p>:""       }
             

              {console.log("study_api_data...", study_api_data)}
              
            </DialogContent>

            <DialogActions className="pb-6 pt-6 btn-wrap">
          <div className="card-toolbar">
          <button
                type="submit"
                onClick={handleCloses_contpopup}
                className="btn btn-primary mr-5 save-btn"
              >
                Ok
              </button>
          </div>
        </DialogActions>
        
          </Dialog>

          {/* // api dialog */}
          <Dialog
            onClose={handleCloses_apicall}
            aria-labelledby="customized-dialog-title"
            open={open_api_box}
            className="success-popup perosnl-info-success"
            disableBackdropClick={true}
          >
            <DialogTitle
              id="customized-dialog-title"
              className="popup-heading"
              onClose={handleCloses_apicall}
            >
              Which fields do you want to change ?
            </DialogTitle>
            <DialogContent className="text-center p-10 change-detail-popup">
              <PersonaInformation_popup handleCloses_apicall={handleCloses_apicall} />
              {/* <button
                                type="submit"
                                onClick={handleCloses_apicall}
                                className="btn btn-primary mr-5 save-btn"
                            >
                                close
                            </button> */}
            </DialogContent>
          </Dialog>
          {/* begin::Body */}
          <div className="card-body pt-5 pb-30">
            <div className="form-group row">
              <div className="col-lg-12 col-xl-3 personal-info-left">
                <div className="left-side">
                  <span className="form-text text-muted text-center mb-4">
                    {/* You can edit and change your
                                        personal information */}
                  </span>
                  <div
                    className="image-input image-input-outline"
                    id="kt_profile_avatar"
                    style={{
                      backgroundImage: `url(${toAbsoluteUrl("/media/users/blank.png")}`,
                    }}
                  >
                    <div
                      className="image-input-wrapper"
                      // style={{ backgroundImage: `${getUserPic()}` }}
                    />
                    {/* {console.log("getUserPic", getUserPic())} */}
                    <img
                      src={pic}
                      alt=""
                      id="img"
                      className="img"
                      style={{ width: "120px", height: "120px" }}
                    />

                    <label
                      className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                      data-action="change"
                      // data-toggle="tooltip"
                      title=""
                      // data-original-title="Change avatar"
                      // onClick={handleClickOpen}
                    >
                      {/* <i className="fa fa-pen icon-sm text-white"></i> */}

                      <input type="hidden" name="profile_avatar_remove" />
                    </label>
                    <span
                      className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                      data-action="cancel"
                      data-toggle="tooltip"
                      title=""
                      data-original-title="Cancel avatar"
                    >
                      <i className="ki ki-bold-close icon-xs text-muted"></i>
                    </span>
                  </div>
                  <span className="form-text text-muted">Profile Image</span>
                </div>
              </div>
              <div className="col-lg-12 col-xl-9 personal-info-right">
                <div className="row">
                  <div className="col-lg-6 col-xl-6 col-sm-6">
                    <div className="form-group">
                      <TextField
                        label="First Name"
                        type="text"
                        className={`f-15 ${getInputClasses("firstname")}`}
                        name="firstname"
                        value={formik.values.firstname}
                        disabled={true}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-xl-6 col-sm-6">
                    <div className="form-group">
                      <TextField
                        id="standard-password-input"
                        label="Last Name"
                        type="text"
                        name="lastname"
                        className={`f-15 ${getInputClasses("lastname")}`}
                        value={formik.values.lastname}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-xl-6 col-sm-6">
                    <div className="d-flex ">
                      <div className="form-group">
                        <TextField
                          id="standard-select-currency"
                          select
                          // label="Select"
                          value={formik.values.country_code}
                          name="country_code"
                          label="Code"
                          className={`country-code f-15 ${getInputClasses(
                            "country_code"
                          )}`}
                          value={formik.values.country_code}
                          disabled={true}
                        >
                          {country_N_code.map((data, index) => (
                            <MenuItem key={index} value={data.id}>
                              {data.Code}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>

                      <div className="form-group number-wrap">
                        <TextField
                          label="Mobile Number"
                          name="phone"
                          className={`text-muted f-15 ${getInputClasses("phone")}`}
                          value={formik.values.phone}
                          disabled={true}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-xl-6 col-sm-6">
                    <div className="form-group">
                      <TextField
                        id="date"
                        label="Date of Birth"
                        type="date"
                        format="YYYY-MM-DD"
                        className={`f-15 ${getInputClasses("date")}`}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        name="date"
                        value={formik.values.date}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-xl-12 col-sm-12">
                    <div className="d-flex">
                      <div className="form-group mr-7 country-name">
                        <TextField
                          select
                          label="Country"
                          value={formik.values.country}
                          className={`  f-15 ${getInputClasses("country")}`}
                          name="country"
                          disabled={true}
                        >
                          {country_N_code.map((data, index) => (
                            <MenuItem key={index} value={data.id}>
                              {data.Name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>

                      <div className="form-group state mr-7 ">
                        <TextField
                          select
                          label="State"
                          className={`f-15 ${getInputClasses("state")}`}
                          name="state"
                          value={formik.values.state}
                          disabled={true}
                        >
                          {statename.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.Name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>

                      <div className="form-group city">
                        <TextField
                          select
                          label="City"
                          className={` f-15 ${getInputClasses("city")}`}
                          name="city"
                          value={formik.values.city}
                          disabled={true}
                        >
                          {cityname.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.Name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-xl-12 col-sm-12">
                    <div className="form-group">
                      <TextField
                        // id="standard-password-input"
                        label="Email Address  "
                        type="email"
                        className="f-15"
                        // helperText="You cannot edit and change your email address"
                        name="email"
                        className={`f-15  ${getInputClasses("email")}`}
                        value={formik.values.email}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-xl-12">
                    <div className="form-group">
                      <TextField
                        // id="standard-password-input"
                        label="Address  "
                        type="text"
                        // className="address f-15"
                        multiline
                        name="address"
                        className={`f-15 address ${getInputClasses("address")}`}
                        value={formik.values.address}
                        disabled={true}
                      />
                    </div>
                  </div>

                  {/* <div className="col change-detail-btn">
                    <button
                      className="btn btn-primary save-btn"
                      onClick={handleClickOpens_apicall}
                    >
                      Change Details
                    </button>
                  </div> */}
                  <div className="col change-detail-btn">
                    <button
                      className="btn btn-primary save-btn"
                      onClick={handleClickOpens_cange_details}
                    >
                      Change Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end::Body */}
        </div>
        {/* end::Form */}
      </form>
    </div>
  )
}

export default connect(null, auth.actions)(Personalformation_readonly)
