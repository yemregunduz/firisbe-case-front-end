import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpStatusCode
} from '@angular/common/http';
import { Observable,catchError,of } from 'rxjs';
import { AlertifyService } from '../shared/services/alertify.service';
import { AlertifyMessageType } from '../enums/alertify/alertify-type.enum';

@Injectable()
export class HttpErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private alertifyService:AlertifyService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.InternalServerError:
          this.alertifyService.message("Sunucuya erişilmiyor!", {
            messageType: AlertifyMessageType.Error,
          });
          break;
        case HttpStatusCode.BadRequest:
          this.alertifyService.message(error.error.message, {
            messageType: AlertifyMessageType.Error,
          });
          break;
        case HttpStatusCode.NotFound:
          this.alertifyService.message("Api bulunamadı!", {
            messageType: AlertifyMessageType.Error,
          });
          break;
        default:
          this.alertifyService.message("Beklenmeyen bir hata meydana gelmiştir!" ,{
            messageType: AlertifyMessageType.Error,
          });
          break;
      }
      return of(error);
    }));
  }
}
