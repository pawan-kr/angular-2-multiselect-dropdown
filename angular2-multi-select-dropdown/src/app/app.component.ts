import { Component, Inject,NgModule, OnInit } from '@angular/core';
import {MailService} from './service/MailService';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from './multi-select-dropdown/multiselect-dropdown';
import {FormsModule, FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms'

@Component({
  selector: 'mylist',
  template: 
  `
  <h2>Multi-select Dropdown</h2><br>
  <h3>Simple Multi-select DropDown</h3> 
  <ss-multiselect-dropdown [options]="myOptions" [(ngModel)]="optionsModel" (ngModelChange)="onChange($event)"></ss-multiselect-dropdown>
  <h3>Multi-Select DropDown with Label and Search </h3>
   <ss-multiselect-dropdown [options]="myOptions1" [texts]="myTexts" [settings]="mySettings" [(ngModel)]="optionsModel1"></ss-multiselect-dropdown>
   <h3>MultiSelect with check and Uncheck</h3>
   <ss-multiselect-dropdown [options]="myOptions1" [texts]="myTexts" [settings]="mySettings1" [(ngModel)]="optionsModel2"></ss-multiselect-dropdown>
   <h3>Multi-Select with Font-Awesome</h3>
   <ss-multiselect-dropdown [options]="myOptions1" [texts]="myTexts" [settings]="mySettings2" [(ngModel)]="optionsModel3"></ss-multiselect-dropdown>
 `
,
})

export class AppComponent {
 optionsModel: number[];
  myOptions: IMultiSelectOption[]= [
            { id: 1, name: 'Option 1' },
            { id: 2, name: 'Option 2' },
            { id: 3, name: 'Option 3' },
        ];

optionsModel1: number[] = []; // Default selection
optionsModel11: number[] = [];
optionsModel2: number[] = [];
optionsModel3: number[] = [];


mySettings: IMultiSelectSettings = {
    pullRight: false,
    enableSearch: true,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-default',
    selectionLimit: 0,
    closeOnSelect: false,
    showCheckAll: false,
    showUncheckAll: false,
    dynamicTitleMaxItems: 3,
    maxHeight: '200px',
    maxWidth:'100px',
    
};
mySettings1: IMultiSelectSettings = {
    pullRight: false,
    enableSearch: true,
    checkedStyle: 'glyphicon',
    buttonClasses: 'btn btn-default',
    selectionLimit: 0,
    closeOnSelect: false,
    showCheckAll: true,
    showUncheckAll: true,
    dynamicTitleMaxItems: 4,
    maxHeight: '250px',
    maxWidth:'200px',
};

mySettings2: IMultiSelectSettings = {
    pullRight: false,
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-default',
    selectionLimit: 0,
    closeOnSelect: false,
    showCheckAll: false,
    showUncheckAll: false,
    dynamicTitleMaxItems: 5,
    maxHeight: '300px',
    maxWidth:'300px',
};

myTexts: IMultiSelectTexts = {
    checkAll: 'Check all',
    uncheckAll: 'Uncheck all',
    checked: 'checked',
    checkedPlural: 'checked',
    searchPlaceholder: 'Search...',
    defaultTitle: 'Select',
};

myOptions1: IMultiSelectOption[] = [
    { id: 1, name: 'Car Brands', isLabel: true },
    { id: 2, name: 'Volvo', parentId: 1 },
    { id: 5, name: 'Audi', parentId: 1 },
    { id: 6, name: 'Mercedes-Benz', parentId: 1 },
    { id: 3, name: 'Colors', isLabel: true },
    { id: 4, name: 'Blue', parentId: 3 },  
    { id: 7, name: 'Black', parentId: 3 },
    { id: 8, name: 'Green', parentId: 3 },
];
    onChange() {
        console.log(this.optionsModel1);
    }

}
    
