import { Login } from "../interface/Login";
import { LoginStore } from "../Store/Login";

const url = '/api/login/';
export class LoginService {
 static get() {
  return LoginStore.get();
 }
 static set(i: Login | false) {
  LoginStore.set(i)
 }
 static check() {
  fetch(url).then((response) => response.json()).then((i: Login) => { LoginStore.set(i) })
 }
 static logout() {
  fetch('api/logout');
  LoginStore.set(false);
 }
}