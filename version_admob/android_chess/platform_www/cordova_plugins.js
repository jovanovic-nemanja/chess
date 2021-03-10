cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-promise-polyfill.Promise",
      "file": "plugins/cordova-promise-polyfill/www/Promise.js",
      "pluginId": "cordova-promise-polyfill",
      "runs": true
    },
    {
      "id": "cordova-promise-polyfill.promise.min",
      "file": "plugins/cordova-promise-polyfill/www/promise.min.js",
      "pluginId": "cordova-promise-polyfill"
    },
    {
      "id": "cordova-plugin-admob-free.AdMob",
      "file": "plugins/cordova-plugin-admob-free/www/admob.js",
      "pluginId": "cordova-plugin-admob-free",
      "clobbers": [
        "admob",
        "AdMob",
        "plugins.AdMob"
      ]
    },
    {
      "id": "cordova-plugin-dialogs.notification",
      "file": "plugins/cordova-plugin-dialogs/www/notification.js",
      "pluginId": "cordova-plugin-dialogs",
      "merges": [
        "navigator.notification"
      ]
    },
    {
      "id": "cordova-plugin-dialogs.notification_android",
      "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
      "pluginId": "cordova-plugin-dialogs",
      "merges": [
        "navigator.notification"
      ]
    },
    {
      "id": "cordova-plugin-splashscreen.SplashScreen",
      "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
      "pluginId": "cordova-plugin-splashscreen",
      "clobbers": [
        "navigator.splashscreen"
      ]
    },
    {
      "id": "com.mirfalahtech.base64saveimage.Base64SaveImage",
      "file": "plugins/com.mirfalahtech.base64saveimage/www/Base64SaveImage.js",
      "pluginId": "com.mirfalahtech.base64saveimage",
      "clobbers": [
        "window.Base64SaveImage"
      ]
    },
    {
      "id": "cordova-plugin-firebase-analytics.FirebaseAnalytics",
      "file": "plugins/cordova-plugin-firebase-analytics/www/FirebaseAnalytics.js",
      "pluginId": "cordova-plugin-firebase-analytics",
      "merges": [
        "cordova.plugins.firebase.analytics"
      ]
    },
    {
      "id": "cordova-plugin-firebase-messaging.FirebaseMessaging",
      "file": "plugins/cordova-plugin-firebase-messaging/www/FirebaseMessaging.js",
      "pluginId": "cordova-plugin-firebase-messaging",
      "merges": [
        "cordova.plugins.firebase.messaging"
      ]
    },
    {
      "id": "cordova-plugin-exit.exit",
      "file": "plugins/cordova-plugin-exit/www/exit.js",
      "pluginId": "cordova-plugin-exit",
      "clobbers": [
        "cordova.plugins.exit"
      ]
    },
    {
      "id": "cordova-plugin-purchase.InAppBillingPlugin",
      "file": "plugins/cordova-plugin-purchase/www/store-android.js",
      "pluginId": "cordova-plugin-purchase",
      "clobbers": [
        "store"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-promise-polyfill": "0.0.2",
    "cordova-admob-sdk": "0.24.1",
    "cordova-plugin-admob-free": "0.27.0",
    "cordova-plugin-dialogs": "2.0.2",
    "cordova-plugin-splashscreen": "5.0.3",
    "com.mirfalahtech.base64saveimage": "0.0.5",
    "cordova-support-android-plugin": "1.0.2",
    "cordova-support-google-services": "1.4.0",
    "cordova-plugin-firebase-analytics": "4.2.0",
    "cordova-plugin-firebase-messaging": "4.3.0",
    "cordova-plugin-exit": "1.0.3",
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-purchase": "10.0.1"
  };
});