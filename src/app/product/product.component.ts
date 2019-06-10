import { Component, OnInit} from '@angular/core';
import { ServeApiService } from '../serve-api.service';
import { Router } from  '@angular/router';
declare var $: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private apiService: ServeApiService, private router: Router) { }
  products  = []; 
  nextPage = 0
  currentPage = 0
  previousPage = 0
  totalPage = 0
  productDetail: any
  ngOnInit() {
    this.loadProducts()
  }

  logOut(){
    localStorage.removeItem('ACCESS_TOKEN')
    this.router.navigateByUrl('');
  }

  loadProducts(){
    if(this.apiService.isLoggedIn()){
      this.apiService.productsListService(1).subscribe((response:any)=>{
        this.productListing(response)
      })
    }
    else{
      this.router.navigateByUrl('');
    }
  }

  productListing(response:any){
    if(response.code == 200){
      this.products = response.data.products
      this.currentPage = response.meta.current_page 
      this.totalPage = response.meta.total_entries /response.meta.per_page
      if(this.totalPage > this.currentPage)
      {
         this.nextPage = this.currentPage +1
      }
      if(this.currentPage >1){
        this.previousPage = this.currentPage -1
      }
    }
    else{
      this.router.navigateByUrl('');
    }
  }

  nextPageProducts(){
    this.apiService.productsListService(this.nextPage).subscribe((response:any)=>{
      this.productListing(response)
    })
  }

  previousPageProducts(){
    this.apiService.productsListService(this.previousPage).subscribe((response:any)=>{
      this.productListing(response)
    })
  }
  lastPageProducts(){
    this.apiService.productsListService(this.totalPage).subscribe((response:any)=>{
      this.productListing(response)
    })
  }
  firstPageProducts(){
    this.apiService.productsListService(1).subscribe((response:any)=>{
      this.productListing(response)
    })
  }

  searchProducts(query){
    this.apiService.searchroductsListService(query).subscribe((response:any)=>{
      this.productListing(response)
    })
  }

  showProduct(product) {
    console.log(product)
    this.apiService.productsDetailService(product).subscribe((response:any)=>{
      console.log(response)
      if(response.code == 200){
        this.productDetail = response.data.product
        $("#productDetailModal").modal('show');
      }
    })

    
  }

}
