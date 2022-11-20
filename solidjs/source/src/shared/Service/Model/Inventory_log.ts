import { Inventory_log } from '../../interface/Model/Inventory_log';
  import { Inventory_logStore } from '../../Store/Model/Inventory_log';
  const url = '/api/inventory_log/';
  class Inventory_logService {
    static all() {
      fetch(url)
        .then((response) => response.json())
        .then((i: Inventory_log[]) => Inventory_logStore.upsert(i))
    }
    static get(id: number) {
      fetch(url + id).
        then((response) => response.json()).
        then((i: Inventory_log) => Inventory_logStore.add(i))
    }
    static update(i: Inventory_log) {
      Inventory_logStore.update(i);
    }
    static del(id: number) {
      fetch(url + id).
        then((response) => response.json()).
        then(() => Inventory_logStore.del(id))
    }
  }
  export { Inventory_logService };