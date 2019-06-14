import { Component, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';

declare var ApiAIPromises: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage  {
  answers = [];

  constructor(public platform: Platform, public ngZone: NgZone) { 

  platform.ready().then(() => {
    ApiAIPromises.init({
      clientAccessToken: "b1b4db645e3a483d92ca6e3b40c7d2fe"
    }).then(result => console.log(result));
  });

  }

  ask(question) {
    ApiAIPromises.requestText({
      query: question
    })
    .then(({result: {fulfillment: {speech}}}) => {
       this.ngZone.run(()=> {
         this.answers.push(speech);
       });
    })
  }
}
