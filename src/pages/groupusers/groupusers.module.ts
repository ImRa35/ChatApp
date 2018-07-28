import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupusersPage } from './groupusers';

@NgModule({
  declarations: [
    GroupusersPage,
  ],
  imports: [
    IonicPageModule.forChild(GroupusersPage),
  ],
})
export class GroupusersPageModule {}
