import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { Iproduct } from '../../core/interface/iproduct';
import { Icategory } from '../../core/interface/icategory';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriesService } from '../../core/services/categories.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink,SearchPipe,FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService)
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _CategoriesService = inject(CategoriesService)

  productList:Iproduct[]=[]
  categoriesList:Icategory[]=[]
  getallProductSub!:Subscription
  text :string=""

  ngOnInit(): void {
     
    this._NgxSpinnerService.show('loading1')
    this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log("categoris",res)
        this.categoriesList=res.data
        this._NgxSpinnerService.hide('loading1')
      },
      error:(err)=>
      {
        console.log(err)
      }
    })

     this.getallProductSub =  this._ProductsService.getAllProducts().subscribe({    // all product api subscribe
        next:(res)=>{
          console.log("all product",res.data)
          this.productList=res.data
        },
        error:(err)=>{
          console.log(err)
        }
      })
  }
  ngOnDestroy(): void {
   
    this.getallProductSub?.unsubscribe()
    
  }

  addCart(id:string):void
  {
    this._CartService.addProductToCart(id).subscribe({
      next:(res)=>
      {
        console.log(res)
        this._ToastrService.success(res.message,'Fresh Cart')
        this._CartService.cartNumber.set(res.numOfCartItems)
      },
      error:(err)=>
      console.log(err)
    })
  }


}
