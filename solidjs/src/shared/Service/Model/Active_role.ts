import { Active_role } from '../../interface/Model/Active_role';
  import { Active_roleStore } from '../../Store/Model/Active_role';
  const url = '/api/active_role/';
  class Active_roleService {
    static all() {
      fetch(url)
        .then((response) => response.json())
        .then((i: Active_role[]) => Active_roleStore.upsert(i))
    }
    static get(id: number) {
      fetch(url + id).
        then((response) => response.json()).
        then((i: Active_role) => Active_roleStore.add(i))
    }
    static update(i: Active_role) {
      Active_roleStore.update(i);
    }
    static del(id: number) {
      fetch(url + id).
        then((response) => response.json()).
        then(() => Active_roleStore.del(id))
    }
  }
  export { Active_roleService };