import {Page, Platform, Alert, NavController, NavParams} from 'ionic-angular';
import {Http, Headers} from 'angular2/http';
import {ConfirmReturn} from '../confirm-return/confirm-return';

/*
  Generated class for the ScandropoffPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/scandropoff/scandropoff.html',
})
export class Scandropoff {
  static get parameters() {
    return [[NavController], [NavParams], [Http], [Platform]];
  }

  constructor(nav, navParams, http, platform) {
    this.nav = nav;
    this.platform = platform;
    this.userid = navParams.get('user_id');
    this.dishnumber = navParams.get('dish_number');
    this.http = http;
  }

  scan() {
    this.platform.ready().then(() => {
      cordova.plugins.barcodeScanner.scan((result) => {
        var today = new Date();
        var dropoff_id = result.text;

        // Note: hardcoded drop_off_location_id
        var body = {'user_id': this.userid, 'check_out_date': today, 'drop_off_location_id': '1'};
        
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post('http://localhost:3000/api/checkoutdish', JSON.stringify(body), {headers: headers})
        .map(res => res.json())
        .subscribe(
          data => {
            console.log(data);
          },
          err => this.logError(err),
          () => {
            this.nav.push(ConfirmReturn);
          }      
        );
      }, (error) => {
        this.nav.present(Alert.create({
          title: "Attention!",
          subTitle: error,
          buttons: ["Close"]
        }));
      });
    });

  }

}
