
import { Show } from "solid-js";
import { Component } from "solid-js/types/render/component";
import { A } from "../../../router/src";
import { isAdmin, isLogin } from "../../guard/all";
import { LoginService } from "../../Service/Login";
const Navigation: Component = () => {
  const Handburger = () => {
    if (document.getElementById('handburger').clientHeight > 0) {
      document.querySelector('.menu').classList.toggle('right-full');
      document.querySelectorAll('#handburger div .line').forEach((i, key) => setTimeout(() => { i.classList.toggle('p-1'); }, 40 * key));
    }
  }
  return (
    <nav class="h-16 px-3 text-white font-bold text-xl bg-red-600 w-full flex justify-between content-center">
      <div class="menu justify-center content-center flex w-56 top-16 sm:top-0 sm:right-0 right-full absolute sm:relative flex-col sm:w-auto sm:flex-row">
        <A inactiveClass="bg-red-500" activeClass="bg-red-700" class="m-auto p-2 w-full sm:w-auto" href="/" onclick={Handburger}>Home</A>
        <A inactiveClass="bg-red-500" activeClass="bg-red-700" class="m-auto p-2 w-full sm:w-auto" href="/product" onclick={Handburger}>Product</A>
        <A inactiveClass="bg-red-500" activeClass="bg-red-700" class="m-auto p-2 w-full sm:w-auto" href="/category" onclick={Handburger}>Category</A>
        <Show when={isAdmin() == true}>
          <A class="m-auto p-2 w-full sm:w-auto bg-indigo-400" href="/admin">Admin Panel</A>
        </Show>
      </div>
      <div id="handburger" class="sm:hidden justify-center content-center flex">
        <div class="w-14 p-2 py-4 h-16" onclick={Handburger}>
          <div class="line p-1">
            <div class="bg-red-400 w-full h-0.5"></div>
          </div>
          <div class="line p-1">
            <div class="bg-red-400 w-full h-0.5"></div>
          </div>
          <div class="line p-1">
            <div class="bg-red-400 w-full h-0.5"></div>
          </div>
        </div>
      </div>
      <div class="flex justify-center content-center">
        {<Show
          when={isLogin() == true}
          fallback={
            <A inactiveClass="bg-red-500" activeClass="bg-red-700" class="m-auto p-2 rounded" href="/login">Login</A>
          }>
          <button class="m-auto p-2 rounded" onClick={LoginService.logout}>Logout</button>
        </Show>}
      </div>
    </nav>
  )
}
export default Navigation;