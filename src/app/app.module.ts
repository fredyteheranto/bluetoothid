import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BluetoothLE } from "@ionic-native/bluetooth-le/ngx";
import { BluetoothSerial } from "@ionic-native/bluetooth-serial/ngx";
import { BLE } from "@ionic-native/ble/ngx";
import { Uid } from "@ionic-native/uid/ngx";
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    BluetoothLE,
    BLE,
    Uid,
    AndroidPermissions,
    BluetoothSerial,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
