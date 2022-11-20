import { createStore, unwrap } from 'solid-js/store';
 import { Inventory_log } from '../../interface/Model/Inventory_log';
 interface Inventory_logStateModel {
  inventory_logs :Inventory_log[]
 }
 const [state, set] = createStore(<Inventory_logStateModel>{ inventory_logs: [] });
 
 class Inventory_logStore {
  static get() {
   return state;
  }
  static set(i: Inventory_log[]) {
   set({ inventory_logs: i });
  }
  static upsert(i: Inventory_log[]) {
   let Prepare: Inventory_log[] = unwrap(state.inventory_logs);
   i.forEach(element => {
    Prepare = Prepare.filter(a => a.id != element.id);
    Prepare = [...Prepare, element];
   });
   set({ inventory_logs: Prepare });
  }
  static del(i: number) {
   set({ inventory_logs: unwrap(state.inventory_logs).filter(a => a.id != i) });
  }
  static add(i: Inventory_log) {
   set({ inventory_logs: [...unwrap(state.inventory_logs), i] })
  }
  static update(i: Inventory_log) {
   set({ inventory_logs: [...unwrap(state.inventory_logs).filter(a => a.id == i.id), i] })
  }
  static findState(i: number) {
   return unwrap(state.inventory_logs).find(a => a.id == i);
  }
  static getState(i: number) {
   return unwrap(state.inventory_logs).filter(a => a.id == i);
  }
 }
 export { Inventory_logStore };