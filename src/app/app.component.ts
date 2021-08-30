import { Component  ,Inject} from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiWHCqEzvitRSouCbAy56HBbXNps6AKzI",
  authDomain: "frontendtest-d5002.firebaseapp.com",
  projectId: "frontendtest-d5002",
  storageBucket: "frontendtest-d5002.appspot.com",
  messagingSenderId: "974131959904",
  appId: "1:974131959904:web:e715bcc1da54ddc2da8b05",
  measurementId: "G-740TEFTWS9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private oauthServicec:OAuthService , @Inject('baseUrl') private baseUrl:string){


    this.oauthServicec.configure({
      tokenEndpoint:`${this.baseUrl}/oauth/token`,
       clientId: 'client',
       responseType:'token',
       dummyClientSecret:'Dx6g5Mwy$z2hn@@hSudEER&QRhyF690k',
       oidc:false,
       scope:'read',
       strictDiscoveryDocumentValidation:false,
       requestAccessToken:true,
       requireHttps:false,
       timeoutFactor:0.001


    } as AuthConfig)

  }



}

