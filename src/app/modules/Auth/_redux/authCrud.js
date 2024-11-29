import axios from "axios"
export const LOGIN_URL = `${process.env.REACT_APP_API_URL}/api/admin/login/`
export const DashboardData_URL = `${process.env.REACT_APP_API_URL}/api/admin/dashboard/`
export const RewardsData_URL = `${process.env.REACT_APP_API_URL}/api/rewards/getAllRewards/`
export const ProductCategoryData_URL = `${process.env.REACT_APP_API_URL}/api/productCategory/getAllCategory/`
export const RewardsActionData_URL = `${process.env.REACT_APP_API_URL}/api/rewards/rewardsAction/`
export const AccomplishEditActionData_URL = `${process.env.REACT_APP_API_URL}/api/admin/accomplishment/ViewAccomplishment/`
export const FitnessData_URL = `${process.env.REACT_APP_API_URL}/api/FitnessData/Get/`
export const FriendReqData_URL = `${process.env.REACT_APP_API_URL}/api/friendrequest/GetFriends/`
export const AccomplishDeleteActionData_URL = `${process.env.REACT_APP_API_URL}/api/admin/accomplishment/`
export const AdminMsgDelete_URL = `${process.env.REACT_APP_API_URL}/api/adminMesssage/`
export const ProductDelete_URL = `${process.env.REACT_APP_API_URL}/api/product/`
export const SpamsDelete_URL = `${process.env.REACT_APP_API_URL}/api/spam/deleteSpam/`
export const SurveyDelete_URL = `${process.env.REACT_APP_API_URL}/api/survey/`

export const UserMsgDelete_URL = `${process.env.REACT_APP_API_URL}/api/userMessages/`
export const submitQuestionData_URL = `${process.env.REACT_APP_API_URL}/api/questions/addEditQuestions/`
export const getViewSurvey_Data_URL = `${process.env.REACT_APP_API_URL}/api/survey/surveyResponseValue/`
export const get_Survey_Data_URL = `${process.env.REACT_APP_API_URL}/api/survey/getSurveyById/`
export const getNotification_URL = `${process.env.REACT_APP_API_URL}/api/notifications/getPersonDropdown/`
export const getNotificationData_URL = `${process.env.REACT_APP_API_URL}/api/notifications/getNotifications/`
export const deleteComment_URL = `${process.env.REACT_APP_API_URL}/api/accomplishmentComment/Delete/`
export const deleteProductCategory_URL = `${process.env.REACT_APP_API_URL}/api/productCategory/`


export const UsersTemporaryDelete_URL = `${process.env.REACT_APP_API_URL}/api/users/temporaryDelete/`
export const UsersPermanentDelete_URL = `${process.env.REACT_APP_API_URL}/api/users/permanentDelete/`
export const unlike_Accomplish_URL = `${process.env.REACT_APP_API_URL}/api/accomplishmentLike/Unlike/`

export const RewardsActionSubmit_URL = `${process.env.REACT_APP_API_URL}/api/rewards/submitAction/`
export const SendMessageSubmit_URL = `${process.env.REACT_APP_API_URL}/api/adminMessage/sendMessage/`
export const saveProduct_URL = `${process.env.REACT_APP_API_URL}/api/productCategory/addEditCategory`
export const saveAllProduct_URL = `${process.env.REACT_APP_API_URL}/api/product/AddEditProducts`
export const saveSurvey_URL = `${process.env.REACT_APP_API_URL}/api/survey/addEditSurvey`
export const ReportedSpams_URL = `${process.env.REACT_APP_API_URL}/api/spam/getAllSpams`
export const AccomplishData_URL = `${process.env.REACT_APP_API_URL}/api/admin/accomplishment/getAllAccomplishments/`
export const AppUsersData_URL = `${process.env.REACT_APP_API_URL}/api/users/getAllUsers/`
export const DLT_Question_URL = `${process.env.REACT_APP_API_URL}/api/questions/delete/`

export const WealthCoinsData_URL = `${process.env.REACT_APP_API_URL}/api/wealthCoins/getAll/`
export const get_comment_Data_url = `${process.env.REACT_APP_API_URL}/api/accomplishmentComment/GetCommentList/`
export const get_Like_Data_url = `${process.env.REACT_APP_API_URL}/api/accomplishmentLike/GetList/`
export const getWealthCoinsData_URL = `${process.env.REACT_APP_API_URL}/api/wealthCoins/GetWealthCoins/`
export const updateWealthCoins_URL = `${process.env.REACT_APP_API_URL}/api/wealthCoins/updateWealthCoins/`
export const resetWealthCoins_URL = `${process.env.REACT_APP_API_URL}/api/wealthCoins/ResetWealthCoins/`


