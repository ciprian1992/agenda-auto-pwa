import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class AppUpdateService {
  constructor(
    private readonly updates: SwUpdate,
    public alertController: AlertController
  ) {
    this.updates.versionUpdates.subscribe(() => {
      this.showAppUpdateAlert();
    });
  }
  showAppUpdateAlert() {
    const header = 'Versiune noua disponibila';
    const message = 'Apasati Ok pentru refresh.';
    const action = this.doAppUpdate;
    const caller = this;
    // Use MatDialog or ionicframework's AlertController or similar

    this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
        },
        {
          text: 'OK',
          id: 'confirm-button',
          handler: () => {
            this.doAppUpdate();
          },
        },
      ],
    });
  }
  doAppUpdate() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
