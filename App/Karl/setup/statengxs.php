<?php

function actionngxs_set($table) {
   $dir = "../..";
   $Name = ucfirst($table['name']);
   return "import { $Name } from '$dir/interface/Model/$Name';

export class Set$Name {
  static readonly type = '[". strtoupper($table['table'])."] set $Name';
  constructor(public payload: $Name" . "[]" . ") { }
}

export class Add$Name {
  static readonly type = '[". strtoupper($table['table'])."] Add $Name';
  constructor(public payload: $Name) { }
}

export class Edit$Name {
  static readonly type = '[". strtoupper($table['table'])."] edit';
  constructor(public payload: $Name) { }
}

export class Delete$Name {
  static readonly type = '[". strtoupper($table['table'])."] delete';
  constructor(public payload: number) { }
}
export class Upsert$Name {
  static readonly type = '[". strtoupper($table['table'])."] upsert';
  constructor(public payload: $Name" . "[]" . ") { }
}";
}

function statengxs_set($table) {
   $dir = "../..";
   $Name = ucfirst($table['name']);
   $name = $table['name'];
   $names = $table['table'];
   return "import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Add$Name, Delete$Name, Edit$Name, Set$Name, Upsert$Name  } from '../Action/$Name".".action';
import { $Name } from '$dir/interface/Model/$Name';
import { Injectable } from '@angular/core';
export interface $Name"."StateModel {
  $names: $Name" . "[]" . ";
}
@Injectable()
@State<$Name"."StateModel>({
  name: '$name',
  defaults: {
    $names: " . "[]" . "
  }
})
export class $Name"."State {
  constructor() { }
  ngxsOnInit(): void { }
  @Selector()
  static Get$names(state: $Name"."StateModel) {
    return state;
  }
  @Action(Set$Name)
  Set$Name({ setState }: StateContext<$Name"."StateModel>, { payload }: Set$Name) {
    setState({ $names: payload });
  }
  @Action(Add$Name)
  Add$Name({ getState, patchState }: StateContext<$Name"."StateModel>, { payload }: Add$Name) {
    patchState({ $names: [...getState().$names, payload] });
  }
  @Action(Upsert$Name)
  Upsert$Name({ getState, setState, patchState }: StateContext<$Name"."StateModel>, { payload }: Upsert$Name) {
    if (getState().$names?.length == 0) {
      setState({ $names: payload });
    }  else {
      payload.forEach(i => {
        patchState({
          $names: getState().$names.filter(a => a.id != i.id)
        });
        patchState({
          $names: [...getState().$names, i]
        })
      });
    }
  }
  @Action(Edit$Name)
  Edit$Name({ getState, patchState }: StateContext<$Name"."StateModel>, { payload }: Edit$Name) {
    let reservices = getState().$names.filter(a => a.id != payload.id);
    patchState({ $names: [...reservices, payload] });
  }
  @Action(Delete$Name)
  Delete$Name({ getState, patchState }: StateContext<$Name"."StateModel>, { payload }: Delete$Name) {
    patchState({
      $names: getState().$names.filter(a => a.id != payload)
    })
  }
}
";
}
