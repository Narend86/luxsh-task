import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppConfig} from '../config-file/config';
// import { User } from '../_model/user';

@Injectable({ providedIn: 'root' })

export class UserService {
    public baseUrl:string;
    constructor(private http: HttpClient,  private appConstants: AppConfig) {
      this.baseUrl = 'http://165.22.123.1/WebServices';
     }

    getAllSite():Observable<any> {
        return this.http.get(`${this.baseUrl}/site_all.php?GetAll`);
    }

    createSite(data):Observable<any>{
        return this.http.post(`${this.baseUrl}/SiteAdd.php?SiteAdd`,data);
    }

    editSite(Site_Id):Observable<any> {
        return this.http.get(`${this.baseUrl}/site_all.php?Site_Id=${Site_Id}`);
    }
    updateSite(data):Observable<any>{
        return this.http.put(`${this.baseUrl}/SiteEdit.php?Edit`,data)
    }

    deleteSite(Site_Id) {
        return this.http.delete(`${this.baseUrl}/SiteDelete.php?Delete`,Site_Id);
    }
}