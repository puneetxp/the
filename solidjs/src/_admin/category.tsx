import { Component, For, Show } from "solid-js";
import InputFloatRed from "../shared/component/input/float_red";
import { FormFetch } from "../shared/functions/form";
import { Category } from "../shared/interface/Model/Category";
import { CategoryService } from "../shared/Service/Model/Category";
import { CategoryStore } from "../shared/Store/Model/Category";
const CategoryAdminPage: Component = () => {
  CategoryService.all();
  const AddCatogry = (event: Event) => {
    FormFetch(event).then(r => r.json()).then((i: Category) => CategoryStore.add(i))
  }
  return (
    <>
      <div class="w-full py-5 bg-red-100">
        <div class="my-10 mx-5">
          <div class="my-10 mx-5">
            <form action="/api/category" method="post" onSubmit={AddCatogry} class="flex gap-4 flex-wrap">
              <InputFloatRed type={"text"} label={"Name"} name={"name"} required={true} placeholder={''} />
              <button class="p-3 bg-red-200 text-xl font-bold rounded-md grow max-w-xs">Add</button>
            </form>
          </div>
        </div>
      </div>
      <Show when={CategoryStore.get().categories.length > 0}
        fallback={
          <div class="text-2xl font-bold m-auto">You have no Category here</div>
        }>
        <div class="container mx-auto my-10">
          <h1 class="text-center text-2xl font-bold">Categories</h1>
          <For each={CategoryStore.get().categories}>
            {(product) => {
              const { name, category_id } = product;
              return <div class="w-full flex flex-wrap gap-2">
                <div class="">
                  {name}
                </div>
                <div>
                  {CategoryStore.findState(category_id)?.name}
                </div>
              </div>
            }}
          </For>
        </div>
      </Show>
    </>
  )
}
export default CategoryAdminPage;