import React, { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import { useSelector, shallowEqual, connect, useDispatch } from "react-redux"
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
import { makeStyles } from "@material-ui/core/styles"
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
} from "../Auth/_redux/authCrud"
import { useHistory } from "react-router-dom"
import { Spinner } from "react-bootstrap"
import Cropper from "react-easy-crop"
import Slider from "@material-ui/core/Slider"
import getCroppedImg from "./Cropimg"

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
// style for img crop

const useStyles = makeStyles((theme) => ({
  cropContainer: {
    position: "relative",
    width: "100%",
    height: 200,
    background: "#333",
    [theme.breakpoints.up("sm")]: {
      height: 400,
    },
  },
  cropButton: {
    flexShrink: 0,
    marginLeft: 16,
  },
  controls: {
    padding: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      alignItems: "center",
    },
  },
  sliderContainer: {
    display: "flex",
    flex: "1",
    alignItems: "center",
  },
  sliderLabel: {
    [theme.breakpoints.down("xs")]: {
      minWidth: 65,
    },
  },
  slider: {
    padding: "22px 0px",
    marginLeft: 32,
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      alignItems: "center",
      margin: "0 16px",
    },
  },
}))

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

export function PersonaInformation_popup(props, { handleCloses_apicall }) {
  // img crop  code

  const classes = useStyles()

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
    // console.log("croppedAreaPixels", croppedAreaPixels);
  }, [])

  useEffect(() => {
    showCroppedImage()
  }, [croppedAreaPixels])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(pic2, croppedAreaPixels, rotation)
      // console.log("donee", { croppedImage })
      // setCroppedImage({ preview: croppedImage })
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation])

  // api calls  for country state city
  let history = useHistory()
  const [country_N_code, setcountry_N_code] = useState([])
  const [cityname, setcityname] = useState([])
  const [statename, setstatename] = useState([])
  const user = useSelector((state) => state.auth.user, shallowEqual)
  const [loading, setloading] = useState(true)
  const [spin, setspin] = useState(false)
  useEffect(() => {
    getdata()
    getcity(user.StateID)
    getstate(user.CountryID)
    localStorage.setItem("countryname2", "country")
    localStorage.setItem("statename2", "state")
    console.log("USER", user)
  }, [])
  const getdata = async () => {
    await get_countries()
      .then((val2) => {
        setcountry_N_code(val2.data)
        console.log("val2", val2.data)
      })
      .catch((err) => {
        console.log("error", err)
      })
  }

  const getstate = async (value) => {
    await get_state(value)
      .then((val2) => {
        setstatename(val2.data)
        console.log("state dat", val2.data)
      })
      .catch((err) => {
        console.log("error", err)
      })
  }

  const getcity = async (value) => {
    await get_city(value)
      .then((val2) => {
        setcityname(val2.data)
        console.log("city dat", val2.data)
      })
      .catch((err) => {
        console.log("error", err)
      })
  }

  const dropdown = (value) => {
    console.log("value of country", value)
    if (
      localStorage.getItem("countryname2") &&
      value != localStorage.getItem("countryname2")
    ) {
      console.log("values are differnt country")
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
    console.log("value of state", value)
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
  const [errorpopup, seterrorpopup] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [img, setimg] = React.useState([])
  const [Temp_data, setTemp_data] = React.useState([])

  const profileImg =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"

  //methods to open and close popups
  const handleClickOpens = () => {
    
    const crop_img=dataURLtoFile(croppedImage,"profilepic");

    if (img.length > 0) {
      setloading(true)
      setspin(true)

      Update_profile_img2(crop_img)
    } else {
      seterrorpopup(true)
    }
  }
//testing
// convert to img to file
  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    while (n--) u8arr[n] = bstr.charCodeAt(n);
  
    return new File([u8arr], filename, { type: mime });
  };



  const handleCloses = () => {
    setOpens(false)
    setimg([])
    setPic2([])
    setOpen(false)
  }
  const handleCloses_error = () => {
    seterrorpopup(false)
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
    // update_profile(values).then((value) => { formsumit() }).catch(error => { console.log("error", error) })
    setloading(true)
    formsumit()
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
  // console.log("date_for_validation", date_for_validation);

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
    reason_for_change: "",
  }

  // validation method
  const Schema = Yup.object().shape({
    img: Yup.string(),
    firstname: Yup.string().trim()
      .min(3, "Minimum 3 characters required")
      .max(50, "Maximum 50 characters allowed")
      .required("First name is required").matches(/^[A-Za-z]+$/, "Invalid first name !"),


    lastname: Yup.string().trim()
      .min(3, "Minimum 3 characters required")
      .max(50, "Maximum 50 characters allowed")
      .required("Last name is required").matches(/^[A-Za-z]+$/, "Invalid last name !"),


    phone: Yup.string().trim().required("Contact is required"),
    email: Yup.string().trim()
      .email("Wrong email format")
      .min(3, "Minimum 3 characters required")
      .max(50, "Maximum 50 characters allowed")
      .required("Email is required"),

    address: Yup.string().trim()
      .min(3, "Minimum 3 characters required")
      .max(50, "Maximum 50 characters allowed")
      .required("Address is required"),

    date: Yup.date().required("Date is required"),

    // .test("min age", "minimum age is 10 ", value => { console.log("value...", value); return value > date_for_validation }),

    country_code: Yup.string()
      .required("Country code is Required")
      .test("not blank", "Select country code", (value) => {
        return value != ""
      }),

    country: Yup.string()
      .required(" Country isRequired")
      .test("not blank", "Select country", (value) => {
        return value != "country"
      }),

    state: Yup.string()
      .required(" State is Required")
      .test("not blank", "Select state", (value) => {
        return value != ""
      }),

    city: Yup.string()
      .required("City is Required")
      .test("not blank", "Select city", (value) => {
        return value != ""
      }),
    reason_for_change: Yup.string().trim()
      .required("Please provide reason for change")
      .min(10, "Minimum 10 characters required,")
      .max(250, "Maximum 50 characters allowed"),
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
      saveUser(values, setStatus, setSubmitting)
      // console.log("form submitted", values)
    },
    onReset: (values, { resetForm }) => {
      resetForm()
    },
  })
  const getUserPic = () => {
    if (!pic) {
      console.log("return null pic")
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
    setTemp_data(data)
    setPic2(data[0].preview)
    setloading(false)
  }
  // method to update profileImg
  const Update_profile_img2 = (obj) => {
    update_profile_img(obj)
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
    <div className="my-account-wrapper">
      <form className="card card-custom card-stretch" onSubmit={formik.handleSubmit}>
        {loading && <ModalProgressBar />}

        {/* begin::Header */}
        {/* <div className="card-header py-3">
                    <div className="card-title align-items-start flex-column mb-0">
                        <h3 className="card-label font-weight-bolder text-dark">
                            My Account
                          </h3>
                        <span className="mt-5 sub-heading">
                            Personal Information
                          </span>
                    </div>

                </div> */}
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

                {/* {pic2.length > 0 ? <img src={pic2} alt="" id="img" className="img" style={{ width: "120px", height: "120px", borderRadius: 5, marginTop: 10 }} /> : null} */}

                {pic2.length > 0 ? (
                  <div>
                    <div className={classes.cropContainer}>
                      <Cropper
                        image={pic2}
                        crop={crop}
                        rotation={rotation}
                        zoom={zoom}
                        aspect={4 / 3}
                        onCropChange={setCrop}
                        onRotationChange={setRotation}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                      />
                    </div>
                    <div className={classes.controls}>
                      <div className={classes.sliderContainer}>
                        <Typography
                          variant="overline"
                          classes={{ root: classes.sliderLabel }}
                        >
                          Zoom
                        </Typography>
                        <Slider
                          value={zoom}
                          min={1}
                          max={3}
                          step={0.1}
                          aria-labelledby="Zoom"
                          classes={{ root: classes.slider }}
                          onChange={(e, zoom) => setZoom(zoom)}
                        />
                      </div>
                      <div className={classes.sliderContainer}>
                        <Typography
                          variant="overline"
                          classes={{ root: classes.sliderLabel }}
                        >
                          Rotation
                        </Typography>
                        <Slider
                          value={rotation}
                          min={0}
                          max={360}
                          step={1}
                          aria-labelledby="Rotation"
                          classes={{ root: classes.slider }}
                          onChange={(e, rotation) => setRotation(rotation)}
                        />
                      </div>
                    </div>
                  </div>
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

          {/* begin::Body */}
          <div className="card-body pt-5 pb-30 personal-info-popup">
            <div className="form-group row">
              <div className="col-lg-3 col-xl-3">
                <div className="left-side">
                  <span className="form-text text-muted text-center mb-4">
                    You can edit and change your personal information
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
                      style={{ width: "120px", height: "120px", borderRadius: 60 }}
                    />

                    <label
                      className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                      data-action="change"
                      // data-toggle="tooltip"
                      title=""
                      // data-original-title="Change avatar"
                      onClick={handleClickOpen}
                    >
                      <i className="fa fa-pen icon-sm text-white"></i>

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
                  <span className="form-text text-muted">Change Picture</span>
                </div>
              </div>
              <div className="col-lg-9 col-xl-9">
                <div className="row">
                  <div className="col-lg-6 col-xl-6 col-sm-6">
                    <div className="form-group">
                      <TextField
                        label="First Name"
                        type="text"
                        className={`f-15 ${getInputClasses("firstname")}`}
                        name="firstname"
                        {...formik.getFieldProps("firstname")}
                      />
                      {formik.touched.firstname && formik.errors.firstname ? (
                        <div className="invalid-feedback">{formik.errors.firstname}</div>
                      ) : null}
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
                        {...formik.getFieldProps("lastname")}
                      />
                      {formik.touched.lastname && formik.errors.lastname ? (
                        <div className="invalid-feedback">{formik.errors.lastname}</div>
                      ) : null}
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
                          className={`country-code mr-7 f-15 mt-4 ${getInputClasses(
                            "country_code"
                          )}`}
                          {...formik.getFieldProps("country_code")}
                        >
                          {country_N_code.map((data, index) => (
                            <MenuItem key={index} value={data.id}>
                            {data.Name}({data.Code})
                            </MenuItem>
                          ))}
                        </TextField>
                        {formik.touched.country_code && formik.errors.country_code ? (
                          <div className="invalid-feedback">
                            {formik.errors.country_code}
                          </div>
                        ) : null}
                      </div>

                      <div className="form-group number-wrap">
                        <TextField
                          label="Mobile Number"
                          name="phone"
                          className={`text-muted f-15 ${getInputClasses("phone")}`}
                          {...formik.getFieldProps("phone")}
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                          <div className="invalid-feedback">{formik.errors.phone}</div>
                        ) : null}
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
                        {...formik.getFieldProps("date")}
                      />
                      {formik.touched.date && formik.errors.date ? (
                        <div className="invalid-feedback">{formik.errors.date}</div>
                      ) : null}
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
                          // {...formik.getFieldProps("country")}

                          onBlur={formik.handleBlur}
                          onChange={(e) => {
                            formik.handleChange(e)
                            dropdown(e.target.value)
                          }}
                        >
                          {country_N_code.map((data, index) => (
                            <MenuItem key={index} value={data.id}>
                              {data.Name}
                            </MenuItem>
                          ))}
                        </TextField>

                        {formik.touched.country && formik.errors.country ? (
                          <div className="invalid-feedback">{formik.errors.country}</div>
                        ) : null}
                      </div>
                      {/* alternate way to call method when dropdown is trigger */}
                      {/* {(formik.touched.country && formik.values.country != 'country' && formik.values.country != '') ? dropdown(formik.values.country) : null} */}

                      <div className="form-group state mr-7 ">
                        <TextField
                          select
                          label="State"
                          className={`f-15 ${getInputClasses("state")}`}
                          name="state"
                          // {...formik.getFieldProps("state")}
                          value={formik.values.state}
                          onBlur={formik.handleBlur}
                          onChange={(e) => {
                            formik.handleChange(e)
                            dropdown2(e.target.value)
                          }}
                        >
                          {statename.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.Name}
                            </MenuItem>
                          ))}
                        </TextField>

                        {formik.touched.state && formik.errors.state ? (
                          <div className="invalid-feedback">{formik.errors.state}</div>
                        ) : null}
                      </div>
                      {/* {(formik.touched.state && formik.values.state != 'state' && formik.values.state != '') ? dropdown2(formik.values.state) : null} */}

                      <div className="form-group city">
                        <TextField
                          select
                          label="City"
                          className={` f-15 ${getInputClasses("city")}`}
                          name="city"
                          {...formik.getFieldProps("city")}
                        >
                          {cityname.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.Name}
                            </MenuItem>
                          ))}
                        </TextField>
                        {formik.touched.city && formik.errors.city ? (
                          <div className="invalid-feedback">{formik.errors.city}</div>
                        ) : null}
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
                        helperText="You cannot edit and change your email address"
                        name="email"
                        className={`f-15  ${getInputClasses("email")}`}
                        // {...formik.getFieldProps("email")}
                        value={formik.values.email}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="invalid-feedback">{formik.errors.email}</div>
                      ) : null}
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
                        {...formik.getFieldProps("address")}
                      />
                      {formik.touched.address && formik.errors.address ? (
                        <div className="invalid-feedback">{formik.errors.address}</div>
                      ) : null}
                    </div>
                  </div>

                  <div className="col-lg-12 col-xl-12">
                    <div className="form-group">
                      <TextField
                        label="Reason for change  "
                        type="text"
                        multiline
                        as="textarea"
                        name="reason_for_change"
                        placeholder="Reason for change"
                        className={`f-15 address ${getInputClasses("reason_for_change")}`}
                        {...formik.getFieldProps("reason_for_change")}
                      />
                      {formik.touched.reason_for_change &&
                      formik.errors.reason_for_change ? (
                        <div className="invalid-feedback">
                          {formik.errors.reason_for_change}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="col">
                    <button
                      type="submit"
                      className="btn btn-primary save-btn"
                      disabled={formik.isSubmitting}
                    >
                      Save
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
      {/* <div>
                <button className="btn btn-primary save-btn" onClick={() => handleCloses_apicall}>
                    Cancle
                </button>
            </div> */}

    </div>
  )
}

export default connect(null, auth.actions)(PersonaInformation_popup)
