import { Component, For, Show } from "solid-js";
import { ProductService } from "../shared/Service/Model/Product";
import { ProductStore } from "../shared/Store/Model/Product";
const ProductPublicPage: Component = () => {
  ProductService.all();
  return (
    <>
      <Show when={ProductStore.get().products.length > 0}
        fallback={
          <div class="text-2xl font-bold m-auto">You have no product here</div>
          }>
        <div class="container mx-auto my-10">
          <h1 class="text-center text-2xl font-bold">Products</h1>
          <For each={ProductStore.get().products}>
            {(product) => {
              const { name, price } = product;
              return <div class="w-full flex flex-wrap gap-2">
                <div class="">
                  {name}
                </div>
                <div>
                  {price}
                </div>
              </div>
            }}
          </For>
        </div>
      </Show>

    </>
  )
}
export default ProductPublicPage;