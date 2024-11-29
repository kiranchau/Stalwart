
import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import { createBrowserHistory } from 'history';
const accountSubject = new BehaviorSubject(null);
export const history = createBrowserHistory();



export const socialConnectService = {
    login,
    apiAuthenticate,
    logout,
    cleardata,
    google_login,
    account: accountSubject.asObservable(),
    get accountValue() { return accountSubject.value; }
};
let accounts = [];

async function login() {
    // login with facebook then authenticate with the API to get a JWT auth token
    console.log("inside login")
    const { authResponse } = await new Promise(window.FB.login);
    if (!authResponse) return;
    console.log("authResponse", authResponse);

 const data=  await apiAuthenticate(authResponse.accessToken);
return data;
}
let account

async function apiAuthenticate(accessToken) {

    console.log("accessToken  body", accessToken);


    await axios.get(`https://graph.facebook.com/v8.0/me?fields=id%2Cname%2Cemail&access_token=${accessToken}`)
        .then(response => {
            const { data } = response;
            console.log("data...", data);
            if (data.error) { console.log("error") }

            if (true) {
                // create new account if first time logging in
                 account = {
                    // id: newAccountId(),
                    facebookId: data.id,
                    name: data.name,
                    extraInfo: `This is some extra info about ${data.name} that is saved in the API`
                }
                accounts.push(account);
                localStorage.setItem("accountsKey", JSON.stringify(account));
                accountSubject.next(account);

            }

            console.log("account detail...", accounts)

        });

return account
}


function cleardata() {
    accountSubject.next(null);
    console.log("inside clear data");
    accounts = [];
    history.push("/login")


}




function logout() {
    // revoke app permissions to logout completely because FB.logout() doesn't remove FB cookie
    window.FB.api('/me/permissions', 'delete', () => window.FB.logout());
    // stopAuthenticateTimer();
    accountSubject.next(null);
    accounts = [];

    // history.push("/login");


    // window.FB.logout()
}

let authenticateTimeout;

// function startAuthenticateTimer() {
//     // parse json object from base64 encoded jwt token
//     const jwtToken = JSON.parse(atob(accountSubject.value.token.split('.')[1]));

//     console.log("jsw tocken", jwtToken);

//     // set a timeout to re-authenticate with the api one minute before the token expires
//     const expires = new Date(jwtToken.exp * 1000);
//     const timeout = expires.getTime() - Date.now() - (60 * 1000);
//     const { accessToken } = window.FB.getAuthResponse();
//     authenticateTimeout = setTimeout(() => apiAuthenticate(accessToken), timeout);
// }

// function stopAuthenticateTimer() {
//     // cancel timer for re-authenticating with the api
//     clearTimeout(authenticateTimeout);
// }



function google_login(res) {
    console.log("google login success", res);

}

// function google_login_failed(res) {
//     console.log("failed to login ", res);

// }