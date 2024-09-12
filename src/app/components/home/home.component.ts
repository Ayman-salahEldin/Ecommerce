import { Component, inject, NgModule, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interface/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interface/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink,SearchPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly _ProductsService = inject(ProductsService)
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)

  productList:Iproduct[]=[]
  categoriesList:Icategory[]=[]
  getallProductSub!:Subscription
  text :string=""

// carowsel
// fisrt carwo main
customOptionsMain: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  autoplay:true,
  autoplayTimeout:2000,
  autoplayHoverPause:true,
  navSpeed: 700,
  navText: ['', ''],
  items:1,
  nav: true
}
// second carow
customOptionsCategory: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  autoplay:true,
  autoplayTimeout:2000,
  autoplayHoverPause:true,
  navSpeed: 700,
  navText: ['prev', 'next'],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: true
}

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
          console.log("data",res.data)
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
