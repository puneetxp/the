import { createStore, unwrap } from 'solid-js/store';
 import { User } from '../../interface/Model/User';
 interface UserStateModel {
  users :User[]
 }
 const [state, set] = createStore(<UserStateModel>{ users: [] });
 
 class UserStore {
  static get() {
   return state;
  }
  static set(i: User[]) {
   set({ users: i });
  }
  static upsert(i: User[]) {
   let Prepare: User[] = unwrap(state.users);
   i.forEach(element => {
    Prepare = Prepare.filter(a => a.id != element.id);
    Prepare = [...Prepare, element];
   });
   set({ users: Prepare });
  }
  static del(i: number) {
   set({ users: unwrap(state.users).filter(a => a.id != i) });
  }
  static add(i: User) {
   set({ users: [...unwrap(state.users), i] })
  }
  static update(i: User) {
   set({ users: [...unwrap(state.users).filter(a => a.id == i.id), i] })
  }
  static findState(i: number) {
   return unwrap(state.users).find(a => a.id == i);
  }
  static getState(i: number) {
   return unwrap(state.users).filter(a => a.id == i);
  }
 }
 export { UserStore };