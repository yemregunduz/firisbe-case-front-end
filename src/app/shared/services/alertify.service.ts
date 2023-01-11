import { Injectable } from '@angular/core';
import { AlertifyPosition } from 'src/app/enums/alertify/alertify-position.enum';
import { AlertifyMessageType } from 'src/app/enums/alertify/alertify-type.enum';
declare const alertify:any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  message(message:string ,alertifyOptions?:Partial<AlertifyOption>){
    if(alertifyOptions === undefined){
      alertifyOptions = new AlertifyOption()
      alertifyOptions.messageType = AlertifyMessageType.Notify
    }
    alertify.set('notifier','position',alertifyOptions.alertifyPosition)
    alertify.set('notifier','delay',alertifyOptions.delay)
    const msg = alertify[alertifyOptions.messageType](message);
    if(alertifyOptions.dismissOthers)
      msg.dismissOthers()
  }
  dismissAll(){
    alertify.dismissAll();
  }
}


export class AlertifyOption{
  messageType:AlertifyMessageType = AlertifyMessageType.Success;
  alertifyPosition:AlertifyPosition = AlertifyPosition.BottomRight;
  delay:number = 2.5
  dismissOthers:boolean = false
}

