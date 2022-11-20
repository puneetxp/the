import { Addtional_user } from '../../interface/Model/Addtional_user';
  import { Addtional_userStore } from '../../Store/Model/Addtional_user';
  const url = '/api/addtional_user/';
  class Addtional_userService {
    static all() {
      fetch(url)
        .then((response) => response.json())
        .then((i: Addtional_user[]) => Addtional_userStore.upsert(i))
    }
    static get(id: number) {
      fetch(url + id).
        then((response) => response.json()).
        then((i: Addtional_user) => Addtional_userStore.add(i))
    }
    static update(i: Addtional_user) {
      Addtional_userStore.update(i);
    }
    static del(id: number) {
      fetch(url + id).
        then((response) => response.json()).
        then(() => Addtional_userStore.del(id))
    }
  }
  export { Addtional_userService };