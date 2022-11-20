import { Photo } from '../../interface/Model/Photo';
  import { PhotoStore } from '../../Store/Model/Photo';
  const url = '/api/photo/';
  class PhotoService {
    static all() {
      fetch(url)
        .then((response) => response.json())
        .then((i: Photo[]) => PhotoStore.upsert(i))
    }
    static get(id: number) {
      fetch(url + id).
        then((response) => response.json()).
        then((i: Photo) => PhotoStore.add(i))
    }
    static update(i: Photo) {
      PhotoStore.update(i);
    }
    static del(id: number) {
      fetch(url + id).
        then((response) => response.json()).
        then(() => PhotoStore.del(id))
    }
  }
  export { PhotoService };