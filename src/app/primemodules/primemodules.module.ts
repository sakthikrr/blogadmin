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
import { ChipsModule } from 'primeng/chips';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChipModule } from 'primeng/chip';
import { TooltipModule } from 'primeng/tooltip';

import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { PanelModule } from 'primeng/panel';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


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
    FileUploadModule,
    ProgressBarModule,
    PanelModule,
    SkeletonModule,
    ProgressSpinnerModule,
    ChipsModule,
    AutoCompleteModule,
    ChipModule,
    TooltipModule
    
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
    FileUploadModule,
    ProgressBarModule,
    PanelModule,
    SkeletonModule,
    ProgressSpinnerModule,
    ChipsModule,
    AutoCompleteModule,
    ChipModule,
    TooltipModule
  ]

})
export class PrimemodulesModule { }