export const subscriptionUsersData_URL = `${process.env.REACT_APP_API_URL}/api/subscription/getAllUsers/`
export const REQUEST_PASSWORD_URL = `${process.env.REACT_APP_API_URL}/api/auth/forgotpasswordSentMail`
export const RESET_PASSWORD_URL = `${process.env.REACT_APP_API_URL}/api/auth/forgotPasswordReset`
export const REWARDSACTION_URL = `${process.env.REACT_APP_API_URL}/api/rewards/rewardsAction/`


export const Country_URL2 = `${process.env.REACT_APP_API_URL}/api/country/findall/`
export const state_url = `${process.env.REACT_APP_API_URL}/api/state/`
export const city_url = `${process.env.REACT_APP_API_URL}/api/city/`
export const REGISTER_URL = `${process.env.REACT_APP_API_URL}/api/auth/register`

export const update_password = `${process.env.REACT_APP_API_URL}/api/auth/changePassword/`
export const WebAppLoggedInFlag_url = `${process.env.REACT_APP_API_URL}/api/auth/updateIsLoggedFlag/`

export const getAdminMessages_url = `${process.env.REACT_APP_API_URL}/api/adminMesssage/getAll/`
export const getUserMessages_url = `${process.env.REACT_APP_API_URL}/api/userMessages/getUserMessages`

export const Question_Data_url = `${process.env.REACT_APP_API_URL}/api/questions/getAll`
export const getQueData_url = `${process.env.REACT_APP_API_URL}/api/questions/GetById/`
export const getProductCategory_url = `${process.env.REACT_APP_API_URL}/api/productCategory/GetById/`
export const getProduct_url = `${process.env.REACT_APP_API_URL}/api/product/GetProductById/`

export const Survey_Data_url = `${process.env.REACT_APP_API_URL}/api/survey/getSurveys`
export const SurveyResData_url = `${process.env.REACT_APP_API_URL}/api/survey/GetSurveyResponses`
export const DomainResData_url = `${process.env.REACT_APP_API_URL}/api/domainNotes/GetPersonResponse`
export const DomainResViewData_url = `${process.env.REACT_APP_API_URL}/api/domainNotes/GetPersonResponse`

export const getProductData_url = `${process.env.REACT_APP_API_URL}/api/product/getAllProducts`
export const getUserViewData_url = `${process.env.REACT_APP_API_URL}/api/users/ViewUser/`

export const Change_Password_url = `${process.env.REACT_APP_API_URL}/api/admin/changePassword/`

export const AppStatus_url = `${process.env.REACT_APP_API_URL}/api/DownFeature/AppStatus/`
export const TempDeletedDays_url = `${process.env.REACT_APP_API_URL}/api/users/TempDeletedDays/`
export const viewComment_url = `${process.env.REACT_APP_API_URL}/api/spam/viewComment`
export const ChangeAppStatus_url = `${process.env.REACT_APP_API_URL}/api/DownFeature/OnPostDown/`


export function login(EmailAddress, Password) {
  console.log("login url", LOGIN_URL)

  return axios.post(LOGIN_URL, { EmailAddress, Password })
}

export function getDashData() {
  return axios.get(DashboardData_URL);
}
//RewardsData_URL

export async function getRewData(data) {
  console.log('RewardsData_URL', RewardsData_URL);
  return await axios.post(RewardsData_URL, data);
}

export async function getPendingRewData(data) {
  return await axios.post(RewardsData_URL, data);
}


export async function getProductCategoryData(data) {
  return await axios.post(ProductCategoryData_URL, data);
}

export async function getRewActionData(id) {
  return await axios.get(RewardsActionData_URL + id);
}
export async function getAccEditActionData(id) {
  return await axios.get(AccomplishEditActionData_URL + id);
}
export async function getAccDeleteActionData(id) {
  return await axios.delete(AccomplishDeleteActionData_URL + id);
}

export async function submitRewActionData(Data) {
  return await axios.post(RewardsActionSubmit_URL, Data);
}

export function getAccomplishmentsData(data) {
  console.log('RewardsData_URL', AccomplishData_URL);
  return axios.post(AccomplishData_URL, data);
}

export function getAppUsersData(data) {
  console.log('RewardsData_URL', AppUsersData_URL);
  return axios.post(AppUsersData_URL, data);
}
export function DeleteQuestion(data) {
  return axios.post(DLT_Question_URL, data);
}
export function getWeathCoins() {
  return axios.get(WealthCoinsData_URL);
}

