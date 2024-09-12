import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }

  cartNumber : WritableSignal<number> = signal(0)

  myHeader : any = {token:localStorage.getItem('userToken')}

  addProductToCart(id:string):Observable<any>
  {
    return this._HttpClient.post(`${environment.baseURL}/api/v1/cart`,
      {
        "productId": id
      },
      {
       headers : this.myHeader

      }
    )
  }

  getProductsCart():Observable<any>
  {
    return this._HttpClient.get(`${environment.baseURL}/api/v1/cart`,
      {
        headers : this.myHeader
      }
    )
  }
  deletespecificCartItem(id:string):Observable<any>
  {
    return this._HttpClient.delete(`${environment.baseURL}/api/v1/cart/${id}`,
      {
        headers : this.myHeader
      }
    )
  }
  updateProductQuantity(id:string,newcount:number):Observable<any>
  {
    return this._HttpClient.put(`${environment.baseURL}/api/v1/cart/${id}`,
      {
        "count" : newcount
      },
      {
        headers : this.myHeader
      }
    )
  }

  clearCart():Observable<any>
  {
    return this._HttpClient.delete(`${environment.baseURL}/api/v1/cart`,
      {
        headers : this.myHeader
      }
    )
  }
  
}
