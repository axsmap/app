"use client";
import { useEffect } from 'react';

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}

const FacebookSDK = () => {
  useEffect(() => {
    // Initialize Facebook SDK
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
        cookie: true,
        xfbml: true,
        version: 'v18.0'
      });
    };

    // Load Facebook SDK
    (function(d, s, id) {
      var js: any, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  return <div id="fb-root"></div>;
};

export default FacebookSDK;