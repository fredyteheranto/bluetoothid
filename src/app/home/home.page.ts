import { BluetoothSerial } from "@ionic-native/bluetooth-serial/ngx";
import { BluetoothLE } from "@ionic-native/bluetooth-le/ngx";
import { Platform } from "@ionic/angular";
import { Component, NgZone } from "@angular/core";
import { BLE } from "@ionic-native/ble/ngx";
import { Uid } from "@ionic-native/uid/ngx";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  public devices;
  public state;
  public IMEI;
  public UUID;
  public IMSI;
  public ICCID;
  public MAC;
  public rawdata;
  public rawBlue;
  constructor(
    public bluetoothle: BluetoothLE,
    public plt: Platform,
    private ble: BLE,
    private ngZone: NgZone,
    private uid: Uid,
    public seriaBLE: BluetoothSerial
  ) {
    this.plt.ready().then((readySource) => {
      console.log("Platform ready from", readySource);
      (window as any).BluetoothAdress.Adress(
        "bluetooth_address",
        this.successCallback,
        this.errorCallback
      );

      this.bluetoothle.initialize().subscribe((bleb) => {
        console.log("ble", bleb); // logs 'enabled'
        console.log("ble", bleb.status); // logs 'enabled'
      });
    });
    this.Scan();
  }
  // Funcion para desplegar la respuesta cuando es satisfactorio
  successCallback(message) {
    console.log(message);
    alert(message);
  }

  // Funcion si hubo un error
  errorCallback() {
    alert("Hubo un error");
  }

  Scan() {
    this.seriaBLE.setDiscoverable(10000);
    this.ble.isEnabled().then((state) => {
      this.state = state;
      console.log(this.state);
    });
    this.bluetoothle.getAdapterInfo().then((raw) => {
      console.log(raw);
      this.rawBlue = raw;
    });
    this.devices = [];
    this.ble
      .scan([], 15)
      .subscribe((device) => this.onDeviceDiscovered(device));
    this.getEma();
  }
  onDeviceDiscovered(device) {
    console.log("Discovered" + JSON.stringify(device, null, 2));
    this.ngZone.run(() => {
      this.devices.push(device);
      console.log(device);
    });
  }

  getEma() {
    this.ble.enable().then((resul) => {
      console.log("enable", resul);
    });
    this.bluetoothle.isAdvertising().then((res) => {
      console.log("isAdvertising", res);
    });
    this.bluetoothle.getAdapterInfo();

    this.seriaBLE.subscribe("\n").subscribe((subscribe) => {
      console.log(subscribe);
      this.rawdata = subscribe;
    });
  }
}
