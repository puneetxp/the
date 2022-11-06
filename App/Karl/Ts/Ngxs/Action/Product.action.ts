import { Product } from '../../interface/Model/Product';

export class SetProduct {
  static readonly type = '[PRODUCTS] set Product';
  constructor(public payload: Product[]) { }
}

export class AddProduct {
  static readonly type = '[PRODUCTS] Add Product';
  constructor(public payload: Product) { }
}

export class EditProduct {
  static readonly type = '[PRODUCTS] edit';
  constructor(public payload: Product) { }
}

export class DeleteProduct {
  static readonly type = '[PRODUCTS] delete';
  constructor(public payload: number) { }
}
export class UpsertProduct {
  static readonly type = '[PRODUCTS] upsert';
  constructor(public payload: Product[]) { }
}