import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly _HttpClient = inject(HttpClient)
  constructor() { }
  getAllProducts():Observable<any>
  {
    return this._HttpClient.get(`${environment.baseURL}/api/v1/products`)
  }
  getSpecificProducts(id:string| null):Observable<any>
  {
    return this._HttpClient.get(`${environment.baseURL}/api/v1/products/${id}`)
  }
}