import { Component  ,Inject} from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';


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

