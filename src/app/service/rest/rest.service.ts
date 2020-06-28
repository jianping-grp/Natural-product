import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {GlobalService} from '../global/global.service';
import {Observable, Subject} from 'rxjs';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';
import {finalize} from 'rxjs/operators';
import {catchError, map} from 'rxjs/internal/operators';
@Injectable({
  providedIn: 'root'
})
export class RestService {
  private PER_PAGE = 10;
  private restHost = environment.REST_HOST;
  currentUser = new Subject<any>();
  constructor(private http: HttpClient,
    private globalService: GlobalService) { }
  public getData(url: string): Observable<any> {
    return this.http.get(`${this.restHost}/${url}`);
  }
  public postData(url: string, body: any, ): Observable<any> {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    // this.globalService.setLoading(true);
    return this.http.post(`${this.restHost}/${url}`, body,
      {headers: new HttpHeaders().set('Authorization', `Token`)});
      // .pipe(finalize(() => this.globalService.setLoading(true)));
  }
  public getDataList(
    url: string, page = 0, perPage = this.PER_PAGE, ): Observable<any> {
    // sortby = '',extraParam = ''
// page + 1, as mat-paginator is 0-base while DRF is 1-base
    page = +(page) + 1;
// set global loadingStatus to true
// let sortParam = '';
// if (sortby !== '') {
// sortParam = `&sort[]=${sortby}`;
// }
    return this.http.get(`${this.restHost}/${url}&page=${page}&size=${perPage}`)
};
registry(body: any) {
  return this.http.post(`${this.restHost}/TargetPrediction/`, body);
}
login(username: string, password: string): Observable<any> {
  return this.http.post(`${this.restHost}/rest-auth/login/`, {username: username, password: password})
    .pipe(map((res: Response) => {
      if (res && res['key']) {
        const user = {
          user_token: res['key'],
          user_name: username
        };
        console.log('login token', user); // todo delete
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUser.next(user);
        return user;
      } else {
        return null;
      }
    }));
}
logout(): void {
  const storedUser = JSON.parse(localStorage.getItem('currentUser'));
  this.http.post(`${this.restHost}/auth/logout/`, {},
    {headers: new HttpHeaders().set('Authorization', `Token ${storedUser['user_token']}`)});

  localStorage.removeItem('currentUser');
  const removedToken = localStorage.getItem('currentUser');
  this.currentUser.next(removedToken);
}
  // target prediction
  postTargetPrediction(smiles: string, includeParam = ''): Observable<any> {
    const body = {smiles: smiles};
    this.globalService.setLoading(true);
    return this.http.post(`${this.restHost}/target-prediction/${includeParam}`, body)
      .finally(() => this.globalService.setLoading(false))
      .catch(this.handleError);
  }
  userFeedback(body: any) {
    this.globalService.setLoading(true);
    return this.http.post(`${this.restHost}/feedback/`, body)
      .finally(() => this.globalService.setLoading(false))
      .catch(this.handleError)
  }
  
  private handleError(error: HttpErrorResponse | any ) {
    let errMsg: string;
      if (error instanceof HttpErrorResponse) {
        this.globalService.setLoading(false);
        errMsg = `${error.status} - ${error.statusText || ''} ${error}`;

    } else {
        this.globalService.setLoading(false);
        errMsg = error.message ? error.message : error.toString();
    }

    console.log(errMsg);
    return Promise.reject(errMsg);
}
}

