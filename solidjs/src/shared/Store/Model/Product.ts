import { createStore, unwrap } from 'solid-js/store';
 import { Product } from '../../interface/Model/Product';
 interface ProductStateModel {
  products :Product[]
 }
 const [state, set] = createStore(<ProductStateModel>{ products: [] });
 
 class ProductStore {
  static get() {
   return state;
  }
  static set(i: Product[]) {
   set({ products: i });
  }
  static upsert(i: Product[]) {
   let Prepare: Product[] = unwrap(state.products);
   i.forEach(element => {
    Prepare = Prepare.filter(a => a.id != element.id);
    Prepare = [...Prepare, element];
   });
   set({ products: Prepare });
  }
  static del(i: number) {
   set({ products: unwrap(state.products).filter(a => a.id != i) });
  }
  static add(i: Product) {
   set({ products: [...unwrap(state.products), i] })
  }
  static update(i: Product) {
   set({ products: [...unwrap(state.products).filter(a => a.id == i.id), i] })
  }
  static findState(i: number) {
   return unwrap(state.products).find(a => a.id == i);
  }
  static getState(i: number) {
   return unwrap(state.products).filter(a => a.id == i);
  }
 }
 export { ProductStore };