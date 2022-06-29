import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../components/firebase/models/Product';

@Pipe({
  name: 'productsFilter'
})
export class ProductsListFilterPipe implements PipeTransform {

  transform(Products: Product[], type:string): Product[] {
    if(!Products || !type) {
      return Products;
    }
    
    return Products.filter(product =>
       product.parent?.toString().includes(type.toString())
    )
  }

}
