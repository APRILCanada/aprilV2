// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCXcCYx_SSr9XP3XkAsUK96aqGcltDxFN8',
    authDomain: 'april-canada-c5f17.firebaseapp.com',
    projectId: 'april-canada-c5f17',
    storageBucket: 'april-canada-c5f17.appspot.com',
    messagingSenderId: '898159706086',
    appId: '1:898159706086:web:2f3b8fa0ef0c4c8ff6e027',
    measurementId: 'G-F9J3S4CRKT',
  },
  // apiURL: "http://localhost:51668",
  apiURL: "http://192.168.202.159",
  recaptcha: {
    siteKey: '6LdUpKwdAAAAAOYh7oEpq3meoiSw0gpKM48SPmfN',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
