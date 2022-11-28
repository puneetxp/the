import { Product } from '../../interface/Model/Product';
  import { ProductStore } from '../../Store/Model/Product';
  const url = '/api/product/';
  class ProductService {
    static all() {
      fetch(url)
        .then((response) => response.json())
        .then((i: Product[]) => ProductStore.upsert(i))
    }
    static get(id: number) {
      fetch(url + id).
        then((response) => response.json()).
        then((i: Product) => ProductStore.add(i))
    }
    static update(i: Product) {
      ProductStore.update(i);
    }
    static del(id: number) {
      fetch(url + id).
        then((response) => response.json()).
        then(() => ProductStore.del(id))
    }
  }
  export { ProductService };