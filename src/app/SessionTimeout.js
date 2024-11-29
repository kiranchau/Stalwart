import React, { useEffect, useRef, useState } from "react";
import IdleTimer from "react-idle-timer";
import { useHistory } from "react-router-dom";

import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let countdownInterval;
let timeout;
const SessionTimeout = () => {
  let history = useHistory();
  const [timeoutModalOpen, setTimeoutModalOpen] = useState(false);
  const [timeoutCountdown, setTimeoutCountdown] = useState(0);
  const idleTimer = useRef(null);
  const clearSessionTimeout = () => {
    clearTimeout(timeout);
  };

  const clearSessionInterval = () => {
    clearInterval(countdownInterval);
  };
  // logout fucntion
  const handleLogout = () => {
    setTimeoutModalOpen(false);
    clearSessionInterval();
    clearSessionTimeout();
    onLogout();
  };

  // when we click on continue button
  const handleContinue = () => {
    setTimeoutModalOpen(false);
    clearSessionInterval();
    clearSessionTimeout();
  };

  // when we do any events
  const onActive = () => {
    if (!timeoutModalOpen) {
      clearSessionInterval();
      clearSessionTimeout();
    }
  };

  // when IDLE time starts
  const onIdle = () => {
    const delay = 3000 * 1;
    // if (isAuthenticated && !timeoutModalOpen) {
    timeout = setTimeout(() => {
      let countDown = 30;
      setTimeoutModalOpen(true);
      setTimeoutCountdown(countDown);
      countdownInterval = setInterval(() => {
        if (countDown > 0) {
          setTimeoutCountdown(--countDown);
        } else {
          handleLogout();
        }
      }, 1000);
    }, delay);
    // }
  };

  // call logout sessions
  const onLogout = () => {
    history.push("/logout");
  };
  return (
    <>
      {/* to find out IDLE TIME of system */}
      <IdleTimer
        ref={idleTimer}
        onActive={onActive}
        onIdle={onIdle}
        debounce={250}
        timeout={300000} // 5 mins=300000 ms
      />
      <div>
        <Dialog
          //   onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={timeoutModalOpen}
          className="log-out-wrap"
        >
          <DialogTitle className="popup-heading">Session Timeout</DialogTitle>
          <DialogContent dividers className="middle-content">
            <Typography variant="body2">
              The current session is about to expire in{" "}
              <span>{timeoutCountdown}</span> seconds.
            </Typography>
            <Typography gutterBottom className="logut-content">
              Would you like to continue the session?
            </Typography>
          </DialogContent>
          <DialogActions className="btn-wrapper">
            <div className="card-toolbar">
              <Link
                className="btn btn-secondary mr-6"
                onClick={onLogout}
                to="#"
              >
                Logout
              </Link>
              <Link
                color="primary"
                type="submit"
                onClick={handleContinue}
                to="#"
                className="btn btn-danger logout-btn"
              >
                Continue
              </Link>
            </div>
          </DialogActions>
        </Dialog>
      </div>
      {/* <SessionTimeoutDialog
countdown={timeoutCountdown}
onContinue={handleContinue}
onLogout={() => handleLogout(false)}
open={timeoutModalOpen}
/> */}
    </>
  );
};
export default SessionTimeout;
