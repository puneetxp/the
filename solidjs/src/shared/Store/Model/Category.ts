import { createStore, unwrap } from 'solid-js/store';
 import { Category } from '../../interface/Model/Category';
 interface CategoryStateModel {
  categories :Category[]
 }
 const [state, set] = createStore(<CategoryStateModel>{ categories: [] });
 
 class CategoryStore {
  static get() {
   return state;
  }
  static set(i: Category[]) {
   set({ categories: i });
  }
  static upsert(i: Category[]) {
   let Prepare: Category[] = unwrap(state.categories);
   i.forEach(element => {
    Prepare = Prepare.filter(a => a.id != element.id);
    Prepare = [...Prepare, element];
   });
   set({ categories: Prepare });
  }
  static del(i: number) {
   set({ categories: unwrap(state.categories).filter(a => a.id != i) });
  }
  static add(i: Category) {
   set({ categories: [...unwrap(state.categories), i] })
  }
  static update(i: Category) {
   set({ categories: [...unwrap(state.categories).filter(a => a.id == i.id), i] })
  }
  static findState(i: number) {
   return unwrap(state.categories).find(a => a.id == i);
  }
  static getState(i: number) {
   return unwrap(state.categories).filter(a => a.id == i);
  }
 }
 export { CategoryStore };