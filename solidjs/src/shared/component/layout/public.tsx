
import { Component } from "solid-js";
import { Outlet } from "../../../router/src";
import D_footer from "../footer/D_footer";
import Navigation from "../header/navigation";

const Public_Layout: Component = (props) => {
 return (
  <div class="min-w-screen min-h-screen flex flex-col">
   <Navigation></Navigation>
   <div class="flex flex-col grow">
    <div class="grow flex flex-col">
     <Outlet />
    </div>
    <D_footer></D_footer>
   </div>
  </div>
 )
}
export default Public_Layout;