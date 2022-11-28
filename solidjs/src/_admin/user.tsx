import { Component, For, Show } from "solid-js";
import InputFloatRed from "../shared/component/input/float_red";
import { FormFetch } from "../shared/functions/form";
import { User } from "../shared/interface/Model/User";
import { UserService } from "../shared/Service/Model/User";
import { UserStore } from "../shared/Store/Model/User";
UserService.all();
const UserAdminPage: Component = () => {

 const AddUser = (event: Event) => { FormFetch(event).then(response => response.json()).then((i: User) => UserStore.add(i)) };
 return (
  <>
   <Show when={UserStore.get().users.length > 0}
    fallback={
     <div class="text-2xl font-bold m-auto">You have no user here</div>
    }>
    <div class="container mx-auto my-10">
     <h1 class="text-center text-2xl font-bold">Users</h1>
     <For each={UserStore.get().users}>
      {(user) => {
       const { name, email } = user;
       return <div class="w-full flex flex-wrap gap-2">
        <div class="">
         {name}
        </div>
        <div>
         {email}
        </div>
       </div>
      }}
     </For>
    </div>
   </Show>
  </>
 )
}
export default UserAdminPage;