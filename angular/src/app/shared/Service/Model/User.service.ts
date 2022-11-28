import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';  
import { Select, Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { AddUser, DeleteUser, EditUser, SetUser ,UpsertUser } from '../../Ngxs/Action/User.action';
import { User } from '../../Interface/Model/User';
import { UserStateModel } from '../../Ngxs/State/User.state';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  @Select() user$!: Observable<UserStateModel>;
  constructor(private http: HttpClient, private store: Store) { }
  private url = '/api/user/';
  create(_value: any): void {
    this.http.post<User>(this.url, _value).subscribe(i => this.store.dispatch(new AddUser(i)));
  }
  get(slug: string): Observable<User> {
    return this.http.get<User>(this.url + slug);
  }
  getState(id: number | string, key: 'name' | 'email' | 'phone' | 'google_id' | 'facebook_id' | 'password' | 'enable' | 'id' | 'created_at' | 'updated_at' = 'id'): Observable<User[]> {
    return this.user$.pipe(map(i => { return i.users.filter(a => a[key] == id) }));
  }
  all(): void {
    this.http.get<User[]>(this.url).subscribe(i => this.store.dispatch(new SetUser(i)));
  }
  allState() : Observable<User[]>{
    return this.user$.pipe(map(i => { return i.users }));
  }
  find(id: number | string, key: 'name' | 'email' | 'phone' | 'google_id' | 'facebook_id' | 'password' | 'enable' | 'id' | 'created_at' | 'updated_at' = 'id'): Observable<User | undefined> {
    return this.user$.pipe(map(i => { return i.users.find(a => a[key] == id) }));
  }
  update(_update: any) {
    return this.http.patch<User>(this.url + _update.id, _update).subscribe(i => this.store.dispatch(new EditUser(i)));
  }
  upsert(_upsert:any){  
    return this.http.put<User[]>(this.url, _upsert).subscribe(i => this.store.dispatch(new UpsertUser(i)));
  }
  del(id: number) {
    return this.http.delete<number>(this.url + id).subscribe(i => this.store.dispatch(new DeleteUser(i)));
  }
}