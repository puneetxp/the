import { Component, For, Show } from "solid-js";
import InputFloatRed from "../shared/component/input/float_red";
import { FormFetch } from "../shared/functions/form";
import { Product } from "../shared/interface/Model/Product";
import { ProductService } from "../shared/Service/Model/Product";
import { ProductStore } from "../shared/Store/Model/Product";
const ProductAdminPage: Component = () => {
  ProductService.all();
  const AddProduct = (event: Event) => { FormFetch(event).then(response => response.json()).then((i: Product) => ProductStore.add(i)) };
  return (
    <>
      <div class="w-full py-5 bg-red-100">
        <div class="my-10 mx-5">
          <form action="/api/product" method="post" onSubmit={AddProduct} class="flex gap-4 flex-wrap">
            <InputFloatRed type={"text"} label={"Name"} name={"name"} required={true} placeholder={''} />
            <button class="p-3 bg-red-200 text-xl font-bold rounded-md grow max-w-xs">Add</button>
          </form>
        </div>
      </div>
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
export default ProductAdminPage;