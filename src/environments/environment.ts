// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { AuthMode } from 'src/app/auth/auth.enum'

export const environment = {
  production: false,
  baseUrl: 'http://localhost:3000',
  authMode: AuthMode.CustomServer,
  firebase: {
    apiKey: 'AIzaSyBfHLYBvZXvvj4GNpE20GZCgnBDGvdoT3A',
    authDomain: 'lemon-mart-a91f8.web.app',
    // databaseURL: '',
    projectId: 'lemon-mart-a91f8',
    // storageBucket: '',
    messagingSenderId: '42030272657',
    appId: '1:42030272657:web:d7db11560948de73f0af30',
    measurementId: '',
  },
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
