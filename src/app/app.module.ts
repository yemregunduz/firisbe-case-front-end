import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiModule } from './ui/ui.module';
import { SharedModule } from './shared/shared.module';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { SpinnerModule } from './ui/components/spinner/spinner.module';
import { HttpErrorHandlerInterceptor } from './interceptors/http-error-handler.interceptor';


registerLocaleData(localeTr);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UiModule,
    SharedModule,
    BrowserAnimationsModule,
    SpinnerModule,
  ],
  providers: [
    { provide:"baseUrl",useValue:"https://localhost:7182/api",multi:true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandlerInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'tr' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
