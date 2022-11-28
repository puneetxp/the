<?php

function servicets_set($table) {
   $Name = ucfirst($table['name']);
   $name = $table['name'];
   $names = $table['table'];
   $dir = "../../";
   return "import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';  
import { Select, Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { Add$Name, Delete$Name, Edit$Name, Set$Name ,Upsert$Name } from '$dir"."Ngxs/Action/$Name.action';
import { $Name } from '$dir"."Interface/Model/$Name';
import { $Name" . "StateModel } from '$dir"."Ngxs/State/$Name.state';
@Injectable({
  providedIn: 'root'
})
export class $Name" . "Service {
  @Select() $name$!: Observable<$Name" . "StateModel>;
  constructor(private http: HttpClient, private store: Store) { }
  private url = '/api/$name/';
  create(_value: any): void {
    this.http.post<$Name>(this.url, _value).subscribe(i => this.store.dispatch(new Add$Name(i)));
  }
  get(slug: string): Observable<$Name> {
    return this.http.get<$Name>(this.url + slug);
  }
  getState(id: number | string, key: '" . implode("' | '", array_column($table['data'], 'name')) . "' = 'id'): Observable<$Name" . "[]> {
    return this.$name$.pipe(map(i => { return i.$names.filter(a => a[key] == id) }));
  }
  all(): void {
    this.http.get<$Name" . "[]" . ">(this.url).subscribe(i => this.store.dispatch(new Set$Name(i)));
  }
  allState() : Observable<$Name" . "[]>{
    return this.$name$.pipe(map(i => { return i.$names }));
  }
  find(id: number | string, key: '" . implode("' | '", array_column($table['data'], 'name')) . "' = 'id'): Observable<$Name" . " | undefined> {
    return this.$name$.pipe(map(i => { return i.$names.find(a => a[key] == id) }));
  }
  update(_update: any) {
    return this.http.patch<$Name>(this.url + _update.id, _update).subscribe(i => this.store.dispatch(new Edit$Name(i)));
  }
  upsert(_upsert:any){  
    return this.http.put<$Name" . "[]>(this.url, _upsert).subscribe(i => this.store.dispatch(new Upsert$Name(i)));
  }
  del(id: number) {
    return this.http.delete<number>(this.url + id).subscribe(i => this.store.dispatch(new Delete$Name(i)));
  }
}";
}
