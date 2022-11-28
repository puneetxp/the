import { createStore, unwrap } from 'solid-js/store';
 import { Active_role } from '../../Interface/Model/Active_role';
 interface Active_roleStateModel {
  active_roles :Active_role[]
 }
 const [state, set] = createStore(<Active_roleStateModel>{ active_roles: [] });
 
 class Active_roleStore {
  static get() {
   return state;
  }
  static set(i: Active_role[]) {
   set({ active_roles: i });
  }
  static upsert(i: Active_role[]) {
   let Prepare: Active_role[] = unwrap(state.active_roles);
   i.forEach(element => {
    Prepare = Prepare.filter(a => a.id != element.id);
    Prepare = [...Prepare, element];
   });
   set({ active_roles: Prepare });
  }
  static del(i: number) {
   set({ active_roles: unwrap(state.active_roles).filter(a => a.id != i) });
  }
  static add(i: Active_role) {
   set({ active_roles: [...unwrap(state.active_roles), i] })
  }
  static update(i: Active_role) {
   set({ active_roles: [...unwrap(state.active_roles).filter(a => a.id == i.id), i] })
  }
  static findState(i: number) {
   return unwrap(state.active_roles).find(a => a.id == i);
  }
  static getState(i: number) {
   return unwrap(state.active_roles).filter(a => a.id == i);
  }
 }
 export { Active_roleStore };