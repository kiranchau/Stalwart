import { socialConnectService } from '../../app/services/thirdparty';

const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;
process.env.HTTPS = true;

export function initFacebookSdk() {
    // console.log("inside 1 initFacebookSdk ")
    return new Promise(resolve => {
        // wait for facebook sdk to initialize before starting the react app


        window.fbAsyncInit = function () {
            window.FB.init({
                appId: facebookAppId,
                cookie: true,
                xfbml: true,
                version: 'v8.0'
            });
            // console.log("inside 2 initFacebookSdk ")

            // auto authenticate with the api if already logged in with facebook
            window.FB.getLoginStatus(({ authResponse }) => {
                if (authResponse) {
                    socialConnectService.apiAuthenticate(authResponse.accessToken).then(resolve);
                    // console.log("inside 3 initFacebookSdk ")

                } else {
                    // console.log("inside 4 initFacebookSdk ")

                    resolve();
                }
            });
        };

        // load facebook sdk script
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    });
}