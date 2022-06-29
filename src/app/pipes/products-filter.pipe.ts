import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../components/firebase/models/Product';


@Pipe({
  name: 'productsFilter'
})
export class ProductsFilterPipe implements PipeTransform {

  transform(Products: Product[], productValue:string): Product[] {
    if(!Products || !productValue) {
      return Products;
    }
    
    return Products.filter(product =>
      product.parent?.toString()
    .concat(product.fr.title!.toLocaleLowerCase())
    .concat(product.en.title!.toLocaleLowerCase())
    .includes(productValue.toLocaleLowerCase())
    )
  }

}
