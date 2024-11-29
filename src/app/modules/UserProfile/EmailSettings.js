import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, shallowEqual, connect, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ModalProgressBar } from "../../../_common/_partials/controls";
import * as auth from "../Auth";

function EmailSettings(props) {
  // Fields
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user, shallowEqual);
  useEffect(() => {}, [user]);
  // Methods
  const saveUser = (values, setStatus, setSubmitting) => {
    setloading(true);
    const updatedUser = Object.assign(user, {
      emailSettings: {
        emailNotification: values.emailNotification,
        sendCopyToPersonalEmail: values.sendCopyToPersonalEmail,
        activityRelatesEmail: {
          youHaveNewNotifications: values.youHaveNewNotifications,
          youAreSentADirectMessage: values.youAreSentADirectMessage,
          someoneAddsYouAsAsAConnection: values.someoneAddsYouAsAsAConnection,
          uponNewOrder: values.uponNewOrder,
          newMembershipApproval: values.newMembershipApproval,
          memberRegistration: values.memberRegistration,
        },
        updatesFromApplication: {
          newsAboutProductsAndFeatureUpdates:
            values.newsAboutProductsAndFeatureUpdates,
          tipsOnGettingMoreOut: values.tipsOnGettingMoreOut,
          thingsYouMissedSindeYouLastLoggedIntoApp:
            values.thingsYouMissedSindeYouLastLoggedIntoApp,
          newsAboutOnPartnerProductsAndOtherServices:
            values.newsAboutOnPartnerProductsAndOtherServices,
          tipsOnAppBusinessProducts: values.tipsOnAppBusinessProducts,
        },
      },
    });
    // user for update preparation
    dispatch(props.setUser(updatedUser));
    setTimeout(() => {
      setloading(false);
      setSubmitting(false);
      // Do request to your server for user update, we just imitate user update there, For example:
      // update(updatedUser)
      //  .then(()) => {
      //    setloading(false);
      //  })
      //  .catch((error) => {
      //    setloading(false);
      //    setSubmitting(false);
      //    setStatus(error);
      // });
    }, 1000);
  };
  // UI Helpers
  const initialValues = {
    emailNotification: user.emailSettings.emailNotification,
    sendCopyToPersonalEmail: user.emailSettings.sendCopyToPersonalEmail,
    youHaveNewNotifications:
      user.emailSettings.activityRelatesEmail.youHaveNewNotifications,
    youAreSentADirectMessage:
      user.emailSettings.activityRelatesEmail.youAreSentADirectMessage,
    someoneAddsYouAsAsAConnection:
      user.emailSettings.activityRelatesEmail.someoneAddsYouAsAsAConnection,
    uponNewOrder: user.emailSettings.activityRelatesEmail.uponNewOrder,
    newMembershipApproval:
      user.emailSettings.activityRelatesEmail.newMembershipApproval,
    memberRegistration:
      user.emailSettings.activityRelatesEmail.memberRegistration,
    newsAboutProductsAndFeatureUpdates:
      user.emailSettings.updatesFromApplication
        .newsAboutProductsAndFeatureUpdates,
    tipsOnGettingMoreOut:
      user.emailSettings.updatesFromApplication.tipsOnGettingMoreOut,
    thingsYouMissedSindeYouLastLoggedIntoApp:
      user.emailSettings.updatesFromApplication
        .thingsYouMissedSindeYouLastLoggedIntoApp,
    newsAboutOnPartnerProductsAndOtherServices:
      user.emailSettings.updatesFromApplication
        .newsAboutOnPartnerProductsAndOtherServices,
    tipsOnAppBusinessProducts:
      user.emailSettings.updatesFromApplication.tipsOnAppBusinessProducts,
  };
  const Schema = Yup.object().shape({
    emailNotification: Yup.bool(),
    sendCopyToPersonalEmail: Yup.bool(),
    youHaveNewNotifications: Yup.bool(),
    youAreSentADirectMessage: Yup.bool(),
    someoneAddsYouAsAsAConnection: Yup.bool(),
    uponNewOrder: Yup.bool(),
    newMembershipApproval: Yup.bool(),
    memberRegistration: Yup.bool(),
    newsAboutProductsAndFeatureUpdates: Yup.bool(),
    tipsOnGettingMoreOut: Yup.bool(),
    thingsYouMissedSindeYouLastLoggedIntoApp: Yup.bool(),
    newsAboutOnPartnerProductsAndOtherServices: Yup.bool(),
    tipsOnAppBusinessProducts: Yup.bool(),
  });
  const formik = useFormik({
    initialValues,
    validationSchema: Schema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      saveUser(values, setStatus, setSubmitting);
    },
    onReset: (values, { resetForm }) => {
      resetForm();
    },
  });
  return (
    <form className="card card-custom" onSubmit={formik.handleSubmit}>
      {loading && <ModalProgressBar />}

      {/* begin::Header */}
      <div className="card-header py-3">
        <div className="card-title align-items-start flex-column">
          <h3 className="card-label font-weight-bolder text-dark">
            Email Settings
          </h3>
          <span className="text-muted font-weight-bold font-size-sm mt-1">
            Change your email settings
          </span>
        </div>
        <div className="card-toolbar">
          <button
            type="submit"
            className="btn btn-success mr-2"
            disabled={
              formik.isSubmitting || (formik.touched && !formik.isValid)
            }
          >
            Save Changes
            {formik.isSubmitting}
          </button>
          <Link
            to="/user-profile/personal-information"
            className="btn btn-secondary"
          >
            Cancel
          </Link>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Form */}
      <div className="form">
        <div className="card-body">
          <div className="row">
            <label className="col-xl-3"></label>
            <div className="col-lg-9 col-xl-6">
              <h5 className="font-weight-bold mb-6">
                Setup Email Notification:
              </h5>
            </div>
          </div>
          <div className="form-group row align-items-center">
            <label className="col-xl-3 col-lg-3 col-form-label font-weight-bold text-left text-lg-right">
              Email Notification
            </label>
            <div className="col-lg-9 col-xl-6">
              <span className="switch switch-sm">
                <label>
                  <input
                    type="checkbox"
                    name="emailNotification"
                    checked={formik.values.emailNotification}
                    onChange={formik.handleChange}
                  />
                  <span></span>
                </label>
              </span>
            </div>
          </div>
          <div className="form-group row align-items-center">
            <label className="col-xl-3 col-lg-3 col-form-label font-weight-bold text-left text-lg-right">
              Send Copy To Personal Email
            </label>
            <div className="col-lg-9 col-xl-6">
              <span className="switch switch-sm">
                <label>
                  <input
                    type="checkbox"
                    name="sendCopyToPersonalEmail"
                    checked={formik.values.sendCopyToPersonalEmail}
                    onChange={formik.handleChange}
                  />
                  <span></span>
                </label>
              </span>
            </div>
          </div>
          <div className="separator separator-dashed my-10"></div>
          <div className="row">
            <label className="col-xl-3"></label>
            <div className="col-lg-9 col-xl-6">
              <h5 className="font-weight-bold mb-6">
                Activity Related Emails:
              </h5>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label font-weight-bold text-left text-lg-right">
              When To Email
            </label>
            <div className="col-lg-9 col-xl-6">
              <div className="checkbox-list">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    name="youHaveNewNotifications"
                    checked={formik.values.youHaveNewNotifications}
                    onChange={formik.handleChange}
                  />
                  <span></span>You have new notifications
                </label>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    name="youAreSentADirectMessage"
                    checked={formik.values.youAreSentADirectMessage}
                    onChange={formik.handleChange}
                  />
                  <span></span>You're sent a direct message
                </label>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    name="someoneAddsYouAsAsAConnection"
                    checked={formik.values.someoneAddsYouAsAsAConnection}
                    onChange={formik.handleChange}
                  />
                  <span></span>Someone adds you as a connection
                </label>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label font-weight-bold text-left text-lg-right">
              When To Escalate Emails
            </label>
            <div className="col-lg-9 col-xl-6">
              <div className="checkbox-list">
                <label className="checkbox checkbox-primary">
                  <input
                    type="checkbox"
                    name="uponNewOrder"
                    checked={formik.values.uponNewOrder}
                    onChange={formik.handleChange}
                  />
                  <span></span>Upon new order
                </label>
                <label className="checkbox checkbox-primary">
                  <input
                    type="checkbox"
                    name="newMembershipApproval"
                    checked={formik.values.newMembershipApproval}
                    onChange={formik.handleChange}
                  />
                  <span></span>New membership approval
                </label>
                <label className="checkbox checkbox-primary">
                  <input
                    type="checkbox"
                    name="memberRegistration"
                    checked={formik.values.memberRegistration}
                    onChange={formik.handleChange}
                  />
                  <span></span>Member registration
                </label>
              </div>
            </div>
          </div>
          <div className="separator separator-dashed my-10"></div>
          <div className="row">
            <label className="col-xl-3"></label>
            <div className="col-lg-9 col-xl-6">
              <h5 className="font-weight-bold mb-6">
                
              </h5>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label font-weight-bold text-left text-lg-right">
              Email You With
            </label>
            <div className="col-lg-9 col-xl-6">
              <div className="checkbox-list">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    name="newsAboutProductsAndFeatureUpdates"
                    checked={
                      formik.values.newsAboutProductsAndFeatureUpdates
                    }
                    onChange={formik.handleChange}
                  />
                </label>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    name="tipsOnGettingMoreOut"
                    checked={formik.values.tipsOnGettingMoreOut}
                    onChange={formik.handleChange}
                  />
                  <span></span>Tips on getting more out of App
                </label>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    name="thingsYouMissedSindeYouLastLoggedIntoApp"
                    checked={
                      formik.values.thingsYouMissedSindeYouLastLoggedIntoApp
                    }
                    onChange={formik.handleChange}
                  />
                  <span></span>Things you missed since you last logged into App
                </label>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    name="newsAboutOnPartnerProductsAndOtherServices"
                    checked={
                      formik.values
                        .newsAboutOnPartnerProductsAndOtherServices
                    }
                    onChange={formik.handleChange}
                  />
                  <span></span>News about on partner products and other
                  services
                </label>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    name="tipsOnAppBusinessProducts"
                    checked={formik.values.tipsOnAppBusinessProducts}
                    onChange={formik.handleChange}
                  />
                  <span></span>Tips on business products
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end::Form */}
    </form>
  );
}

export default connect(null, auth.actions)(EmailSettings);