export function getWeathCoinsData(PersonId) {
  return axios.post(getWealthCoinsData_URL, {PersonId});
}

export function updateWealthCoins(PersonId, Coins) {
  return axios.post(updateWealthCoins_URL, {PersonId, Coins});
}

export function resetWealthCoins(PersonId) {
  return axios.post(resetWealthCoins_URL, {PersonId});
}

export function getSubscribeUsersData() {
  return axios.get(subscriptionUsersData_URL)
}

export function getRewardsActionData(id) {
  return axios.get(REWARDSACTION_URL + `${id}`)
}
export function getFitessData(id) {
  return axios.get(FitnessData_URL + `${id}`)
}
 export function getFriendsData(id) {
  return axios.get(FriendReqData_URL + `${id}`)
}

export function getAdminMessageData(data) {
  return axios.post(getAdminMessages_url,data);
}
export function getUserMessageData(data) {
  return axios.post(getUserMessages_url,data);
}


export function get_Questions_Data(data) {
  return axios.get(Question_Data_url);
}
export function getSurveyData() {
  return axios.get(Survey_Data_url);
}

export function getSurveyResData() {
  return axios.get(SurveyResData_url);
}

export function getDomainResData() {
  return axios.get(DomainResData_url);
}

export function getDomainView(data) {
  return axios.post(DomainResViewData_url,data);
}

export function getAllProductData(data) {
  return axios.post(getProductData_url,data);
}
export function saveQuestionData(data) {
  return axios.post(submitQuestionData_URL,data);
}
export function get_comment_Data(data) {
  return axios.post(get_comment_Data_url,data);
}
export function get_Like_Data(id) {
  return axios.get(get_Like_Data_url + id);
}
export function deleteCommentData(id) {
  return axios.delete(deleteComment_URL + `${id}`);
}

export function deleteProductCategory(id) {
  return axios.delete(deleteProductCategory_URL + `${id}`);
}

export function deleteAdminMessageData(id) {
  return axios.delete(AdminMsgDelete_URL + `${id}`);
}
export function deleteUserMessageData(id) {
  return axios.delete(UserMsgDelete_URL + `${id}`);
}

export function UsersTemporaryDeleteData(id) {
  return axios.post(UsersTemporaryDelete_URL,id);
}
export function UsersPermanentDeleteData(id) {
  return axios.post(UsersPermanentDelete_URL,id);
}
export function unlikeAccomplishment(data) {
  return axios.post(unlike_Accomplish_URL,data);
}

export async function getUserViewData(id) {
  return await axios.get(getUserViewData_url + id);
}

export function sendMessageData(data) {
  return axios.post(SendMessageSubmit_URL,data);
}

export function getQuestionData(id) {
  return axios.get(getQueData_url + `${id}`)
}

export function get_Product_Category_Data(id) {
  return axios.get(getProductCategory_url + `${id}`)
}

export function get_Product__Data(id) {
  return axios.get(getProduct_url + `${id}`)
}

export function getViewSurveyData(id) {
  return axios.get(getViewSurvey_Data_URL+`${id}`);
}

export function get_Survey_Data(id) {
  return axios.get(get_Survey_Data_URL+`${id}`);
}

export function saveProductcategoryDetails(data) {
  return axios.post(saveProduct_URL,data);
}

export function getPersonDropdown() {
  return axios.get(getNotification_URL);
}

export function getNotifications(id) {
  return axios.get(getNotificationData_URL + `${id}`);
}

export function saveProductAllDetails(data) {
  return axios.post(saveAllProduct_URL,data);
}

export function deleteProductData(id) {
  return axios.delete(ProductDelete_URL + `${id}`);
}

export function getReportedSpamsData(data) {
  return axios.post(ReportedSpams_URL,data);
}
export function deleteSpamsData(id) {
  return axios.delete(SpamsDelete_URL + `${id}`);
}

export function saveSurveyDetails(data) {
  return axios.post(saveSurvey_URL,data);
}

export function deleteSurvey(id) {
  return axios.delete(SurveyDelete_URL + `${id}`);
}


export function saveUpdatedPassword(data) {
   return axios.post(Change_Password_url,data);
}
export function getAppStatus() {
  return axios.get(AppStatus_url);
}
export function ChangeAppStatus() {
  return axios.put(ChangeAppStatus_url);
}

export function getviewComment(data) {
  return axios.post(viewComment_url,data);
}

