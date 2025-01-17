import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpInterceptorProviders} from './services/httpService/http-interceptor-providers';
import {MainComponent} from './main/main.component';
import {PitComponent} from './pit/pit.component';
import {ScoutComponent} from './scout/scout.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {QrComponent} from './qr/qr.component';
import {HttpClientModule} from '@angular/common/http';
import {DataComponent} from './data/data.component';
import {LoginComponent} from './login/login.component';
import {SetupComponent} from './setup/setup.component';
import {EventModalComponent} from './setup/event-modal/event-modal.component';
import {AutoComponent} from './scout/auto/auto.component';
import {TeleComponent} from './scout/tele/tele.component';
import {CommentComponent} from './scout/comment/comment.component';
import {StorageComponent} from './storage/storage.component';
import {HTTP} from '@ionic-native/http/ngx';
import {Camera} from '@ionic-native/camera/ngx';
import {FinishComponent} from './scout/finish/finish.component';
import {QRCodeModule} from 'angularx-qrcode';

@NgModule({
    declarations: [
        AppComponent,
        DataComponent,
        EventModalComponent,
        LoginComponent,
        MainComponent,
        PageNotFoundComponent,
        PitComponent,
        QrComponent,
        ScoutComponent,
        SetupComponent,
        AutoComponent,
        TeleComponent,
        CommentComponent,
        StorageComponent,
        FinishComponent
    ],
    entryComponents: [EventModalComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        NgxQRCodeModule,
        ReactiveFormsModule,
    ],
    providers: [
        HttpInterceptorProviders,
        StatusBar,
        SplashScreen,
        HTTP,
        Camera,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
