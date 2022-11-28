import { Role } from '../../interface/Model/Role';
  import { RoleStore } from '../../Store/Model/Role';
  const url = '/api/role/';
  class RoleService {
    static all() {
      fetch(url)
        .then((response) => response.json())
        .then((i: Role[]) => RoleStore.upsert(i))
    }
    static get(id: number) {
      fetch(url + id).
        then((response) => response.json()).
        then((i: Role) => RoleStore.add(i))
    }
    static update(i: Role) {
      RoleStore.update(i);
    }
    static del(id: number) {
      fetch(url + id).
        then((response) => response.json()).
        then(() => RoleStore.del(id))
    }
  }
  export { RoleService };