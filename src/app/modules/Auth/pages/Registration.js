import React, { useState, useEffect } from "react"
import { useFormik } from "formik"

import { connect } from "react-redux"
import * as Yup from "yup"
import { Link } from "react-router-dom"
import { injectIntl } from "react-intl"
import * as auth from "../_redux/authRedux"
import {
  toAbsoluteUrl,
  linkedInConnect,
  facebookConnect,
  googleConnect,
} from "../../../../_common/_helpers"
import { useGoogleLogin } from "react-google-login"
import { useGoogleLogout } from "react-google-login"
// import countries from "./country.json";
import { get_countries, get_state, get_city } from "../_redux/authCrud"
import { Ctms_register_api, register, Register_session } from "../_redux/authCrud"

import { useHistory } from "react-router-dom"
import SVG from "react-inlinesvg"

import Dialog from "@material-ui/core/Dialog"
import MuiDialogTitle from "@material-ui/core/DialogTitle"
import MuiDialogContent from "@material-ui/core/DialogContent"
import MuiDialogActions from "@material-ui/core/DialogActions"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Icon from "@material-ui/core/Icon"
import Select from "react-select"

const clientId =
  "203175466304-jam3rr6ohpfk51ttle1qoav2e79qov0u.apps.googleusercontent.com" //google app id

