import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';  
import { Select, Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { AddActive_role, DeleteActive_role, EditActive_role, SetActive_role ,UpsertActive_role } from '../../Ngxs/Action/Active_role.action';
import { Active_role } from '../../Interface/Model/Active_role';
import { Active_roleStateModel } from '../../Ngxs/State/Active_role.state';
@Injectable({
  providedIn: 'root'
})
export class Active_roleService {
  @Select() active_role$!: Observable<Active_roleStateModel>;
  constructor(private http: HttpClient, private store: Store) { }
  private url = '/api/active_role/';
  create(_value: any): void {
    this.http.post<Active_role>(this.url, _value).subscribe(i => this.store.dispatch(new AddActive_role(i)));
  }
  get(slug: string): Observable<Active_role> {
    return this.http.get<Active_role>(this.url + slug);
  }
  getState(id: number | string, key: 'updated_at' | 'user_id' | 'role_id' = 'user_id'): Observable<Active_role[]> {
    return this.active_role$.pipe(map(i => { return i.active_roles.filter(a => a[key] == id) }));
  }
  all(): void {
    this.http.get<Active_role[]>(this.url).subscribe(i => this.store.dispatch(new SetActive_role(i)));
  }
  allState() : Observable<Active_role[]>{
    return this.active_role$.pipe(map(i => { return i.active_roles }));
  }
  find(id: number | string, key: 'updated_at' | 'user_id' | 'role_id' = 'user_id'): Observable<Active_role | undefined> {
    return this.active_role$.pipe(map(i => { return i.active_roles.find(a => a[key] == id) }));
  }
  update(_update: any) {
    return this.http.patch<Active_role>(this.url + _update.id, _update).subscribe(i => this.store.dispatch(new EditActive_role(i)));
  }
  upsert(_upsert:any){  
    return this.http.put<Active_role[]>(this.url, _upsert).subscribe(i => this.store.dispatch(new UpsertActive_role(i)));
  }
  del(id: number) {
    return this.http.delete<number>(this.url + id).subscribe(i => this.store.dispatch(new DeleteActive_role(i)));
  }
}