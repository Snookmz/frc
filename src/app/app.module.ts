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
import {PitComponent} from './main/pit/pit.component';
import {ScoutComponent} from './main/scout/scout.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {QrComponent} from './main/qr/qr.component';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        PageNotFoundComponent,
        PitComponent,
        QrComponent,
        ScoutComponent
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        NgxQRCodeModule,
        ReactiveFormsModule
    ],
    providers: [
        HttpInterceptorProviders,
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
