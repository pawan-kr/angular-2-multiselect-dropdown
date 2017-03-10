import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { MultiselectDropdown, MultiSelectSearchFilter } from './multi-select-dropdown/multiselect-dropdown';
import { MailService } from './service/MailService';
import { NameService } from './service/NameService';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from './multi-select-dropdown/multiselect-dropdown';
import { CommonModule } from '@angular/common';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'

@NgModule({
  imports:      [ BrowserModule,FormsModule, CommonModule, Angular2FontawesomeModule, ReactiveFormsModule
   ],
  exports: [MultiselectDropdown],
  declarations: [ AppComponent,  MultiselectDropdown, MultiSelectSearchFilter ],
  providers: [MailService,
    {provide: 'name', useClass: NameService}
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
