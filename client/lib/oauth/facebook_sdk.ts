import {dependency} from '../himba';

declare var FB: {
  init(opts: { appId: string, cookie: boolean, xfbml: boolean, version: string });
  api(url: string, callback: (response)=>void);
  login();
  getLoginStatus(callback: (response)=>void);
}

export interface StatusFacebook {
  connected: boolean,
  name?: string
  error?: string
}

var _dep = dependency();
var _status: StatusFacebook = { connected: false };

export var statusFacebook = function() {
  _dep.depend();
  return _status;
}

export function loginFacebook() {
  FB.login();
}

export function load_facebook_sdk(appId: string) {

  function statusChangeCallback(response) {
    debugger
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
      FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        _status = {
          connected: true,
          name: response.name
        };
        _dep.changed();
      });
    } else {
      error(response.status);
    }
  }

  function error(msg: string) {
    _status = {
      connected: false,
      error: msg
    };
    _dep.changed();
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(statusChangeCallback)
  }

  window['fbAsyncInit'] = function() {
    FB.init({
      appId: appId,
      cookie: true,  // enable cookies to allow the server to access
      // the session
      xfbml: true,  // parse social plugins on this page
      version: 'v2.5' // use graph api version 2.5
    });

    checkLoginState();
  };

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  } (document, 'script', 'facebook-jssdk'));
}
