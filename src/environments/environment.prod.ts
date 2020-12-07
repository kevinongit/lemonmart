import { AuthMode } from 'src/app/auth/auth.enum';

export const environment = {
  production: true,
  authMode: AuthMode.Firebase,
  firebase: {
    apiKey: 'AIzaSyBfHLYBvZXvvj4GNpE20GZCgnBDGvdoT3A',
    authDomain: 'lemon-mart-a91f8.web.app',
    // databaseURL: '',
    projectId: 'lemon-mart-a91f8',
    // storageBucket: '',
    messagingSenderId: '42030272657',
    appId: '1:42030272657:web:d7db11560948de73f0af30',
    measurementId: '',
  }
}
