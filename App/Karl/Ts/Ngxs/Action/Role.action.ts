import { Role } from '../../interface/Model/Role';

export class SetRole {
  static readonly type = '[ROLES] set Role';
  constructor(public payload: Role[]) { }
}

export class AddRole {
  static readonly type = '[ROLES] Add Role';
  constructor(public payload: Role) { }
}

export class EditRole {
  static readonly type = '[ROLES] edit';
  constructor(public payload: Role) { }
}

export class DeleteRole {
  static readonly type = '[ROLES] delete';
  constructor(public payload: number) { }
}
export class UpsertRole {
  static readonly type = '[ROLES] upsert';
  constructor(public payload: Role[]) { }
}