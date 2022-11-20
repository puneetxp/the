import { createStore, unwrap } from 'solid-js/store';
 import { Photo } from '../../interface/Model/Photo';
 interface PhotoStateModel {
  photos :Photo[]
 }
 const [state, set] = createStore(<PhotoStateModel>{ photos: [] });
 
 class PhotoStore {
  static get() {
   return state;
  }
  static set(i: Photo[]) {
   set({ photos: i });
  }
  static upsert(i: Photo[]) {
   let Prepare: Photo[] = unwrap(state.photos);
   i.forEach(element => {
    Prepare = Prepare.filter(a => a.id != element.id);
    Prepare = [...Prepare, element];
   });
   set({ photos: Prepare });
  }
  static del(i: number) {
   set({ photos: unwrap(state.photos).filter(a => a.id != i) });
  }
  static add(i: Photo) {
   set({ photos: [...unwrap(state.photos), i] })
  }
  static update(i: Photo) {
   set({ photos: [...unwrap(state.photos).filter(a => a.id == i.id), i] })
  }
  static findState(i: number) {
   return unwrap(state.photos).find(a => a.id == i);
  }
  static getState(i: number) {
   return unwrap(state.photos).filter(a => a.id == i);
  }
 }
 export { PhotoStore };