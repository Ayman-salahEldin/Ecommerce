import { Component, inject } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { IBrands } from '../../core/interface/ibrands';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {


  private readonly _BrandsService=inject(BrandsService)
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)

   brandsList : IBrands[] = []
  ngOnInit(): void {
      this._NgxSpinnerService.show('loading1')
      this._BrandsService.getAllBrands().subscribe({
        next:(res)=>
        {
          console.log('brands',res.data)
          this.brandsList=res.data
          this._NgxSpinnerService.hide('loading1')
        },
        error:(err)=>
        {
          console.log('errerer',err)
        }
      })
  }


}
