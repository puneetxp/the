import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddProduct, DeleteProduct, EditProduct, SetProduct, UpsertProduct  } from '../Action/Product.action';
import { Product } from '../../interface/Model/Product';
import { Injectable } from '@angular/core';
export interface ProductStateModel {
  products: Product[];
}
@Injectable()
@State<ProductStateModel>({
  name: 'product',
  defaults: {
    products: []
  }
})
export class ProductState {
  constructor() { }
  ngxsOnInit(): void { }
  @Selector()
  static Getproducts(state: ProductStateModel) {
    return state;
  }
  @Action(SetProduct)
  SetProduct({ setState }: StateContext<ProductStateModel>, { payload }: SetProduct) {
    setState({ products: payload });
  }
  @Action(AddProduct)
  AddProduct({ getState, patchState }: StateContext<ProductStateModel>, { payload }: AddProduct) {
    patchState({ products: [...getState().products, payload] });
  }
  @Action(UpsertProduct)
  UpsertProduct({ getState, setState, patchState }: StateContext<ProductStateModel>, { payload }: UpsertProduct) {
    if (getState().products?.length == 0) {
      setState({ products: payload });
    }  else {
      payload.forEach(i => {
        patchState({
          products: getState().products.filter(a => a.id != i.id)
        });
        patchState({
          products: [...getState().products, i]
        })
      });
    }
  }
  @Action(EditProduct)
  EditProduct({ getState, patchState }: StateContext<ProductStateModel>, { payload }: EditProduct) {
    let reservices = getState().products.filter(a => a.id != payload.id);
    patchState({ products: [...reservices, payload] });
  }
  @Action(DeleteProduct)
  DeleteProduct({ getState, patchState }: StateContext<ProductStateModel>, { payload }: DeleteProduct) {
    patchState({
      products: getState().products.filter(a => a.id != payload)
    })
  }
}
