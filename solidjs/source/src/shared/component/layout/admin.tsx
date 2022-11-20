
import { Component } from "solid-js";
import { Outlet } from "../../../router/src";
import NavigationAdmin from "../header/navigationAdmin";

const Admin_Layout: Component = (props) => {
 return (
  <div class="min-w-screen min-h-screen flex flex-col">
   <NavigationAdmin></NavigationAdmin>
   <div class="flex flex-col grow">
    <div class="grow flex flex-col">
     <Outlet />
    </div>
   </div>
  </div>
 )
}
export default Admin_Layout;