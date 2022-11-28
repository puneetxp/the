import { createStore, unwrap } from 'solid-js/store';
 import { Role } from '../../Interface/Model/Role';
 interface RoleStateModel {
  roles :Role[]
 }
 const [state, set] = createStore(<RoleStateModel>{ roles: [] });
 
 class RoleStore {
  static get() {
   return state;
  }
  static set(i: Role[]) {
   set({ roles: i });
  }
  static upsert(i: Role[]) {
   let Prepare: Role[] = unwrap(state.roles);
   i.forEach(element => {
    Prepare = Prepare.filter(a => a.id != element.id);
    Prepare = [...Prepare, element];
   });
   set({ roles: Prepare });
  }
  static del(i: number) {
   set({ roles: unwrap(state.roles).filter(a => a.id != i) });
  }
  static add(i: Role) {
   set({ roles: [...unwrap(state.roles), i] })
  }
  static update(i: Role) {
   set({ roles: [...unwrap(state.roles).filter(a => a.id == i.id), i] })
  }
  static findState(i: number) {
   return unwrap(state.roles).find(a => a.id == i);
  }
  static getState(i: number) {
   return unwrap(state.roles).filter(a => a.id == i);
  }
 }
 export { RoleStore };