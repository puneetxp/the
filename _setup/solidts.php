<?php
function SolidTsStore($table)
{
  $Name = ucfirst($table['name']);
  $names = $table['table'];
  $dir = "../../";
  return "import { createStore, unwrap } from 'solid-js/store';
 import { $Name } from '" . $dir . "Interface/Model/$Name';
 interface " . $Name . "StateModel {
  $names :" . $Name . "[]
 }
 const [state, set] = createStore(<" . $Name . "StateModel>{ " . $names . ": [] });
 
 class " . $Name . "Store {
  static get() {
   return state;
  }
  static set(i: " . $Name . "[]) {
   set({ " . $names . ": i });
  }
  static upsert(i: " . $Name . "[]) {
   let Prepare: " . $Name . "[] = unwrap(state." . $names . ");
   i.forEach(element => {
    Prepare = Prepare.filter(a => a.id != element.id);
    Prepare = [...Prepare, element];
   });
   set({ " . $names . ": Prepare });
  }
  static del(i: number) {
   set({ " . $names . ": unwrap(state." . $names . ").filter(a => a.id != i) });
  }
  static add(i: " . $Name . ") {
   set({ " . $names . ": [...unwrap(state." . $names . "), i] })
  }
  static update(i: " . $Name . ") {
   set({ " . $names . ": [...unwrap(state." . $names . ").filter(a => a.id == i.id), i] })
  }
  static findState(i: number) {
   return unwrap(state." . $names . ").find(a => a.id == i);
  }
  static getState(i: number) {
   return unwrap(state." . $names . ").filter(a => a.id == i);
  }
 }
 export { " . $Name . "Store };";
}
function SolidServicesTs($table)
{
  $Name = ucfirst($table['name']);
  $name = $table['name'];
  $dir = "../../";
  return "import { " . $Name . " } from '" . $dir . "Interface/Model/" . $Name . "';
  import { " . $Name . "Store } from '" . $dir . "Store/Model/" . $Name . "';
  const url = '/api/" . $name . "/';
  class " . $Name . "Service {
    static all() {
      fetch(url)
        .then((response) => response.json())
        .then((i: " . $Name . "[]) => " . $Name . "Store.upsert(i))
    }
    static get(id: number) {
      fetch(url + id).
        then((response) => response.json()).
        then((i: " . $Name . ") => " . $Name . "Store.add(i))
    }
    static update(i: " . $Name . ") {
      " . $Name . "Store.update(i);
    }
    static del(id: number) {
      fetch(url + id).
        then((response) => response.json()).
        then(() => " . $Name . "Store.del(id))
    }
  }
  export { " . $Name . "Service };";
}
