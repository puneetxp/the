import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddActive_role, DeleteActive_role, EditActive_role, SetActive_role, UpsertActive_role  } from '../Action/Active_role.action';
import { Active_role } from '../../interface/Model/Active_role';
import { Injectable } from '@angular/core';
export interface Active_roleStateModel {
  active_roles: Active_role[];
}
@Injectable()
@State<Active_roleStateModel>({
  name: 'active_role',
  defaults: {
    active_roles: []
  }
})
export class Active_roleState {
  constructor() { }
  ngxsOnInit(): void { }
  @Selector()
  static Getactive_roles(state: Active_roleStateModel) {
    return state;
  }
  @Action(SetActive_role)
  SetActive_role({ setState }: StateContext<Active_roleStateModel>, { payload }: SetActive_role) {
    setState({ active_roles: payload });
  }
  @Action(AddActive_role)
  AddActive_role({ getState, patchState }: StateContext<Active_roleStateModel>, { payload }: AddActive_role) {
    patchState({ active_roles: [...getState().active_roles, payload] });
  }
  @Action(UpsertActive_role)
  UpsertActive_role({ getState, setState, patchState }: StateContext<Active_roleStateModel>, { payload }: UpsertActive_role) {
    if (getState().active_roles?.length == 0) {
      setState({ active_roles: payload });
    }  else {
      payload.forEach(i => {
        patchState({
          active_roles: getState().active_roles.filter(a => a.id != i.id)
        });
        patchState({
          active_roles: [...getState().active_roles, i]
        })
      });
    }
  }
  @Action(EditActive_role)
  EditActive_role({ getState, patchState }: StateContext<Active_roleStateModel>, { payload }: EditActive_role) {
    let reservices = getState().active_roles.filter(a => a.id != payload.id);
    patchState({ active_roles: [...reservices, payload] });
  }
  @Action(DeleteActive_role)
  DeleteActive_role({ getState, patchState }: StateContext<Active_roleStateModel>, { payload }: DeleteActive_role) {
    patchState({
      active_roles: getState().active_roles.filter(a => a.id != payload)
    })
  }
}
