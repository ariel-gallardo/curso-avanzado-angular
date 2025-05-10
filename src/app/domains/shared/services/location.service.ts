import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Location, LocationParams, LocationRequest } from '@shared/models/location.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private _url: string = `${environment.apiUrl}/api/v1/locations`;
  constructor(private http: HttpClient) { 
  }

  public getAll(params: LocationParams){
    let r = {
      origin: params.lat && params.lng ? `${params.lat},${params.lng}` : undefined,
      size: params.size ? params.size : undefined
    } as LocationRequest;

    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      httpParams = httpParams.set(key, value);
    });
    return this.http.get<Location[]>(`${this._url}`,{params: httpParams});
  }
}
