import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interface/icategory';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  private readonly _CategoriesService=inject(CategoriesService)
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)
  categoriesList : Icategory[] = []
  ngOnInit(): void {
    this._NgxSpinnerService.show('loading1')
      this._CategoriesService.getAllCategories().subscribe({
        next:(res)=>
        {
          console.log('categ',res.data)
          this.categoriesList=res.data
          this._NgxSpinnerService.hide('loading1')
        },
        error:(err)=>
        {
          console.log('errerer',err)
        }
      })
  }

}
