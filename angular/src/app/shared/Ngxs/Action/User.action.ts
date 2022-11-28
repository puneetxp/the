import { User } from '../../interface/Model/User';

export class SetUser {
  static readonly type = '[USERS] set User';
  constructor(public payload: User[]) { }
}

export class AddUser {
  static readonly type = '[USERS] Add User';
  constructor(public payload: User) { }
}

export class EditUser {
  static readonly type = '[USERS] edit';
  constructor(public payload: User) { }
}

export class DeleteUser {
  static readonly type = '[USERS] delete';
  constructor(public payload: number) { }
}
export class UpsertUser {
  static readonly type = '[USERS] upsert';
  constructor(public payload: User[]) { }
}