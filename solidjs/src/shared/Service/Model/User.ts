import { User } from '../../Interface/Model/User';
  import { UserStore } from '../../Store/Model/User';
  const url = '/api/user/';
  class UserService {
    static all() {
      fetch(url)
        .then((response) => response.json())
        .then((i: User[]) => UserStore.upsert(i))
    }
    static get(id: number) {
      fetch(url + id).
        then((response) => response.json()).
        then((i: User) => UserStore.add(i))
    }
    static update(i: User) {
      UserStore.update(i);
    }
    static del(id: number) {
      fetch(url + id).
        then((response) => response.json()).
        then(() => UserStore.del(id))
    }
  }
  export { UserService };