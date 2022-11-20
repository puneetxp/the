import { createStore, unwrap } from 'solid-js/store';
 import { Addtional_user } from '../../interface/Model/Addtional_user';
 interface Addtional_userStateModel {
  addtional_users :Addtional_user[]
 }
 const [state, set] = createStore(<Addtional_userStateModel>{ addtional_users: [] });
 
 class Addtional_userStore {
  static get() {
   return state;
  }
  static set(i: Addtional_user[]) {
   set({ addtional_users: i });
  }
  static upsert(i: Addtional_user[]) {
   let Prepare: Addtional_user[] = unwrap(state.addtional_users);
   i.forEach(element => {
    Prepare = Prepare.filter(a => a.id != element.id);
    Prepare = [...Prepare, element];
   });
   set({ addtional_users: Prepare });
  }
  static del(i: number) {
   set({ addtional_users: unwrap(state.addtional_users).filter(a => a.id != i) });
  }
  static add(i: Addtional_user) {
   set({ addtional_users: [...unwrap(state.addtional_users), i] })
  }
  static update(i: Addtional_user) {
   set({ addtional_users: [...unwrap(state.addtional_users).filter(a => a.id == i.id), i] })
  }
  static findState(i: number) {
   return unwrap(state.addtional_users).find(a => a.id == i);
  }
  static getState(i: number) {
   return unwrap(state.addtional_users).filter(a => a.id == i);
  }
 }
 export { Addtional_userStore };