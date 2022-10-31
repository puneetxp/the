import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';  
import { Select, Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { AddProduct, DeleteProduct, EditProduct, SetProduct ,UpsertProduct } from '../../Ngxs/Action/Product.action';
import { Product } from '../../interface/Model/Product';
import { ProductStateModel } from '../../Ngxs/State/Product.state';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  @Select() product$!: Observable<ProductStateModel>;
  constructor(private http: HttpClient, private store: Store) { }
  private url = '/api/product/';
  create(_value: any): void {
    this.http.post<Product>(this.url, _value).subscribe(i => this.store.dispatch(new AddProduct(i)));
  }
  get(slug: string): Observable<Product> {
    return this.http.get<Product>(this.url + slug);
  }
  getState(id: number | string, key: 'name' | 'slug' | 'enable' | 'id' | 'created_at' | 'updated_at' = 'id'): Observable<Product[]> {
    return this.product$.pipe(map(i => { return i.products.filter(a => a[key] == id) }));
  }
  all(): void {
    this.http.get<Product[]>(this.url).subscribe(i => this.store.dispatch(new SetProduct(i)));
  }
  allState() : Observable<Product[]>{
    return this.product$.pipe(map(i => { return i.products }));
  }
  find(id: number | string, key: 'name' | 'slug' | 'enable' | 'id' | 'created_at' | 'updated_at' = 'id'): Observable<Product | undefined> {
    return this.product$.pipe(map(i => { return i.products.find(a => a[key] == id) }));
  }
  update(_update: any) {
    return this.http.patch<Product>(this.url + _update.id, _update).subscribe(i => this.store.dispatch(new EditProduct(i)));
  }
  upsert(_upsert:any){  
    return this.http.put<Product[]>(this.url, _upsert).subscribe(i => this.store.dispatch(new UpsertProduct(i)));
  }
  del(id: number) {
    return this.http.delete<number>(this.url + id).subscribe(i => this.store.dispatch(new DeleteProduct(i)));
  }
}