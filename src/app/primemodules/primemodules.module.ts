import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { TreeModule  } from 'primeng/tree';
import { ListboxModule } from 'primeng/listbox';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { FileUploadModule } from 'primeng/fileupload';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    SidebarModule,
    PanelMenuModule,
    DialogModule,
    EditorModule,
    TreeModule,
    ListboxModule,
    DropdownModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    FileUploadModule
    
  ],
  exports: [  // Export ButtonModule to make it available for other modules
    ButtonModule,
    TableModule,
    SidebarModule,
    PanelMenuModule,
    DialogModule,
    EditorModule,
    TreeModule,
    ListboxModule,
    DropdownModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    FileUploadModule
  ]

})
export class PrimemodulesModule { }
