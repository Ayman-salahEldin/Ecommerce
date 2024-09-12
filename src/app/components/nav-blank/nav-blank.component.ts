import { Component, computed, inject, OnInit, Signal, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {

   
   readonly _AuthService = inject(AuthService)
   private readonly _CartService =inject(CartService)

   countCart:Signal<number>=computed(()=>this._CartService.cartNumber())
   ngOnInit(){
    // cart product
    this._CartService.getProductsCart().subscribe({
      next:(res)=>{
        console.log('cart items',res)
        this._CartService.cartNumber.set(res.numOfCartItems)
      }
    })

     
   }



}
