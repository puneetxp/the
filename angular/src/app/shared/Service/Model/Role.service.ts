import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';  
import { Select, Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { AddRole, DeleteRole, EditRole, SetRole ,UpsertRole } from '../../Ngxs/Action/Role.action';
import { Role } from '../../interface/Model/Role';
import { RoleStateModel } from '../../Ngxs/State/Role.state';
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  @Select() role$!: Observable<RoleStateModel>;
  constructor(private http: HttpClient, private store: Store) { }
  private url = '/api/role/';
  create(_value: any): void {
    this.http.post<Role>(this.url, _value).subscribe(i => this.store.dispatch(new AddRole(i)));
  }
  get(slug: string): Observable<Role> {
    return this.http.get<Role>(this.url + slug);
  }
  getState(id: number | string, key: 'name' | 'enable' | 'id' | 'created_at' | 'updated_at' = 'id'): Observable<Role[]> {
    return this.role$.pipe(map(i => { return i.roles.filter(a => a[key] == id) }));
  }
  all(): void {
    this.http.get<Role[]>(this.url).subscribe(i => this.store.dispatch(new SetRole(i)));
  }
  allState() : Observable<Role[]>{
    return this.role$.pipe(map(i => { return i.roles }));
  }
  find(id: number | string, key: 'name' | 'enable' | 'id' | 'created_at' | 'updated_at' = 'id'): Observable<Role | undefined> {
    return this.role$.pipe(map(i => { return i.roles.find(a => a[key] == id) }));
  }
  update(_update: any) {
    return this.http.patch<Role>(this.url + _update.id, _update).subscribe(i => this.store.dispatch(new EditRole(i)));
  }
  upsert(_upsert:any){  
    return this.http.put<Role[]>(this.url, _upsert).subscribe(i => this.store.dispatch(new UpsertRole(i)));
  }
  del(id: number) {
    return this.http.delete<number>(this.url + id).subscribe(i => this.store.dispatch(new DeleteRole(i)));
  }
}