import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {


    private baseUrl = environment.apiUrl;
  private username = "od5bp";
  private appPassword ="wxNQ vGTr HET4 W61D 2z0L zV0Z";
  private authHeader = 'Basic ' + btoa(this.username + ':' + this.appPassword);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.baseUrl && req.url.startsWith(this.baseUrl)) {
      const user = this.username;
      const pass = this.appPassword;
      const auth = 'Basic ' + btoa(`${user}:${pass}`);

      if (!req.headers.has('Authorization')) {
        req = req.clone({ setHeaders: { Authorization: auth } });
      }
    }
    return next.handle(req);
  }
}