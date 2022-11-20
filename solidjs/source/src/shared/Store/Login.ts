import { createStore } from "solid-js/store";
import { Login } from "../interface/Login";

interface LoginStateModel {
 login: false | Login
}

const intialstate = JSON.parse(localStorage.getItem('login')) || false;
const [state, set] = createStore(<LoginStateModel>{ login: intialstate });
export class LoginStore {
 static get() {
  return state;
 }
 static set(i: Login | false) {
  set({ login: i });
  localStorage.setItem('login', JSON.stringify(i));
 }
}