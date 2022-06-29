import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productsCollection: AngularFirestoreCollection<Product>;
  productDoc: AngularFirestoreDocument<Product>;
  products: Observable<Product[]>;
  product: any;

  constructor(private afs: AngularFirestore) {
    this.productsCollection = afs.collection<Product>('products');
    this.products = this.productsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Product;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  getProducts(): Observable<Product[]> {
    return this.products;
  }

  createProduct(id: any, product: Product) {
    this.productsCollection.doc(id).set(product);
  }

  getProduct(id: string): Observable<Product> {
    this.productDoc = this.afs.doc<Product>(`products/${id}`);
    this.product = this.productDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Product;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.product;
  }

  updateProduct(product: Product) {
    this.productDoc = this.afs.doc(`products/${product.id}`);
    this.productDoc.update(product);
  }

  deleteProduct(product: Product) {
    this.productDoc = this.afs.doc(`products/${product.id}`);
    this.productDoc.delete();
  }
}
