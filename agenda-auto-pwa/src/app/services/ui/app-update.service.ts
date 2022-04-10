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

  public async showAppUpdateAlert(): Promise<void> {
    const header = 'Versiune noua disponibila';
    const message = 'Apasati Ok pentru refresh.';

    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: 'ANULEAZA',
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

    await alert.present();
  }
  doAppUpdate() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
