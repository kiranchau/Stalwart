import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
  Login: "[Login] Action",
  UserInfo: "[UserInfo] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  Global_notification_Requested: "[Request notification_global] Action",

  UserLoaded: "[Load User] Auth API",
  SetUser: "[Set User] Action",
  SetStudy: "[Set study] Action",   
  SetCtmsStudyId: "[Set ctms_studyId] Action",
  Setnotifications: "[Set notifications] Action",
  NotificationsRequested: "[Request notifications] Action",

  CtmsDocRequested: "[Request ctmsDoc] Action",
  SetCtmsDocations: "[Set ctmsDoc] Action",

  SharedDocRequested: "[Request SharedDoc] Action",
  SetSharedDocations: "[Set SharedDoc] Action",
  Setlogo: "[Set logo] Action",
  Global_noti_loaded: "[Load notification_global] Auth API",


};

const initialAuthState = {
  user: undefined,
  authToken: undefined,
  userInfo:undefined,
  //lastName:undefined,
  //docpp:undefined,
  //CtmsDoc:undefined,
  //logo:undefined,
  //Global_notification:undefined,
  //ctms_studyID:undefined
};

export const reducer = persistReducer(
  { storage, key: "v726-demo1-auth", whitelist: ["authToken"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { authToken } = action.payload;
        console.log("redux login 1", authToken);
        //initialAuthState.user = 'RAkesh';
        //console.log("redux login 2", initialAuthState);

        return { authToken, user: undefined };
      }
      case actionTypes.UserInfo: {
        const { userInfo } = action.payload;
        console.log("userInfo login 1", userInfo);
        //initialAuthState.user = 'RAkesh';
        //console.log("redux login 2", initialAuthState);

        return { ...state, userInfo };
      }
      case actionTypes.Register: {
        const { authToken } = action.payload;
        // console.log("redux register 1");

        return { authToken, user: undefined};
      }

      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return initialAuthState;
      }

      // case actionTypes.UserLoaded: {
      //   const { user } = action.payload;
      //   console.log("redux userloaded 1", user);
      
      //   return { ...state, user };
      // }

      // case actionTypes.SetUser: {
      //   const { user } = action.payload;
      //   // console.log("redux setuser 1");

      //   return { ...state, user };
      // }

      // case actionTypes.SetStudy: {
      //   const {studies}  = action.payload;
      //   // console.log("redux studies 1",studies);

      //   return { ...state, studies };
      // }


      // case actionTypes.Setnotifications: {
      //   const {notifications}  = action.payload;
      //   // console.log("redux notification 1",notifications);

      //   return { ...state, notifications , docpp:undefined,
      //     CtmsDoc:undefined,};
      // }

     

      // case actionTypes.SetCtmsDocations: {
      //   const {CtmsDoc}  = action.payload;
      //   // console.log("redux CtmsDoc 1",CtmsDoc);
      //   return { ...state, CtmsDoc , notifications:undefined};
      // }

      // case actionTypes.SetSharedDocations: {
      //   const {docpp}  = action.payload;
      //   // console.log("redux docpp 1",docpp);
      //   return { ...state, docpp ,notifications:undefined};
      // }

      // case actionTypes.Setlogo: {
      //   const {logo}  = action.payload;
      //   // console.log("redux logo 1",logo);

      //   return { ...state, logo };
      // }

      // case actionTypes.Global_noti_loaded: {
      //   const { Global_notification } = action.payload;
      //   // console.log("redux global noti 1");

      //   return { ...state, Global_notification };
      // }

      // case actionTypes.SetCtmsStudyId: {
      //   const {ctms_studyID}  = action.payload;
      //   // console.log("redux ctms_studyID 1",ctms_studyID);

      //   return { ...state, ctms_studyID };
      // }

      default:
        return state;
    }
  }
);

export const actions = {
  login: (authToken) => ({ type: actionTypes.Login, payload: { authToken } }),
  userInfo: (userInfo) => ({ type: actionTypes.UserInfo, payload: { userInfo } }),
  register: (authToken) => ({
    type: actionTypes.Register,
    payload: { authToken },
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: (user) => ({
    type: actionTypes.UserRequested,
    payload: { user },
  }),
  fulfillUser: (user) => ({ type: actionTypes.UserLoaded, payload: { user } }),
  setUser: (user) => ({ type: actionTypes.SetUser, payload: { user } }),
  setstudies_action: (studies) => ({ type: actionTypes.SetStudy, payload: { studies } }),
  requestNotification: (notifications) => ({
    type: actionTypes.NotificationsRequested,
    payload: { notifications },
  }),
  setnotifications_action: (notifications) => ({ type: actionTypes.Setnotifications, payload: { notifications } }),

  requesCTMSdDoc: (docsCTMS) => ({
    type: actionTypes.CtmsDocRequested,
    payload: { docsCTMS },
  }),

  setCtmsdDoc_action: (CtmsDoc) => ({ type: actionTypes.SetCtmsDocations, payload: { CtmsDoc } }),

  requesShareddDoc: (docpp) => ({
    type: actionTypes.SharedDocRequested,
    payload: { docpp },
  }),

  setSharedDoc_action: (docpp) => ({ type: actionTypes.SetSharedDocations, payload: { docpp } }),

  setlogo_action: (logo) => ({ type: actionTypes.Setlogo, payload: { logo } }),

  requestGlobal_notification: (notification) => ({
    type: actionTypes.Global_notification_Requested,
    payload: { notification },
  }),

  set_global_not: (Global_notification) => ({ type: actionTypes.Global_noti_loaded, payload: { Global_notification } }),
  setCTMS_studyID_action: (ctms_studyID) => ({ type: actionTypes.SetCtmsStudyId, payload: { ctms_studyID } }),



};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    // console.log("saga login 1");

    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    // console.log("saga register 1");
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
   // const { data: user } = yield getUserByToken();
    console.log("Test saga getuserbytoken 1");
    yield put(actions.fulfillUser());
  });

  // yield takeLatest(actionTypes.Global_notification_Requested, function* global_notification_Requested() {
  //   const { data: notification } = yield Get_Global_notifications();
  //   // console.log("saga get global noti 1");
  //   yield put(actions.set_global_not(notification));
  // });


  // yield takeLatest(actionTypes.NotificationsRequested, function* notificationsRequested() {
  //   const { data: notifications } = yield Getall_notifications();
  //   // console.log("saga notification 1",notifications);
  //   yield put(actions.setnotifications_action(notifications));
  // });



  // yield takeLatest(actionTypes.CtmsDocRequested, function* ctmsDocRequested() {
  //   const { data: CtmsDoc } = yield get_document_ctms();
  //   // console.log("saga ctms doc 1",CtmsDoc);
  //   yield put(actions.setCtmsdDoc_action(CtmsDoc));
  // });

  // yield takeLatest(actionTypes.SharedDocRequested, function* SharedDocRequestedd() {
  //   const { data: docpp } = yield get_document();
  //   // console.log("saga shared doc 1",docpp);
  //   yield put(actions.setSharedDoc_action(docpp));
  // });


}

