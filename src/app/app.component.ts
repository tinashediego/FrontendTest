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
  apiKey: "AIzaSyCHbpHwXXrUsAYuqM_Noj9g7kHyRcRMbzY",
  authDomain: "frontendtest-dd3d7.firebaseapp.com",
  projectId: "frontendtest-dd3d7",
  storageBucket: "frontendtest-dd3d7.appspot.com",
  messagingSenderId: "663442450364",
  appId: "1:663442450364:web:9def41364e7c8c9ea9edb9",
  measurementId: "G-CS302VZW8X"
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

