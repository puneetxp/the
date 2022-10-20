import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddRole, DeleteRole, EditRole, SetRole, UpsertRole  } from '../Action/Role.action';
import { Role } from '../../interface/Model/Role';
import { Injectable } from '@angular/core';
export interface RoleStateModel {
  roles: Role[];
}
@Injectable()
@State<RoleStateModel>({
  name: 'role',
  defaults: {
    roles: []
  }
})
export class RoleState {
  constructor() { }
  ngxsOnInit(): void { }
  @Selector()
  static Getroles(state: RoleStateModel) {
    return state;
  }
  @Action(SetRole)
  SetRole({ setState }: StateContext<RoleStateModel>, { payload }: SetRole) {
    setState({ roles: payload });
  }
  @Action(AddRole)
  AddRole({ getState, patchState }: StateContext<RoleStateModel>, { payload }: AddRole) {
    patchState({ roles: [...getState().roles, payload] });
  }
  @Action(UpsertRole)
  UpsertRole({ getState, setState, patchState }: StateContext<RoleStateModel>, { payload }: UpsertRole) {
    if (getState().roles?.length == 0) {
      setState({ roles: payload });
    }  else {
      payload.forEach(i => {
        patchState({
          roles: getState().roles.filter(a => a.id != i.id)
        });
        patchState({
          roles: [...getState().roles, i]
        })
      });
    }
  }
  @Action(EditRole)
  EditRole({ getState, patchState }: StateContext<RoleStateModel>, { payload }: EditRole) {
    let reservices = getState().roles.filter(a => a.id != payload.id);
    patchState({ roles: [...reservices, payload] });
  }
  @Action(DeleteRole)
  DeleteRole({ getState, patchState }: StateContext<RoleStateModel>, { payload }: DeleteRole) {
    patchState({
      roles: getState().roles.filter(a => a.id != payload)
    })
  }
}
