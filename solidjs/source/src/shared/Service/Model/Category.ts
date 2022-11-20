import { Category } from '../../interface/Model/Category';
  import { CategoryStore } from '../../Store/Model/Category';
  const url = '/api/category/';
  class CategoryService {
    static all() {
      fetch(url)
        .then((response) => response.json())
        .then((i: Category[]) => CategoryStore.upsert(i))
    }
    static get(id: number) {
      fetch(url + id).
        then((response) => response.json()).
        then((i: Category) => CategoryStore.add(i))
    }
    static update(i: Category) {
      CategoryStore.update(i);
    }
    static del(id: number) {
      fetch(url + id).
        then((response) => response.json()).
        then(() => CategoryStore.del(id))
    }
  }
  export { CategoryService };