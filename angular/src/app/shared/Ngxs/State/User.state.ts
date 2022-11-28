import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddUser, DeleteUser, EditUser, SetUser, UpsertUser  } from '../Action/User.action';
import { User } from '../../interface/Model/User';
import { Injectable } from '@angular/core';
export interface UserStateModel {
  users: User[];
}
@Injectable()
@State<UserStateModel>({
  name: 'user',
  defaults: {
    users: []
  }
})
export class UserState {
  constructor() { }
  ngxsOnInit(): void { }
  @Selector()
  static Getusers(state: UserStateModel) {
    return state;
  }
  @Action(SetUser)
  SetUser({ setState }: StateContext<UserStateModel>, { payload }: SetUser) {
    setState({ users: payload });
  }
  @Action(AddUser)
  AddUser({ getState, patchState }: StateContext<UserStateModel>, { payload }: AddUser) {
    patchState({ users: [...getState().users, payload] });
  }
  @Action(UpsertUser)
  UpsertUser({ getState, setState, patchState }: StateContext<UserStateModel>, { payload }: UpsertUser) {
    if (getState().users?.length == 0) {
      setState({ users: payload });
    }  else {
      payload.forEach(i => {
        patchState({
          users: getState().users.filter(a => a.id != i.id)
        });
        patchState({
          users: [...getState().users, i]
        })
      });
    }
  }
  @Action(EditUser)
  EditUser({ getState, patchState }: StateContext<UserStateModel>, { payload }: EditUser) {
    let reservices = getState().users.filter(a => a.id != payload.id);
    patchState({ users: [...reservices, payload] });
  }
  @Action(DeleteUser)
  DeleteUser({ getState, patchState }: StateContext<UserStateModel>, { payload }: DeleteUser) {
    patchState({
      users: getState().users.filter(a => a.id != payload)
    })
  }
}
