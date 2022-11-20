import { Component, For, Show } from "solid-js";
import { CategoryService } from "../shared/Service/Model/Category";
import { CategoryStore } from "../shared/Store/Model/Category";
const CategoryPublicPage: Component = () => {
  CategoryService.all();
  return (
    <>
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
export default CategoryPublicPage;