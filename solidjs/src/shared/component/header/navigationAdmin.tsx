import { Show } from "solid-js";
import { Component } from "solid-js/types/render/component";
import { A } from "../../../router/src";
import { LoginService } from "../../Service/Login";
const NavigationAdmin: Component = () => {
  const Handburger = () => {
    if (document.getElementById('handburger').clientHeight > 0) {
      document.querySelector('.menu').classList.toggle('right-full');
      document.querySelectorAll('#handburger div .line').forEach((i, key) => setTimeout(() => { i.classList.toggle('p-1'); }, 40 * key));
    }
  }
  return (
    <nav class="h-16 px-3 text-white font-bold text-xl bg-red-700 w-full flex justify-between content-center">
      <div class="menu justify-center content-center flex bg-blue-500 w-56 top-16 sm:top-0 sm:right-0 right-full absolute sm:relative flex-col sm:w-auto sm:flex-row z-10 sm:h-12 sm:my-auto">
        <A activeClass="bg-orange-500 sm:m-auto border-l-4 border-red-700 sm:border-none sm:pb-5" inactiveClass=" m-auto" class="p-2 w-full sm:w-auto" href="/admin/product" onclick={Handburger}>Product</A>
        <A activeClass="bg-orange-500 sm:m-auto border-l-4 border-red-700 sm:border-none sm:pb-5" inactiveClass=" m-auto" class="p-2 w-full sm:w-auto" href="/admin/category" onclick={Handburger}>Category</A>
        <A activeClass="bg-orange-500 sm:m-auto border-l-4 border-red-700 sm:border-none sm:pb-5" inactiveClass=" m-auto" class="p-2 w-full sm:w-auto" href="/admin/user" onclick={Handburger}>User</A>
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
        <button class="m-auto p-2 rounded" onClick={LoginService.logout}>Logout</button>
      </div>
    </nav>
  )
}
export default NavigationAdmin;