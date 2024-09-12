import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interface/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

    private readonly _CartService=inject(CartService)
    private readonly _NgxSpinnerService = inject(NgxSpinnerService)
    cartDetails : Icart ={} as Icart

    ngOnInit(): void {
      this._NgxSpinnerService.show('loading1')
        this._CartService.getProductsCart().subscribe({
          next:(res)=>
          {
            console.log(res.data) 
            this.cartDetails = res.data
            this._NgxSpinnerService.hide('loading1')
          },
          error:(err)=>
          { 
            console.log(err)
          }
        })

    }
    removeItem(id:string):void
    {
      this._CartService.deletespecificCartItem(id).subscribe({
        next:(res)=>
        {
          console.log(res);
          this.cartDetails = res.data;
          this._CartService.cartNumber.set(res.numOfCartItems)
        },
        error:(err)=>
        {
          console.log(err)
        }
      })
    }
    updateCount(id:string,count:number):void
    {
      if(count>0){
        this._CartService.updateProductQuantity(id,count).subscribe({
          next:(res)=>
          {
            console.log(res)
            this.cartDetails = res.data
          },
          error:(err)=>
          {
            console.log(err)
          }
        })
  
      }
   }  

   clearItemsAllCart():void
   {
     this._CartService.clearCart().subscribe({
      next:(res)=>
      {
        console.log(res)
        if(res.message=='success'){
          this.cartDetails = {} as Icart
          this._CartService.cartNumber.set(0)
        }
       
      },
      error:(err)=>
      {
        console.log(err)
      }
    })
   }
}