function Registration(props) {
  const [country_N_code, setcountry_N_code] = useState([])
  const [cityname, setcityname] = useState([])
  const [statename, setstatename] = useState([])
  let history = useHistory()
  const [error_message, seterror_message] = useState(false)
  const [error_message2, seterror_message2] = useState("Error")
  const date1 = new Date()
  const [opens, setopens] = useState(false)
  const [country_code_, setcountry_code_] = useState([])
  const [selectedOption, setselectedOption] = useState({
    value: "0",
    label: " Country code",
  })
  const [country_name_, setcountry_name_] = useState([])
  const [selectedOption_country, setselectedOption_country] = useState({
    value: "0",
    label: " Country",
  })
  const [state_name_, setstate_name_] = useState([])
  const [selectedOption_state, setselectedOption_state] = useState({
    value: "0",
    label: " State",
  })

  const [city_name_, setcity_name_] = useState([])
  const [selectedOption_city, setselectedOption_city] = useState({
    value: "0",
    label: " City",
  })

  const converted_date =
    date1.getFullYear() - 10 + "-" + (date1.getMonth() + 1) + "-" + (date1.getMonth() + 1)
  useEffect(() => {
    signOut()
  }, [])
  // testing
  useEffect(() => {
    // const emailValue = new URLSearchParams(location.search).get("email")

    const id = props.match.params.id
    console.log("id...", id)
  }, [])

  // api call on load
  useEffect(() => {
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
    getdata()
    localStorage.setItem("countryname", "country")
    localStorage.setItem("statename", "state")

    // console.log("queryParams", "< FirstName  > ",FirstName," <lastname  > ",LastName,"< email >",Email,"< countryid  > ",CountryID,"< state id > ",StateID,"< cityid  >",CityID,"< birtdate >",BirthDate,"< countrycode >",CountryCode)
    return () => {}
  }, [])

  // cutom value for dropdown
  useEffect(() => {
    if (country_N_code.length > 0) {
      setcountry_code_(
        country_N_code.map((num, index) => {
          return { label: num.Name + " (" + num.Code + ")", value: num.id }
        })
      )

      setcountry_name_(
        country_N_code.map((num, index) => {
          return { label: num.Name, value: num.id }
        })
      )
    }
  }, [country_N_code])

  // custom value of state
  useEffect(() => {
    if (statename) {
      console.log("setstatename", statename)

      setstate_name_(
        statename.map((num, index) => {
          return { label: num.Name, value: num.id }
        })
      )
    }
  }, [statename])
  // custom value of city

  useEffect(() => {
    if (cityname) {
      console.log("cityname", cityname)

      setcity_name_(
        cityname.map((num, index) => {
          return { label: num.Name, value: num.id }
        })
      )
    }
  }, [cityname])

  useEffect(() => {
    console.log("doubled2", country_code_)
  }, [country_code_])

  const Setoptionvalue = (e, type) => {
    console.log("eeeis", e)
    if (type === 1) {
      setselectedOption(e)
      formik.setFieldValue("country_code", e.value)
    }
    if (type === 2) {
      setselectedOption_country(e)
      formik.setFieldValue("country", e.value)
    }
    if (type === 3) {
      setselectedOption_state(e)
      formik.setFieldValue("state", e.value)
    }
    if (type === 4) {
      setselectedOption_city(e)
      formik.setFieldValue("city", e.value)
    }
  }

  const queryParams = new URLSearchParams(window.location.search)

  const initialValues = {
    first_name: queryParams.get("FirstName"),
    last_name: queryParams.get("LastName"),
    email: queryParams.get("Email"),
    password: "",
    changepassword: "",
    country_code: queryParams.get("CountryCode"),
    contact: "",
    dob: queryParams.get("BirthDate"),
    address: "",
    Tnc: false,
    isAuthorized: false,
    profileURL: null,
    pictureURL: null,
    country: queryParams.get("CountryID"),
    state: queryParams.get("StateID"),
    city: queryParams.get("CityID"),
    eventStartDate: "",
  }

  const { intl } = props
  const [loading, setLoading] = useState(false)
  const [input_type, setinput_type] = useState("text")
  window.addEventListener("message", handlePostMessage)
  window.addEventListener("load", () => {
    console.log("Even Listener Connected")
  })
  function handlePostMessage(event) {
    if (event.data.type === "profile") {
      setUserInfo(event.data.profile)
      console.log("Login Successfull")
      alert("Hey")
      // Alert.success(`Login successful: ${event.data.profile.localizedFirstName}`,{position:'top'});
    }
  }

  function setUserInfo(profile) {
    console.log(profile)

    // isAuthorized: true,
    // first_name: _.get(profile,'localizedFirstName',''),
    // last_name: _.get(profile,'localizedLastName',''),
    // profileURL: `https://www.linkedin.com/in/${_.get(profile,'vanityName','')}`,
    // pictureURL: _.get(_.last(_.get(profile,'profilePicture.displayImage~.elements','')),'identifiers[0].identifier','')
  }
  // validation
  const RegistrationSchema = Yup.object().shape({
    first_name: Yup.string()
      .trim()
      .min(3, "Minimum 3 characters required")
      .max(50, "Maximum 50 characters allowed")
      .required("First name is required")
      .nullable()
      .matches(/^[A-Za-z]+$/, "Invalid First Name !"),
    last_name: Yup.string()
      .trim()
      .min(3, "Minimum 3 characters required")
      .max(50, "Maximum 50 characters allowed")
      .required("Last name is required")
      .nullable()
      .matches(/^[A-Za-z]+$/, "Invalid Last Name !"),
    email: Yup.string()
      .trim()
      .email("Wrong email format")
      .min(3, "Minimum 3 characters required")
      .max(50, "Maximum 50 characters allowed")
      .nullable()
      .required("Email is required"),
    address: Yup.string()
      .trim()
      .min(3, "Minimum 3 characters required")
      .max(50, "Maximum 50 characters allowed")
      .nullable()
      .required("Address is required"),

    contact: Yup.string()
      .trim()
      .min(9, "Minimum 9 digit")
      .max(10, "Maximum 10 digit")
      .matches(/^[0-9\b]+$/, "Invalid mobile number !")
      .required("Contact is required"),
    eventStartDate: Yup.date(),

    dob: Yup.date()
      .required("Date is required")
      .nullable(),

    // .test("min age", "minimum age is 10 ", value => { return value > converted_date }),s

    country_code: Yup.string()
      .required("Country code is required")
      .nullable()
      .test("not blank", "Select country code", (value) => {
        return value != "Country Code"
      }),
    country: Yup.string()
      .required("Country is required")
      .nullable()
      .test("not blank", "Select country", (value) => {
        return value != "country"
      }),
    state: Yup.string()
      .required("State is required")
      .nullable()
      .test("not blank", "Select state", (value) => {
        return value != "state"
      }),
    city: Yup.string()
      .required("City is required")
      .nullable()
      .test("not blank", "Select city", (value) => {
        return value != "city"
      }),

    password: Yup.string()
      .trim()
      .min(8, "Minimum 8 characters required !")
      .max(25, "Maximum 25 characters allowed")
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),

    changepassword: Yup.string()
      .trim()
      .required("Confirm Password is required")
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Password and Confirm Password didn't match"
        ),
      }),

    // Tnc: Yup.bool().required(
    //   "You must accept the terms and conditions"
    // ).test("accept cons", "please accept Tnc", value => value !== false),
  })

  const enableLoading = () => {
    setLoading(true)
  }

  const disableLoading = () => {
    setLoading(false)
  }

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
    validationSchema: RegistrationSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      console.log("onsubmit...values", values)
      setSubmitting(true)
      enableLoading()
      // register using email n passwprd
      register(
        values.first_name,
        values.last_name,
        values.email,
        "",
        "",
        values.password,
        values.city,
        values.contact,
        values.dob,
        values.address,
        values.country_code
      )
        .then((value) => {
          disableLoading()
          setSubmitting(false)
          // Ctms_register_status_update(value.data)
          common_sesson_ctms(value.data[0])
          console.log("value...", value)
         
          setopens(true)
        })
        .catch((err) => {
          setSubmitting(false)
          seterror_message2(err.response.data.message)
          seterror_message(true)
          disableLoading()
        })
    },
  })
  // social media login methods

  function linkedin() {
    linkedInConnect()
  }
  function fb_connect() {
    facebookConnect()
      .then((data) => {
        console.log("data fb is", data)
      })
      .catch((err) => {
        console.log("error is ", err)
      })
    // console.log("fb data", data)
    // Facebook_register()
  }
  function google_connect() {
    console.log("google_connect  called")
    signIn()
  }

  function google_connect_logout() {
    console.log("google_connect  signout called")
    signOut()
  }

  // register using google account
  function onSuccess_google_log(res) {
    // googleConnect(res);
    const Google_account = res.profileObj

    console.log("ppp", Google_account)

    register(
      Google_account.givenName,
      Google_account.familyName,
      Google_account.email,
      Google_account.googleId,
      ""
    )
      .then(({ data: { authToken } }) => {
        disableLoading()
        console.log("authtoken...", authToken)
        signOut()
        history.push("/login")
      })
      .catch((err) => {
        seterror_message2(err.response?.data.message)
        seterror_message(true)
        disableLoading()
      })
  }
  function onFailure_google_log(res) {
    // googleConnect(res);
    console.log("failed login")
  }

  const { signIn } = useGoogleLogin({
    onSuccess: onSuccess_google_log,
    onFailure: onFailure_google_log,
    clientId,
    isSignedIn: true,
    accessType: "offline",
    // responseType: 'code',
    prompt: "consent",
  })
  //login using google end

  //logout google account

  const onLogoutSuccess = (res) => {
    console.log("Logged out Success...............")
  }

  const onFailure2 = () => {
    console.log("Handle failure cases")
  }
  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure: onFailure2,
  })

  // register using facebbok

  function Facebook_register() {
    register("Asaram bapu", "", "", "", "4174632389287963")
      .then(({ data: { authToken } }) => {
        disableLoading()
        console.log("authtoken...", authToken)
        signOut()
        history.push("/login")
      })
      .catch((err) => {
        seterror_message2(err.response?.data.message)
        seterror_message(true)
        disableLoading()
      })
  }

  //  dropdown value change functions
  const dropdown = (value) => {
    if (value === "country") {
      return
    }
    if (
      localStorage.getItem("countryname") &&
      value != localStorage.getItem("countryname")
    ) {
      console.log("values are differnt country")
      console.log("values", value)
      getstate(value)
      formik.setFieldValue("state", "")
      localStorage.setItem("countryname", value)
      setselectedOption_state({
        value: "0",
        label: " State",
      })
      setselectedOption_city({
        value: "0",
        label: " City",
      })
    } else {
      console.log("values are same country")
    }
  }
  // api to get state
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
  const dropdown2 = (value) => {
    if (value === "state") {
      return
    }

    if (localStorage.getItem("statename") && value != localStorage.getItem("statename")) {
      console.log("values of state are differnt")
      console.log("values", value)
      getcity(value)
      formik.setFieldValue("city", "")
      localStorage.setItem("statename", value)
      setselectedOption_city({
        value: "0",
        label: " City",
      })
    } else {
    }
  }
  // api to get city
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
  
  // ctms register user session key
  const common_sesson_ctms = async (datas) => {
   
  }
  // popup close
  const handleCloses = () => {
    setopens(false)
    history.push("/login")
  }
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
  return (
    <div className="login-form login-signin" style={{ display: "block" }}>
      {error_message && (
        <div
          className="alert alert-custom alert-light-danger fade show mb-10"
          role="alert"
        >
          <div className="alert-icon">
            <span className="svg-icon svg-icon-3x svg-icon-danger">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Code/Info-circle.svg")}></SVG>{" "}
            </span>
          </div>
          <div className="alert-text font-weight-bold">{error_message2}</div>
          <div className="alert-close" onClick={() => seterror_message(false)}>
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">
                <i className="ki ki-close"></i>
              </span>
            </button>
          </div>
        </div>
      )}


      <Link to="/" className="text-center mb-10 mb-lg-20">
        <img
          alt="Logo"
          className="max-h-70px "
          src={toAbsoluteUrl("/media/favicon/appicon.png")}
        />
      </Link>

      <form
        id="kt_login_signin_form"
        className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
        onSubmit={formik.handleSubmit}
      >
        {/* begin: Alert */}
        {formik.status && (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        )}
        {/* end: Alert */}

        {/* begin: Fullname */}
        <div className="form-group fv-plugins-icon-container first-name">
          <input
            placeholder="First Name"
            type="text"
            className={`form-control form-control-solid h-auto ${getInputClasses(
              "first_name"
            )}`}
            name="first_name"
            {...formik.getFieldProps("first_name")}
          />
          {formik.touched.first_name && formik.errors.first_name ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.first_name}</div>
            </div>
          ) : null}
        </div>
        {/* end: Fullname */}

        {/* begin: last name */}
        <div className="form-group fv-plugins-icon-container first-name last-name">
          <input
            placeholder="Last Name"
            type="text"
            className={`form-control form-control-solid h-auto ${getInputClasses(
              "last_name"
            )}`}
            name="last_name"
            {...formik.getFieldProps("last_name")}
          />
          {formik.touched.last_name && formik.errors.last_name ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.last_name}</div>
            </div>
          ) : null}
        </div>
        {/* end: last name */}

        {/* begin: Email */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Email"
            type="email"
            className={`form-control form-control-solid h-auto ${getInputClasses(
              "email"
            )}`}
            name="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        {/* end: Email */}

        {/* begin: Password */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Password"
            type="password"
            className={`form-control form-control-solid h-auto ${getInputClasses(
              "password"
            )}`}
            name="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        {/* end: Password */}

        {/* begin: Confirm Password */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Confirm Password"
            type="password"
            className={`form-control form-control-solid h-auto ${getInputClasses(
              "changepassword"
            )}`}
            name="changepassword"
            {...formik.getFieldProps("changepassword")}
          />
          {formik.touched.changepassword && formik.errors.changepassword ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.changepassword}</div>
            </div>
          ) : null}
        </div>
        {/* end: Confirm Password */}

        {/* begin: country code */}
        {/* <div className="form-group fv-plugins-icon-container county-code">
          <select
            name="country_code"
            defaultValue="+0"
            className={`form-control form-control-solid h-auto ${getInputClasses(
              "country_code"
            )}`}
            {...formik.getFieldProps("country_code")}
          >
            <option value="0">Country Code</option>
            {country_N_code.map((data, index) => {
              return (
                <option key={index} value={data.id}>
                  {data.Name} ({data.Code})
                </option>
              )
            })}
          </select>
          {formik.touched.country_code && formik.errors.country_code ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.country_code}</div>
            </div>
          ) : null}
        </div> */}
        {/* end: country code */}

        {/* begin: country code 2*/}
        <div className="form-group fv-plugins-icon-container county-code">
          <Select
            value={selectedOption}
            onChange={(e) => {
              Setoptionvalue(e, 1)
            }}
            options={country_code_}
            name="country_code"
          />
          {formik.touched.country_code && formik.errors.country_code ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.country_code}</div>
            </div>
          ) : null}
        </div>

        {/* end: country code 2*/}

        {/* begin: contact */}
        <div className="form-group fv-plugins-icon-container phone-no">
          <input
            placeholder="Phone Number"
            // type="number"
            className={`form-control form-control-solid h-auto ${getInputClasses(
              "contact"
            )}`}
            name="contact"
            {...formik.getFieldProps("contact")}
          />
          {formik.touched.contact && formik.errors.contact ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.contact}</div>
            </div>
          ) : null}
        </div>
        {/* end: contact */}

        {/* begin: dob */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Date of Birth"
            type={input_type}
            className={`form-control form-control-solid h-auto ${getInputClasses("dob")}`}
            name="dob"
            onFocus={() => {
              setinput_type("date")
            }}
            onBlur={() => {
              setinput_type("text")
            }}
            {...formik.getFieldProps("dob")}
          />
          {formik.touched.dob && formik.errors.dob ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.dob}</div>
            </div>
          ) : null}
        </div>
        {/* end: dob */}

        {/* begin: Address */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Address"
            type="text"
            className={`form-control form-control-solid h-auto ${getInputClasses(
              "address"
            )}`}
            name="address"
            {...formik.getFieldProps("address")}
          />
          {formik.touched.address && formik.errors.address ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.address}</div>
            </div>
          ) : null}
        </div>
        {/* end: Address */}

        {/* begin: country  */}
        <div className="form-group fv-plugins-icon-container county-code country">
          {/* <select
            name="country"
            defaultValue="Country"
            className={`form-control form-control-solid h-auto ${getInputClasses(
              "country"
            )}`}
            // {...formik.getFieldProps("country")}
            // onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.country}
            onChange={(e) => {
              formik.handleChange(e)
              dropdown(e.currentTarget.value)
            }}
          >
            <option value="country">Country</option>

            {country_N_code.map((data, index) => {
              return (
                <option key={index} value={data.id}>
                  {data.Name}
                </option>
              )
            })}
          </select> */}

          <Select
            value={selectedOption_country}
            onChange={(e) => {
              Setoptionvalue(e, 2)
              dropdown(e.value)
            }}
            options={country_name_}
            name="country"
          />

          {formik.touched.country && formik.errors.country ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.country}</div>
            </div>
          ) : null}
        </div>
        {/* end: country  */}

        {/* {(formik.touched.country && formik.values.country != 'country' && formik.values.country != '') ? dropdown(formik.values.country) : null} */}

        {/* begin: state  */}
        <div className="form-group fv-plugins-icon-container county-code state">
          {/* <select
            name="state"
            defaultValue="state"
            disabled={formik.errors.country}
            className={`form-control form-control-solid h-auto ${getInputClasses(
              "state"
            )}`}
            // {...formik.getFieldProps("state")}
            onBlur={formik.handleBlur}
            value={formik.values.state}
            onChange={(e) => {
              formik.handleChange(e)
              dropdown2(e.currentTarget.value)
            }}
          >
            <option value="state">State</option>
            {statename.map((data, index) => {
              return (
                <option key={index} value={data.id}>
                  {data.Name}
                </option>
              )
            })}
          </select> */}

          <Select
            value={selectedOption_state}
            onChange={(e) => {
              Setoptionvalue(e, 3)
              dropdown2(e.value)
            }}
            options={state_name_}
            name="state"
            isDisabled={formik.touched.country && formik.errors.country}
          />

          {formik.touched.state && formik.errors.state ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.state}</div>
            </div>
          ) : null}
        </div>
        {/* end: state  */}
        {/* {(formik.touched.state && formik.values.state != 'state' && formik.values.state != '') ? dropdown2(formik.values.state) : null} */}

        {/* begin: city code */}
        <div className="form-group fv-plugins-icon-container county-code city mr-0  ">
          {/* <select
            name="city"
            defaultValue="city"
            disabled={formik.errors.state || formik.errors.country}
            className={`form-control form-control-solid h-auto ${getInputClasses(
              "city"
            )}`}
            {...formik.getFieldProps("city")}
          >
            <option value="city">City</option>
            {cityname.map((data, index) => {
              return (
                <option key={index} value={data.id}>
                  {data.Name}
                </option>
              )
            })}
          </select> */}

          <Select
            value={selectedOption_city}
            onChange={(e) => {
              Setoptionvalue(e, 4)
            }}
            options={city_name_}
            name="city"
            isDisabled={
              (formik.errors.state && formik.touched.state) ||
              (formik.errors.country && formik.touched.country)
            }
          />

          {formik.touched.city && formik.errors.city ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.city}</div>
            </div>
          ) : null}
        </div>
        {/* end: city code */}
        <div className="form-group ">
          <button
            type="submit"
            disabled={
              formik.isSubmitting
              // ||
              // !formik.isValid
            }
            className="btn btn-primary font-weight-bold px-9 py-4 mt-3 register-button"
          >
            <span>Register</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>

          {/* <Link to="/auth/login">
            <button
              type="button"
              className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
            >
              Cancel
            </button>
          </Link> */}
        </div>

        <div className="mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10 login-left-footer">
          <span className="font-weight-bold text-dark-50">Already have account?</span>
          <Link to="/auth/login" className="font-weight-bold ml-2" id="kt_login_signup">
            Login
          </Link>{" "}
          here!
        </div>
      </form>

      {/* Successfully popup */}
      <Dialog
        onClose={handleCloses}
        aria-labelledby="customized-dialog-title"
        open={opens}
        className="success-popup"
        disableBackdropClick={true}
      >
        <DialogContent dividers className="text-center p-10">
          <div className="success-icon">
            <Icon className="fa fa-check icon" />
          </div>
          <h2 className="font-weight-bold m-10 success-head"></h2>
          <h2 className="success-text mb-10 font-weight-bold success-head">
            You have registered successfully.
          </h2>
          <button
            type="submit"
            onClick={handleCloses}
            className="btn btn-primary mr-5 save-btn"
          >
            Ok
          </button>
        </DialogContent>
      </Dialog>
      {/* Successfully popup */}
    </div>
  )
}

export default injectIntl(connect(null, auth.actions)(Registration))
