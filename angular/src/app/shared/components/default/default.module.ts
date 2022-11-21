import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './layout/public/public.component';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { UserComponent } from './layout/user/user.component';
import { AdminComponent } from './layout/admin/admin.component';

@NgModule({
  declarations: [
    PublicComponent,
    SkeletonComponent,
    UserComponent,
    AdminComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DefaultModule { }