export function getTempDayDelete() {
  return axios.get(TempDeletedDays_url);
}
export function register(
  FirstName,
  LastName,
  Email,
  GoogleID,
  FacebookID,
  Password,
  CityID,
  Phone,
  BirthDate,
  Address,
  CountryCodeID
) {
  console.log("REGISTER_URL", REGISTER_URL)
  const data = {
    FirstName: FirstName,
    LastName: LastName,
    Address: Address,
    Phone: Phone,
    Email: Email,
    Password: Password,
    CityID: CityID,
    BirthDate: BirthDate,
    GoogleID: GoogleID,
    FacebookID: FacebookID,
    CountryCodeID: CountryCodeID,
  }
  console.log("data is", data)
  // return axios.post(REGISTER_URL, { FirstName, LastName, Email, Password, CityID, Phone, BirthDate, Address });
  return axios.post(REGISTER_URL, data)
}
// reset password gettingtoken
export function requestPassword(Email) {
  return axios.post(REQUEST_PASSWORD_URL, { Email })
}
//  restpassword
export function resetPassword(ResetToken, Password, ID) {
  const data = {
    id: ID,
    ResetToken: ResetToken,
    Password: Password,
  }
  return axios.post(RESET_PASSWORD_URL, data)
}


export function getUserByToken2() {
  // Authorization head should be fulfilled in interceptor.
  // console.log("getuserby token called authcurd  id is", localStorage.getItem("id"))

}

// //  country api
export function get_countries() {
  // console.log("inside get coum", Country_URL2)
  return axios.get(Country_URL2)
}
// state api
export const get_state = async (id) => {
  // console.log("inside get_statae", id)
  // return axios.get(`http://594e06d87103.ngrok.io/api/state/${id}`);
  return axios.get(state_url + `${id}`)
}
// // city api
export const get_city = async (id) => {
  // console.log("inside get_city", id)
  return axios.get(city_url + `${id}`)
}

// update profile information
export function update_profile(values) {
  console.log("update profile ", localStorage.getItem("id"))
  const data = {
    FirstName: values.firstname,
    LastName: values.lastname,
    Address: values.address,
    Phone: values.phone,
    Email: values.email,
    CityID: values.city,
    BirthDate: values.date,
    id: localStorage.getItem("id"),
  }
 
}
// update pro img
export function update_profile_img(file) {
  console.log("update profile ", localStorage.getItem("id"), "file is", file)

  const data = new FormData()
  data.append("id", localStorage.getItem("id"))
  data.append("file", file)

}

//update password
export function update_password_method(values) {
  console.log("update password ", localStorage.getItem("id"))

  const data = {
    pid: localStorage.getItem("id"),
    oldPassword: values.currentPassword,
    newPassword: values.cPassword,
  }

  return axios.put(update_password, data)
}

// // dashboard apis for study imfo

export function Study_api(dropdown_Selected_data) {
  console.log("calling dashboard api ", localStorage.getItem("id"))
  console.log("params1...", dropdown_Selected_data)

  const params = new URLSearchParams()
  params.append("UserName", dropdown_Selected_data.sites.CTMSUsername)
  params.append("Password", dropdown_Selected_data.sites.CTMSPassword)
  params.append("PubKey", "as")
  const url_ = dropdown_Selected_data.sites.CTMSHostLink + "/api/v1/users/signin"
  console.log("url", url_)

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      // Authorization: null,
    },
  }
  console.log("params2...", params)
  if (dropdown_Selected_data !== undefined) {
    console.log("params1d...", dropdown_Selected_data)
    return axios.post(url_, params, config)
  }
}
// dropdown_Selected_data.sites.CTMSHostLink

export function Study_api2(SessionKey, dropdown_Selected_data) {
  console.log("calling dashboard api 2", SessionKey)

  const url_2 = dropdown_Selected_data.sites.CTMSHostLink
  console.log("url2", url_2)

  }



// reactTour flag toggle dashboard
export function WebAppLoggedInFlag_toggle() {
  const data = {
    id: localStorage.getItem("id"),
    WebAppLoggedInFlag: "false",
    MobileAppLoggedInFlag: "",
  }
  console.log("data...", data)
  return axios.put(WebAppLoggedInFlag_url, data)
}

// ctms register  session id get method
export function Register_session(register_resp_data) {
  console.log("calling dashboard api ", localStorage.getItem("id"))
  console.log("params1...", register_resp_data)

  const params = new URLSearchParams()
  params.append("UserName", register_resp_data.CTMSUsername)
  params.append("Password", register_resp_data.CTMSPassword)
  params.append("PubKey", "as")

  const url_ = register_resp_data.CTMSHostLink + "/api/v1/users/signin"
  console.log("url", url_)

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }
  console.log("params2...", params)
  if (register_resp_data !== undefined) {
    console.log("params1d...", register_resp_data)
    return axios.post(url_, params, config)
  }
}

