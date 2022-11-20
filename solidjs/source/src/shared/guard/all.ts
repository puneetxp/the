import { Accessor, createMemo } from "solid-js";
import { unwrap } from "solid-js/store";
import { LoginService } from "../Service/Login";

const login = createMemo(() => unwrap(LoginService.get().login));
export const isLogin: Accessor<string | true> = createMemo(() => {
 if (login() == false) { return '/login' }
 return true;
});
export const notLogin: Accessor<string | true> = createMemo(() => {
 if (login() == false) { return true }
 return '/';
});
export const isAdmin: Accessor<string | true> = createMemo(() => {
 const i = login();
 console.log(i)
 if (i != false) {
  if (i?.roles?.includes('admin')) {
   return true;
  }
  return '/not_authorized';
 }
 return '/login';
});